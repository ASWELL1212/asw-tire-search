
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore, collection, getDocs, doc, setDoc, updateDoc,
  writeBatch, serverTimestamp, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { SEED_DATA } from "./seed-data.js";

const firebaseConfig = {
  apiKey: "AIzaSyByu3F2wgJL_dHdtuqDEXqln3qh7YgFgz8",
  authDomain: "asw-tire-management.firebaseapp.com",
  projectId: "asw-tire-management",
  storageBucket: "asw-tire-management.firebasestorage.app",
  messagingSenderId: "269591932114",
  appId: "1:269591932114:web:90fd75acc5187f57bdd10b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const $ = (id) => document.getElementById(id);
const loginView = $("loginView");
const appView = $("appView");
const loginForm = $("loginForm");
const loginMessage = $("loginMessage");
const setupCard = $("setupCard");
const seedBtn = $("seedBtn");
const seedMessage = $("seedMessage");
const queryInput = $("query");
const list = $("list");
const loading = $("loading");
const empty = $("empty");
const detailDialog = $("detailDialog");
const detailBody = $("detailBody");
const registerDialog = $("registerDialog");
const registerForm = $("registerForm");
const registerMessage = $("registerMessage");

let vehicles = [];
let currentFilter = "all";
let statusMode = "active";
let regLease = false;
let regMato = false;
let seasonMode = "none";
let unsubscribe = null;

const normalize = (v) => String(v ?? "").normalize("NFKC").replace(/[\s\-ー]/g, "").toLowerCase();
const dateText = (value) => {
  if (!value) return "";
  const d = value.toDate ? value.toDate() : new Date(value);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}`;
};
const escapeHtml = (v) => {
  const div = document.createElement("div");
  div.textContent = String(v ?? "");
  return div.innerHTML;
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginMessage.textContent = "ログイン中…";
  try {
    await signInWithEmailAndPassword(auth, $("email").value.trim(), $("password").value);
    loginMessage.textContent = "";
  } catch (err) {
    loginMessage.textContent = `ログインエラー：${err.code || err.message}`;
    console.error(err);
  }
});

$("logoutBtn").addEventListener("click", () => signOut(auth));
$("clearBtn").addEventListener("click", () => {
  queryInput.value = "";
  queryInput.focus();
  render();
});

queryInput.addEventListener("input", render);

$("newVehicleBtn").addEventListener("click", () => {
  registerForm.reset();
  regLease = false;
  regMato = false;
  $("regLeaseBtn").classList.remove("active");
  $("regMatoBtn").classList.remove("active");
  registerMessage.textContent = "";
  registerDialog.showModal();
});
$("registerCloseBtn").addEventListener("click", () => registerDialog.close());

$("regLeaseBtn").addEventListener("click", () => {
  regLease = !regLease;
  $("regLeaseBtn").classList.toggle("active", regLease);
});
$("regMatoBtn").addEventListener("click", () => {
  regMato = !regMato;
  $("regMatoBtn").classList.toggle("active", regMato);
});
$("showActiveBtn").addEventListener("click", () => {
  statusMode = "active";
  $("showActiveBtn").classList.add("active");
  $("showOutboundBtn").classList.remove("active");
  render();
});
$("showOutboundBtn").addEventListener("click", () => {
  statusMode = "outbound";
  $("showOutboundBtn").classList.add("active");
  $("showActiveBtn").classList.remove("active");
  render();
});
$("suggestPlaceBtn").addEventListener("click", () => {
  const used = new Set(vehicles.filter(v => v.active !== false).map(v => `${v.column}-${v.position}`));
  for (let column = 1; column <= 10; column++) {
    for (let position = 1; position <= 30; position++) {
      if (!used.has(`${column}-${position}`)) {
        $("regColumn").value = column;
        $("regPosition").value = position;
        registerMessage.textContent = `${column}列 ${position}番を提案しました。`;
        return;
      }
    }
  }
  registerMessage.textContent = "空き場所が見つかりません。";
});
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const column = Number($("regColumn").value);
  const position = Number($("regPosition").value);
  const duplicatePlace = vehicles.some(v => v.active !== false && Number(v.column) === column && Number(v.position) === position);
  if (duplicatePlace) {
    registerMessage.textContent = "その保管場所は使用中です。";
    return;
  }
  try {
    const vehicleRef = doc(collection(db, "vehicles"));
    await setDoc(vehicleRef, {
      name: $("regName").value.trim(),
      vehicle: $("regVehicle").value.trim(),
      number: $("regNumber").value.trim(),
      column,
      position,
      lease: regLease,
      matoMaintenance: regMato,
      mountedTire: "unset",
      normalChangedAt: null,
      studlessChangedAt: null,
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    registerMessage.textContent = "登録しました。";
    setTimeout(() => registerDialog.close(), 500);
  } catch (err) {
    registerMessage.textContent = `登録エラー：${err.code || err.message}`;
  }
});


$("winterPendingBtn").addEventListener("click", () => {
  seasonMode = seasonMode === "winterPending" ? "none" : "winterPending";
  updateSeasonButtons();
  render();
});
$("summerPendingBtn").addEventListener("click", () => {
  seasonMode = seasonMode === "summerPending" ? "none" : "summerPending";
  updateSeasonButtons();
  render();
});
$("contactedBtn").addEventListener("click", () => {
  seasonMode = seasonMode === "contacted" ? "none" : "contacted";
  updateSeasonButtons();
  render();
});

function updateSeasonButtons() {
  $("winterPendingBtn").classList.toggle("active", seasonMode === "winterPending");
  $("summerPendingBtn").classList.toggle("active", seasonMode === "summerPending");
  $("contactedBtn").classList.toggle("active", seasonMode === "contacted");
}

document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.filter;
    if (next === "lease" || next === "mato") {
      currentFilter = currentFilter === next ? "all" : next;
    } else {
      currentFilter = next;
    }
    document.querySelectorAll("[data-filter]").forEach(x => x.classList.toggle("active", x.dataset.filter === currentFilter));
    render();
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginView.classList.add("hidden");
    appView.classList.remove("hidden");
    subscribeVehicles();
  } else {
    if (unsubscribe) unsubscribe();
    vehicles = [];
    loginView.classList.remove("hidden");
    appView.classList.add("hidden");
  }
});

function subscribeVehicles() {
  loading.classList.remove("hidden");
  unsubscribe = onSnapshot(collection(db, "vehicles"), (snap) => {
    vehicles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    loading.classList.add("hidden");
    setupCard.classList.toggle("hidden", vehicles.length > 0);
    updateCounts();
    render();
  }, (err) => {
    loading.textContent = "データの読み込みに失敗しました。";
    console.error(err);
  });
}

seedBtn.addEventListener("click", async () => {
  if (!confirm("142台の初期データをFirestoreへ登録します。よろしいですか？")) return;
  seedBtn.disabled = true;
  seedMessage.textContent = "登録中…";
  try {
    const batch = writeBatch(db);
    for (const item of SEED_DATA) {
      const { id, ...data } = item;
      batch.set(doc(db, "vehicles", id), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    await batch.commit();
    seedMessage.textContent = "初期データを登録しました。";
  } catch (err) {
    seedMessage.textContent = "登録に失敗しました。";
    console.error(err);
  } finally {
    seedBtn.disabled = false;
  }
});

function updateCounts() {
  const activeVehicles = vehicles.filter(v => v.active !== false);
  $("countAll").textContent = activeVehicles.length;
  $("countStudless").textContent = activeVehicles.filter(v => v.mountedTire === "studless").length;
  $("countNormal").textContent = activeVehicles.filter(v => v.mountedTire === "normal").length;
  $("countUnset").textContent = activeVehicles.filter(v => !v.mountedTire || v.mountedTire === "unset").length;
  $("countWinterPending").textContent = activeVehicles.filter(v => v.mountedTire !== "studless").length;
  $("countSummerPending").textContent = activeVehicles.filter(v => v.mountedTire !== "normal").length;
  $("countContacted").textContent = activeVehicles.filter(v => v.studlessContactedAt || v.normalContactedAt).length;
}

function filteredVehicles() {
  const q = normalize(queryInput.value);
  return vehicles.filter(v => {
    const isActive = v.active !== false;
    if (statusMode === "active" && !isActive) return false;
    if (statusMode === "outbound" && isActive) return false;
    const textMatch = !q || normalize(v.name).includes(q) || normalize(v.number).includes(q);
    if (!textMatch) return false;
    if (currentFilter === "studless") return v.mountedTire === "studless";
    if (currentFilter === "normal") return v.mountedTire === "normal";
    if (currentFilter === "unset") return !v.mountedTire || v.mountedTire === "unset";
    if (currentFilter === "lease") return v.lease === true;
    if (currentFilter === "mato") return v.matoMaintenance === true;
    if (seasonMode === "winterPending") return v.mountedTire !== "studless";
    if (seasonMode === "summerPending") return v.mountedTire !== "normal";
    if (seasonMode === "contacted") return Boolean(v.studlessContactedAt || v.normalContactedAt);
    return true;
  }).sort((a,b) => (a.column ?? 99) - (b.column ?? 99) || (a.position ?? 99) - (b.position ?? 99));
}

function badgeHtml(v) {
  const out = [];
  if (v.lease) out.push('<span class="badge lease">リース車</span>');
  if (v.matoMaintenance) out.push('<span class="badge mato">まとメンテ</span>');
  if (v.studlessContactedAt) out.push('<span class="badge contacted">冬タイヤ連絡済み</span>');
  if (v.normalContactedAt) out.push('<span class="badge contacted">夏タイヤ連絡済み</span>');
  if (v.mountedTire === "studless") out.push('<span class="badge studless">スタッドレス交換済み</span>');
  else if (v.mountedTire === "normal") out.push('<span class="badge normal">ノーマル交換済み</span>');
  else out.push('<span class="badge unset">交換状態 未設定</span>');
  return out.join("");
}

function render() {
  if (!vehicles.length) {
    list.classList.add("hidden");
    empty.classList.add("hidden");
    return;
  }
  const items = filteredVehicles();
  empty.classList.toggle("hidden", items.length !== 0);
  list.classList.toggle("hidden", items.length === 0);
  list.innerHTML = items.map(v => `
    <button class="vehicle-card" data-id="${escapeHtml(v.id)}">
      <div class="vehicle-head">
        <div>
          <div class="vehicle-name">${escapeHtml(v.name)}</div>
          <div class="vehicle-sub">${escapeHtml(v.vehicle)}　${escapeHtml(v.number)}</div>
        </div>
        <div class="place">${escapeHtml(v.column)}列 ${escapeHtml(v.position)}番</div>
      </div>
      <div class="badges">${badgeHtml(v)}</div>
    </button>
  `).join("");

  list.querySelectorAll(".vehicle-card").forEach(btn => {
    btn.addEventListener("click", () => openDetail(btn.dataset.id));
  });
}

function openDetail(id) {
  const v = vehicles.find(x => x.id === id);
  if (!v) return;
  const stateLabel = v.mountedTire === "studless" ? "スタッドレスタイヤ装着中"
    : v.mountedTire === "normal" ? "ノーマルタイヤ装着中" : "交換状態 未設定";

  detailBody.innerHTML = `
    <div class="detail-title">${escapeHtml(v.name)}</div>
    <div class="detail-sub">${escapeHtml(v.vehicle)}　${escapeHtml(v.number)}</div>
    <div class="detail-place">${escapeHtml(v.column)}列　${escapeHtml(v.position)}番</div>${v.active === false ? '<div class="outbound-banner">出庫済み</div>' : ''}

    <div class="switch-row">
      <button type="button" class="action ${v.lease ? "active" : ""}" id="leaseToggle">
        ${v.lease ? "✓ " : ""}リース車
      </button>
      <button type="button" class="action ${v.matoMaintenance ? "active" : ""}" id="matoToggle">
        ${v.matoMaintenance ? "✓ " : ""}まとメンテ
      </button>
    </div>

    <div class="current-state">${stateLabel}</div>

    <div class="last-dates">
      <div>
        <span>スタッドレス最終交換日</span>
        <strong>${dateText(v.studlessChangedAt) || "未登録"}</strong>
      </div>
      <div>
        <span>ノーマル最終交換日</span>
        <strong>${dateText(v.normalChangedAt) || "未登録"}</strong>
      </div>
    </div>

    <div class="tire-actions">
      <button type="button" class="action studless" id="studlessBtn">スタッドレスへ交換済みにする</button>
      <button type="button" class="action normal" id="normalBtn">ノーマルへ交換済みにする</button>
    </div>

    <div class="contact-actions">
      <button type="button" class="action ${v.studlessContactedAt ? "active" : ""}" id="studlessContactBtn">
        ${v.studlessContactedAt ? "✓ " : ""}冬タイヤ交換の連絡済み
      </button>
      <button type="button" class="action ${v.normalContactedAt ? "active" : ""}" id="normalContactBtn">
        ${v.normalContactedAt ? "✓ " : ""}夏タイヤ交換の連絡済み
      </button>
    </div>

    <div class="contact-dates">
      <span>冬連絡日：${dateText(v.studlessContactedAt) || "未連絡"}</span>
      <span>夏連絡日：${dateText(v.normalContactedAt) || "未連絡"}</span>
    </div>

    <div class="status-actions">
      ${v.active === false
        ? '<button type="button" class="action restore" id="restoreBtn">保管中へ戻す</button>'
        : '<button type="button" class="action outbound" id="outboundBtn">出庫済みにする</button>'}
    </div>
    <section class="history-section">
      <h3>交換履歴</h3>
      <div id="historyList" class="history-list">読み込み中…</div>
    </section>
  `;
  detailDialog.showModal();

  $("leaseToggle").onclick = () => updateVehicle(v.id, { lease: !v.lease });
  $("matoToggle").onclick = () => updateVehicle(v.id, { matoMaintenance: !v.matoMaintenance });
  $("studlessBtn").onclick = () => updateVehicle(v.id, {
    mountedTire: "studless",
    studlessChangedAt: serverTimestamp(),
    studlessContactedAt: null
  }, "studless");
  $("normalBtn").onclick = () => updateVehicle(v.id, {
    mountedTire: "normal",
    normalChangedAt: serverTimestamp(),
    normalContactedAt: null
  }, "normal");

  $("studlessContactBtn").onclick = () => updateVehicle(v.id, {
    studlessContactedAt: v.studlessContactedAt ? null : serverTimestamp()
  }, v.studlessContactedAt ? "winterContactCancel" : "winterContact");

  $("normalContactBtn").onclick = () => updateVehicle(v.id, {
    normalContactedAt: v.normalContactedAt ? null : serverTimestamp()
  }, v.normalContactedAt ? "summerContactCancel" : "summerContact");

  if ($("outboundBtn")) {
    $("outboundBtn").onclick = () => updateVehicle(v.id, {
      active: false,
      outboundAt: serverTimestamp()
    }, "outbound");
  }
  if ($("restoreBtn")) {
    $("restoreBtn").onclick = () => updateVehicle(v.id, {
      active: true,
      outboundAt: null
    }, "restore");
  }

  loadHistory(v.id);
}

async function updateVehicle(id, changes, historyType = null) {
  try {
    if (historyType) {
      const batch = writeBatch(db);
      const vehicleRef = doc(db, "vehicles", id);
      const historyRef = doc(collection(db, "vehicles", id, "history"));

      batch.update(vehicleRef, {
        ...changes,
        updatedAt: serverTimestamp()
      });
      batch.set(historyRef, {
        type: historyType,
        label:
          historyType === "studless" ? "スタッドレスへ交換" :
          historyType === "normal" ? "ノーマルへ交換" :
          historyType === "outbound" ? "出庫" :
          historyType === "restore" ? "保管中へ復帰" :
          historyType === "winterContact" ? "冬タイヤ交換の連絡済み" :
          historyType === "winterContactCancel" ? "冬タイヤ連絡済みを解除" :
          historyType === "summerContact" ? "夏タイヤ交換の連絡済み" :
          "夏タイヤ連絡済みを解除",
        changedAt: serverTimestamp(),
        operator: auth.currentUser?.email || ""
      });
      await batch.commit();
    } else {
      await updateDoc(doc(db, "vehicles", id), {
        ...changes,
        updatedAt: serverTimestamp()
      });
    }
    detailDialog.close();
  } catch (err) {
    alert("更新に失敗しました。");
    console.error(err);
  }
}

async function loadHistory(vehicleId) {
  const historyList = $("historyList");
  if (!historyList) return;

  try {
    const snap = await getDocs(collection(db, "vehicles", vehicleId, "history"));
    const items = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const aTime = a.changedAt?.toMillis ? a.changedAt.toMillis() : 0;
        const bTime = b.changedAt?.toMillis ? b.changedAt.toMillis() : 0;
        return bTime - aTime;
      });

    if (!items.length) {
      historyList.innerHTML = '<div class="history-empty">交換履歴はまだありません</div>';
      return;
    }

    historyList.innerHTML = items.map(item => `
      <div class="history-item ${
        item.type === "studless" ? "history-studless" :
        item.type === "normal" ? "history-normal" : "history-status"
      }">
        <div>
          <strong>${escapeHtml(item.label || "")}</strong>
          <span>${escapeHtml(item.operator || "")}</span>
        </div>
        <time>${dateText(item.changedAt) || "反映中"}</time>
      </div>
    `).join("");
  } catch (err) {
    historyList.textContent = "履歴の読み込みに失敗しました。";
    console.error(err);
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}

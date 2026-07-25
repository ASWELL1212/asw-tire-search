
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
  apiKey: "AIzaSyByu3F2wgJL_dHdtuqDEXq1n3qh7YgFgz8",
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

let vehicles = [];
let currentFilter = "all";
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
    loginMessage.textContent = "メールアドレスまたはパスワードを確認してください。";
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
  $("countAll").textContent = vehicles.length;
  $("countStudless").textContent = vehicles.filter(v => v.mountedTire === "studless").length;
  $("countNormal").textContent = vehicles.filter(v => v.mountedTire === "normal").length;
  $("countUnset").textContent = vehicles.filter(v => !v.mountedTire || v.mountedTire === "unset").length;
}

function filteredVehicles() {
  const q = normalize(queryInput.value);
  return vehicles.filter(v => {
    const textMatch = !q || normalize(v.name).includes(q) || normalize(v.number).includes(q);
    if (!textMatch) return false;
    if (currentFilter === "studless") return v.mountedTire === "studless";
    if (currentFilter === "normal") return v.mountedTire === "normal";
    if (currentFilter === "unset") return !v.mountedTire || v.mountedTire === "unset";
    if (currentFilter === "lease") return v.lease === true;
    if (currentFilter === "mato") return v.matoMaintenance === true;
    return true;
  }).sort((a,b) => (a.column ?? 99) - (b.column ?? 99) || (a.position ?? 99) - (b.position ?? 99));
}

function badgeHtml(v) {
  const out = [];
  if (v.lease) out.push('<span class="badge lease">リース車</span>');
  if (v.matoMaintenance) out.push('<span class="badge mato">まとメンテ</span>');
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
  const changedDate = v.mountedTire === "studless" ? dateText(v.studlessChangedAt)
    : v.mountedTire === "normal" ? dateText(v.normalChangedAt) : "";

  detailBody.innerHTML = `
    <div class="detail-title">${escapeHtml(v.name)}</div>
    <div class="detail-sub">${escapeHtml(v.vehicle)}　${escapeHtml(v.number)}</div>
    <div class="detail-place">${escapeHtml(v.column)}列　${escapeHtml(v.position)}番</div>

    <div class="switch-row">
      <button type="button" class="action ${v.lease ? "active" : ""}" id="leaseToggle">
        ${v.lease ? "✓ " : ""}リース車
      </button>
      <button type="button" class="action ${v.matoMaintenance ? "active" : ""}" id="matoToggle">
        ${v.matoMaintenance ? "✓ " : ""}まとメンテ
      </button>
    </div>

    <div class="current-state">${stateLabel}</div>
    <div class="date-note">${changedDate ? `最終交換日：${changedDate}` : ""}</div>

    <div class="tire-actions">
      <button type="button" class="action studless" id="studlessBtn">スタッドレスへ交換済みにする</button>
      <button type="button" class="action normal" id="normalBtn">ノーマルへ交換済みにする</button>
    </div>
  `;
  detailDialog.showModal();

  $("leaseToggle").onclick = () => updateVehicle(v.id, { lease: !v.lease });
  $("matoToggle").onclick = () => updateVehicle(v.id, { matoMaintenance: !v.matoMaintenance });
  $("studlessBtn").onclick = () => updateVehicle(v.id, {
    mountedTire: "studless",
    studlessChangedAt: serverTimestamp()
  });
  $("normalBtn").onclick = () => updateVehicle(v.id, {
    mountedTire: "normal",
    normalChangedAt: serverTimestamp()
  });
}

async function updateVehicle(id, changes) {
  try {
    await updateDoc(doc(db, "vehicles", id), {
      ...changes,
      updatedAt: serverTimestamp()
    });
    detailDialog.close();
  } catch (err) {
    alert("更新に失敗しました。");
    console.error(err);
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}

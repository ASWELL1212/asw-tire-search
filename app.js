
const query = document.getElementById("query");
const clearBtn = document.getElementById("clearBtn");
const emptyState = document.getElementById("emptyState");
const resultCard = document.getElementById("resultCard");
const notFound = document.getElementById("notFound");
const multipleCard = document.getElementById("multipleCard");
const multipleList = document.getElementById("multipleList");

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .replace(/[\s\-ー]/g, "")
    .toLowerCase();

function hideAll() {
  emptyState.classList.add("hidden");
  resultCard.classList.add("hidden");
  notFound.classList.add("hidden");
  multipleCard.classList.add("hidden");
}

function showSingle(item) {
  document.getElementById("customer").textContent = item.name || "名称なし";
  document.getElementById("vehicle").textContent =
    [item.vehicle, item.number].filter(Boolean).join("　");
  document.getElementById("columnValue").textContent = item.column;
  document.getElementById("positionValue").textContent = item.position;
  resultCard.classList.remove("hidden");
}

function showMultiple(items) {
  multipleList.innerHTML = "";
  items.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "multiple-item";
    button.innerHTML = `
      <span>
        <span class="multiple-name">${escapeHtml(item.name || "名称なし")}</span>
        <span class="multiple-sub">${escapeHtml([item.vehicle, item.number].filter(Boolean).join("　"))}</span>
      </span>
      <span class="multiple-place">${item.column}列 ${item.position}番</span>`;
    button.addEventListener("click", () => {
      hideAll();
      showSingle(item);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    multipleList.appendChild(button);
  });
  multipleCard.classList.remove("hidden");
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function search() {
  const keyword = normalize(query.value);
  hideAll();
  if (!keyword) {
    emptyState.classList.remove("hidden");
    return;
  }

  const matches = TIRE_DATA.filter(item => {
    const name = normalize(item.name);
    const number = normalize(item.number);
    return name.includes(keyword) || number.includes(keyword);
  });

  if (matches.length === 0) {
    notFound.classList.remove("hidden");
  } else if (matches.length === 1) {
    showSingle(matches[0]);
  } else {
    showMultiple(matches);
  }
}

query.addEventListener("input", search);
clearBtn.addEventListener("click", () => {
  query.value = "";
  query.focus();
  search();
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js");
}

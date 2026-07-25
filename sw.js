const CACHE = "asw-tire-manager-v2-1";
const ASSETS = ["./","./index.html","./style.css","./app.js","./seed-data.js","./manifest.webmanifest"];
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.url.includes("firestore.googleapis.com") || event.request.url.includes("identitytoolkit.googleapis.com") || event.request.url.includes("gstatic.com/firebasejs")) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(c => c.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});

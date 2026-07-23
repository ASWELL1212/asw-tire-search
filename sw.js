const CACHE = "aswell-tire-v1";
const ASSETS = ["./","./index.html","./style.css","./app.js","./data.js","./manifest.webmanifest"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener("fetch", event => event.respondWith(caches.match(event.request).then(r => r || fetch(event.request))));

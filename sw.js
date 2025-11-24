const CACHE_NAME = "co2calc";
const CACHE_ASSETS = [
  "/PWA/icons/icon-192.png",
  "/PWA/icons/icon-512.png",
  "/PWA/index.html",
  "/PWA/manifest.json",
  "/PWA/script.js",
  "/PWA/style.css",
  "/PWA/sw.js",
];

self.addEventListener("install", () => {
  caches.open(CACHE_NAME).then(cache => {
    cache.addAll(CACHE_ASSETS);
  });
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
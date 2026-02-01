const CACHE_NAME = "vay-cache-v1";

const OFFLINE_FILES = [
  "/",
  "/index.html",
  "/about.html",
  "/updates.html",
  "/auth.html",
  "/sitemap.html",
  "/css/styles.css",
  "/js/animations.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("vay").then(c =>
      c.addAll(["/", "/index.html"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

/* ===============================
   VAY SERVICE WORKER
   Push • Offline • Cache
================================ */

const CACHE_NAME = "vay-core-v1";
const OFFLINE_PAGE = "/offline.html";

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/admin.html",
  "/notifications.html",
  "/style.css",
  OFFLINE_PAGE
];

/* ===== INSTALL ===== */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

/* ===== ACTIVATE ===== */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ===== FETCH ===== */
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(r => r || caches.match(OFFLINE_PAGE))
    )
  );
});

/* ===== PUSH ===== */
self.addEventListener("push", event => {
  let data = {
    title: "VAY",
    body: "Новое уведомление",
    icon: "/icon.png"
  };

  if (event.data) {
    data = event.data.json();
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.icon,
      vibrate: [100, 50, 100],
      data: data.url || "/"
    })
  );
});

/* ===== NOTIFICATION CLICK ===== */
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});

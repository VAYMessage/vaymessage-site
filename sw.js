const CACHE_NAME = "vaymessage-cache-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/admin.html",
  "/styles.css",
  "/main.js"
];

// Установка
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Активация
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

// Перехват запросов (офлайн-режим)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

// PUSH уведомления
self.addEventListener("push", event => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Vaymessage", {
    body: data.body || "Новое уведомление",
    icon: "/icon.png",
    badge: "/badge.png",
    vibrate: [50, 100, 50],
    data: data.url || "/"
  });
});

// Клик по уведомлению
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});

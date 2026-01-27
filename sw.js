self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon.png"
  });
});

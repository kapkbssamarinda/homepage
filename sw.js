// Kill switch: unregister this old service worker and drop its caches.
// It used to hijack every page on this origin (e.g. localhost:8000),
// serving this project's cached index.html to other projects on the same port.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll();
    clients.forEach((c) => c.navigate(c.url));
  })());
});

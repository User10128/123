const CACHE_NAME = 'checkers-vFinal';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We try to cache the offline page.
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })
  );
  self.skipWaiting(); // Forces the new worker to take over immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Makes the worker control the page right now
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL).then(response => {
          // If the cached offline page exists, return it.
          // Otherwise, we create a basic "emergency" response on the fly.
          return response || new Response('<h1>Offline</h1><p>Checkers is ready, but the offline page failed to load. Try refreshing once you are back online.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        });
      })
    );
  }
});

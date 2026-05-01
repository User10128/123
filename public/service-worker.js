const CACHE_NAME = 'checkers-cache-v1';
const OFFLINE_URL = '/offline.html';

// 1. Install: Save the offline page into memory immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Add the offline page to the cache
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate: Clean up old caches if you update the site
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 3. Fetch: This is the magic part that stops the "ERR_FAILED"
self.addEventListener('fetch', (event) => {
  // We only care about page navigations (loading a new URL)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If the network fails, show the offline.html from memory
        return caches.match(OFFLINE_URL);
      })
    );
  }
});

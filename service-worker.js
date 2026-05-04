const CACHE_NAME = 'offline-v14';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html'
];

// 1. Install Event: Cache files atomically
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // cache.addAll is atomic. If one file fails, the whole cache fails.
      // This prevents the silent failures you were experiencing.
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate Event: Clean up old caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any cache that isn't the current v14
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately without waiting for a refresh
  self.clients.claim();
});

// 3. Fetch Event: Serve the offline page if the network fails
self.addEventListener('fetch', (event) => {
  // Only intercept requests for HTML pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fetch failed (user is offline), return the cached offline page
        return caches.match('/offline.html');
      })
    );
  }
});

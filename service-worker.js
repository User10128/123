const CACHE_NAME = 'checkers-v20'; // Incremented version
const OFFLINE_URL = '/offline.html';

// 1. Install: Just get the offline page in there immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })
  );
  self.skipWaiting();
});

// 2. Activate: Kill old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// 3. Fetch: The "Network First, then Cache" strategy
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // While online, keep a fresh copy of the page in the cache
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          // If network fails (OFFLINE), try the specific page, or the offline fallback
          return caches.match(event.request).then((matched) => {
            return matched || caches.match(OFFLINE_URL);
          });
        })
    );
  }
});

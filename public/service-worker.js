const CACHE_NAME = 'offline-cache-v11';
const OFFLINE_URLS = [
  './',
  './index.html',
  './offline.html',
];


// 1. Install Event: Save your files into the cache
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(OFFLINE_URLS);
        })
    );
});

// 2. Activate Event: Take control of the page immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 3. Fetch Event: Look in Cache FIRST, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 1. If it's in the cache, return it immediately
      if (response) {
        return response;
      }

      // 2. If not in cache, try the network
      return fetch(event.request).catch(() => {
        // 3. If network fails AND it's a page request, show offline.html
        if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
          return caches.match('./offline.html');
        }
      });
    })
  );
});

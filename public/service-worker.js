const CACHE_NAME = 'offline-cache-v9';
const OFFLINE_URLS = [
  '/public/',
  '/public/index.html',
  '/public/offline.html',
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
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached file if found, otherwise try the network
            return cachedResponse || fetch(event.request).catch(() => {
                // If both fail (offline & not in cache), return index.html
                if (event.request.mode === 'navigate') {
                    return caches.match('/public/offline.html');
                }
            });
        })
    );
});

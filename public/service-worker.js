const CACHE_NAME = 'offline-cache-v3'; // Incrementing version forces a fresh start
const OFFLINE_URL = '/offline.html'; 

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.add(OFFLINE_URL);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// The fix: Intercept requests and fallback to cache if the network fails
self.addEventListener('fetch', (event) => {
    // Only intercept navigation requests (opening the page)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // This catch only runs when offline
                return caches.match(OFFLINE_URL);
            })
        );
    } else {
        // For images/scripts, try network, but fall back to cache if available
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

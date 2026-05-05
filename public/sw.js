const CACHE_NAME = 'offline-cache-v1';

// Add the URLs you want to cache here
const urlsToCache = [
    '/',
    '/index.html'
];

// 1. Install Event: Opens the cache and adds the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Fetch Event: Intercepts requests and serves from cache if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached response if found
                if (response) {
                    return response;
                }
                // Otherwise, fetch it from the network
                return fetch(event.request);
            })
    );
});

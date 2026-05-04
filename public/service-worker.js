const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '/offline.html'; // Change this to the specific file you want cached

// 1. Install Event: Save the file to the browser's cache immediately
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache and adding:', OFFLINE_URL);
            return cache.add(OFFLINE_URL);
        })
    );
});

// 2. Fetch Event: Intercept requests and serve the cached file if the network fails
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // This 'catch' triggers only if the network request fails (offline)
            return caches.match(OFFLINE_URL);
        })
    );
});

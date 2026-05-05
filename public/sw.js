const CACHE_NAME = 'offline-cache-v2';

// We use './' to handle slightly different folder structures
const urlsToCache = [
    './',
    './background.png',
    './favicon.png',
    './offline.html
    './index.html'
];

// 1. Install Event
self.addEventListener('install', event => {
    // Force the service worker to activate immediately
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.log('Cache failed:', err))
    );
});

// 2. Activate Event: Take control of the page immediately
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// 3. Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return from cache
                }
                return fetch(event.request); // Return from network
            })
    );
});

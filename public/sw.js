const CACHE_NAME = 'site-assets-v3';

// 1. LIST ALL FILES: Add every file you want available offline here.
const urlsToCache = [
    './',
    './index.html',
    './offline.html',     // The page you want to redirect to
    './404.html',       // Your Javascript
    './logo.png'          // Your Images
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// 2. THE "REDIRECT" LOGIC:
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the file if it's in the cache
                if (response) {
                    return response;
                }
                
                // If not in cache, try the network
                return fetch(event.request).catch(() => {
                    // IF BOTH FAIL (Offline & not cached), 
                    // redirect/show the offline.html file
                    return caches.match('/offline.html');
                });
            })
    );
});

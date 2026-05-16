const CACHE_NAME = 'mayodiecisies2026';

// 1. LIST ALL FILES: Add every file you want available offline here.
const urlsToCache = [
    './',
    './index',
    './background.png',
    './favicon.png',
    './offline',     // The page you want to redirect to
    './trans.js',
    'https://cdn.tailwindcss.com'
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
                    // only redirect/show the offline.html file for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('/offline');
                    }
                    // For other requests (like scripts, images), simply fail
                    return new Response('', { status: 404, statusText: 'Offline' });
                });
            })
    );
});

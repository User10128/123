const CACHE_NAME = 'checkers-v3';

// 1. LIST ALL FILES: Add every file you want available offline here.
const urlsToCache = [
    '/',
    '/index',
    '/background.png',
    '/favicon.png',
    '/offline',     // The page you want to redirect to
    '/trans.js',
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
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 2. THE "REDIRECT" LOGIC:
self.addEventListener('fetch', event => {
    // 1. Only intercept GET requests
    if (event.request.method !== 'GET') {
        return; 
    }
    
    // 2. Only intercept requests to our own origin (this fixes Firebase & Tailwind CORS errors)
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) {
        return;
    }

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
                    // only redirect/show the home page for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('/');
                    }
                    // For other requests (like scripts, images), simply fail
                    return new Response('', { status: 404, statusText: 'Offline' });
                });
            })
    );
});

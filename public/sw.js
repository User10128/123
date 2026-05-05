const CACHE_NAME = 'site-assets-v3'; // Increased version to force an update

// 1. CACHE ALL FILES: This ensures they are ready to be used when offline
const urlsToCache = [
    './',
    './index.html',
    './offline.html',
    './404.html',
    './about.html',
    './admin-panel.html',
    './article.html',
    './background.png',
    './favicon.png',
    './firebase-blueprint.json',
    './manifest.json',
    './metadata.json',
    './polls.html',
    './privacy.html',
    './service.html',
    './sitemap.xml',
    './social.html',
    './stratagies.html' // Matching your "stratagies" spelling
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

// 2. THE "FORCE TO OFFLINE PAGE" LOGIC
self.addEventListener('fetch', event => {
    // Only apply this logic to "navigate" requests (loading a new page)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // If the network fails (offline), ignore the cache for the requested 
                // page and show the offline.html file instead.
                return caches.match('./offline.html');
            })
        );
    } else {
        // For images, CSS, and other assets, use the cache to stay fast.
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }
});

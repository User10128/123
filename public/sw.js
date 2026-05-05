const CACHE_NAME = 'site-assets-v2'; // Bumped to v2 to force an update

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
    './logo.png',
    './polls.html',
    './privacy.html',
    './service.html',
    './social.html',
    './stratagies.html', // Matched the spelling in your sidebar
    './manifest.json'
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

self.addEventListener('fetch', event => {
    // We only want to "redirect" for actual web pages (navigation)
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // 1. If it's in the cache, serve it
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2. If not, try the network
            return fetch(event.request).catch(() => {
                // 3. If network fails AND it's a page request, show offline.html
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
        })
    );
});

const CACHE_NAME = 'checkers-v1';
// No slashes at the start helps with Cloudflare routing
const ASSETS = [
  'index.html',
  'offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // This forces the browser to fetch a fresh copy from the server to save
      return Promise.all(
        ASSETS.map(asset => cache.add(new Request(asset, {cache: 'reload'})))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('offline.html'))
    );
  }
});

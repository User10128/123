const CACHE_NAME = 'checkers-vFinal';
// Use relative paths to ensure it finds the files in the same folder
const FILES_TO_CACHE = [
  './',
  './index.html',
  './offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We use addAll but catch individual errors so the whole thing doesn't fail
      return Promise.all(
        FILES_TO_CACHE.map(url => {
          return cache.add(url).catch(err => console.log('Failed to cache:', url));
        })
      );
    })
  );
  self.skipWaiting();
});

// The rest of your fetch logic from image_388ecc.png is correct.


self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
});

const CACHE_NAME = 'v1';
const ASSETS = [
  './',
  './index.html',
  './offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We add them one by one so if one fails, the others might stay
      return Promise.all(
        ASSETS.map(url => cache.add(url).catch(err => console.log('failed:', url)))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('./offline.html');
      })
    );
  }
});

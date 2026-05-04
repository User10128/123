const CACHE_NAME = 'offline-auto-v15';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './offline.html' // MUST match your file name exactly
  './background.html'
];

// 1. AUTOMATICALLY cache files on load
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching offline page...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Forces it to activate immediately
});

// 2. AUTOMATICALLY show offline page if internet is down
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('./offline.html'); // Falls back to offline file
      })
    );
  }
});

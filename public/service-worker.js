const CACHE_NAME = 'offline-v13';
const FILES_TO_CACHE = [
  './', 
  './index.html', 
  './offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use map to catch errors on individual files
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => console.error('Failed to cache:', url, err));
        })
      );
    })
  );
  self.skipWaiting();
});


// 2. AUTOMATICALLY show offline page if internet is down
self.addEventListener('fetch', (event) => {
  // Only handle "navigate" (opening a new page) requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // This is the fallback that opens AUTOMATICALLY when network fails
        return caches.match('./offline.html');
      })
    );
  }
});

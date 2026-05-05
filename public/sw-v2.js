const CACHE_NAME = 'checkers-vFinal-v1';
// This path MUST match exactly what you type in your browser to see the offline page
const OFFLINE_URL = './offline.html'; 

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use console.log to help you if you ever get to see a console
      console.log('Attempting to cache offline page...');
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    }).catch(err => {
      // If this happens, the worker will NOT register properly
      console.error('Failed to cache during install:', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // This only triggers when the network is totally GONE
        return caches.match(OFFLINE_URL);
      })
    );
  }
});

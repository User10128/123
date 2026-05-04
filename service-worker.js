const CACHE_NAME = 'checkers-v15';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Attempting to cache files...');
      // Using a loop instead of addAll to prevent one tiny failure 
      // from breaking the entire installation.
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return fetch(url).then((response) => {
            if (!response.ok) throw new Error('Not OK for ' + url);
            return cache.put(url, response);
          }).catch(err => console.error('Failed to cache:', url, err));
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html') || caches.match('/');
      })
    );
  }
});

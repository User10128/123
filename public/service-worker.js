const CACHE_NAME = 'site-v1';
const OFFLINE_URL = '/offline.html'; // Your custom offline page

// 1. Store the offline page during installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.add(OFFLINE_URL);
    })
  );
});

// 2. The logic to switch to the offline file
self.addEventListener('fetch', event => {
  // Only handle navigation requests (opening a page)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If the fetch fails (no internet), return the offline.html from cache
        return caches.match(OFFLINE_URL);
      })
    );
  }
});

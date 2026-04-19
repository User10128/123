// --- DevTools Easter Egg ---
console.log(
  "%cLooking for bugs or secrets?", 
  "color: #00ffcc; font-size: 16px; font-weight: bold; font-family: sans-serif; padding: 8px;"
);
console.log("%cThe AI is currently calculating your next move... or maybe it's just watching.");
// ---------------------------

const CACHE_NAME = 'checkers-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

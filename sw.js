const CACHE_NAME = 'trebricon-cache-v1';
const OFFLINE_URL = 'offline.html';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/offline.html',
  '/fon1.jpg',
  '/dom1.jpg',
  '/ban1.jpg',
  '/bas1.png',
  '/sar1.jpg',
  '/gar1.jpg',
  '/tep1.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});

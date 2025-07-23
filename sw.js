const CACHE_NAME = 'trebricon-cache-v3';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
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
  '/tep1.jpeg',
  '/za.html',
  '/dom.html',
  '/banya.html',
  '/bas.html',
  '/sarai.html',
  '/garazh.html',
  '/teplica.html'
];

// Установка и кэширование критически важных ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Активация и очистка старых кэшей
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

// Обработка запросов
self.addEventListener('fetch', event => {
  // Для навигационных запросов (переходы между страницами)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } 
  // Для всех остальных запросов
  else {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          return cachedResponse || fetch(event.request)
            .then(response => {
              // Кэшируем новые ресурсы по мере их запроса
              return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response.clone());
                return response;
              });
            })
            .catch(() => {
              // Для изображений можно вернуть заглушку
              if (event.request.headers.get('accept').includes('image')) {
                return caches.match('/placeholder.jpg');
              }
              return new Response('Офлайн-режим', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
  }
});
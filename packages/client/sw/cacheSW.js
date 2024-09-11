/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const VERSION = 'v1';
const CACHE_NAME = `waika-project-cache-${VERSION}`;

const URLS = [
  '/',
  '/src/shared/assets/svg/main-logo.svg',
  '/src/shared/assets/images/rules.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS))
      .catch(error => {
        console.log('SW cache error:', error);
        throw error;
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        await caches
          .open(CACHE_NAME)
          .then(async (cache) => {
            if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
              await cache.put(event.request, responseToCache);
            }
          });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

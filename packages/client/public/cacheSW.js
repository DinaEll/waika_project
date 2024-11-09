/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const VERSION = 'v3';
const CACHE_NAME = `waika-project-cache-${VERSION}`;

const URLS = [
  '/',
  '/assets/tiles/MJ-1.svg',
  '/assets/tiles/MJ-2.svg',
  '/assets/tiles/MJ-3.svg',
  '/assets/tiles/MJ-4.svg',
  '/assets/tiles/MJ-5.svg',
  '/assets/tiles/MJ-6.svg',
  '/assets/tiles/MJ-7.svg',
  '/assets/tiles/MJ-8.svg',
  '/assets/tiles/MJ-9.svg',
  '/assets/tiles/MJ-10.svg',
  '/assets/tiles/MJ-11.svg',
  '/assets/tiles/MJ-12.svg',
  '/assets/tiles/MJ-13.svg',
  '/assets/tiles/MJ-14.svg',
  '/assets/tiles/MJ-15.svg',
  '/assets/tiles/MJ-16.svg',
  '/assets/tiles/MJ-17.svg',
  '/assets/tiles/MJ-18.svg',
  '/assets/tiles/MJ-19.svg',
  '/assets/tiles/MJ-20.svg',
  '/assets/tiles/MJ-21.svg',
  '/assets/tiles/MJ-22.svg',
  '/assets/tiles/MJ-23.svg',
  '/assets/tiles/MJ-24.svg',
  '/assets/tiles/MJ-25.svg',
  '/assets/tiles/MJ-26.svg',
  '/assets/tiles/MJ-27.svg',
  '/assets/tiles/MJ-28.svg',
  '/assets/tiles/MJ-29.svg',
  '/assets/tiles/MJ-30.svg',
  '/assets/tiles/MJ-31.svg',
  '/assets/tiles/MJ-32.svg',
  '/assets/tiles/MJ-33.svg',
  '/assets/tiles/MJ-34.svg',
  '/assets/tiles/MJ-35.svg',
  '/assets/tiles/MJ-36.svg',
  '/assets/tiles/MJ-37.svg',
  '/assets/tiles/MJ-38.svg',
  '/assets/tiles/MJ-39.svg',
  '/assets/tiles/MJ-40.svg',
  '/assets/tiles/MJ-41.svg',
  '/assets/tiles/MJ-42.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((error) => {
        console.log('SW cache error:', error);
        throw error;
      }),
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
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
        await caches.open(CACHE_NAME).then(async (cache) => {
          if (
            event.request.url.startsWith('http') ||
            event.request.url.startsWith('https')
          ) {
            await cache.put(event.request, responseToCache);
          }
        });

        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});

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
  '/src/shared/assets/images/rules.png',

  '/src/shared/assets/game-tiles/MJ-1.svg',
  '/src/shared/assets/game-tiles/MJ-2.svg',
  '/src/shared/assets/game-tiles/MJ-3.svg',
  '/src/shared/assets/game-tiles/MJ-4.svg',
  '/src/shared/assets/game-tiles/MJ-5.svg',
  '/src/shared/assets/game-tiles/MJ-6.svg',
  '/src/shared/assets/game-tiles/MJ-7.svg',
  '/src/shared/assets/game-tiles/MJ-8.svg',
  '/src/shared/assets/game-tiles/MJ-9.svg',
  '/src/shared/assets/game-tiles/MJ-10.svg',
  '/src/shared/assets/game-tiles/MJ-11.svg',
  '/src/shared/assets/game-tiles/MJ-12.svg',
  '/src/shared/assets/game-tiles/MJ-13.svg',
  '/src/shared/assets/game-tiles/MJ-14.svg',
  '/src/shared/assets/game-tiles/MJ-15.svg',
  '/src/shared/assets/game-tiles/MJ-16.svg',
  '/src/shared/assets/game-tiles/MJ-17.svg',
  '/src/shared/assets/game-tiles/MJ-18.svg',
  '/src/shared/assets/game-tiles/MJ-19.svg',
  '/src/shared/assets/game-tiles/MJ-20.svg',
  '/src/shared/assets/game-tiles/MJ-21.svg',
  '/src/shared/assets/game-tiles/MJ-22.svg',
  '/src/shared/assets/game-tiles/MJ-23.svg',
  '/src/shared/assets/game-tiles/MJ-24.svg',
  '/src/shared/assets/game-tiles/MJ-25.svg',
  '/src/shared/assets/game-tiles/MJ-26.svg',
  '/src/shared/assets/game-tiles/MJ-27.svg',
  '/src/shared/assets/game-tiles/MJ-28.svg',
  '/src/shared/assets/game-tiles/MJ-29.svg',
  '/src/shared/assets/game-tiles/MJ-30.svg',
  '/src/shared/assets/game-tiles/MJ-31.svg',
  '/src/shared/assets/game-tiles/MJ-32.svg',
  '/src/shared/assets/game-tiles/MJ-33.svg',
  '/src/shared/assets/game-tiles/MJ-34.svg',
  '/src/shared/assets/game-tiles/MJ-35.svg',
  '/src/shared/assets/game-tiles/MJ-36.svg',
  '/src/shared/assets/game-tiles/MJ-37.svg',
  '/src/shared/assets/game-tiles/MJ-38.svg',
  '/src/shared/assets/game-tiles/MJ-39.svg',
  '/src/shared/assets/game-tiles/MJ-40.svg',
  '/src/shared/assets/game-tiles/MJ-41.svg',
  '/src/shared/assets/game-tiles/MJ-42.svg',
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

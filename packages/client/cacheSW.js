/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
const VERSION = 'v1';
const CACHE_NAME = `waika-project-cache-${VERSION}`;

const URLS = [
  '/',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS))
      .catch(error => console.log(error))
  );

  event.waitUntil(self.skipWaiting());
});


// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim());
//   event.waitUntil(
//     caches
//       .keys()
//       .then(cachesNames => {
//         return Promise.all(
//           cachesNames
//             .filter(name => name !== CACHE_NAME)
//             .map(name => caches.delete(name))
//         )
//       })
//   );
// });


// self.addEventListener('fetch', event => {
//   event.respondWith(
//     fetch(event.request)
//       .then(async (response) => {
//         if (!response || response.status !== 200 || response.type !== 'basic') {
//           return response;
//         }
//
//         const networkResponse = response.clone();
//
//         await caches
//           .open(CACHE_NAME)
//           .then(cache => {
//             if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
//               cache.put(event.request, networkResponse);
//             }
//           });
//
//         return response;
//       })
//       .catch(async () => {
//         console.log('Оффлайн');
//
//         return await caches
//           .open(CACHE_NAME)
//           .then(cache => cache.match(event.request))
//           .then(response => response || Promise.reject('Нет данных в кеше'));
//       })
//   );
// });

/* eslint-enable */

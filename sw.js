// // sw.js - This file needs to be in the root of the directory to work,
// //         so do not move it next to the other scripts

// const CACHE_NAME = 'lab-8-starter';

// /* List every file you want available offline */
// const ASSETS_TO_CACHE = [
//   '/',  // alias for /index.html
//   '/index.html',
//   '/assets/styles/main.css',
//   '/assets/scripts/main.js',
//   '/assets/scripts/RecipeCard.js',
//   '/manifest.json',
//   // star icons
//   '/assets/images/icons/1-star.svg',
//   '/assets/images/icons/2-star.svg',
//   '/assets/images/icons/3-star.svg',
//   '/assets/images/icons/4-star.svg',
//   '/assets/images/icons/5-star.svg',
//   // remote recipe JSON
//   'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
//   'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
//   'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
//   'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
//   'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
//   'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json'
// ];

// // Installs the service worker. Feed it some initial URLs to cache
// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
//       //            added to the cache when the ServiceWorker is installed
//       /* ----------  B6  INSTALL ---------- */
//       self.addEventListener('install', evt => {
//         // store every asset in the cache *before* the worker finishes installing
//         evt.waitUntil(
//           caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
//         );
//         // activate this worker immediately instead of waiting for next reload
//         self.skipWaiting();
//       });

//       /* ----------  ACTIVATE  ---------- */
//       self.addEventListener('activate', evt => {
//         // clean up old caches if you rev the version string
//         evt.waitUntil(
//           caches.keys().then(keys =>
//             Promise.all(
//               keys
//                 .filter(key => key !== CACHE_NAME)
//                 .map(key => caches.delete(key))
//             )
//           )
//         );
//         self.clients.claim();  // let pages load through this SW right away
//       });

//       return cache.addAll([]);
//     })
//   );
// });

// // Activates the service worker
// self.addEventListener('activate', function (event) {
//   event.waitUntil(self.clients.claim());
// });

// // Intercept fetch requests and cache them
// self.addEventListener('fetch', function (event) {
//   // We added some known URLs to the cache above, but tracking down every
//   // subsequent network request URL and adding it manually would be very taxing.
//   // We will be adding all of the resources not specified in the intiial cache
//   // list to the cache as they come in.
//   /*******************************/
//   // This article from Google will help with this portion. Before asking ANY
//   // questions about this section, read this article.
//   // NOTE: In the article's code REPLACE fetch(event.request.url) with
//   //       fetch(event.request)
//   // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
//   /*******************************/
//   // B7. TODO - Respond to the event by opening the cache using the name we gave
//   //            above (CACHE_NAME)
//   // B8. TODO - If the request is in the cache, return with the cached version.
//   //            Otherwise fetch the resource, add it to the cache, and return
//   //            network response.
//   /* ----------  B7/B8  FETCH ---------- */
//   self.addEventListener('fetch', evt => {
//     evt.respondWith(
//       caches.match(evt.request).then(cachedResp => {
//         // 1) Serve from cache if we have it
//         if (cachedResp) return cachedResp;

//         // 2) Otherwise hit the network, cache a *clone* of the response,
//         //    and give the fresh data back to the page.
//         return fetch(evt.request)
//           .then(networkResp => {
//             return caches.open(CACHE_NAME).then(cache => {
//               cache.put(evt.request, networkResp.clone());
//               return networkResp;
//             });
//           })
//           .catch(() => {
//             // Optional: fallback page/response when totally offline
//             return new Response('Offline & no cached version available',
//                                 { status: 503, statusText: 'Service Unavailable' });
//           });
//       })
//     );
//   });
// });

// sw.js  – Service Worker must be at the site root
// NOTE: Replace every leading / with a relative path so this works
// both locally and on GitHub Pages.

const CACHE_NAME = 'lab8-recipes-v1';

/* Files we want available offline */
const ASSETS_TO_CACHE = [
  'index.html',
  'assets/styles/main.css',
  'assets/scripts/main.js',
  'assets/scripts/RecipeCard.js',
  'manifest.json',
  // star icons
  'assets/images/icons/1-star.svg',
  'assets/images/icons/2-star.svg',
  'assets/images/icons/3-star.svg',
  'assets/images/icons/4-star.svg',
  'assets/images/icons/5-star.svg',
  // remote recipe JSON
  'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json'
];

/* ---------- INSTALL ---------- */
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting(); // activate immediately
});

/* ---------- ACTIVATE ---------- */
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachedResp => {
      if (cachedResp) return cachedResp;          // cache hit

      return fetch(evt.request)                   // cache miss
        .then(networkResp =>
          caches.open(CACHE_NAME).then(cache => {
            cache.put(evt.request, networkResp.clone());
            return networkResp;
          })
        )
        .catch(() =>
          new Response('Offline & no cached version', {
            status: 503, statusText: 'Service Unavailable'
          })
        );
    })
  );
});

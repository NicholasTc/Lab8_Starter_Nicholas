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

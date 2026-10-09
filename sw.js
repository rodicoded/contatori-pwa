const CACHE_NAME = 'contatori-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installazione: salvataggio file in cache locale
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Intercettazione richieste: serve i file dalla cache se si è offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
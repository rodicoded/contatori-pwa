const CACHE_NAME = 'contatori-pwa-v1.1';
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

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        // Confronta tutte le cache salvate e cancella quelle diverse dalla versione attuale (CACHE_NAME)
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// service-worker.js

const CACHE_NAME = "weather-app-v1-test";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "manifest.json"
]

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos almacenados en caché");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
});

self.addEventListener('fetch', (event) => {
  if (STATIC_ASSETS.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request)
      })
    )
  } else {
    event.respondWith(
      fetch(event.request)
      .then((response) => {
        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
    )
  }
});
  
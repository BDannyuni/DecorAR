// service-worker.js

const CACHE_NAME = "muebles-ar-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/scripts.js",
  "/productos.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  // Agrega aquí tus imágenes, modelos 3D y lo que necesites
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

const CACHE_NAME = 'mueble-store-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/productos.json',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/styles.css',  // Ajusta si tienes otros CSS
  '/scripts.js',       // Ajusta si tu archivo js se llama diferente
  // Imágenes
  '/img/silla.jpg',
  '/img/mesa.jpg',
  '/img/estante.jpg',
  // Modelos 3D
  '/models/mueble__01.glb',
  '/models/mueble_dejardin.glb',
  '/models/vedbo_design_armchair_by_ikea_-_sillon.glb',
  '/models/mueble.glb',
  '/models/ta02_-_mueble_tv.glb',
  '/models/comedor (1).glb',
  '/models/comedor.glb',
  '/models/comedor_4_puestos_dousty_verde_nat..glb',
  '/models/minimalist_desk__escritorio_minimalista.glb',
  '/models/silla_escritorio.glb',
  '/models/mueble_para_tv.glb',
  '/models/sofa_48.glb',
  '/models/sofa_3230.glb',
  '/models/sofa_web.glb',
  '/models/cama_azul.glb',
  '/models/bed.glb',
  '/models/escritorio_praga_180x70x79cm_madera_teak_natural.glb',
  '/models/lampara_hexagonal_export.glb'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: limpiando cache vieja');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch para servir desde el cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit
        if (response) {
          return response;
        }
        // Cache miss, ir a la red
        return fetch(event.request);
      })
  );
});

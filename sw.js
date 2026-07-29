const CACHE_NAME = 'citiwear-v1';

// Daftar aset yang akan disimpan di cache browser pengunjung
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './include.js',
  './header.html',
  './footer.html',
  './testimoni.html',
  './img/logo.png',
  './img/banner3.png',
  './img/banner2.jpg',
  './img/banner1.png',
  './img/baju/cover.png',
  './img/panjang/cover.png',
  './img/strip/cover.png'
];

// 1. Install Event: Mengunduh dan menyimpan aset ke Cache Storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Membersihkan cache lama jika ada pembaruan versi (misal: v1 ke v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Menyajikan file dari cache terlebih dahulu, jika tidak ada baru ambil dari jaringan
self.addEventListener('fetch', (event) => {
  // Abaikan permintaan selain GET (seperti POST/API eksternal)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Mengembalikan aset dari cache lokal (Sangat Cepat)
        return cachedResponse;
      }
      // Jika file belum ada di cache, ambil dari server/jaringan
      return fetch(event.request).then((networkResponse) => {
        // Simpan gambar atau aset baru yang berhasil diunduh ke cache secara otomatis
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
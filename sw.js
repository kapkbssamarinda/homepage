const CACHE_NAME = 'kap-portal-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js',
  'https://code.jquery.com/jquery-3.6.0.min.js'
  // Tambahkan path image logo Anda disini jika ingin dicache juga
  // './asset/icon/LOGO.png' 
];

// 1. Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Menyimpan aset ke cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Service Worker (Membersihkan cache lama jika ada update)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Menghapus cache lama:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Fetch (Mengambil data dari cache jika offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada di cache, gunakan cache. Jika tidak, ambil dari internet.
      return response || fetch(event.request);
    })
  );
});
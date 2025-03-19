const CACHE_NAME = 'airnz-cache-v1';
const urlsToCache = [
  './',
  './css/styles.css',
  './css/fonts.css',
  './js/app.js',
  './images/logo.svg',
  './images/ring.png',
  './images/tap.svg',
  './images/mic.svg',
  './images/curve.svg',
  './images/flights.png',
  './images/book.png',
  './images/airpoints.png',
  './images/more.png',
  './images/star-alliance.svg',
  './audio/voice_1.mp3',
  './audio/voice_2.mp3',
  './fonts/Inter_24pt-Light.ttf',
  './fonts/Inter_24pt-Regular.ttf',
  './fonts/Inter_24pt-Medium.ttf',
  './fonts/Inter_24pt-SemiBold.ttf',
  './fonts/Inter_24pt-Bold.ttf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if (!response || response.status !== 200) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
/* eslint-disable no-restricted-globals */
var CACHE_STATIC = 'static-v3';
var CACHE_DYNAMIC = 'dynamic-v2';

var cacheAssets = [
  '/',
  '/favicon.ico',
  '/static/css/main.5377f4e7.css',
  '/static/js/bundle.js',
  '/static/js/main.85091c84.js',
  'https://www.reddit.com/r/earthporn.json',
];

self.addEventListener('install', function(event) {
  console.log('[sw] install', event)
  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then(cache => {
        console.log('[sw] caching files')
        cache.addAll(cacheAssets)
      })
      // .then(() => self.skipWaiting())
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_DYNAMIC && key !== CACHE_STATIC) {
              console.log('[sw] removing old cache')
              return caches.delete(key)
            }
            return null
          })
        )
      })
  )



  return self.clients.claim()
});

self.addEventListener('fetch', function(event) {
  console.log('[sw] fetch', event)
  event.respondWith(
    caches.match(event.request).then(response => {
      if (!response) return fetch(event.request).then(res => {
        return caches
          .open(CACHE_DYNAMIC)
          .then(cache => {
            cache.put(event.request.url, res.clone())
            return res;
          })
      })
      return response
    })
  )
});



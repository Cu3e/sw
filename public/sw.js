var CACHE_NAME = 'sw-v3';
var cacheAssets = [
  '/',
  '/**/*.jpg',
  '/**/*.js'
];

self.addEventListener('install', function(event) {
  console.log('[sw] install', event)
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('[sw] caching files')
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
});

self.addEventListener('activate', function(event) {
  console.log('[sw] activate', event)
  
  event.waitUntil(
    caches
      .keys().then(CACHE_NAME => {
        return Promise.all(
          CACHE_NAME.map(cache => {
            if(cache !== CACHE_NAME){
              console.log('[sw] clearing old cache')
              return caches.delete(cache)
            }
          })
        )
      })
  )



  // return self.clients.claim()
});

self.addEventListener('fetch', function(event) {
  console.log('[sw] fetch', event)
  event.respondWith(fetch(event.request))
});



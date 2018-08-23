// var CACHE_NAME = 'cache-v1';
// var urlsToCache = [
//   '/',
//   '/index.css',
//   '/index.js'
// ];

self.addEventListener('install', function(event) {
  console.log('[sw] install', event)
});

self.addEventListener('activate', function(event) {
  console.log('[sw] activate', event)
  return self.clients.claim()
});



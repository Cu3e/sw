/* eslint-disable no-restricted-globals, no-undef */

importScripts('./idb.js')
importScripts('./utility.js')

const CACHE_STATIC = 'static-v6'
const CACHE_DYNAMIC = 'dynamic-v2'

const STATIC_FILES = [
  '/',
  '/favicon.ico',
  '/static/css/main.5377f4e7.css',
  '/static/js/bundle.js',
  '/static/js/main.85091c84.js',
  'https://fonts.googleapis.com/css?family=Roboto&amp;subset=latin-ext'
]

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event)
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      console.log('[Service Worker] Precaching App Shell')
      cache.addAll(STATIC_FILES)
    })
  )
})

self.addEventListener('sync', function(event) {
  console.log('[Service Worker]  Background Sync', event)
  event.waitUntil(fetchFromReddit())
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event)
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_DYNAMIC && key !== CACHE_STATIC) {
            console.log('[Service Worker] Removing old cache.', key)
            return caches.delete(key)
          }
          return null
        })
      )
    })
  )
  return self.clients.claim()
})

function isInArray(string, array) {
  let cachePath = undefined
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log('matched ', string)
    cachePath = string.substring(self.origin.length) // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1
}

self.addEventListener('fetch', function(event) {
  const url = 'https://www.reddit.com/r/earthporn.json'

  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      fetch(event.request).then(function(res) {
        const clonedRes = res.clone()
        clonedRes.json().then(data =>
          data.data.children.map(el =>
            writeData('idb-feed', {
              id: el.data.id,
              data: el.data
            })
          )
        )
        return res
      })
    )
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request))
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response
        } else {
          return fetch(event.request)
            .then(res => {
              // if (url !== res)
              return caches.open(CACHE_DYNAMIC).then(cache => {
                // trimCache(CACHE_DYNAMIC, 3);
                cache.put(event.request.url, res.clone())
                return res
              })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC).then(cache => {
                if (event.request.headers.get('accept').includes('text/html')) {
                  return cache.match('/offline.html')
                }
              })
            })
        }
      })
    )
  }
})

// function trimCache(cacheName, maxItems) {
//   caches.open(cacheName)
//     .then(function (cache) {
//       return cache.keys()
//         .then(function (keys) {
//           if (keys.length > maxItems) {
//             cache.delete(keys[0])
//               .then(trimCache(cacheName, maxItems));
//           }
//         });
//     })
// }

// Cache-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

function fetchFromReddit() {
  fetch('https://www.reddit.com/r/waterporn.json').then(function(res) {
    const clonedRes = res.clone()
    clonedRes.json().then(data =>
      data.data.children.map(el =>
        writeData('idb-feed', {
          id: el.data.id,
          data: el.data
        })
      )
    )
    return res
  })
}

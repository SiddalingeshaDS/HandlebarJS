var staticCacheName = 'wnm-static-v4';
var contentImgsCache = 'wnm-content-imgs';
var allCaches = [
  staticCacheName,
  contentImgsCache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        '/manifest.json',
        'js/main.js',
        'js/lib/jquery/jquery.min.js',
        'js/lib/bootstrap/bootstrap.min.js',
        'css/main.css',
        'css/lib/bootstrap/css/bootstrap.min.css',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wnm-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
    if (requestUrl.pathname.startsWith('/photos/')) {
      event.respondWith(servePhoto(event.request));
      return;
    }
    // TODO: respond to avatar urls by responding with
    // the return value of serveAvatar(event.request)
//    if (requestUrl.pathname.startsWith('/avatars/')) {
//      event.respondWith(serveAvatar(event.request));
//      return;
//    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

//function serveAvatar(request) {
//  // Avatar urls look like:
//  // avatars/sam-2x.jpg
//  // But storageUrl has the -2x.jpg bit missing.
//  // Use this url to store & match the image in the cache.
//  // This means you only store one copy of each avatar.
//  var storageUrl = request.url.replace(/-\dx\.jpg$/, '');
//   return caches.open(contentImgsCache).then(function(cache) {
//    return cache.match(storageUrl).then(function(response){
//      var returnObj = fetch(request).then(function(networkResponse) {
//            cache.put(storageUrl, networkResponse.clone());
//            return networkResponse;
//        });
//        console.log(response,returnObj);
//       return response || returnObj;
//    });
// });
//}

function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpeg$/, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;
      
      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
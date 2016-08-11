var currentVersion = 'v1';

this.addEventListener('install', function install(event) {
  console.log('sw:install');

  event.waitUntil(function() {
    // open a new cache
    caches.open(currentVersion)
      .then(function(cache) {
        return cache
        // return cache.addAll([
        //   '/sw-test/',
        // ]);
      });

    // add static content to the cache
  });
});

this.onmessage = function onmessage(event) {
  console.log('sw:got message', event.data);
};

this.addEventListener('activate', function(event) {
  console.log('sw:activate');

  var cacheWhitelist = [currentVersion];

  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(
          keyList.map(function(key) {
            if (cacheWhitelist.indexOf(key) === -1) {
              return caches.delete(key);
            }
            return true;
          })
        )
      })
  );
});

// this.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(resp)  {
//         if (resp) {
//           console.log('fetch matched cache', resp);
//         }
//         return resp || fetch(event.request)
//           .then(function(response) {
//             return caches.open(currentVersion)
//               .then(function(cache) {
//                 cache.put(event.request, response.clone());

//                 return response;
//               })
//           })
//       })
//   );
// });
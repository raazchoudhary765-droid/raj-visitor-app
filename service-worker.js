const CACHE_NAME = "raj-visitor-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./style.css",
  "./app.js",
  "./dashboard.js"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        return response ||
        fetch(event.request);

      })

  );

});

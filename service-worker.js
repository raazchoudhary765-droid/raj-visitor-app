const CACHE_NAME = "raj-visitor-v5";
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

  const url = new URL(event.request.url);

  // Never cache Google Apps Script requests
  if (
    url.hostname.includes("script.google.com") ||
    url.hostname.includes("googleusercontent.com")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );

});

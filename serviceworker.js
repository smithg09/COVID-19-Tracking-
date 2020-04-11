const staticName = 'site-data';
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/scripts/app.js",
  "/scripts/main_card.js",
  "/scripts/shards-dashboards.1.1.0.min.js",
  "/scripts/app/app-components-overview.1.1.0.js",
  "/scripts/app/app-components-overview.1.1.0.min.js",
  "/styles/news.css",
  "/styles/styles.css",
  "/styles/shards-dashboards.1.1.0.css",
  "/images/icons8-info-64.png",
  "/images/download.jpg",
    "/images/corona.png",
  "images/icon-512.png",
  "https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900",
  "https://use.fontawesome.com/releases/v5.0.6/css/all.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=8900a00a70244f89abeeef6d0065b7b2",
  "https://api.covid19india.org/data.json",
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
];
// Install service worker
self.addEventListener('install', evt => {
    console.log("installed")
    evt.waitUntil(
        caches.open(staticName).then(cache => {
            cache.addAll(assets);
        })
    );
})

// Activate
self.addEventListener('activate', evt => {
    // console.log("SW Active")
})

// Event 
self.addEventListener('fetch', evt => {
    // console.log("fetch events",evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
})
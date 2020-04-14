const staticName = 'site-data-v2';
const dynamicCache = 'site-dynamic-v3';
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/scripts/app.js",
  "/scripts/install.js",
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
  "/fallback.html",
  "https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900",
  "https://use.fontawesome.com/releases/v5.0.6/css/all.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=8900a00a70244f89abeeef6d0065b7b2",
  "https://api.covid19india.org/data.json",
  "https://code.jquery.com/jquery-3.3.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
];

// Cache size 
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}
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
    console.log("SW Active")
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(key)
            return Promise.all(
              keys.map((key) => {
                if (key !== staticName) {
                  return caches.delete(key);
                }
              })
            );
        })
    );
});

// Event 
self.addEventListener('fetch', evt => {
    // console.log("fetch events",evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCache , 20)
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/fallback.html');
            }
        })
    );
})
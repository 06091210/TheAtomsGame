const CACHE_NAME = "atom-game-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./script.js",
  "./style.css",
  "./Icon.jpg",
  "./manifest.json",
];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// リクエスト時にキャッシュを返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // ネットワークから取得できたらキャッシュを更新
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // オフラインならキャッシュを使う
        return caches.match(event.request);
      })
  );
});


// 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

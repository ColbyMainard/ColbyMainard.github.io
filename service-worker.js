/**
 * Service worker — precaches the core static assets on install and
 * serves navigations/same-origin GETs from cache with a network
 * fallback. Supports offline browsing and speeds up repeat visits.
 */

const CACHE_VERSION = "v23";
const CACHE_NAME = "colbymainard-" + CACHE_VERSION;

const PRECACHE_URLS = [
    "./",
    "./index.html",
    "./llms.txt",
    "./manifest.json",
    "./assets/html/hobbies.html",
    "./assets/html/tech_takes.html",
    "./assets/html/tech_resources.html",
    "./assets/html/guides.html",
    "./assets/html/privacy.html",
    "./assets/css/default.css",
    "./assets/js/back_to_top.js",
    "./assets/js/cookie_consent.js",
    "./assets/js/current_time.js",
    "./assets/js/guides_animations.js",
    "./assets/js/hobbies_animations.js",
    "./assets/js/index_animations.js",
    "./assets/js/navbar.js",
    "./assets/js/service_worker_register.js",
    "./assets/js/tech_resources_animations.js",
    "./assets/js/tech_takes_animations.js",
    "./assets/js/tech_takes_engagement.js",
    "./assets/images/favicon.png",
    "./assets/images/miscellaneous/DEFCON33.jpeg",
    "./assets/images/photographyHobby/DSC_0004.JPG",
    "./assets/images/photographyHobby/DSC_0023.JPG",
    "./assets/images/photographyHobby/DSC_0110.JPG",
    "./assets/images/photographyHobby/DSC_0237.JPG",
    "./assets/images/photographyHobby/DSC_0396.JPG"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return Promise.all(
                PRECACHE_URLS.map(function (url) {
                    return cache.add(url).catch(function () { /* tolerate missing assets */ });
                })
            );
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(
                names.map(function (name) {
                    if (name !== CACHE_NAME && name.indexOf("colbymainard-") === 0) {
                        return caches.delete(name);
                    }
                    return null;
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch", function (event) {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).then(function (response) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(request, clone);
                });
                return response;
            }).catch(function () {
                return caches.match(request).then(function (cached) {
                    return cached || caches.match("./index.html");
                });
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(function (cached) {
            if (cached) return cached;
            return fetch(request).then(function (response) {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                const clone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(request, clone);
                });
                return response;
            }).catch(function () {
                return cached;
            });
        })
    );
});

const CACHE_VERSION = "v90";
const CACHE_NAME = "colbymainard-" + CACHE_VERSION;

let cacheWriteWarned = false;

function warnCacheWrite(url, err) {
    if (cacheWriteWarned) return;
    cacheWriteWarned = true;
    console.warn("[service-worker] cache write failed:", url, err);
}

const PRECACHE_URLS = [
    "./",
    "./index.html",
    "./404.html",
    "./llms.txt",
    "./feed.xml",
    "./manifest.json",
    "./assets/html/hobbies.html",
    "./assets/html/tech_takes.html",
    "./assets/html/tech_resources.html",
    "./assets/html/guides.html",
    "./assets/html/privacy.html",
    "./assets/css/guides.css",
    "./assets/css/hobbies.css",
    "./assets/css/index.css",
    "./assets/css/page_not_found.css",
    "./assets/css/privacy_policy.css",
    "./assets/css/tech_resources.css",
    "./assets/css/tech_takes.css",
    "./assets/js/404_animations.js",
    "./assets/js/animation_helpers.js",
    "./assets/js/back_to_top.js",
    "./assets/js/cookie_consent.js",
    "./assets/js/easter_egg.js",
    "./assets/js/guides_animations.js",
    "./assets/js/hobbies_animations.js",
    "./assets/js/index_animations.js",
    "./assets/js/navbar.js",
    "./assets/js/path_helpers.js",
    "./assets/js/photo_gallery.js",
    "./assets/js/reading_engagement.js",
    "./assets/js/section_permalinks.js",
    "./assets/js/service_worker_register.js",
    "./assets/js/tech_resources_animations.js",
    "./assets/js/tech_takes_animations.js",
    "./assets/js/vendor/anime.umd.min.js",
    "./assets/images/favicon.png",
    "./assets/images/sharecard.png",
    // Deliberately absent: the assets/images/photographyHobby/ originals,
    // assets/images/miscellaneous/DEFCON33.jpeg, and assets/pdf/InvisibleDataSlides.pdf.
    // Together they are tens of megabytes that every first visit to any page
    // would pull in the background. The fetch handler below still caches each
    // one the first time it is actually requested.
    "./assets/other/pgp_email_key.asc"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return Promise.all(
                PRECACHE_URLS.map(function (url) {
                    // cache: "reload" skips the HTTP cache. GitHub Pages sends
                    // max-age=600, so a plain add() could store a pre-deploy
                    // copy under the new CACHE_VERSION and serve it cache-first
                    // until the next bump.
                    return cache.add(new Request(url, { cache: "reload" })).catch(function (err) {
                        // Tolerate a missing/renamed asset, but log failures
                        console.warn("[service-worker] precache skipped:", url, err);
                    });
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
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        return cache.put(request, clone);
                    }).catch(function (err) {
                        warnCacheWrite(request.url, err);
                    });
                }
                return response;
            }).catch(function () {
                return caches.match(request).then(function (cached) {
                    if (cached) return cached;
                    return caches.match("./404.html").then(function (notFound) {
                        return notFound || caches.match("./index.html");
                    }).then(function (fallback) {
                        return fallback || Response.error();
                    });
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
                    return cache.put(request, clone);
                }).catch(function (err) {
                    warnCacheWrite(request.url, err);
                });
                return response;
            }).catch(function () {
                // respondWith() must resolve to a Response. Resolving to
                // undefined is itself a network error, but an unexplained one
                // logged against the worker; Response.error() says so plainly.
                return Response.error();
            });
        })
    );
});

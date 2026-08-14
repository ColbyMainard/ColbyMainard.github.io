/**
 * Service worker — precaches the core static assets on install and
 * serves navigations/same-origin GETs from cache with a network
 * fallback. Supports offline browsing and speeds up repeat visits.
 */

const CACHE_VERSION = "v61";
const CACHE_NAME = "colbymainard-" + CACHE_VERSION;

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
    "./assets/css/default.css",
    "./assets/js/404_animations.js",
    "./assets/js/animation_helpers.js",
    "./assets/js/back_to_top.js",
    "./assets/js/cookie_consent.js",
    "./assets/js/easter_egg.js",
    "./assets/js/guides_animations.js",
    "./assets/js/hobbies_animations.js",
    "./assets/js/index_animations.js",
    "./assets/js/navbar.js",
    "./assets/js/photo_gallery.js",
    "./assets/js/reading_engagement.js",
    "./assets/js/service_worker_register.js",
    "./assets/js/tech_resources_animations.js",
    "./assets/js/tech_takes_animations.js",
    "./assets/images/favicon.png",
    "./assets/images/sharecard.png",
    "./assets/other/pgp_email_key.asc"
];

// Deliberately NOT precached: the five full-resolution photographs in
// assets/images/photographyHobby/ (3.5-5.0 MB each) and the 2.1 MB
// assets/images/miscellaneous/DEFCON33.jpeg. Together they were about 22 MB
// fetched in the background on a visitor's first load of ANY page, including
// people who never open hobbies.html. The fetch handler below still caches
// each one the first time it is actually requested, so offline support for a
// page the visitor has already viewed is unchanged. Do not re-add them here
// without shrinking them first.

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return Promise.all(
                PRECACHE_URLS.map(function (url) {
                    return cache.add(url).catch(function (err) {
                        // Tolerate a missing/renamed asset so one bad path can't
                        // fail the whole install, but surface it anyway. A silent
                        // catch makes a typo'd PRECACHE_URLS entry (e.g. after a
                        // rename that skips the AGENTS.md checklist) permanently
                        // invisible, even in local dev over http://localhost.
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
                // GitHub Pages answers missing URLs with the 404.html body and
                // status 404; only cache successful navigations so mistyped
                // URLs don't permanently store junk copies of the error page.
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        return cache.put(request, clone);
                    }).catch(function () { /* cache write failed; the network response is still served */ });
                }
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
                    return cache.put(request, clone);
                }).catch(function () { /* cache write failed; the network response is still served */ });
                return response;
            }).catch(function () {
                // Sub-resource fetch failed with no cache hit: let the browser
                // handle it natively (native error) rather than returning
                // index.html — handing HTML to a request that expected CSS/JS.
                // The index.html fallback is reserved for navigations (above).
                return undefined;
            });
        })
    );
});

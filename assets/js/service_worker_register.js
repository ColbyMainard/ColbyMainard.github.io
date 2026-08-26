/**
 * Registers the site's service worker so cached assets load offline
 * and the browser can offer a PWA install prompt. Silent when the
 * browser does not support service workers.
 *
 * Also injects the web app manifest link dynamically — browsers block
 * manifest fetches from file:// origins via CORS, so we only add the
 * link tag when the page is served over http(s).
 *
 * Page depth comes from path_helpers.js, shared with cookie_consent.js, so the
 * two cannot disagree about how far the current page sits from the site root.
 */

(function () {
    "use strict";

    var protocol = window.location.protocol;
    var isHttp = protocol === "http:" || protocol === "https:";

    // Without the shared helper there is no prefix to build the manifest or
    // worker URL from, and registering a worker at the wrong scope is worse
    // than registering none, so bail rather than guess.
    if (!window.PathHelpers) return;
    var rootPrefix = window.PathHelpers.rootPrefix();

    if (isHttp && !document.querySelector('link[rel="manifest"]')) {
        var link = document.createElement("link");
        link.rel = "manifest";
        link.href = rootPrefix + "manifest.json";
        document.head.appendChild(link);
    }

    if (!("serviceWorker" in navigator)) return;
    if (!isHttp) return;

    window.addEventListener("load", function () {
        navigator.serviceWorker.register(rootPrefix + "service-worker.js").catch(function (err) {
            // Registration can legitimately fail on non-root hosts or under a
            // restrictive CSP; warn instead of failing silently so a genuine
            // regression stays visible in the console during development.
            console.warn("[service-worker] registration failed:", err);
        });
    });
})();

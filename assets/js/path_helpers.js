/**
 * path_helpers.js
 *
 * The one place that knows how deep the current page sits in the repository.
 * Exposes window.PathHelpers = { isNested, rootPrefix, toRoot }.
 *
 * cookie_consent.js and service_worker_register.js both need to build a URL
 * relative to the site root: the first for the privacy-policy link inside the
 * consent banner, the second for manifest.json and service-worker.js. Each used
 * to test for the "/assets/html/" magic string itself and derive its own prefix
 * from the result, so moving a page or renaming assets/html/ meant two hand
 * edits in lockstep, and missing one silently broke either the banner link or
 * the manifest and service-worker registration.
 *
 * Everything returned here is a RELATIVE path on purpose. These paths have to
 * resolve from a file:// origin as well as https://, and a leading-slash
 * absolute path resolves to the filesystem root when the site is opened as
 * plain files.
 *
 * Classic (non-module) deferred script — must load BEFORE its consumers so the
 * global exists when they run. Deferred classic scripts execute in document
 * order, so listing this above cookie_consent.js in each <head> is the whole
 * contract. 404.html deliberately loads neither consumer, so it does not load
 * this file either.
 */

(function () {
    "use strict";

    // The site layout, written down once. Pages live either at the repository
    // root (index.html, 404.html) or two levels down in assets/html/. There is
    // no third case today; adding one means changing these three constants,
    // not any consumer.
    var NESTED_DIR = "/assets/html/";
    var NESTED_PREFIX = "../../";
    var ROOT_PREFIX = "./";

    /** True when the current document is served from assets/html/. */
    function isNested() {
        return (window.location.pathname || "").indexOf(NESTED_DIR) !== -1;
    }

    /** Relative prefix that walks from the current page back to the site root. */
    function rootPrefix() {
        return isNested() ? NESTED_PREFIX : ROOT_PREFIX;
    }

    /**
     * Resolve a root-relative path (e.g. "manifest.json",
     * "assets/html/privacy.html") against the current page's depth. A leading
     * "./" or "/" on the argument is tolerated and stripped so callers can pass
     * whichever form reads best at the call site.
     */
    function toRoot(path) {
        return rootPrefix() + String(path).replace(/^\.?\//, "");
    }

    window.PathHelpers = {
        isNested: isNested,
        rootPrefix: rootPrefix,
        toRoot: toRoot
    };
})();

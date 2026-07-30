/**
 * reading_engagement.js
 *
 * Two engagement features for the long-form pages (tech_takes.html and
 * guides.html):
 *   1. Per-section reading-time estimates: for each
 *      <span data-reading-time> placeholder, walks up to the nearest
 *      <section>, counts words, and renders "X min read" at 200 wpm.
 *   2. Reading progress bar fixed to the top of the viewport that fills
 *      left-to-right as the user scrolls down. Uses a passive scroll
 *      listener and rAF coalescing to stay cheap.
 *
 * Nothing here is page-specific: both features key off markup
 * ([data-reading-time] and the nearest <section>) rather than page
 * identity, which is why the file is named for the behaviour rather than
 * for the page that first used it.
 *
 * Pure DOM, no external dependency.
 */

(function () {
    "use strict";

    var WORDS_PER_MINUTE = 200;

    /* Separator lives here rather than in the markup so it only appears once a
       reading time has actually been rendered. Without it, a page loaded with
       JavaScript disabled shows a dangling "Last Updated: <date> &middot;".
       Escaped rather than literal so the file cannot be mis-decoded from
       file:// origins, where the script inherits the document's encoding. */
    var SEPARATOR = "\u00B7 ";

    function getWordCount(element) {
        if (!element) return 0;
        var clone = element.cloneNode(true);
        var excluded = clone.querySelectorAll(".relatedStances, .readingTime");
        Array.prototype.forEach.call(excluded, function (node) {
            if (node.parentNode) node.parentNode.removeChild(node);
        });
        var text = clone.textContent || clone.innerText || "";
        var words = text.trim().split(/\s+/).filter(function (w) {
            return w.length > 0;
        });
        return words.length;
    }

    function formatReadingTime(words) {
        var minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
        return minutes + " min read";
    }

    function populateReadingTimes() {
        var spans = document.querySelectorAll("[data-reading-time]");
        Array.prototype.forEach.call(spans, function (span) {
            var section = span.closest("section");
            if (!section) return;
            span.textContent = SEPARATOR + formatReadingTime(getWordCount(section));
        });
    }

    /* ------------------- Reading progress bar ------------------- */

    var progressBar;
    var progressFill;
    var rafQueued = false;

    function createProgressBar() {
        var bar = document.createElement("div");
        bar.id = "reading-progress";
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-label", "Reading progress");
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");
        bar.setAttribute("aria-valuenow", "0");

        var fill = document.createElement("div");
        fill.className = "reading-progress-fill";
        bar.appendChild(fill);

        document.body.insertBefore(bar, document.body.firstChild);
        return { bar: bar, fill: fill };
    }

    function computeProgress() {
        var doc = document.documentElement;
        var scrollTop = window.pageYOffset || doc.scrollTop || 0;
        var max = (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        if (max <= 0) return 0;
        var pct = (scrollTop / max) * 100;
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        return pct;
    }

    function updateProgress() {
        rafQueued = false;
        if (!progressFill || !progressBar) return;
        var pct = computeProgress();
        progressFill.style.width = pct + "%";
        progressBar.setAttribute("aria-valuenow", Math.round(pct).toString());
    }

    function onScrollOrResize() {
        if (rafQueued) return;
        rafQueued = true;
        window.requestAnimationFrame(updateProgress);
    }

    function initProgressBar() {
        var parts = createProgressBar();
        progressBar = parts.bar;
        progressFill = parts.fill;
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });
        updateProgress();
    }

    function init() {
        populateReadingTimes();
        initProgressBar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

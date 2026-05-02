/**
 * tech_takes_engagement.js
 *
 * Populates per-section reading-time estimates on tech_takes.html. For each
 * <span data-reading-time> placeholder, walks up to the nearest <section>,
 * counts words in that section's text content, and renders an "X min read"
 * value at 200 wpm. Pure word-count / WPM, no external dependency.
 */

(function () {
    "use strict";

    var WORDS_PER_MINUTE = 200;

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
            span.textContent = formatReadingTime(getWordCount(section));
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", populateReadingTimes);
    } else {
        populateReadingTimes();
    }
})();

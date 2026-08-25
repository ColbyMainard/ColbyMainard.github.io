/**
 * navbar.js
 *
 * Responsive nav toggle, plus current-position tracking for the section nav.
 *
 * The primary nav's current-page state is NOT set here. Each page hard-codes
 * class="active" aria-current="page" on its own #primaryNav entry, so the
 * indicator survives with scripting off and is present at first paint rather
 * than after a deferred script runs. This file used to derive it at runtime by
 * comparing window.location.pathname against each href; that block was removed
 * once the markup became authoritative, since running it would only have
 * re-applied what is already in the HTML.
 *
 * The section nav is different: which section you are currently reading is not
 * knowable from markup, so #sectionNav's aria-current="location" is tracked
 * here with an IntersectionObserver.
 */

(function () {
    "use strict";

    /**
     * Pair each #sectionNav link with the element it points at, in document
     * order. Anything whose target is missing is dropped rather than tracked,
     * so a renamed id fails quietly instead of throwing on every scroll.
     */
    function collectTrackedSections(nav) {
        // Only same-page anchors; a section nav that ever gains an outbound
        // link should not have that link claiming to be a location.
        var links = nav.querySelectorAll('a[href^="#"]');
        var tracked = [];

        Array.prototype.forEach.call(links, function (link) {
            var id = link.getAttribute("href").slice(1);
            if (!id) return;
            var target = document.getElementById(id);
            if (target) {
                tracked.push({ link: link, target: target, visible: false });
            }
        });

        return tracked;
    }

    /**
     * Owns which tracked entry carries aria-current="location", and returns the
     * update function that re-picks it. aria-current="location" is the right
     * token here: "page" already means "this is the page you are on" in the
     * primary nav, and the section nav is answering a narrower question about
     * position within that page.
     */
    function createCurrentMarker(tracked) {
        var current = null;

        function setCurrent(entry) {
            if (entry === current) return;
            if (current) current.link.removeAttribute("aria-current");
            entry.link.setAttribute("aria-current", "location");
            current = entry;
        }

        return function update() {
            // First in document order wins, so scrolling down moves the marker
            // forward one section at a time rather than jumping to whichever
            // observer callback happened to fire last.
            for (var i = 0; i < tracked.length; i++) {
                if (tracked[i].visible) {
                    setCurrent(tracked[i]);
                    return;
                }
            }
            // Nothing in the band right now (mid-scroll between two sections,
            // or a long section whose edges are both outside it). Leave the
            // previous entry marked: a nav that blanks out intermittently while
            // scrolling is worse than one that lags slightly.
        };
    }

    /** Watch every tracked section, refreshing the marker whenever one moves. */
    function observeTrackedSections(tracked, update) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                for (var i = 0; i < tracked.length; i++) {
                    if (tracked[i].target === entry.target) {
                        tracked[i].visible = entry.isIntersecting;
                        break;
                    }
                }
            });
            update();
        }, {
            // Narrow the observed area to a band across the upper third of the
            // viewport, below the sticky header. Without this, every section
            // taller than the viewport counts as "intersecting" for most of its
            // length and the first one would stay marked the whole way down.
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        });

        tracked.forEach(function (entry) {
            observer.observe(entry.target);
        });
    }

    /**
     * Mark the #sectionNav entry for whichever section is currently being read.
     *
     * Progressive enhancement, like everything else on this site: without
     * IntersectionObserver the nav is a plain list of working anchors, which is
     * what it was before this ran.
     */
    function trackSectionInView() {
        if (typeof IntersectionObserver === "undefined") return;

        var nav = document.getElementById("sectionNav");
        if (!nav) return;

        var tracked = collectTrackedSections(nav);
        if (!tracked.length) return;

        observeTrackedSections(tracked, createCurrentMarker(tracked));
    }

    document.addEventListener('DOMContentLoaded', function () {
        var toggleBtn = document.querySelector('.nav-toggle');
        var pageNav = document.querySelector('.pageMenu nav');
        var siteNav = document.querySelector('.siteMenu nav');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                var isOpen = toggleBtn.classList.toggle('active');
                if (pageNav) pageNav.classList.toggle('open');
                if (siteNav) siteNav.classList.toggle('open');
                toggleBtn.setAttribute('aria-expanded', String(isOpen));
            });

            // Collapse the open menu and return focus to the toggle.
            var closeNav = function () {
                toggleBtn.classList.remove('active');
                if (pageNav) pageNav.classList.remove('open');
                if (siteNav) siteNav.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            };

            // Escape closes the open mobile menu. Guarded on the open state so it is
            // a no-op on desktop, where the menu is never toggled. (The collapsed nav
            // is display:none, so there is no keyboard trap to escape otherwise.)
            document.addEventListener('keydown', function (event) {
                if ((event.key === 'Escape' || event.key === 'Esc') &&
                    toggleBtn.classList.contains('active')) {
                    closeNav();
                    toggleBtn.focus();
                }
            });
        }

        trackSectionInView();
    });
})();

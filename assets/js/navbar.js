/**
 * navbar.js
 *
 * Responsive nav toggle, plus current-position tracking for the section nav.
 * Also publishes the header's height for the scroll-padding-top rule in
 * default.scss (see trackHeaderHeight).
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

    /**
     * Publish the closed header's height as --header-height. scroll-padding-top
     * in default.scss reads it, so anchor jumps and focus scrolling land below
     * the sticky header instead of under it. The height depends on how the
     * section menu wraps at the current width, so it is measured rather than
     * guessed; without ResizeObserver the CSS falls back to fixed estimates.
     *
     * Measurements taken while the collapsed menu is open are skipped. The open
     * menu is far taller, and a link tapped in it closes the menu before the
     * page jumps, so the jump must use the closed height.
     */
    function trackHeaderHeight(header, isMenuOpen) {
        if (typeof ResizeObserver === "undefined") return;

        new ResizeObserver(function () {
            if (isMenuOpen()) return;
            document.documentElement.style.setProperty(
                "--header-height", header.offsetHeight + "px");
        }).observe(header);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var toggleBtn = document.querySelector('.nav-toggle');
        var pageNav = document.querySelector('.pageMenu nav');
        var siteNav = document.querySelector('.siteMenu nav');
        var header = document.querySelector('header');

        // Open means toggled AND collapsed. The toggle is display:none above the
        // collapse breakpoint, where both navs always show, so a menu left
        // toggled before a resize to that width no longer counts as open.
        function isMenuOpen() {
            return !!toggleBtn && toggleBtn.classList.contains('active') &&
                window.getComputedStyle(toggleBtn).display !== 'none';
        }

        // Collapse the open menu. Callers decide where focus goes: Escape
        // returns it to the toggle, while a followed link leaves it alone so
        // the browser can move it to the link's target.
        function closeNav() {
            if (!toggleBtn) return;
            toggleBtn.classList.remove('active');
            if (pageNav) pageNav.classList.remove('open');
            if (siteNav) siteNav.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                var isOpen = toggleBtn.classList.toggle('active');
                if (pageNav) pageNav.classList.toggle('open');
                if (siteNav) siteNav.classList.toggle('open');
                toggleBtn.setAttribute('aria-expanded', String(isOpen));
            });

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

            // Following any menu link closes the menu. Without this a section
            // link jumps the page but leaves the open menu pinned over the
            // content it just scrolled to. Same open-state guard as Escape.
            var menuLinks = document.querySelectorAll('#primaryNav a, #sectionNav a');
            Array.prototype.forEach.call(menuLinks, function (link) {
                link.addEventListener('click', function () {
                    if (toggleBtn.classList.contains('active')) closeNav();
                });
            });
        }

        if (header) trackHeaderHeight(header, isMenuOpen);

        trackSectionInView();
    });
})();

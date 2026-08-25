/**
 * animation_helpers.js
 *
 * Shared helpers for the per-page *_animations.js entrance animations.
 * Exposes window.AnimationHelpers = { directChildren, addStep, introTimeline,
 * animateIntro, animateContact, prefersReducedMotion, run }
 * so the six animation scripts don't each re-declare identical copies. `run`
 * owns the boilerplate they used to duplicate outright: the reduced-motion
 * bail-out, waiting for AnimeJS, the .js-animations toggle, and the
 * single-shot IntersectionObserver that fires each section's animation on
 * first entry, leaving each page script to declare only its section map and
 * its per-section animation functions.
 *
 * Classic (non-module) deferred script — must load BEFORE each page's
 * *_animations.js so the global is ready when that script runs.
 *
 * On waiting for AnimeJS: each page loads it as `<script type="module" async>`
 * that assigns window.anime after importing from cdn.jsdelivr.net. That module
 * is async on purpose (see the comment in each page head), which means it is
 * racing the deferred classic scripts rather than ordered against them, and the
 * network fetch it depends on is around one second cold. `run` used to test
 * `typeof anime === "undefined"` once and return, so on any load where the
 * fetch had not already finished it bailed permanently and no animation ever
 * played. It now waits for the global to appear, bounded by ANIME_WAIT_MS, and
 * reveals the gated content if it never does. Read window.anime at call time,
 * never at load time; animateContact and back_to_top.js already do.
 */

(function () {
    "use strict";

    /**
     * Reduced-motion check, evaluated per call rather than cached at load so
     * a mid-session OS toggle is honored (back_to_top.js does the same).
     * Every *_animations.js caller already bails out at the top of its script
     * before creating timelines; the checks inside addStep and animateContact
     * make that invariant self-enforcing for any future caller that forgets
     * its own guard. (Content a skipped animation would have revealed is
     * re-shown by each page's reduced-motion safety-net CSS.)
     */
    function prefersReducedMotion() {
        return !!(window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }

    /**
     * Helper: select only direct children matching a selector.
     * Prevents animating deeply nested elements in large sections.
     */
    function directChildren(el, selector) {
        return Array.prototype.filter.call(
            el.children,
            function (child) { return child.matches(selector); }
        );
    }

    /**
     * Helper: add a timeline step only when the target list is non-empty.
     * AnimeJS warns "No target found" if given an empty array or null,
     * so guard every .add() call through this wrapper.
     */
    function addStep(tl, targets, params, position) {
        if (prefersReducedMotion()) return tl;
        var hasTargets = targets && (targets.length === undefined ? true : targets.length > 0);
        if (!hasTargets) return tl;
        if (position !== undefined) {
            return tl.add(targets, params, position);
        }
        return tl.add(targets, params);
    }

    /**
     * Intro — the h1 drop that every intro section opens with. Returns the
     * timeline rather than running to completion, so a page that continues
     * with something of its own (index's subtitle h2, hobbies' photograph)
     * extends this instead of rebuilding the step it shares.
     */
    function introTimeline(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        });

        return tl;
    }

    /**
     * Intro — h1 drop followed by staggered paragraphs. guides, tech_takes,
     * and tech_resources each declared this verbatim, so it lives here for the
     * same reason animateContact does. 404_animations.js keeps its own intro:
     * the error code animates before the heading and on different timings.
     */
    function animateIntro(el) {
        if (prefersReducedMotion()) return;
        var tl = introTimeline(el);

        addStep(tl, el.querySelectorAll("p"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, ">-400");
    }

    /**
     * Contact/Footer — simple fade in. Identical on every page, so it lives
     * here rather than being re-declared in each *_animations.js.
     */
    function animateContact(el) {
        if (prefersReducedMotion()) return;
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, el.querySelectorAll("h2, p, a"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        });
    }

    // How long to wait for the async CDN module to define window.anime before
    // giving up, and how often to look. The AnimeJS bundle is ~110 KB and a
    // cold fetch measured about one second including DNS and TLS, so three
    // seconds is generous headroom on a slow link while still bounding how long
    // gated content can stay hidden when the CDN is simply unreachable. The
    // 50 ms poll is below the threshold where a late start reads as a stutter.
    var ANIME_WAIT_MS = 3000;
    var ANIME_POLL_MS = 50;

    /**
     * True only when the browser is certain there is no network. `onLine === false`
     * is reliable in the negative direction; `true` merely means an interface is
     * up, which is why this asks the narrow question rather than the broad one.
     */
    function isDefinitelyOffline() {
        return !!(window.navigator && window.navigator.onLine === false);
    }

    /** Undo the gate, leaving content in its natural, fully-visible state. */
    function revealGatedContent() {
        document.documentElement.classList.remove("js-animations");
    }

    /**
     * Wait for the async module to publish window.anime, then hand off. Calls
     * onReady synchronously when the global is already there, so the fast path
     * (warm CDN cache) behaves exactly as it did before. Calls onGiveUp once if
     * ANIME_WAIT_MS elapses without it, which is the caller's cue to un-hide.
     */
    function whenAnimeReady(onReady, onGiveUp) {
        if (typeof window.anime !== "undefined") {
            onReady();
            return;
        }

        var deadline = Date.now() + ANIME_WAIT_MS;
        var timer = window.setInterval(function () {
            if (typeof window.anime !== "undefined") {
                window.clearInterval(timer);
                onReady();
            } else if (Date.now() >= deadline) {
                window.clearInterval(timer);
                onGiveUp();
            }
        }, ANIME_POLL_MS);
    }

    /** Run fn once the DOM is parsed, or immediately if it already is. */
    function onDocumentReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    /**
     * Single-shot observer: the first time a section enters the viewport its
     * animation runs, and the section is unobserved so it never replays.
     */
    function createSectionObserver(animationMap) {
        var animated = {};

        return new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var el = entry.target;
                var key = el.getAttribute("data-animate");
                if (!key || animated[key]) return;

                animated[key] = true;
                observer.unobserve(el);

                if (animationMap[key]) {
                    animationMap[key](el);
                }
            });
        }, {
            threshold: 0.02,
            // Trigger ~50px before a section reaches the viewport's bottom
            // edge, matching timing across every animated page.
            rootMargin: "0px 0px -50px 0px"
        });
    }

    /**
     * Tag each mapped section with its key and observe it. A selector that
     * matches nothing is skipped rather than throwing, so a renamed id costs
     * one animation instead of the whole page's.
     */
    function observeSections(observer, sections) {
        Object.keys(sections).forEach(function (key) {
            var el = document.querySelector(sections[key]);
            if (el) {
                el.setAttribute("data-animate", key);
                observer.observe(el);
            }
        });
    }

    /**
     * Orchestrate a page's scroll-triggered entrance animations. Each
     * *_animations.js builds a { key: "#selector" } section map plus a matching
     * { key: fn(el) } animation map and hands both here, which owns the wiring
     * every page used to copy verbatim.
     *
     * The .js-animations class is what makes the opacity-hiding CSS apply, so
     * every path that ends without animations must leave it off (or take it
     * back off) or content would be stranded at opacity: 0. There are three
     * such paths: reduced motion, known-offline, and the wait timing out.
     * The complementary !window.AnimationHelpers guard lives in each page
     * script, since it can't call run() if this file didn't load at all.
     */
    function run(sections, animationMap) {
        if (prefersReducedMotion()) return;

        // The CDN module is cross-origin, and service-worker.js returns early
        // for cross-origin requests, so it is never cached and will never
        // arrive while offline. Bail before gating anything rather than hiding
        // the page for the full timeout to reach the same conclusion.
        if (typeof window.anime === "undefined" && isDefinitelyOffline()) return;

        // Mark the document so CSS hides elements only when JS will animate
        // them. Done up front rather than after the wait: first paint happens
        // well before a cold CDN fetch resolves, so gating late would show the
        // content, snap it to invisible, and only then animate it in.
        document.documentElement.classList.add("js-animations");

        whenAnimeReady(function () {
            onDocumentReady(function () {
                observeSections(createSectionObserver(animationMap), sections);
            });
        }, revealGatedContent);
    }

    window.AnimationHelpers = {
        directChildren: directChildren,
        addStep: addStep,
        introTimeline: introTimeline,
        animateIntro: animateIntro,
        animateContact: animateContact,
        prefersReducedMotion: prefersReducedMotion,
        run: run
    };
})();

/**
 * animation_helpers.js
 *
 * Shared helpers for the per-page *_animations.js entrance animations.
 * Exposes window.AnimationHelpers = { directChildren, addStep, introTimeline,
 * animateIntro, animateContact, prefersReducedMotion, run }
 * so the six animation scripts don't each re-declare identical copies. `run`
 * owns the boilerplate they used to duplicate outright: the reduced-motion
 * bail-out, the anime-availability guard, the .js-animations toggle, and the
 * single-shot IntersectionObserver that fires each section's animation on
 * first entry — leaving each page script to declare only its section map and
 * its per-section animation functions.
 *
 * Classic (non-module) deferred script — must load BEFORE each page's
 * *_animations.js so the global is ready when that script runs. animateContact
 * reads the global `anime` lazily (only when invoked on scroll), so this file
 * does not require anime to be present at its own load time.
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

    /**
     * Orchestrate a page's scroll-triggered entrance animations. Each
     * *_animations.js builds a { key: "#selector" } section map plus a matching
     * { key: fn(el) } animation map and hands both here — this owns the wiring
     * every page used to copy verbatim.
     *
     * NOT adding the .js-animations class is the graceful-degradation path: the
     * opacity-hiding CSS keys on that class, so when we bail (reduced motion, or
     * anime failed to load) content is left in its natural, fully-visible state.
     * The complementary !window.AnimationHelpers guard lives in each page
     * script, since it can't call run() if this file didn't load at all.
     */
    function run(sections, animationMap) {
        if (prefersReducedMotion()) return;
        if (typeof anime === "undefined") return;

        // Mark the document so CSS hides elements only when JS will animate them.
        document.documentElement.classList.add("js-animations");

        var animated = {};

        function onIntersect(entries, observer) {
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
        }

        function init() {
            var observer = new IntersectionObserver(onIntersect, {
                threshold: 0.02,
                // Trigger ~50px before a section reaches the viewport's bottom
                // edge, matching timing across every animated page.
                rootMargin: "0px 0px -50px 0px"
            });

            Object.keys(sections).forEach(function (key) {
                var el = document.querySelector(sections[key]);
                if (el) {
                    el.setAttribute("data-animate", key);
                    observer.observe(el);
                }
            });
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init);
        } else {
            init();
        }
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

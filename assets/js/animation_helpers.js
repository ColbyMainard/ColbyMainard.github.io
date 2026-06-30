/**
 * animation_helpers.js
 *
 * Shared helpers for the per-page *_animations.js entrance animations.
 * Exposes window.AnimationHelpers = { directChildren, addStep, animateContact }
 * so the five animation scripts don't each re-declare identical copies.
 *
 * Classic (non-module) deferred script — must load BEFORE each page's
 * *_animations.js so the global is ready when that script runs. animateContact
 * reads the global `anime` lazily (only when invoked on scroll), so this file
 * does not require anime to be present at its own load time.
 */

(function () {
    "use strict";

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
        var hasTargets = targets && (targets.length === undefined ? true : targets.length > 0);
        if (!hasTargets) return tl;
        if (position !== undefined) {
            return tl.add(targets, params, position);
        }
        return tl.add(targets, params);
    }

    /**
     * Contact/Footer — simple fade in. Identical on every page, so it lives
     * here rather than being re-declared in each *_animations.js.
     */
    function animateContact(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, el.querySelectorAll("h2, p, a"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        });
    }

    window.AnimationHelpers = {
        directChildren: directChildren,
        addStep: addStep,
        animateContact: animateContact
    };
})();

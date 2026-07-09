/**
 * AnimeJS entrance animations for 404.html
 * The oversized "404" figure drops in with a brief signal flicker; the
 * explanation and link sections rise in with staggered children.
 * Animations are triggered by Intersection Observer the first time
 * each section enters the viewport.
 */

(function () {
    "use strict";

    // The reduced-motion / anime guards, the .js-animations toggle, and the
    // IntersectionObserver wiring now live in animation_helpers.js `run`. Bail
    // only if that shared file didn't load, since without it there is nothing
    // to hook into (content then stays in its natural, fully-visible state).
    if (!window.AnimationHelpers) return;

    var directChildren = window.AnimationHelpers.directChildren;
    var addStep = window.AnimationHelpers.addStep;
    var animateContact = window.AnimationHelpers.animateContact;

    var sections = {
        intro: "#introSectionDiv",
        notFound: "#notFound",
        helpfulLinks: "#helpfulLinks",
        contact: "#contactMe"
    };

    /**
     * Intro — the 404 figure drops in, flickers like a dropped signal,
     * then the heading and lead paragraph follow.
     */
    function animateIntro(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });
        var errorCode = el.querySelector(".errorCode");

        addStep(tl, errorCode, {
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 600
        });
        addStep(tl, errorCode, {
            opacity: [1, 0.3],
            duration: 90
        });
        addStep(tl, errorCode, {
            opacity: [0.3, 1],
            duration: 140
        });
        addStep(tl, el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-20px", "0px"],
            duration: 600
        }, ">-200");
        addStep(tl, el.querySelectorAll("p:not(.errorCode)"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, ">-350");
    }

    /**
     * What Happened — rise from bottom with staggered paragraphs.
     */
    function animateNotFound(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "p"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
    }

    /**
     * Where To Next — heading and lead rise, then the page links
     * stagger in one by one.
     */
    function animateHelpfulLinks(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "p"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 500
        }, ">-300");
        addStep(tl, el.querySelectorAll("li"), {
            opacity: [0, 1],
            translateY: ["14px", "0px"],
            duration: 450,
            delay: anime.stagger(90)
        }, ">-250");
    }

    var animationMap = {
        intro: animateIntro,
        notFound: animateNotFound,
        helpfulLinks: animateHelpfulLinks,
        contact: animateContact
    };

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

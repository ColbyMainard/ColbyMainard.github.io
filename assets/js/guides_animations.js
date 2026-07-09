/**
 * AnimeJS scroll-triggered animations for guides.html
 * Each guide section gets a consistent fade-in-from-below entrance.
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
        dataEngineering: "#dataEngineeringGuide",
        computerVision: "#computerVisionGuide",
        generativeAI: "#generativeAIGuide",
        nlp: "#nlpGuide",
        reinforcementLearning: "#reinforcementLearningGuide",
        softwareEngineering: "#softwareEngineeringGuide",
        cybersecurity: "#cybersecurityGuide",
        contact: "#contactMe"
    };

    /**
     * Intro — Fade in + drop from above
     */
    function animateIntro(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        });
        addStep(tl, el.querySelectorAll("p"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, ">-400");
    }

    /**
     * Guide section — Rise from bottom with staggered children
     * Shared entrance used by every guide for visual consistency.
     */
    function animateGuide(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a, svg, div.guideInfographic"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    var animationMap = {
        intro: animateIntro,
        dataEngineering: animateGuide,
        computerVision: animateGuide,
        generativeAI: animateGuide,
        nlp: animateGuide,
        reinforcementLearning: animateGuide,
        softwareEngineering: animateGuide,
        cybersecurity: animateGuide,
        contact: animateContact
    };

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

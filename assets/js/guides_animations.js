/**
 * AnimeJS scroll-triggered animations for guides.html
 * Each guide section gets a consistent fade-in-from-below entrance.
 * Animations are triggered by Intersection Observer the first time
 * each section enters the viewport.
 */

(function () {
    "use strict";

    // Respect the user's reduced-motion preference: skip all entrance
    // animations entirely. Because the opacity-hiding CSS is gated on the
    // .js-animations class (added just below), NOT adding it leaves content
    // in its natural, fully-visible state.
    if (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Degrade gracefully if the AnimeJS CDN/module failed or the shared
    // helpers didn't load: leave content fully visible by NOT adding
    // js-animations (the opacity-hiding CSS keys on that class).
    if (typeof anime === "undefined" || !window.AnimationHelpers) return;

    var directChildren = window.AnimationHelpers.directChildren;
    var addStep = window.AnimationHelpers.addStep;
    var animateContact = window.AnimationHelpers.animateContact;

    document.documentElement.classList.add("js-animations");

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

    var animated = {};

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
})();

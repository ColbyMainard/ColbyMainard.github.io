/**
 * AnimeJS timeline animations for tech_resources.html
 * Each resource section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
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
    var animateIntro = window.AnimationHelpers.animateIntro;
    var animateContact = window.AnimationHelpers.animateContact;

    var sections = {
        intro: "#introSectionDiv",
        cybersecurity: "#cybersecurityResources",
        ai: "#artificialIntelligenceResources",
        cpp: "#cppResources",
        python: "#pythonResources",
        scripting: "#scriptingResources",
        os: "#operatingSystemsResources",
        systemsAndDSA: "#systemsAndDSA",
        contact: "#contactMe"
    };

    /**
     * Cybersecurity — Glitch/flicker entrance
     * Rapid opacity flicker then settle, elements slide from alternating sides
     */
    function animateCybersecurity(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 0.3, 0, 0.6, 0, 1],
            translateX: ["-10px", "5px", "-3px", "0px"],
            duration: 900
        });
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 0.4, 0, 1],
            translateX: ["30px", "-8px", "0px"],
            duration: 700,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "h4, p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateX: ["-20px", "4px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-400");
    }

    /**
     * Artificial Intelligence — Scale + radial fade
     * Neural-network inspired: elements bloom outward from center
     */
    function animateAI(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            scale: [0.4, 1],
            duration: 800
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [0.7, 1],
            translateY: ["15px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-300");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: ["20px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * C/C++ — Structured slide from left
     * Methodical, precise entrance matching the language's nature
     */
    function animateCpp(el) {
        var tl = anime.createTimeline({ ease: "outCubic" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["-70px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["-50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateX: ["-30px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Python — Slide from right
     * Smooth and flowing, contrasting with C++
     */
    function animatePython(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["70px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateX: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Scripting — Rise from bottom
     * Command-line feel: text appearing line by line
     */
    function animateScripting(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["50px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["35px", "0px"],
            duration: 500,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["25px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * Operating Systems — Cascade from top
     * Layered drop, like OS abstraction layers stacking
     */
    function animateOS(el) {
        var tl = anime.createTimeline({ ease: "outBounce" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["-50px", "0px"],
            duration: 800
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["-20px", "0px"],
            duration: 500,
            delay: anime.stagger(60),
            ease: "outQuart"
        }, ">-300");
    }

    /**
     * Systems, Data Structures and Algorithms — Assembling layers
     * The heading drops in, sub-headings slide in from the left, and the body
     * content springs up, so the section reads as parts fitting together.
     * Motion stays vertical for the wide tables so nothing widens the page.
     */
    function animateSystemsAndDSA(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["-45px", "0px"],
            scale: [0.9, 1],
            duration: 750
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["-35px", "0px"],
            duration: 550,
            delay: anime.stagger(90)
        }, ">-250");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["28px", "0px"],
            duration: 550,
            delay: anime.stagger(55),
            ease: "outBack"
        }, ">-300");
    }

    var animationMap = {
        intro: animateIntro,
        cybersecurity: animateCybersecurity,
        ai: animateAI,
        cpp: animateCpp,
        python: animatePython,
        scripting: animateScripting,
        os: animateOS,
        systemsAndDSA: animateSystemsAndDSA,
        contact: animateContact
    };

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

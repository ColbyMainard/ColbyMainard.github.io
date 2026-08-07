/**
 * AnimeJS timeline animations for hobbies.html
 * Each hobby section has a unique animation style, synced via timelines.
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
    var animateContact = window.AnimationHelpers.animateContact;

    var sections = {
        intro: "#introSectionDiv",
        quantum: "#quantumComputing",
        photography: "#photography",
        dnd: "#dungeonsAndDragons",
        history: "#history",
        contact: "#contactMe"
    };

    /**
     * Intro — Fade in heading, image scales up
     */
    function animateIntro(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        });
        addStep(tl, el.querySelector("img"), {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 700
        }, ">-400");
    }

    /**
     * Quantum Computing — Scale oscillation
     * Superposition shimmer, matching the tech_takes quantum style.
     * The video iframe shimmers in last as the section's visual centerpiece.
     */
    function animateQuantum(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            scale: [1.15, 0.95, 1],
            duration: 900
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [1.08, 0.98, 1],
            duration: 700,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, a"), {
            opacity: [0, 1],
            scale: [1.03, 1],
            translateY: ["15px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
        addStep(tl, directChildren(el, "iframe"), {
            opacity: [0, 1],
            scale: [1.10, 0.96, 1],
            duration: 900
        }, ">-300");
    }

    /**
     * Photography — Zoom + fade like a camera aperture opening
     * Elements bloom outward from center
     */
    function animatePhotography(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            scale: [0.3, 1],
            duration: 800
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        // .photoGallery, not img: the photographs now sit inside the gallery's
        // list and figures, so they are no longer direct children of the
        // section. The gallery as a whole is the element that blooms in.
        addStep(tl, directChildren(el, "p, ul, .photoGallery, a"), {
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
    }

    /**
     * Dungeons and Dragons — Slide from left with bounce
     * Adventurous, dramatic entrance like a quest reveal
     */
    function animateDnD(el) {
        var tl = anime.createTimeline({ ease: "outBounce" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["-80px", "0px"],
            duration: 900
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["-60px", "0px"],
            duration: 700,
            delay: anime.stagger(100),
            ease: "outQuart"
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, a"), {
            opacity: [0, 1],
            translateX: ["-40px", "0px"],
            duration: 500,
            delay: anime.stagger(60),
            ease: "outQuart"
        }, ">-300");
    }

    /**
     * History — Fade + rise from bottom
     * Elements emerge slowly like uncovering ancient text
     */
    function animateHistory(el) {
        var tl = anime.createTimeline({ ease: "outCubic" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["50px", "0px"],
            duration: 800
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, blockquote, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    var animationMap = {
        intro: animateIntro,
        quantum: animateQuantum,
        photography: animatePhotography,
        dnd: animateDnD,
        history: animateHistory,
        contact: animateContact
    };

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

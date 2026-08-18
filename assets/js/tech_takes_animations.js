/**
 * AnimeJS timeline animations for tech_takes.html
 * Each opinion section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
 *
 * Heading-level note: the page uses a single page-topic <h1>; each opinion
 * section's title is an <h2>, with sub-headings as <h3>/<h4>. The selectors
 * below reflect that hierarchy (after the SEO heading-hierarchy fix).
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
        kan: "#KAN",
        crypto: "#Cryptocurrency",
        quantum: "#FutureOfQuantum",
        agi: "#AGI",
        privacy: "#Privacy",
        productPlacement: "#ProductPlacement",
        physicalMedia: "#PhysicalMediaSupremacy",
        contact: "#contactMe"
    };

    /**
     * KAN (Kolmogorov-Arnold Networks) — Slide from left with rotation
     * Mathematical, structured entrance.
     */
    function animateKAN(el) {
        var tl = anime.createTimeline({ ease: "outCubic" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["-70px", "0px"],
            rotate: ["-2deg", "0deg"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["-50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
        addStep(tl, directChildren(el, "p, ul, a"), {
            opacity: [0, 1],
            translateX: ["-30px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Cryptocurrency — Scale + flicker
     * Digital currency feel with a subtle glitch entrance.
     */
    function animateCrypto(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 0.3, 0, 0.7, 1],
            scale: [0.8, 1],
            duration: 900
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Future of Quantum — Fade with scale oscillation
     * Quantum superposition: elements shimmer into existence.
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
        addStep(tl, directChildren(el, "p, ul, .tableScroll, a"), {
            opacity: [0, 1],
            scale: [1.03, 1],
            translateY: ["15px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * AGI — Slide from right + expand
     * Intelligence expanding outward.
     */
    function animateAGI(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["80px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["60px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
        addStep(tl, directChildren(el, "p, ul, dl, a"), {
            opacity: [0, 1],
            translateX: ["40px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Privacy — Rise from bottom
     * Hidden becoming visible, emerging from obscurity.
     */
    function animatePrivacy(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateY: ["60px", "0px"],
            duration: 800
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["45px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, dl, a"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * Product Placement — Cinematic focus pull
     * Elements start oversized and slightly rotated, then settle into sharp
     * focus like a broadcast camera zooming in on a logo.
     */
    function animateProductPlacement(el) {
        var tl = anime.createTimeline({ ease: "outQuint" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            scale: [1.3, 1],
            rotate: ["2deg", "0deg"],
            duration: 900
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [1.15, 1],
            rotate: ["1.5deg", "0deg"],
            duration: 650,
            delay: anime.stagger(90)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, dl, .tableScroll, a"), {
            opacity: [0, 1],
            scale: [1.05, 1],
            translateY: ["20px", "0px"],
            duration: 550,
            delay: anime.stagger(55)
        }, ">-300");
    }

    /**
     * Physical Media Supremacy — Record drop and settle
     * The heading lands like a vinyl record dropped onto a platter: it comes in
     * tilted, rocks past level, then lies flat. Sub-headings drop from above as
     * if stacking onto it, and the body settles last.
     */
    function animatePhysicalMedia(el) {
        var tl = anime.createTimeline({ ease: "outCirc" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            rotate: ["-10deg", "2deg", "0deg"],
            scale: [0.88, 1],
            duration: 950
        });
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            rotate: ["-6deg", "0deg"],
            translateY: ["-18px", "0px"],
            duration: 600,
            delay: anime.stagger(90)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, dl, .tableScroll, a"), {
            opacity: [0, 1],
            translateY: ["24px", "0px"],
            duration: 520,
            delay: anime.stagger(55)
        }, ">-300");
    }

    var animationMap = {
        intro: animateIntro,
        kan: animateKAN,
        crypto: animateCrypto,
        quantum: animateQuantum,
        agi: animateAGI,
        privacy: animatePrivacy,
        productPlacement: animateProductPlacement,
        physicalMedia: animatePhysicalMedia,
        contact: animateContact
    };

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

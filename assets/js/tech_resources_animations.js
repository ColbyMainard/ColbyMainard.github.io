/**
 * AnimeJS timeline animations for tech_resources.html
 * Each resource section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
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
        cybersecurity: "#cybersecurityResources",
        ai: "#artificialIntelligenceResources",
        cpp: "#cppResources",
        python: "#pythonResources",
        scripting: "#scriptingResources",
        os: "#operatingSystemsResources",
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            scale: [0.7, 1],
            duration: 500
        }, ">-400");
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 0.4, 0, 1],
            translateX: ["30px", "-8px", "0px"],
            duration: 700,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "h4, p, blockquote, ul, table, a"), {
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            scale: [0.2, 1],
            rotate: ["8deg", "0deg"],
            duration: 600
        }, ">-400");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            scale: [0.7, 1],
            translateY: ["15px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-300");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            translateX: ["-50px", "0px"],
            duration: 500
        }, ">-300");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["-50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            translateX: ["50px", "0px"],
            duration: 500
        }, ">-300");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 500
        }, ">-300");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["35px", "0px"],
            duration: 500,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
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
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 500,
            ease: "outQuart"
        }, ">-400");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
            opacity: [0, 1],
            translateY: ["-20px", "0px"],
            duration: 500,
            delay: anime.stagger(60),
            ease: "outQuart"
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

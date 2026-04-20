/**
 * AnimeJS timeline animations for hobbies.html
 * Each hobby section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
 */

(function () {
    "use strict";

    document.documentElement.classList.add("js-animations");

    var sections = {
        intro: "#introSectionDiv",
        quantum: "#quantumComputing",
        photography: "#photography",
        dnd: "#dungeonsAndDragons",
        history: "#history",
        contact: "#contactMe"
    };

    var animated = {};

    /**
     * Helper: select only direct children matching a selector.
     */
    function directChildren(el, selector) {
        return Array.prototype.filter.call(
            el.children,
            function (child) { return child.matches(selector); }
        );
    }

    /**
     * Helper: add a timeline step only when the target list is non-empty.
     * AnimeJS throws "No target found" if given an empty array.
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
     * Superposition shimmer, matching the tech_takes quantum style
     */
    function animateQuantum(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, directChildren(el, "h1"), {
            opacity: [0, 1],
            scale: [1.15, 0.95, 1],
            duration: 900
        });
        addStep(tl, directChildren(el, "h2, h3"), {
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
    }

    /**
     * Photography — Zoom + fade like a camera aperture opening
     * Elements bloom outward from center
     */
    function animatePhotography(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        addStep(tl, directChildren(el, "h1"), {
            opacity: [0, 1],
            scale: [0.3, 1],
            duration: 800
        });
        addStep(tl, directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, ul, img, a"), {
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

        addStep(tl, directChildren(el, "h1"), {
            opacity: [0, 1],
            translateX: ["-80px", "0px"],
            duration: 900
        });
        addStep(tl, directChildren(el, "h2, h3"), {
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

        addStep(tl, directChildren(el, "h1"), {
            opacity: [0, 1],
            translateY: ["50px", "0px"],
            duration: 800
        });
        addStep(tl, directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400");
        addStep(tl, directChildren(el, "p, blockquote, ul, table, a"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * Contact/Footer — Simple fade in
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

    var animationMap = {
        intro: animateIntro,
        quantum: animateQuantum,
        photography: animatePhotography,
        dnd: animateDnD,
        history: animateHistory,
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

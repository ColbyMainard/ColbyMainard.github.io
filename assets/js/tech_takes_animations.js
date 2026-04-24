/**
 * AnimeJS timeline animations for tech_takes.html
 * Each opinion section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
 */

(function () {
    "use strict";

    document.documentElement.classList.add("js-animations");

    var sections = {
        intro: "#introSectionDiv",
        kan: "#KAN",
        crypto: "#Cryptocurrency",
        quantum: "#FutureOfQuantum",
        agi: "#AGI",
        privacy: "#Privacy",
        productPlacement: "#ProductPlacement",
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
     * Intro — Fade in + drop from above
     */
    function animateIntro(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        tl.add(el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        }).add(el.querySelectorAll("p"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, ">-400");
    }

    /**
     * KAN (Kolmogorov-Arnold Networks) — Slide from left with rotation
     * Mathematical, structured entrance
     */
    function animateKAN(el) {
        var tl = anime.createTimeline({ ease: "outCubic" });

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 1],
            translateX: ["-70px", "0px"],
            rotate: ["-2deg", "0deg"],
            duration: 700
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            translateX: ["-50px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300").add(directChildren(el, "p, ul, a"), {
            opacity: [0, 1],
            translateX: ["-30px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Cryptocurrency — Scale + flicker
     * Digital currency feel with a subtle glitch entrance
     */
    function animateCrypto(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 0.3, 0, 0.7, 1],
            scale: [0.8, 1],
            duration: 900
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400").add(directChildren(el, "p, ul, table, a"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Future of Quantum — Fade with scale oscillation
     * Quantum superposition: elements shimmer into existence
     */
    function animateQuantum(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 1],
            scale: [1.15, 0.95, 1],
            duration: 900
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            scale: [1.08, 0.98, 1],
            duration: 700,
            delay: anime.stagger(100)
        }, ">-400").add(directChildren(el, "p, ul, table, a"), {
            opacity: [0, 1],
            scale: [1.03, 1],
            translateY: ["15px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * AGI — Slide from right + expand
     * Intelligence expanding outward
     */
    function animateAGI(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 1],
            translateX: ["80px", "0px"],
            duration: 700
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            translateX: ["60px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300").add(directChildren(el, "p, ul, dl, a"), {
            opacity: [0, 1],
            translateX: ["40px", "0px"],
            duration: 500,
            delay: anime.stagger(50)
        }, ">-300");
    }

    /**
     * Privacy — Rise from bottom
     * Hidden becoming visible, emerging from obscurity
     */
    function animatePrivacy(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 1],
            translateY: ["60px", "0px"],
            duration: 800
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            translateY: ["45px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-400").add(directChildren(el, "p, ul, dl, a"), {
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

        tl.add(directChildren(el, "h1"), {
            opacity: [0, 1],
            scale: [1.3, 1],
            rotate: ["2deg", "0deg"],
            duration: 900
        }).add(directChildren(el, "h2, h3"), {
            opacity: [0, 1],
            scale: [1.15, 1],
            rotate: ["1.5deg", "0deg"],
            duration: 650,
            delay: anime.stagger(90)
        }, ">-400").add(directChildren(el, "p, ul, dl, table, a"), {
            opacity: [0, 1],
            scale: [1.05, 1],
            translateY: ["20px", "0px"],
            duration: 550,
            delay: anime.stagger(55)
        }, ">-300");
    }

    /**
     * Contact/Footer — Simple fade in
     */
    function animateContact(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        tl.add(el.querySelectorAll("h2, p, a"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        });
    }

    var animationMap = {
        intro: animateIntro,
        kan: animateKAN,
        crypto: animateCrypto,
        quantum: animateQuantum,
        agi: animateAGI,
        privacy: animatePrivacy,
        productPlacement: animateProductPlacement,
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

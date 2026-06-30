/**
 * AnimeJS timeline animations for index.html
 * Each content section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
 *
 * Heading-level note: the page uses a single page-topic <h1>; each section's
 * title is an <h2>, with <h3>/<h4> inside. The selectors below reflect that
 * hierarchy (after the SEO heading-hierarchy fix).
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

    // Mark body so CSS can hide elements only when JS is active
    document.documentElement.classList.add("js-animations");

    // Selectors for each animated section
    var sections = {
        intro: "#introSectionDiv",
        work: "#workHistory",
        education: "#education",
        projects: "#projects",
        technicalSkills: "#technicalSkills",
        certifications: "#certifications",
        otherSkills: "#otherSkills",
        contact: "#contactMe"
    };

    // Track which sections have already been animated
    var animated = {};

    /**
     * Intro Section — Fade in + drop from above
     * Page-topic h1 drops, intro-subtitle h2 scales in, paragraphs stagger up.
     */
    function animateIntro(el) {
        var tl = anime.createTimeline({ ease: "outExpo" });

        addStep(tl, el.querySelector("h1"), {
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        });
        addStep(tl, el.querySelector("h2"), {
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600
        }, ">-400");
        addStep(tl, el.querySelectorAll("p"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, ">-300");
    }

    /**
     * Work History — Slide from left
     * Section h2 slides, SVG scales in, company h3s stagger from left,
     * role h4 + content fades in.
     */
    function animateWork(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["-80px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 500
        }, ">-300");
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 1],
            translateX: ["-60px", "0px"],
            duration: 500,
            delay: anime.stagger(120)
        }, ">-200");
        addStep(tl, directChildren(el, "h4, p, ul, a"), {
            opacity: [0, 1],
            translateX: ["-40px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * Education — Fade + slight rotation
     * Section h2 rotates in, SVG spins subtly, degree h3 + university h4
     * + table/content fades up. Uses direct children only because this
     * section has deeply nested tables with hundreds of inner elements.
     */
    function animateEducation(el) {
        var tl = anime.createTimeline({ ease: "outSine" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            rotate: ["-3deg", "0deg"],
            translateY: ["-30px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            rotate: ["-15deg", "0deg"],
            duration: 600
        }, ">-300");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            rotate: ["-2deg", "0deg"],
            duration: 500,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "ul, table, p, a"), {
            opacity: [0, 1],
            translateY: ["25px", "0px"],
            duration: 600,
            delay: anime.stagger(80)
        }, ">-300");
    }

    /**
     * Projects — Slide from right
     * Mirror of work history direction for visual contrast.
     */
    function animateProjects(el) {
        var tl = anime.createTimeline({ ease: "outQuart" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            translateX: ["80px", "0px"],
            duration: 700
        });
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            scale: [0.3, 1],
            rotate: ["10deg", "0deg"],
            duration: 600
        }, ">-300");
        addStep(tl, directChildren(el, "h3, h4"), {
            opacity: [0, 1],
            translateX: ["60px", "0px"],
            duration: 500,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "p, ul, a"), {
            opacity: [0, 1],
            translateX: ["40px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, ">-300");
    }

    /**
     * Technical Skills — Cascade/waterfall from top
     * Elements drop in sequentially like building blocks.
     */
    function animateTechnicalSkills(el) {
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
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, ">-200");
        addStep(tl, directChildren(el, "ul, a"), {
            opacity: [0, 1],
            translateY: ["-20px", "0px"],
            duration: 500,
            delay: anime.stagger(80),
            ease: "outQuart"
        }, ">-300");
    }

    /**
     * Certifications — Zoom/scale from center
     * Certificate-like presentation effect.
     */
    function animateCertifications(el) {
        var tl = anime.createTimeline({ ease: "outBack" });

        addStep(tl, directChildren(el, "h2"), {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 700
        });
        addStep(tl, directChildren(el, "svg"), {
            opacity: [0, 1],
            scale: [0.2, 1],
            rotate: ["-5deg", "0deg"],
            duration: 600
        }, ">-300");
        addStep(tl, directChildren(el, "h3, ul, a"), {
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 500,
            delay: anime.stagger(100)
        }, ">-200");
    }

    /**
     * Other Skills — Rise from bottom
     * Elements float upward into place.
     */
    function animateOtherSkills(el) {
        var tl = anime.createTimeline({ ease: "outCubic" });

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
        addStep(tl, directChildren(el, "h3"), {
            opacity: [0, 1],
            translateY: ["35px", "0px"],
            duration: 500,
            delay: anime.stagger(120)
        }, ">-200");
        addStep(tl, directChildren(el, "ul, a"), {
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, ">-300");
    }

    // Map section keys to their animation functions
    var animationMap = {
        intro: animateIntro,
        work: animateWork,
        education: animateEducation,
        projects: animateProjects,
        technicalSkills: animateTechnicalSkills,
        certifications: animateCertifications,
        otherSkills: animateOtherSkills,
        contact: animateContact
    };

    /**
     * Intersection Observer callback — triggers the matching
     * animation once when a section scrolls into view.
     */
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

    /**
     * Initialize: tag each section with data-animate, set up observer.
     */
    function init() {
        var observer = new IntersectionObserver(onIntersect, {
            threshold: 0.02,
            // Trigger ~50px before a section reaches the viewport's bottom edge,
            // matching the other *_animations.js pages for consistent timing.
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

    // Run on DOMContentLoaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

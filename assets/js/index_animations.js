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

    // The reduced-motion / anime guards, the .js-animations toggle, and the
    // IntersectionObserver wiring now live in animation_helpers.js `run`. Bail
    // only if that shared file didn't load, since without it there is nothing
    // to hook into (content then stays in its natural, fully-visible state).
    if (!window.AnimationHelpers) return;

    var directChildren = window.AnimationHelpers.directChildren;
    var addStep = window.AnimationHelpers.addStep;
    var introTimeline = window.AnimationHelpers.introTimeline;
    var animateContact = window.AnimationHelpers.animateContact;

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

    /**
     * Intro Section — Fade in + drop from above
     * Page-topic h1 drops, intro-subtitle h2 scales in, paragraphs stagger up.
     */
    function animateIntro(el) {
        var tl = introTimeline(el);

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
        addStep(tl, directChildren(el, "ul, .tableScroll, p, a"), {
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

    // Hand the section map and animations to the shared orchestrator, which
    // wires up the IntersectionObserver and honors reduced-motion.
    window.AnimationHelpers.run(sections, animationMap);
})();

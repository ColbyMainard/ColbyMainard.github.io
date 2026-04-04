/**
 * AnimeJS timeline animations for index.html
 * Each content section has a unique animation style, synced via timelines.
 * Animations trigger on scroll via Intersection Observer.
 */

(function () {
    "use strict";

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
     * h1 drops, h2 scales in, paragraphs stagger up
     */
    function animateIntro(el) {
        var tl = anime.timeline({ easing: "easeOutExpo" });

        tl.add({
            targets: el.querySelector("h1"),
            opacity: [0, 1],
            translateY: ["-40px", "0px"],
            duration: 800
        }).add({
            targets: el.querySelector("h2"),
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600
        }, "-=400").add({
            targets: el.querySelectorAll("p"),
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 600,
            delay: anime.stagger(150)
        }, "-=300");
    }

    /**
     * Work History — Slide from left
     * h1 slides, SVG scales in, job entries stagger from left
     */
    function animateWork(el) {
        var tl = anime.timeline({ easing: "easeOutQuart" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            translateX: ["-80px", "0px"],
            duration: 700
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 500
        }, "-=300").add({
            targets: directChildren(el, "h2"),
            opacity: [0, 1],
            translateX: ["-60px", "0px"],
            duration: 500,
            delay: anime.stagger(120)
        }, "-=200").add({
            targets: directChildren(el, "h3, p, ul, a"),
            opacity: [0, 1],
            translateX: ["-40px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, "-=300");
    }

    /**
     * Helper: select only direct children matching a selector.
     * Prevents animating deeply nested elements in large sections.
     */
    function directChildren(el, selector) {
        return Array.prototype.filter.call(
            el.children,
            function (child) { return child.matches(selector); }
        );
    }

    /**
     * Education — Fade + slight rotation
     * h1 rotates in, SVG spins subtly, table/content fades up.
     * Uses direct children only because this section has deeply
     * nested tables with hundreds of inner elements.
     */
    function animateEducation(el) {
        var tl = anime.timeline({ easing: "easeOutSine" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            rotate: ["-3deg", "0deg"],
            translateY: ["-30px", "0px"],
            duration: 700
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            rotate: ["-15deg", "0deg"],
            duration: 600
        }, "-=300").add({
            targets: directChildren(el, "h2, h3"),
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            rotate: ["-2deg", "0deg"],
            duration: 500,
            delay: anime.stagger(100)
        }, "-=200").add({
            targets: directChildren(el, "ul, table, p, a"),
            opacity: [0, 1],
            translateY: ["25px", "0px"],
            duration: 600,
            delay: anime.stagger(80)
        }, "-=300");
    }

    /**
     * Projects — Slide from right
     * Mirror of work history direction for visual contrast
     */
    function animateProjects(el) {
        var tl = anime.timeline({ easing: "easeOutQuart" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            translateX: ["80px", "0px"],
            duration: 700
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            scale: [0.3, 1],
            rotate: ["10deg", "0deg"],
            duration: 600
        }, "-=300").add({
            targets: directChildren(el, "h2, h3"),
            opacity: [0, 1],
            translateX: ["60px", "0px"],
            duration: 500,
            delay: anime.stagger(100)
        }, "-=200").add({
            targets: directChildren(el, "p, ul, a"),
            opacity: [0, 1],
            translateX: ["40px", "0px"],
            duration: 500,
            delay: anime.stagger(60)
        }, "-=300");
    }

    /**
     * Technical Skills — Cascade/waterfall from top
     * Elements drop in sequentially like building blocks
     */
    function animateTechnicalSkills(el) {
        var tl = anime.timeline({ easing: "easeOutBounce" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            translateY: ["-50px", "0px"],
            duration: 800
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 500,
            easing: "easeOutQuart"
        }, "-=400").add({
            targets: directChildren(el, "h2"),
            opacity: [0, 1],
            translateY: ["-30px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        }, "-=200").add({
            targets: directChildren(el, "ul, a"),
            opacity: [0, 1],
            translateY: ["-20px", "0px"],
            duration: 500,
            delay: anime.stagger(80),
            easing: "easeOutQuart"
        }, "-=300");
    }

    /**
     * Certifications — Zoom/scale from center
     * Certificate-like presentation effect
     */
    function animateCertifications(el) {
        var tl = anime.timeline({ easing: "easeOutBack" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 700
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            scale: [0.2, 1],
            rotate: ["-5deg", "0deg"],
            duration: 600
        }, "-=300").add({
            targets: directChildren(el, "h2, ul, a"),
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 500,
            delay: anime.stagger(100)
        }, "-=200");
    }

    /**
     * Other Skills — Rise from bottom
     * Elements float upward into place
     */
    function animateOtherSkills(el) {
        var tl = anime.timeline({ easing: "easeOutCubic" });

        tl.add({
            targets: directChildren(el, "h1"),
            opacity: [0, 1],
            translateY: ["50px", "0px"],
            duration: 700
        }).add({
            targets: directChildren(el, "svg"),
            opacity: [0, 1],
            translateY: ["40px", "0px"],
            duration: 500
        }, "-=300").add({
            targets: directChildren(el, "h2"),
            opacity: [0, 1],
            translateY: ["35px", "0px"],
            duration: 500,
            delay: anime.stagger(120)
        }, "-=200").add({
            targets: directChildren(el, "ul, a"),
            opacity: [0, 1],
            translateY: ["30px", "0px"],
            duration: 500,
            delay: anime.stagger(80)
        }, "-=300");
    }

    /**
     * Contact/Footer — Simple fade in
     */
    function animateContact(el) {
        var tl = anime.timeline({ easing: "easeOutSine" });

        tl.add({
            targets: el.querySelectorAll("h2, p, a"),
            opacity: [0, 1],
            translateY: ["20px", "0px"],
            duration: 600,
            delay: anime.stagger(100)
        });
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

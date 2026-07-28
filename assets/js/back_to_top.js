/**
 * Floating "Back to Top" button.
 * Fades in once the viewport has scrolled past 400px and smooth-scrolls
 * to the top of the document when clicked. Reuses AnimeJS where loaded.
 */

(function () {
    "use strict";

    var SHOW_AFTER = 400;
    var button;
    var visible = false;
    var hideTimer = null;

    // Re-checked on each use so toggling the OS setting mid-session is honored.
    function prefersReducedMotion() {
        return window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function createButton() {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "floatingBackToTop";
        btn.setAttribute("aria-label", "Back to top");
        btn.setAttribute("title", "Back to top");
        btn.innerHTML = "\u2191";
        btn.addEventListener("click", scrollToTop);
        document.body.appendChild(btn);
        return btn;
    }

    function scrollToTop() {
        if (prefersReducedMotion()) {
            window.scrollTo(0, 0);
            return;
        }
        if (typeof window.anime !== "undefined" && window.anime.animate) {
            var scroller = { y: window.pageYOffset || document.documentElement.scrollTop };
            window.anime.animate(scroller, {
                y: 0,
                duration: 500,
                ease: "outQuart",
                onUpdate: function () {
                    window.scrollTo(0, scroller.y);
                }
            });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function setVisible(next) {
        if (next === visible) return;
        visible = next;

        // Cancel a pending hide so a stale ~320ms timeout can't strip "visible"
        // after a newer show during rapid scrolling.
        if (hideTimer !== null) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }

        if (!prefersReducedMotion() && typeof window.anime !== "undefined" && window.anime.animate) {
            // Read the live opacity so an interrupted fade resumes from where it
            // is. Guard with isNaN rather than `|| default`: a genuine current
            // opacity of 0 (button mid-hide) must be preserved as a fade-in's
            // starting point, and `parseFloat(...) || 0` would keep 0 by luck
            // while `|| 1` on the hide path would wrongly treat it as missing.
            var currentOpacity = parseFloat(getComputedStyle(button).opacity);
            if (isNaN(currentOpacity)) {
                currentOpacity = next ? 0 : 1;
            }
            // translateY deliberately omits a from-value while opacity above
            // supplies one. That asymmetry is the fix, not an oversight: a
            // to-only tween interpolates from the element's live rendered
            // transform, so an interrupted slide resumes in place. Restoring a
            // ["20px", "0px"] tuple here re-breaks it — the position would snap
            // back to the hardcoded start while the fade kept gliding.
            window.anime.animate(button, {
                opacity: next ? [currentOpacity, 1] : [currentOpacity, 0],
                translateY: next ? "0px" : "20px",
                duration: 300,
                ease: "outQuad"
            });
            if (next) {
                button.classList.add("visible");
            } else {
                hideTimer = setTimeout(function () {
                    button.classList.remove("visible");
                    hideTimer = null;
                }, 320);
            }
        } else {
            button.classList.toggle("visible", next);
        }
    }

    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        setVisible(y > SHOW_AFTER);
    }

    function init() {
        button = createButton();
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

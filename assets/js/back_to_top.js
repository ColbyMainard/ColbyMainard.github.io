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
        if (typeof window.anime !== "undefined" && window.anime.animate) {
            window.anime.animate(button, {
                opacity: next ? [parseFloat(getComputedStyle(button).opacity) || 0, 1] : [parseFloat(getComputedStyle(button).opacity) || 1, 0],
                translateY: next ? ["20px", "0px"] : ["0px", "20px"],
                duration: 300,
                ease: "outQuad"
            });
            if (next) {
                button.classList.add("visible");
            } else {
                setTimeout(function () {
                    if (!visible) button.classList.remove("visible");
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

/**
 * photo_gallery.js
 *
 * Interactive slideshow for the photography gallery on hobbies.html.
 * Adds .is-active to #photoGallery, which switches the CSS from the no-JS
 * stacked-column fallback to the slideshow layout, then wires up:
 *   - previous/next arrow buttons (wrap around at the ends)
 *   - thumbnail buttons that jump to a specific photo
 *   - left/right arrow keys while focus is inside the gallery
 *   - horizontal swipe on touch and pen pointers
 *   - an aria-live status line ("Photo 2 of 5: ...") for screen readers
 *
 * Classic deferred script with no dependencies (does not use AnimeJS); the
 * crossfade transition lives in CSS so prefers-reduced-motion can disable it.
 * If this file fails to load, the photos remain a fully visible stacked list.
 */

(function () {
    "use strict";

    function init() {
        var gallery = document.getElementById("photoGallery");
        if (!gallery) return;

        var slides = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-slide"));
        var thumbs = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-thumb"));
        var stage = gallery.querySelector(".gallery-stage");
        var status = gallery.querySelector(".gallery-status");
        var prevButton = gallery.querySelector(".gallery-prev");
        var nextButton = gallery.querySelector(".gallery-next");

        // Leave the stacked fallback in place if the markup is incomplete.
        if (slides.length < 2 || !stage || !prevButton || !nextButton) return;

        var current = 0;

        gallery.classList.add("is-active");

        function captionFor(index) {
            var caption = slides[index].querySelector("figcaption");
            return caption ? caption.textContent.replace(/\s+/g, " ").trim() : "";
        }

        /**
         * Native lazy loading keys on viewport intersection, so a photo sitting
         * in the hidden part of the stage may not have started downloading yet.
         * Promote the shown photo and its neighbors to eager as we navigate.
         */
        function ensureLoaded(index) {
            var img = slides[index].querySelector("img");
            if (img && img.loading === "lazy") img.loading = "eager";
        }

        function show(index) {
            current = (index % slides.length + slides.length) % slides.length;

            slides.forEach(function (slide, i) {
                var isCurrent = i === current;
                slide.classList.toggle("is-current", isCurrent);
                if (isCurrent) {
                    slide.removeAttribute("aria-hidden");
                } else {
                    slide.setAttribute("aria-hidden", "true");
                }
            });

            thumbs.forEach(function (thumb, i) {
                var isCurrent = i === current;
                thumb.classList.toggle("is-current", isCurrent);
                if (isCurrent) {
                    thumb.setAttribute("aria-current", "true");
                } else {
                    thumb.removeAttribute("aria-current");
                }
            });

            if (status) {
                var caption = captionFor(current);
                var text = "Photo " + (current + 1) + " of " + slides.length +
                    (caption ? ": " + caption : "");
                // Skip the no-op write at init so the live region does not
                // announce on page load.
                if (status.textContent !== text) status.textContent = text;
            }

            ensureLoaded(current);
            ensureLoaded((current + 1) % slides.length);
            ensureLoaded((current - 1 + slides.length) % slides.length);
        }

        prevButton.addEventListener("click", function () { show(current - 1); });
        nextButton.addEventListener("click", function () { show(current + 1); });

        thumbs.forEach(function (thumb, index) {
            thumb.addEventListener("click", function () { show(index); });
        });

        // Arrow keys work whenever focus is on any control inside the gallery.
        gallery.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                show(current - 1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                show(current + 1);
            }
        });

        // Swipe navigation for touch/pen only; mouse users have the arrows,
        // and skipping the mouse avoids fighting native image dragging.
        // touch-action: pan-y on the stage keeps vertical page scroll native.
        var pointerId = null;
        var startX = 0;
        var startY = 0;

        stage.addEventListener("pointerdown", function (event) {
            if (event.pointerType === "mouse") return;
            pointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;
        });

        stage.addEventListener("pointerup", function (event) {
            if (pointerId === null || event.pointerId !== pointerId) return;
            pointerId = null;
            var deltaX = event.clientX - startX;
            var deltaY = event.clientY - startY;
            if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
                show(deltaX < 0 ? current + 1 : current - 1);
            }
        });

        stage.addEventListener("pointercancel", function () { pointerId = null; });

        show(current);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

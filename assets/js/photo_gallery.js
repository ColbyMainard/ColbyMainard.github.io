/**
 * Photography gallery — hobbies.html only.
 *
 * Turns the stacked list of photographs in #photoGallery into a manual
 * one-at-a-time viewer. The five landscape shots are 3.5-5.0 MB originals and
 * are no longer precached by the service worker, so showing one at a time is
 * the difference between fetching roughly 19 MB on arrival and fetching one
 * photo. The four inactive slides are display: none and loading="lazy", which
 * browsers do not fetch until they are shown.
 *
 * Progressive enhancement, matching the animationGate convention used
 * elsewhere on this site: everything here is gated behind a .js-gallery class
 * this script adds. With scripting off, all five photographs render stacked
 * with their captions and the controls stay hidden by the `hidden` attribute
 * already in the markup, so there are no dead buttons and no hidden content.
 *
 * Deliberately NOT auto-advancing. An auto-playing carousel is a WCAG 2.2.2
 * (Pause, Stop, Hide) obligation that would need its own pause control, and it
 * moves content out from under people who read slowly. Manual only sidesteps
 * the whole problem. For the same reason focus is never moved on navigation:
 * it stays on whichever button was pressed, so repeated presses work.
 *
 * Dependency-free and safe from a file:// origin — no fetches, no timers.
 */

(function () {
    "use strict";

    var gallery = document.getElementById("photoGallery");
    if (!gallery) return;

    var track = document.getElementById("photoGalleryTrack");
    var controls = document.getElementById("photoGalleryControls");
    var status = document.getElementById("photoGalleryStatus");
    var help = document.getElementById("photoGalleryHelp");
    var count = document.getElementById("photoGalleryCount");
    if (!track || !controls) return;

    var slides = [];
    var children = track.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].classList.contains("photoGallery-slide")) {
            slides.push(children[i]);
        }
    }
    // One slide needs no navigation, and zero means the markup changed out from
    // under this script. Either way, leave the stacked fallback alone.
    if (slides.length < 2) return;

    var current = 0;

    /**
     * Label the gallery and each slide for assistive technology. Applied here
     * rather than in the markup because these roles only make sense once the
     * slides are actually being shown one at a time; in the no-JS fallback
     * they are just a list of figures, which is already correct. The carousel
     * role on the container used to sit in the static markup, which announced
     * the stacked no-JS list as a carousel.
     *
     * The slide role goes on the <figure> inside each <li>, not on the <li>
     * itself. Overriding the <li> role would leave the track a list with no
     * list items.
     */
    function labelSlides() {
        gallery.setAttribute("role", "group");
        gallery.setAttribute("aria-roledescription", "carousel");
        gallery.setAttribute("aria-label", "Landscape photography gallery");
        for (var i = 0; i < slides.length; i++) {
            var figure = slides[i].querySelector("figure");
            if (!figure) continue;
            figure.setAttribute("role", "group");
            figure.setAttribute("aria-roledescription", "slide");
            figure.setAttribute("aria-label", (i + 1) + " of " + slides.length);
        }
    }

    function show(index, announce) {
        current = (index + slides.length) % slides.length;

        for (var i = 0; i < slides.length; i++) {
            if (i === current) {
                slides[i].classList.add("is-active");
            } else {
                slides[i].classList.remove("is-active");
            }
        }

        if (count) {
            count.textContent = (current + 1) + " / " + slides.length;
        }

        // Skipped on first paint: announcing "Photo 1 of 5" the moment the page
        // loads is noise the visitor did not ask for. Only navigation speaks.
        if (announce && status) {
            status.textContent = "Photo " + (current + 1) + " of " + slides.length;
        }
    }

    function step(delta) {
        show(current + delta, true);
    }

    // Delegated from the container. The buttons hold only text, so the click
    // target is the button itself and there is no need to walk ancestors.
    controls.addEventListener("click", function (event) {
        var target = event.target;
        if (!target || !target.getAttribute) return;
        var delta = parseInt(target.getAttribute("data-gallery-step"), 10);
        if (!delta) return;
        step(delta);
    });

    // Arrow keys work while focus is anywhere inside the gallery, which is the
    // behavior a screen-reader user is told to expect from aria-roledescription
    // "carousel". Modifier combinations are left alone so browser and screen
    // reader shortcuts still function.
    gallery.addEventListener("keydown", function (event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
        }
    });

    labelSlides();
    gallery.classList.add("js-gallery");
    controls.hidden = false;

    // Describe the controls only now that they exist. The instruction stays in
    // the markup but `hidden` so the no-JS fallback, which is a plain stack of
    // figures with no navigation, does not announce arrow keys that do nothing.
    if (help) {
        help.hidden = false;
        gallery.setAttribute("aria-describedby", "photoGalleryHelp");
    }

    show(0, false);
})();

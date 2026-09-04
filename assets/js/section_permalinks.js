/**
 * Section permalink buttons — tech_takes.html and guides.html.
 *
 * Appends a "Copy link" button to each section heading so a reader can send
 * one stance or one guide to someone instead of the whole page. The anchors
 * already existed (the page menu navigates by them, and guides.html prints
 * seven of them as "Cite this guide:" lines); nothing surfaced them.
 *
 * Progressive enhancement in the photo_gallery.js shape: with scripting off no
 * button is rendered at all, so there is nothing dead to tab into. The status
 * paragraph is the one piece that lives in the static markup, for the reason
 * documented on #photoGalleryStatus — a live region only announces changes to
 * content inside a region that already existed, so injecting it here and
 * writing to it on the same click would announce nothing.
 *
 * WHICH HEADINGS GET A BUTTON. The feature request assumed every h2 and h3
 * already carried an id. They do not: on both pages the ids sit on the
 * wrapping <div>/<section> (#VibeCodingScourgeDiv, #dataEngineeringGuideDiv),
 * and no h2 or h3 on either page has one of its own. So each heading resolves
 * an anchor through anchorFor() below, and an anchor is claimed by the first
 * heading that resolves to it. In practice that means one button per section
 * today, on the h2. Give an h3 its own id in the markup and it picks up a
 * button with no change here.
 *
 * Deliberately not moving focus on copy, matching photo_gallery.js: focus
 * stays on the button that was pressed, so a second press works.
 *
 * file:// is not supported on purpose rather than by accident. There is no
 * shareable URL to put on the clipboard from a local file, and the Clipboard
 * API is unavailable outside a secure context anyway, so the buttons are never
 * built there. Offering a control that copies "file:///C:/..." would be worse
 * than offering none.
 *
 * Load order note: this file must stay BELOW reading_engagement.js in the
 * <head>. Deferred classic scripts run in document order, so that script's
 * DOMContentLoaded handler registers first and counts each section's words
 * before these button labels are added to the DOM. Swapping the two inflates
 * every reading-time estimate by a few words per heading.
 *
 * Dependency-free.
 */

(function () {
    "use strict";

    var protocol = window.location.protocol;
    if (protocol !== "http:" && protocol !== "https:") return;

    var main = null;
    var status = null;

    /**
     * The anchor this heading should hand out.
     *
     * A heading's own id wins, because writing one is a deliberate act. With
     * no id of its own the heading takes the OUTERMOST ancestor id below
     * <main>, not the nearest one, and that choice is load-bearing. Both pages
     * wrap each section twice: <div id="VibeCodingScourgeDiv"> around
     * <section id="VibeCodingScourge">. Taking the nearest ancestor would hand
     * out #VibeCodingScourge, while feed.xml, the Article JSON-LD @id and url,
     * and the "Cite this guide:" lines all publish #VibeCodingScourgeDiv.
     * Two URLs for one section is a duplicate-anchor problem nobody asked for,
     * so this deliberately agrees with what the rest of the site already says.
     */
    function anchorFor(heading) {
        if (heading.id) return heading.id;
        var found = null;
        var node = heading.parentNode;
        while (node && node !== main) {
            if (node.id) found = node.id;
            node = node.parentNode;
        }
        // Reaching document root without passing through <main> means the
        // heading is not in the region this script owns.
        return node === main ? found : null;
    }

    function urlFor(anchor) {
        return window.location.origin + window.location.pathname + "#" + anchor;
    }

    // Text of the heading without the button's own label, which is appended to
    // the same element. Read before the button is attached, so a plain
    // textContent read would be correct today; taking it explicitly keeps that
    // true if a caller ever re-labels an existing button.
    function headingText(heading) {
        var clone = heading.cloneNode(true);
        var existing = clone.querySelectorAll(".sectionPermalink");
        for (var i = 0; i < existing.length; i++) {
            if (existing[i].parentNode) existing[i].parentNode.removeChild(existing[i]);
        }
        return (clone.textContent || "").replace(/\s+/g, " ").trim();
    }

    function announce(message) {
        if (status) status.textContent = message;
    }

    /**
     * execCommand("copy") on a throwaway textarea. Kept as the fallback for
     * browsers without navigator.clipboard, and for the case where the async
     * write is rejected (a document that is not focused, or a permission
     * policy that blocks it). Returns true only if the copy actually happened.
     */
    function legacyCopy(text) {
        var field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "readonly");
        // Kept out of the layout and out of the accessibility tree. Not
        // display: none, which browsers refuse to select from.
        field.style.position = "fixed";
        field.style.top = "-1000px";
        field.style.opacity = "0";
        field.setAttribute("aria-hidden", "true");
        document.body.appendChild(field);

        var copied = false;
        try {
            field.select();
            copied = document.execCommand("copy");
        } catch (e) {
            copied = false;
        }
        if (field.parentNode) field.parentNode.removeChild(field);
        return copied;
    }

    function copy(url, label) {
        function onSuccess() {
            announce("Link to " + label + " copied to the clipboard.");
        }
        function onFailure() {
            // Say what the link is rather than only that the copy failed: the
            // reader can still select it out of the announcement or the URL
            // bar, and "copy failed" on its own is a dead end.
            announce("Could not copy automatically. The link is " + url);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(onSuccess, function () {
                if (legacyCopy(url)) onSuccess(); else onFailure();
            });
            return;
        }
        if (legacyCopy(url)) onSuccess(); else onFailure();
    }

    function createButton(anchor, label) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sectionPermalink";

        // Visible label plus a hidden continuation, rather than an aria-label
        // that replaces it. The accessible name then still begins with the
        // words a speech-input user can see and say (WCAG 2.5.3), and every
        // button on the page is distinguishable in a screen reader's element
        // list instead of reading as nine identical "Copy link" controls.
        btn.appendChild(document.createTextNode("Copy link"));
        var suffix = document.createElement("span");
        suffix.className = "visually-hidden";
        suffix.textContent = " to " + label;
        btn.appendChild(suffix);

        btn.addEventListener("click", function () {
            copy(urlFor(anchor), label);
        });
        return btn;
    }

    function init() {
        main = document.getElementById("main");
        if (!main) return;
        status = document.getElementById("sectionPermalinkStatus");

        var headings = main.querySelectorAll("h2, h3");
        // Null-prototype so an anchor named "constructor" or "toString" cannot
        // report itself as already claimed.
        var claimed = Object.create(null);

        for (var i = 0; i < headings.length; i++) {
            var heading = headings[i];
            var anchor = anchorFor(heading);
            // No id anywhere above it, or an ancestor already spoken for by an
            // earlier heading. The second case is what stops every h3 in a
            // stance from getting its own button copying the identical URL.
            if (!anchor || claimed[anchor]) continue;
            claimed[anchor] = true;

            var label = headingText(heading);
            if (!label) continue;
            heading.appendChild(createButton(anchor, label));
        }
    }

    // DOMContentLoaded rather than running inline, even though a deferred
    // script already runs after parsing. Every deferred script executes before
    // DOMContentLoaded fires, so doing the work inline here would insert these
    // labels BEFORE reading_engagement.js counts words, no matter where the
    // tag sits in the <head>. Waiting for the event puts this handler behind
    // that one in registration order, which is what the load-order note above
    // actually depends on.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

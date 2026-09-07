/**
 * Section permalink buttons — tech_takes.html, guides.html and
 * tech_resources.html.
 *
 * Appends a "Copy link" button to the end of each section card so a reader can
 * send one stance, one guide or one resource list to someone instead of the
 * whole page. The anchors already existed (the page menu navigates by them, and
 * guides.html prints seven of them as "Cite this guide:" lines); nothing
 * surfaced them.
 *
 * Progressive enhancement in the photo_gallery.js shape: with scripting off no
 * button is rendered at all, so there is nothing dead to tab into. The status
 * paragraph is the one piece that lives in the static markup, for the reason
 * documented on #photoGalleryStatus — a live region only announces changes to
 * content inside a region that already existed, so injecting it here and
 * writing to it on the same click would announce nothing.
 *
 * WHERE THE BUTTON GOES. One control per section card, appended as the card's
 * last child and centered by .sectionPermalinkWrap. This replaced an earlier
 * version that appended the button inline inside the h2, which put a control in
 * the middle of every heading. End-of-card is where the reader who just
 * finished the section is, and it is where guides.html already prints its
 * "Cite this guide:" line.
 *
 * WHICH HEADINGS GET ONE. h2 only, which on all three pages is the heading that
 * names the card. Deeper headings do not get their own control, because a
 * second button at the foot of the same card would copy a different anchor from
 * the same place with nothing to distinguish it. The h2 has no id of its own on
 * any of the three pages: the ids sit on the wrapping <div>/<section>
 * (#VibeCodingScourgeDiv, #dataEngineeringGuideDiv, #cybersecurityResourcesDiv),
 * so each heading resolves its anchor through anchorFor() below.
 *
 * Deliberately not moving focus on copy, matching photo_gallery.js: focus stays
 * on the button that was pressed, so a second press works.
 *
 * file:// IS SUPPORTED, and what it copies is deliberate. An earlier version
 * rendered no buttons at all outside http(s), on the grounds that a local file
 * has no shareable URL. That left the control invisible in every local preview
 * of the site, which is where it is most often looked at during editing. The
 * buttons are now always built, and from a non-http(s) origin they copy the
 * CANONICAL published URL for the page (see canonicalPath), never a
 * file:///C:/... path that would only resolve on this machine. The Clipboard
 * API is unavailable outside a secure context, so those origins fall through to
 * the execCommand path below, which is why that fallback is not dead code.
 *
 * Load order note: this file must stay BELOW reading_engagement.js in the
 * <head> on the two pages that load both. Deferred classic scripts run in
 * document order, so that script's DOMContentLoaded handler registers first and
 * counts each section's words before this button label is added to the DOM.
 * Swapping the two inflates every reading-time estimate by two words per
 * section. tech_resources.html loads no reading-time script and so has no such
 * constraint.
 *
 * Dependency-free. window.PathHelpers is used when present and this file works
 * without it.
 */

(function () {
    "use strict";

    // Where this site is published. Only used to build a shareable URL when the
    // page is being read from something other than http(s), which in practice
    // means a local file:// preview.
    var CANONICAL_ORIGIN = "https://colbymainard.github.io";
    var NESTED_DIR = "/assets/html/";

    var main = null;
    var status = null;

    /**
     * The anchor this section should hand out.
     *
     * A heading's own id wins, because writing one is a deliberate act. With
     * no id of its own the heading takes the OUTERMOST ancestor id below
     * <main>, not the nearest one, and that choice is load-bearing. All three
     * pages wrap each section twice: <div id="VibeCodingScourgeDiv"> around
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

    /**
     * The card the button is appended to: the nearest <section> ancestor, which
     * on all three pages is the element carrying the section shell styling and
     * therefore the visible card. Falling back to the element that owns the
     * anchor keeps a hand-written section without that wrapper working.
     */
    function cardFor(heading, anchor) {
        var node = heading.parentNode;
        while (node && node !== main) {
            if (node.tagName && node.tagName.toLowerCase() === "section") return node;
            node = node.parentNode;
        }
        return document.getElementById(anchor);
    }

    /**
     * The published path for this page, used only off http(s). Mirrors what
     * PathHelpers already knows about the site's two page depths, and asks it
     * when it is loaded rather than keeping a second copy of that knowledge.
     */
    function canonicalPath() {
        var path = window.location.pathname || "";
        var file = path.slice(path.lastIndexOf("/") + 1);
        var nested = window.PathHelpers && typeof window.PathHelpers.isNested === "function"
            ? window.PathHelpers.isNested()
            : path.indexOf(NESTED_DIR) !== -1;

        if (nested) return NESTED_DIR + file;
        // The landing page is published at the bare origin, so copying
        // "/index.html" would hand out a second URL for it.
        return (file === "" || file === "index.html") ? "/" : "/" + file;
    }

    function urlFor(anchor) {
        var protocol = window.location.protocol;
        if (protocol === "http:" || protocol === "https:") {
            return window.location.origin + window.location.pathname + "#" + anchor;
        }
        return CANONICAL_ORIGIN + canonicalPath() + "#" + anchor;
    }

    // Text of the heading, used for the button's accessible name. The button no
    // longer lives inside the heading, but any .sectionPermalink found within
    // is still stripped so a caller that re-labels an existing control cannot
    // fold the old label into the new one.
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
     * browsers without navigator.clipboard, for the case where the async write
     * is rejected (a document that is not focused, or a permission policy that
     * blocks it), and for every non-secure origin, where navigator.clipboard is
     * not exposed at all. Returns true only if the copy actually happened.
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

    function createControl(anchor, label) {
        var wrap = document.createElement("div");
        wrap.className = "sectionPermalinkWrap";

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

        wrap.appendChild(btn);
        return wrap;
    }

    function init() {
        main = document.getElementById("main");
        if (!main) return;
        status = document.getElementById("sectionPermalinkStatus");

        var headings = main.querySelectorAll("h2");
        // Null-prototype so an anchor named "constructor" or "toString" cannot
        // report itself as already claimed.
        var claimed = Object.create(null);

        for (var i = 0; i < headings.length; i++) {
            var heading = headings[i];
            var anchor = anchorFor(heading);
            // No id anywhere above it, or an ancestor already spoken for by an
            // earlier heading. The second case is what stops a card with two
            // h2s from growing two buttons that copy the identical URL.
            if (!anchor || claimed[anchor]) continue;

            var card = cardFor(heading, anchor);
            if (!card) continue;

            var label = headingText(heading);
            if (!label) continue;

            claimed[anchor] = true;
            card.appendChild(createControl(anchor, label));
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

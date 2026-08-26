/**
 * Cookie consent banner.
 *
 * Shows a one-time bottom-of-page banner asking the visitor to accept or
 * reject analytics cookies. Google Analytics is gated behind acceptance —
 * the gtag.js library and analytics initialization are not loaded until
 * the visitor opts in, so no GA cookies are set until then.
 *
 * The banner is a non-modal dialog (role="dialog", aria-modal="false") named
 * by its own message text, inserted immediately after the skip link so the
 * consent choice sits at the second tab stop while "Skip to main content"
 * stays first. It is drawn at the bottom of the viewport by CSS, independent
 * of that DOM position. Focus is deliberately NOT moved into it on load:
 * yanking focus mid-page is more disruptive than the ordering problem it
 * would solve, and DOM position alone puts the buttons within reach.
 *
 * The choice is stored in localStorage as "accepted" or "rejected"; the
 * banner does not reappear on subsequent page loads. Visitors can change
 * their mind via window.cookieConsent.revoke() (linked from the Privacy
 * Policy page).
 *
 * This is a deliberately lightweight, dependency-free implementation —
 * sized for the GDPR / CCPA exposure created by GA4 on a static personal
 * site. It is not a full TCF / IAB-grade Consent Management Platform.
 */

(function () {
    "use strict";

    var STORAGE_KEY = "cm-cookie-consent";
    var GA_MEASUREMENT_ID = "G-G9Q4KZE3X1";

    var protocol = window.location.protocol;
    var isHttp = protocol === "http:" || protocol === "https:";
    // Page depth comes from path_helpers.js, shared with
    // service_worker_register.js, so the two cannot disagree about how far the
    // current page sits from the site root. If that script did not load there
    // is no honest way to build the link, so the banner keeps working and
    // renders its message without one rather than pointing somewhere wrong.
    var paths = window.PathHelpers;
    var privacyHref = paths ? paths.toRoot("assets/html/privacy.html") : null;

    var banner = null;

    function readConsent() {
        try {
            return window.localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function writeConsent(value) {
        try {
            window.localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* private mode or storage blocked — choice will not persist */
        }
    }

    function clearConsent() {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            /* ignore */
        }
    }

    function loadAnalytics() {
        if (window.__cmAnalyticsLoaded) return;
        window.__cmAnalyticsLoaded = true;
        if (!isHttp) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID);

        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
        document.head.appendChild(script);
    }

    // Mirrors the createButton helper in back_to_top.js. The two consent buttons
    // are the same element differing only in label, modifier class, and the value
    // they record, so the choice is the parameter rather than a whole handler.
    // Unlike back_to_top's version this does not attach the button itself: both
    // land in the same .cookieConsent-actions row, and appending there is the
    // caller's job.
    function createButton(label, modifierClass, choice) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cookieConsent-button " + modifierClass;
        btn.textContent = label;
        btn.addEventListener("click", function () { onChoice(choice); });
        return btn;
    }

    // The banner's message. Its id is what the wrapper's aria-labelledby points
    // at, so the two must stay in step; keeping them in sibling helpers rather
    // than one long function is what makes that pairing easy to see.
    function createMessage() {
        var msg = document.createElement("p");
        msg.className = "cookieConsent-message";
        msg.id = "cookieConsentMessage";
        var text = "This site loads Google Analytics so the owner can see which pages are read. " +
                   "Analytics cookies are only set if you accept. " +
                   "Nothing is stored on this server, and your data is never sold.";
        if (privacyHref) {
            text += " See the <a href=\"" + privacyHref + "\">privacy policy</a> for details.";
        }
        msg.innerHTML = text;
        return msg;
    }

    function createActions() {
        var actions = document.createElement("div");
        actions.className = "cookieConsent-actions";

        // Reject first, matching the visual order in .cookieConsent-actions: the
        // secondary action reads before the primary one so neither choice is
        // buried behind the other in the tab order.
        actions.appendChild(createButton("Reject", "cookieConsent-reject", "rejected"));
        actions.appendChild(createButton("Accept", "cookieConsent-accept", "accepted"));

        return actions;
    }

    // Non-modal dialog rather than a live region. The previous
    // role="region" + aria-live="polite" pairing never announced: assistive
    // technology watches a live region for content changing *inside a region
    // that already exists*, and this element is built fully populated and
    // inserted in one operation, so there was nothing to observe when the
    // content arrived. A dialog named by its own message is announced when
    // focus reaches it, which is what the live region was reaching for.
    // aria-modal is false because the rest of the page stays usable — the
    // banner does not trap focus and nothing behind it is inert.
    function createBanner() {
        var wrap = document.createElement("div");
        wrap.className = "cookieConsent";
        wrap.id = "cookieConsent";
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-modal", "false");
        wrap.setAttribute("aria-labelledby", "cookieConsentMessage");

        var inner = document.createElement("div");
        inner.className = "cookieConsent-inner";
        inner.appendChild(createMessage());
        inner.appendChild(createActions());

        wrap.appendChild(inner);
        return wrap;
    }

    function showBanner() {
        if (banner) return;
        banner = createBanner();
        // Insert near the top of <body>, not at the end. Appending put the
        // consent choice at the very end of the tab order, behind every link on
        // pages that run to 1,600-2,300 lines, so a keyboard or screen-reader
        // user had to traverse the whole page to answer a question a mouse user
        // answers in one click (WCAG 2.4.3 Focus Order).
        //
        // Placed *after* the skip link rather than before it: "Skip to main
        // content" must stay the first thing in the tab order and the
        // accessibility tree. That still leaves consent at the second stop.
        // Visual placement is unaffected — .cookieConsent is position: fixed
        // with a z-index, so DOM order does not change where it draws.
        var skipLink = document.querySelector('body > a[href="#main"]');
        if (skipLink) {
            document.body.insertBefore(banner, skipLink.nextSibling);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
        if (typeof window.requestAnimationFrame === "function") {
            window.requestAnimationFrame(function () {
                if (banner) banner.classList.add("visible");
            });
        } else {
            banner.classList.add("visible");
        }
    }

    function hideBanner() {
        if (!banner) return;
        var leaving = banner;
        banner = null;
        leaving.classList.remove("visible");
        setTimeout(function () {
            if (leaving && leaving.parentNode) {
                leaving.parentNode.removeChild(leaving);
            }
        }, 320);
    }

    function onChoice(value) {
        writeConsent(value);
        if (value === "accepted") {
            loadAnalytics();
        }
        hideBanner();
    }

    function revoke() {
        clearConsent();
        hideBanner();
        showBanner();
    }

    function wirePreferenceControls() {
        var actions = {
            accept: function () { onChoice("accepted"); },
            reject: function () { onChoice("rejected"); },
            revoke: revoke
        };
        var nodes = document.querySelectorAll("[data-cookie-consent]");
        for (var i = 0; i < nodes.length; i++) {
            (function (node) {
                var action = node.getAttribute("data-cookie-consent");
                if (actions[action]) {
                    node.addEventListener("click", function (e) {
                        e.preventDefault();
                        actions[action]();
                        updateStatusLabel();
                    });
                }
            })(nodes[i]);
        }
        updateStatusLabel();
    }

    function updateStatusLabel() {
        var label = document.getElementById("cookieConsentStatus");
        if (!label) return;
        var current = readConsent();
        var text;
        if (current === "accepted") {
            text = "Analytics cookies: accepted";
        } else if (current === "rejected") {
            text = "Analytics cookies: rejected";
        } else {
            text = "Analytics cookies: no choice recorded yet";
        }
        label.textContent = text;
    }

    function init() {
        var current = readConsent();
        if (current === "accepted") {
            loadAnalytics();
        } else if (current !== "rejected") {
            showBanner();
        }
        wirePreferenceControls();
    }

    window.cookieConsent = {
        getStatus: readConsent,
        accept: function () { onChoice("accepted"); },
        reject: function () { onChoice("rejected"); },
        revoke: revoke
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

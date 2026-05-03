/**
 * Cookie consent banner.
 *
 * Shows a one-time bottom-of-page banner asking the visitor to accept or
 * reject analytics cookies. Google Analytics is gated behind acceptance —
 * the gtag.js library and analytics initialization are not loaded until
 * the visitor opts in, so no GA cookies are set until then.
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
    var isNested = (window.location.pathname || "").indexOf("/assets/html/") !== -1;
    var privacyHref = isNested ? "./privacy.html" : "./assets/html/privacy.html";

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

    function createBanner() {
        var wrap = document.createElement("div");
        wrap.className = "cookieConsent";
        wrap.id = "cookieConsent";
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-live", "polite");
        wrap.setAttribute("aria-label", "Cookie consent");

        var inner = document.createElement("div");
        inner.className = "cookieConsent-inner";

        var msg = document.createElement("p");
        msg.className = "cookieConsent-message";
        msg.innerHTML = "This site loads Google Analytics so the owner can see which pages are read. " +
                        "Analytics cookies are only set if you accept. " +
                        "Nothing is stored on this server, and your data is never sold. " +
                        "See the <a href=\"" + privacyHref + "\">privacy policy</a> for details.";
        inner.appendChild(msg);

        var actions = document.createElement("div");
        actions.className = "cookieConsent-actions";

        var rejectBtn = document.createElement("button");
        rejectBtn.type = "button";
        rejectBtn.className = "cookieConsent-button cookieConsent-reject";
        rejectBtn.textContent = "Reject";
        rejectBtn.addEventListener("click", function () { onChoice("rejected"); });
        actions.appendChild(rejectBtn);

        var acceptBtn = document.createElement("button");
        acceptBtn.type = "button";
        acceptBtn.className = "cookieConsent-button cookieConsent-accept";
        acceptBtn.textContent = "Accept";
        acceptBtn.addEventListener("click", function () { onChoice("accepted"); });
        actions.appendChild(acceptBtn);

        inner.appendChild(actions);
        wrap.appendChild(inner);
        return wrap;
    }

    function showBanner() {
        if (banner) return;
        banner = createBanner();
        document.body.appendChild(banner);
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

/**
 * clipboard.js
 *
 * Adds copy-to-clipboard buttons next to the email address and PGP key
 * fingerprint in the contact footer. Tooltip ("Copied!") confirms the
 * action. Falls back gracefully if clipboard API or AnimeJS are absent.
 *
 * The buttons are injected at runtime so the footer remains fully usable
 * (just mailto + .asc download links) when JavaScript is disabled.
 */

(function () {
    "use strict";

    var COPY_GLYPH = "⧉";      /* two joined squares — copy icon */
    var COPIED_GLYPH = "✓";    /* check mark */
    var COPY_RESET_MS = 1600;
    var TOOLTIP_LIFETIME_MS = 1400;

    function makeButton(valueToCopy, ariaLabel) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copyToClipboard";
        btn.setAttribute("aria-label", ariaLabel);
        btn.setAttribute("title", ariaLabel);
        btn.setAttribute("data-clipboard-value", valueToCopy);
        btn.textContent = COPY_GLYPH;
        // A native <button> already synthesizes a click on Enter/Space, so no
        // separate keydown handler is needed (one would fire the copy twice).
        btn.addEventListener("click", onClick);
        return btn;
    }

    function makeTooltip(text) {
        var tip = document.createElement("span");
        tip.className = "copyTooltip";
        tip.setAttribute("role", "status");
        tip.setAttribute("aria-live", "polite");
        tip.textContent = text;
        return tip;
    }

    function showTooltip(anchorButton, text) {
        var existing = anchorButton.parentNode.querySelector(".copyTooltip");
        if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
        }
        var tip = makeTooltip(text);
        anchorButton.parentNode.insertBefore(tip, anchorButton.nextSibling);

        if (typeof window.anime !== "undefined" && window.anime.animate) {
            window.anime.animate(tip, {
                opacity: [0, 1],
                translateY: ["6px", "0px"],
                scale: [0.92, 1],
                duration: 220,
                ease: "outQuad"
            });
        } else {
            tip.style.opacity = "1";
        }

        setTimeout(function () {
            if (!tip.parentNode) return;
            if (typeof window.anime !== "undefined" && window.anime.animate) {
                window.anime.animate(tip, {
                    opacity: [1, 0],
                    translateY: ["0px", "-6px"],
                    duration: 200,
                    ease: "inQuad",
                    onComplete: function () {
                        if (tip.parentNode) tip.parentNode.removeChild(tip);
                    }
                });
            } else {
                if (tip.parentNode) tip.parentNode.removeChild(tip);
            }
        }, TOOLTIP_LIFETIME_MS);
    }

    function copyValue(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(value);
        }
        return Promise.reject(new Error("Clipboard API unavailable"));
    }

    function onClick(event) {
        if (event && event.preventDefault) event.preventDefault();
        var btn = this;
        var value = btn.getAttribute("data-clipboard-value") || "";
        copyValue(value).then(function () {
            btn.textContent = COPIED_GLYPH;
            btn.classList.add("copied");
            showTooltip(btn, "Copied!");
            setTimeout(function () {
                btn.textContent = COPY_GLYPH;
                btn.classList.remove("copied");
            }, COPY_RESET_MS);
        }).catch(function () {
            showTooltip(btn, "Copy failed");
        });
    }

    /**
     * Find each <a> link of interest and inject a copy button immediately
     * after it. The button's value comes from the link's textContent
     * (trimmed) — for the email this is the address; for the PGP key it
     * is the fingerprint string.
     */
    function attachToLink(link, label) {
        if (!link || link.dataset.clipboardAttached === "true") return;
        var raw = link.textContent || "";
        var value = raw.replace(/\s+/g, " ").trim();
        if (!value) return;
        link.dataset.clipboardAttached = "true";
        var btn = makeButton(value, label);
        if (link.parentNode) {
            link.parentNode.insertBefore(btn, link.nextSibling);
        }
    }

    function init() {
        var contact = document.getElementById("contactMe");
        if (!contact) return;

        var emailLink = contact.querySelector('a[href^="mailto:"]');
        attachToLink(emailLink, "Copy email address");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

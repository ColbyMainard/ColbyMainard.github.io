# Accessibility Remediation Plan

**Site:** Colby Mainard — Personal Website (`ColbyMainard.github.io`)
**Date:** 2026-06-06
**Conformance target:** WCAG 2.1 **AA**, with **AAA** enhancements where practical
**Scope:** All 6 HTML pages, 7 SCSS files, and 12 JS files in the repository

---

## 1. Overview

This document is the output of a manual accessibility audit of the entire static site. Its
purpose is to give a prioritized, actionable roadmap for bringing the site to WCAG 2.1 AA, with
selected AAA improvements where they are low-risk and high-value.

The site is already in good shape on the fundamentals (semantic landmarks, headings, alt text,
keyboard-operable controls). The gaps that remain are concentrated in three areas: **motion**
(animations ignore the user's reduced-motion preference), **keyboard navigation** (no way to skip
the repeated header), and **color contrast** (one nav-link pairing fails AA).

Pages audited:

| Page | File |
| ------ | ------ |
| Home / profile | `index.html` |
| Hobbies | `assets/html/hobbies.html` |
| Guides | `assets/html/guides.html` |
| Technical Resources | `assets/html/tech_resources.html` |
| Technical Stances | `assets/html/tech_takes.html` |
| Privacy Policy | `assets/html/privacy.html` |

---

## 2. Methodology

- **Manual static audit** of the HTML structure, SCSS styling, and JS behavior, evaluated against the WCAG 2.1 success criteria.
- Findings cite the specific file(s) and the relevant WCAG criterion + level.

**Recommended follow-up testing** (to be run once fixes are implemented — not part of this audit):

- **Automated scanners:** [axe DevTools](https://www.deque.com/axe/devtools/), Chrome **Lighthouse** (Accessibility category), and [WAVE](https://wave.webaim.org/).
- **Contrast checker:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) for every foreground/background pairing in the palettes.
- **Manual keyboard pass:** Tab/Shift-Tab through every page; confirm visible focus, logical order, and that nothing is a keyboard trap.
- **Screen-reader pass:** NVDA (Windows) and/or VoiceOver (macOS) — verify landmarks, headings, link text, and that animations/decorative elements are announced sensibly.
- **OS toggles:** test with "Reduce motion" enabled and with Windows High Contrast / forced-colors mode active.

---

## 3. Current strengths (preserve these)

These are already implemented correctly. Any remediation work should be careful **not** to regress
them:

- `lang="en"` is set on every page's `<html>` element.
- Exactly **one `<h1>` per page**, with a logical `h1 → h2 → h3 → h4` nesting.
- Consistent semantic **landmarks** on every page: `<header>`, two labeled `<nav>` regions (`aria-label="Site navigation"` and `aria-label="Page sections"`), `<main id="main">`, and `<footer id="footer">`.
- Decorative SVG graphics are correctly hidden from assistive tech with `aria-hidden="true" focusable="false"`.
- Data tables use `<caption class="visually-hidden">`, `<th scope="col">`, and `<th scope="row">`.
- The mobile menu toggle is a real `<button>` with `aria-label`, `aria-controls`, and a working `aria-expanded` state (toggled in `assets/js/navbar.js`).
- All images (on the hobbies page) have descriptive `alt` text, explicit `width`/`height`, and `loading="lazy"`.
- No `target="_blank"`, no `href="#"` placeholders, no inline `onclick`, and no links that depend on JavaScript to function.
- A `:focus-visible` custom focus ring already exists; `outline: none` is only ever used paired with a focus-visible replacement.
- A `.visually-hidden` utility class is defined and in use.
- Dynamically-injected widgets already carry ARIA: the back-to-top button has an `aria-label`, the cookie banner uses `aria-live="polite"`, and the clipboard "copied" tooltip uses `aria-live`.
- There is already a precedent for `@media (prefers-reduced-motion: reduce)` in `tech_takes.scss`, so the pattern is established in the codebase.

---

## 4. Prioritized findings

Priority key: **P0 Critical** (blocks users / clear failures) → **P1 High** → **P2 Medium** →
**P3 Low / AAA polish**. Effort is a rough relative estimate (S / M / L).

### P0 — Critical

#### P0-1 · Animations ignore `prefers-reduced-motion`

- **WCAG:** 2.3.3 Animation from Interactions (AAA); related to 2.2.2 Pause, Stop, Hide (A).
- **Affected:** `assets/js/index_animations.js`, `assets/js/hobbies_animations.js`, `assets/js/tech_resources_animations.js`, `assets/js/tech_takes_animations.js`, `assets/js/guides_animations.js`; also `assets/js/back_to_top.js` and the global `html { scroll-behavior: smooth; }` in `assets/css/default.scss`.
- **Problem:** Every content section animates in on scroll (translate / scale / rotate / opacity via AnimeJS). None of these scripts check the user's reduced-motion preference, so users with vestibular sensitivities get the full motion experience with no opt-out.
- **Critical constraint:** content is hidden by CSS **only when JS is active** — the rule `html.js-animations { … { opacity: 0; } }` (see `assets/css/index.scss:462` and `assets/css/tech_takes.scss:612`) is gated on the `js-animations` class that each animation script adds to `<html>`. The script then animates opacity back to 1. **Therefore a naive "skip the animation" guard would leave content permanently invisible.**
- **Recommended remediation:**
  1. At the top of each `*_animations.js` file, detect the preference: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  2. If reduced motion is preferred, **do not add the `.js-animations` class** and **do not set up the IntersectionObserver** — return early. Content then renders in its natural, fully-visible state with no motion.
  3. Add a CSS safety net so content is never trapped invisible:

     ```scss
     @media (prefers-reduced-motion: reduce) {
       html.js-animations { /* every gated section */ > * { opacity: 1 !important; } }
     }
     ```

  4. In `back_to_top.js`, when reduced motion is preferred, show/hide the button instantly and jump to top with `window.scrollTo(0, 0)` (no AnimeJS tween, no `behavior: 'smooth'`).
  5. Wrap the global smooth scroll so it degrades to `auto`:

     ```scss
     @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
     ```

- **Effort:** M (repeated across 5 animation files + back-to-top + CSS).

#### P0-2 · No "skip to main content" link

- **WCAG:** 2.4.1 Bypass Blocks (A).
- **Affected:** all 6 HTML pages; `assets/css/default.scss` (new `.skip-link` style).
- **Problem:** The sticky header presents up to 11 navigation links before `<main>` on every page. Keyboard and screen-reader users must traverse all of them on each page load.
- **Recommended remediation:**
  1. Add, as the **first child of `<body>`** on each page: `<a class="skip-link" href="#main">Skip to main content</a>`.
  2. Add `.skip-link` styling to `default.scss`: positioned off-screen by default, brought on-screen on `:focus` (do **not** use `display: none`, which removes it from tab order).
  3. Add `tabindex="-1"` to the existing `<main id="main">` so focus reliably lands there when the link is activated.
- **Effort:** S.

#### P0-3 · Color-contrast failure on primary navigation links

- **WCAG:** 1.4.3 Contrast (Minimum) (AA); for AAA, 1.4.6 Contrast (Enhanced).
- **Affected:** `assets/css/default.scss` (header nav link color); audit extends to all per-page SCSS palette usage.
- **Problem:** Primary nav links use `$emerald_efficiency_4` (`#a1d9b0`) on the header background `$emerald_efficiency_1` (`#007a5e`). Measured contrast ≈ **3.2:1**, below the **4.5:1** AA threshold for normal-size text (the links render at ~95% font size).
- **Recommended remediation:**
  1. Use a lighter foreground (e.g. `$emerald_efficiency_5` `#e0f7fa`, which is near-white and clears AA comfortably on the same background), or darken the header background — then **re-measure** with a contrast checker.
  2. Audit every other foreground/background pairing across the three palettes (noir / smart / emerald) used in the per-page SCSS, including hover states such as `.nav-brand:hover` (`#50c3a1`). For the **AAA** target, aim for **7:1** on body text and **4.5:1** on large text.
- **Effort:** M (one clear fix + a full palette sweep).

### P1 — High

#### P1-1 · Current page not indicated in navigation

- **WCAG:** Best practice for orientation (supports 2.4.8 Location, AAA).
- **Affected:** all 6 HTML pages (primary `<nav>`); optional style in `default.scss`.
- **Problem:** The primary nav repeats on every page but nothing tells assistive tech which page is current.
- **Recommended remediation:** add `aria-current="page"` to the link matching the current page (these pages are hand-authored, so this is static per file). Optionally add an `.is-current` visual treatment.
- **Effort:** S.

#### P1-2 · Focus rings invisible in forced-colors / High Contrast mode

- **WCAG:** 1.4.11 Non-text Contrast (AA), 1.4.13 Content on Hover or Focus (AA); AAA robustness.
- **Affected:** `assets/css/default.scss` (the `:focus-visible` blocks).
- **Problem:** Focus indication relies on `box-shadow`. In Windows High Contrast / `forced-colors: active`, `box-shadow` is dropped, so keyboard focus becomes invisible.
- **Recommended remediation:** in each `:focus-visible` rule, **also** set a real `outline` (e.g. `outline: 3px solid transparent; outline-offset: 2px;`) so forced-colors mode substitutes a system color, or add a dedicated `@media (forced-colors: active)` block. Verify the focus indicator has ≥ 3:1 contrast against adjacent colors on every interactive element (links, buttons, back-to-top, cookie buttons).
- **Effort:** S–M.

### P2 — Medium

#### P2-1 · Reading-progress bar semantics

- **WCAG:** 4.1.2 Name, Role, Value (A); 1.3.1 Info and Relationships (A).
- **Affected:** `assets/js/tech_takes_engagement.js` (reading progress bar).
- **Problem:** The decorative reading-progress bar is given an `aria-label` ("Reading progress") but has no `role` and no value — a labelled element with no role/value is confusing to screen readers.
- **Recommended remediation:** choose one —
  - **Preferred (it's decorative):** mark the bar `aria-hidden="true"` and drop the `aria-label`.
  - **Or, if it should be exposed:** give it `role="progressbar"` with `aria-valuemin="0"`, `aria-valuemax="100"`, and an `aria-valuenow` updated as the user scrolls.
- **Effort:** S.

### P3 — Low / AAA polish

#### P3-1 · Presentational `<u>` used for inline labels

- **WCAG:** 1.3.1 Info and Relationships (A) — semantics; readability.
- **Affected:** `index.html` and others (labels like "Start Date:", "Topics:", "Goals include:").
- **Problem:** `<u>` carries no semantic meaning and can be mistaken for a link.
- **Recommended remediation:** replace with `<strong>` or a styled class; where the content is genuinely label/value pairs, prefer a `<dl>` / `<dt>` / `<dd>` structure. (Large but low-risk find-and-replace.)
- **Effort:** M (volume), low risk.

#### P3-2 · Navigation links not wrapped in a list

- **WCAG:** AAA best practice.
- **Affected:** all 6 HTML pages (both `<nav>` regions).
- **Problem:** Nav links are bare `<a>` elements. Many screen-reader users navigate by list and rely on announced item counts.
- **Recommended remediation:** wrap the primary and section nav links in `<ul><li>…</li></ul>` (update the corresponding SCSS to keep the visual layout).
- **Effort:** M.

#### P3-3 · Near-duplicate image alt text

- **WCAG:** 1.1.1 Non-text Content (A).
- **Affected:** `assets/html/hobbies.html` (two photos: "Sunset hidden behind trees" and "Sunset hidden behind trees 2").
- **Recommended remediation:** make the two `alt` values distinct and descriptive (describe what differs between the photos).
- **Effort:** S.

#### P3-4 · Mobile menu focus management

- **WCAG:** 2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A); AAA polish.
- **Affected:** `assets/js/navbar.js`.
- **Problem:** `navbar.js` toggles `aria-expanded` correctly, but the open-menu keyboard experience should be verified.
- **Recommended remediation:** confirm that `Esc` closes the menu and returns focus to the toggle button, and that focus order through the open menu is logical.
- **Effort:** S.

#### P3-5 · Touch-target sizing

- **WCAG:** 2.5.8 Target Size (Minimum) (AA, WCAG 2.2); 2.5.5 Target Size (AAA).
- **Affected:** header nav links and cookie-consent buttons (`default.scss`, `privacy_policy.scss`).
- **Problem:** The back-to-top button is 44px on mobile (good); other tap targets should be checked.
- **Recommended remediation:** ensure interactive targets are at least **24×24px** (AA) and ideally **44×44px** (AAA), with adequate spacing.
- **Effort:** S.

---

## 5. Suggested implementation sequencing

Implement in priority order; each phase is independently shippable.

1. **Phase 1 — Critical (P0):** reduced-motion support, skip link, nav-link contrast fix. Highest user impact; addresses the only outright AA failures.
2. **Phase 2 — High (P1):** `aria-current` on nav, forced-colors focus rings.
3. **Phase 3 — Medium (P2):** reading-progress bar semantics.
4. **Phase 4 — Polish (P3):** `<u>` → semantic markup, list-wrapped nav, distinct alt text, mobile focus management, touch-target sizing.

**Build note:** any change to a `.scss` file requires recompiling to `assets/css/default.css` (`sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`). Per project convention, **the site owner compiles SCSS manually** — leave the compile step to them.

---

## 6. Verification & testing checklist

After each phase:

- [ ] Run **axe DevTools** and **Lighthouse** (Accessibility) on every page — no new violations.
- [ ] **Keyboard-only pass:** Tab from page load — the skip link appears first and works; focus is always visible; order is logical; no traps.
- [ ] **Reduced-motion:** enable the OS "Reduce motion" setting — no entrance animations fire and **all content is fully visible**; back-to-top jumps instantly; anchor scrolling is instant.
- [ ] **Forced-colors / High Contrast:** focus indicators remain visible on all controls.
- [ ] **Contrast:** re-check every changed color pairing against the AA (and, where targeted, AAA) thresholds.
- [ ] **Screen-reader spot check** (NVDA/VoiceOver): landmarks, headings, link text, current-page announcement, and decorative elements behave as expected.

---

## 7. Maintenance recommendations

- Add an accessibility line item to the pull-request checklist (contrast, keyboard, reduced motion, alt text, ARIA on any new dynamic widget).
- Re-run the automated scanners whenever a new page or interactive component is added.
- Re-audit periodically (e.g., annually) and when the color palette or animation system changes.

---

*This plan is a documentation deliverable only — no application code was modified in producing it. Implementation of the fixes above is a separate, follow-up task.*

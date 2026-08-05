# Accessibility Audit Report

**Last Updated:** 2026-08-04
**Scope:** all seven pages (`index.html`, `404.html`, and the five pages in `assets/html/`), the shared scripts in `assets/js/`, and the SCSS in `assets/css/`.
**Method:** static review of markup, script-generated DOM, and stylesheet behavior. No browser automation was run, so contrast values quoted from the SCSS comments were not re-measured.

## Executive summary

This site is in unusually good accessibility shape for a personal portfolio. The fundamentals that most sites miss are all present and consistent: every page carries a skip link and a focusable `<main>`, every image has a descriptive alt attribute, every data table has a caption and scoped headers, both navigation landmarks are labeled, and animation is gated behind `prefers-reduced-motion` in both the stylesheet and the JavaScript. There are no `target="_blank"` links anywhere, so no unexpected window changes.

What remains are four narrow defects rather than systemic gaps. The most significant is that the reading progress bar injects a decorative ARIA widget as the first element in `<body>`, ahead of the skip link, on the two longest pages. The second is that the cookie consent banner is appended to the end of the document, so keyboard-only visitors must traverse the entire page before they can accept or reject analytics.

## Findings

### [HIGH] Reading progress bar is injected ahead of the skip link

- **Files:** `assets/js/reading_engagement.js:78` (insertion), `assets/js/reading_engagement.js:67-76` (ARIA attributes)
- **Affects:** `assets/html/tech_takes.html`, `assets/html/guides.html` (the two pages that load `reading_engagement.js`)
- **What:** `createProgressBar()` ends with `document.body.insertBefore(bar, document.body.firstChild)`, which makes the progress bar the very first node in `<body>`. The skip link, which is authored as the first element in the HTML source, is pushed to second position at runtime.
- **Why it matters:** A screen reader user starting at the top of the document now encounters a `role="progressbar"` widget announced as "Reading progress, 0%" before reaching "Skip to main content." The skip link exists precisely so that the first thing in the reading order is a way out of the page furniture. Putting a purely decorative indicator in front of it defeats that. The bar also carries `aria-valuenow`, which `updateProgress()` rewrites on every animation frame during scroll; assistive technology that tracks progressbar values will churn on a value the user cannot act on.
- **Fix:** The bar conveys nothing a screen reader user cannot get from the scroll position itself, so remove it from the accessibility tree entirely and drop the now-pointless ARIA bookkeeping:

  ```js
  function createProgressBar() {
      var bar = document.createElement("div");
      bar.id = "reading-progress";
      bar.setAttribute("aria-hidden", "true");   // decorative: replaces role/aria-value* below
      // ...
  }
  ```

  Then delete the `aria-valuenow` write in `updateProgress()`. If the indicator should stay exposed for some reason, keep the ARIA but insert it after the skip link (`skipLink.insertAdjacentElement("afterend", bar)`) rather than at `body.firstChild`.

### [MEDIUM] Cookie consent banner sits last in the tab order

- **File:** `assets/js/cookie_consent.js:113`
- **What:** `showBanner()` calls `document.body.appendChild(banner)`. CSS pins the banner to the bottom of the viewport, so it looks like an overlay, but in DOM order it is the final element on the page, after the footer.
- **Why it matters:** The banner is visually the most prominent thing on a first visit and it asks for a decision, yet a keyboard-only visitor has to tab through every link in the header, the entire body, and the whole footer before reaching Accept or Reject. On `index.html` that is several hundred tab stops. The `aria-live="polite"` region announces the banner text to a screen reader immediately, which creates the opposite problem: the user is told a choice is waiting but the controls to make it are at the far end of the document.
- **Why it is not HIGH:** the banner is non-modal and the rest of the page stays fully usable without answering it, so nobody is blocked. This is a friction defect, not a barrier.
- **Fix:** Insert the banner at the start of `<body>` instead, so its position in the reading and tab order matches its visual prominence:

  ```js
  document.body.insertBefore(banner, document.body.firstChild);
  ```

  Do not move focus into the banner automatically. Stealing focus on load is its own violation, and a polite live region plus an early tab position is the accessible combination here. Note the ordering interaction with the finding above: if both are changed, the intended `<body>` order is skip link, then cookie banner, then progress bar.

### [MEDIUM] Photography gallery ships roughly 20 MB of unresized images

- **File:** `assets/html/hobbies.html:134-138`
- **What:** The five gallery photos are served at full DSLR resolution (3000x2000, 3.5 MB to 5.0 MB each) and scaled down by CSS. `assets/images/miscellaneous/DEFCON33.jpeg` adds another 2.1 MB at 2100x2800.
- **Why it matters:** This is an accessibility issue and not only a performance one. Visitors on metered mobile data, older devices, or rural connections face a page that takes minutes to settle, and the layout continues shifting as each multi-megabyte image arrives. WCAG has no byte budget, but "the page is unusable on my connection" is an access barrier in practice. The `loading="lazy"` and explicit `width`/`height` attributes already present are the right mitigations and they are correctly applied; the underlying file sizes are the problem.
- **Fix:** Export web-sized derivatives (roughly 1600px wide, plus a 800px variant) and serve them with `srcset`/`sizes`, keeping the full-resolution file only if a click-to-enlarge view is wanted. See the SEO and feature reports for the same item viewed from those angles; this should be fixed once and counted once.

### [LOW] In-page navigation target lives outside `<main>`

- **Files:** `index.html:160` (the nav link), `index.html:2308` (the target)
- **What:** The "Page sections" navigation includes a link to `#contactMe`, but `<section class="contactMe" id="contactMe">` is inside `<footer id="footer">`, not inside `<main>`.
- **Why it matters:** A screen reader user who follows a link labeled as a page section lands in the `contentinfo` landmark. Landmark-based navigation and the section nav then disagree about where the page content ends. The impact is small because the destination content is exactly what the link promised.
- **Fix:** Either move the contact section into `<main>` and leave only the copyright and policy links in the footer, or relabel the nav entry so it does not read as a body section. The first option is the more conventional structure for a portfolio, since contact details are primary content on this kind of site.

### [LOW] Decorative SVGs carry a `<desc>` that nothing can reach

- **Files:** `index.html:182`, `index.html:268`, `index.html:1757`, `index.html:1806`, `index.html:2248`, `index.html:2275` (the `<desc>` line of each section icon)
- **What:** The inline section icons are correctly marked `aria-hidden="true" focusable="false"`, and they also contain a `<desc>` element (for example `<desc>Laptop Bag SVG</desc>`).
- **Why it matters:** Nothing breaks. `aria-hidden` removes the whole subtree from the accessibility tree, so the `<desc>` is unreachable by assistive technology and serves only as a source comment. This is worth noting only so that the pattern is not copied forward as if it were doing accessibility work.
- **Fix:** No change needed to existing icons; `aria-hidden="true"` is the correct treatment for decoration. For any **new** inline SVG that carries meaning, use `role="img"` plus a `<title>` (not `<desc>`) as the accessible name, which is the convention this project has settled on.

## What is already correct and should be preserved

- **Skip link and focus target on all seven pages.** `<a href="#main" class="visually-hidden">Skip to main content</a>` paired with `<main class="main" id="main" tabindex="-1">`. The `tabindex="-1"` is the part most sites forget; without it the skip link moves the reading cursor but not keyboard focus. Note that the link is deliberately always hidden rather than revealed on focus, which is this project's established choice.
- **Complete, descriptive alt text.** All six images on `hobbies.html` have alt text that describes the actual scene rather than restating the filename, and no image anywhere on the site is missing the attribute.
- **Every data table is properly structured.** All 14 tables across the site pair a `visually-hidden` `<caption>` with `scope`-ed `<th>` cells (`index.html` 2 tables, `tech_resources.html` 9, `tech_takes.html` 2, `hobbies.html` 1). Caption counts match table counts exactly on every page.
- **Both navigation landmarks are labeled** and distinct: `aria-label="Site navigation"` and `aria-label="Page sections"` (`index.html:144`, `index.html:153`), repeated consistently on every page.
- **Motion is gated in both layers.** `prefers-reduced-motion` is honored in the stylesheet (`default.scss:201`, `:224`, `:659`, `:945`; `tech_takes.scss:253`) and independently in the scripts (`animation_helpers.js:34`, `back_to_top.js:18`, `easter_egg.js:48`), so reduced-motion users are covered whether or not the animation scripts run.
- **The nav toggle is a correct disclosure widget.** `navbar.js` maintains `aria-expanded` in sync with the visual state, closes on Escape, and explicitly returns focus to the toggle button afterward. It also sets `aria-current="page"` on the active link.
- **No `target="_blank"` anywhere on the site**, so there are no unannounced new windows and no `rel="noopener"` gaps.
- **`lang="en"` on all seven pages**, and `<abbr title="...">` expansions used consistently for jargon on the home page (VAE, ETL, RAG, AML, PII, CV).
- **Visible focus indicators** are defined throughout `default.scss` using `:focus-visible`, so pointer users do not see focus rings while keyboard users do.
- **Course detail disclosures use native `<details>`/`<summary>`** with a `visually-hidden` span disambiguating each one ("Course details for Analysis of Algorithms"), which gives screen reader users unique link text without visual repetition.

## Suggested order of work

1. `aria-hidden` the reading progress bar and drop its ARIA value bookkeeping. Small, isolated, and removes a defect from the two most-read pages.
2. Move the cookie banner to the start of `<body>`. One line.
3. Resize the photography assets. Larger job, shared with the SEO and feature reports.
4. Decide whether the contact section belongs in `<main>`. Structural, worth doing alongside any other home page edit.

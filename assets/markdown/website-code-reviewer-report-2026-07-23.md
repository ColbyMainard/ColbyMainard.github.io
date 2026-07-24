# Website Code Review Report

**Date:** 2026-07-23
**Reviewer:** website-code-reviewer agent
**Scope:** HTML / SCSS / JavaScript across the full site

## Executive summary

The site is in good shape overall: accessibility patterns (skip links, `scope`-ed table headers, `visually-hidden` captions, ARIA on the nav toggle), structured data, and the cookie-consent/service-worker CORS workarounds are implemented carefully and are well-documented with intent-revealing comments. The JavaScript animation system (`animation_helpers.js` + per-page `*_animations.js`) is a genuine refactor away from duplicated boilerplate, and the reduced-motion safety nets are consistently applied. The most significant remaining problems are DRY violations: the six per-page SCSS partials re-implement nearly identical section/table/animation-gating boilerplate with only color variables differing, and two JS files duplicate the same protocol/path-detection logic verbatim. There is also a concrete violation of the project's own "styling only from default.css" rule (inline `style=` attributes on decorative SVGs), and several functions exceed the stated 25-line/3-argument guidelines. None of these are urgent (the site works correctly, degrades gracefully, and is accessible), but they represent real, fixable maintenance debt.

## Findings

### F-1: Inline `style` attributes on SVGs violate the "styling only from default.css" rule

- **Severity:** High
- **Category:** HTML / CSS cross-cutting
- **Location:** `index.html` lines 183, 267-270, 1794-1822 (decorative work-history, education, and technical-skills SVGs)
- **Issue:** CLAUDE.md/AGENTS.md state styling should be imported from `default.css`/SCSS, and the site otherwise scrupulously avoids inline styles. These SVGs hardcode colors via `style="fill:...;stroke:...;stroke-width:3"` directly in the markup (e.g. `style="fill:none;stroke:#AA7333;stroke-width:3"`), bypassing the palette-variable system entirely.
- **Recommendation:** Move fill/stroke values into SCSS classes (e.g. `.svgLaptopBag path { stroke: $palette-var; }`) so a future palette change doesn't require hunting through HTML for hardcoded hex values.

### F-2: Pervasive duplication of section/table/animation-gating boilerplate across SCSS partials

- **Severity:** High
- **Category:** SCSS
- **Location:** `index.scss` (`%indexSection` lines 33-92, table block 98-141), `hobbies.scss` (`%hobbySection` 36-89, table 120-153), `tech_takes.scss` (`%techTakeSection` 57-116, `%techTakeTable` 119-187), `tech_resources.scss` (`%resourceSection` 33-118), `guides.scss` (`%guideSection` 13-113), `page_not_found.scss` (`%notFoundSection` 32-87)
- **Issue:** All six placeholders re-declare the identical structural rule set (heading font-sizes, `text-align: left`, link underline/hover behavior, `ul li` color, and the double/groove-bordered table skeleton) with only the palette variable swapped. The `html.js-animations`/`prefers-reduced-motion` gating blocks are likewise copy-pasted per file. This directly contradicts "the dependencies minimal to ease maintenance... Don't repeat yourself" — any structural tweak (e.g. changing `h3` size) requires editing 6+ files in lockstep.
- **Recommendation:** Extract a parameterized `@mixin pageSection($bg, $h1, $h2, $h3, $link, ...)` and a `@mixin dataTable($border-color)` in `default.scss`, and have each partial call the mixin with its own palette instead of re-declaring the whole ruleset.

### F-3: Redundant `class`/`id` pairs with no matching CSS selector (dead markup)

- **Severity:** Medium
- **Category:** HTML / CSS cross-cutting
- **Location:** e.g. `index.html` line 177 (`<section class="workHistory" id="workHistory">`), `tech_takes.html` line 218 (`class="KAN" id="KAN"`), `hobbies.html` line 111 (`class="quantumComputing" id="quantumComputing"`), `privacy.html` (`<section class="privacySection">`, repeated on every section)
- **Issue:** Every SCSS partial targets sections by **ID** (`#workHistory { @extend %indexSection; }`, `#analyticsDiv { @extend %privacySection; }`), not by class. The matching `class` attribute on the same element (or, on `privacy.html`, the class on the inner `<section>` while the ID lives on the outer wrapping `<div>`) is never referenced by any stylesheet or script. This is disinformation for future maintainers — the class name implies a styling hook that doesn't exist.
- **Recommendation:** Either remove the unused `class` attributes, or intentionally switch the SCSS to target the classes instead of the IDs (freeing the IDs to serve purely as anchor/fragment targets, which is their only current live use).

### F-4: Duplicate protocol/path-detection logic in two JS files

- **Severity:** Medium
- **Category:** JavaScript
- **Location:** `cookie_consent.js` lines 25-27, `service_worker_register.js` lines 14-16
- **Issue:** Both files independently compute the identical three lines:

  ```js
  var protocol = window.location.protocol;
  var isHttp = protocol === "http:" || protocol === "https:";
  var isNested = (window.location.pathname || "").indexOf("/assets/html/") !== -1;
  ```

  This is a direct DRY violation; a future change to how "nested page" is detected (e.g. adding a new subdirectory) has to be made in two places or will silently drift.
- **Recommendation:** Extract a tiny shared classic script (e.g. `page_location.js`) exposing `window.PageLocation = { isHttp, isNested }`, loaded before both consumers, mirroring the existing `animation_helpers.js` pattern.

### F-5: `addStep` takes 4 parameters, exceeding the argument-count guideline

- **Severity:** Medium
- **Category:** JavaScript
- **Location:** `animation_helpers.js` line 53, `function addStep(tl, targets, params, position)`
- **Issue:** The stated standard caps function arguments at 3 and recommends combining frequently-co-traveling arguments into an object. `addStep` is called dozens of times across every `*_animations.js` file with all 4 positional arguments, making call sites harder to read (`addStep(tl, directChildren(el, "h2"), {...}, ">-300")`) and error-prone if two arguments are transposed.
- **Recommendation:** Bundle `params` and `position` into a single options object (`addStep(tl, targets, { ...params, position: ">-300" })`), reducing the signature to 3 arguments.

### F-6: `animation_helpers.js`'s `run()` exceeds the 25-line guideline and mixes concerns

- **Severity:** Medium
- **Category:** JavaScript
- **Location:** `animation_helpers.js` lines 91-139
- **Issue:** `run()` is ~48 lines and does four distinct things inline: reduced-motion/anime guards, DOM class toggling, defining the `onIntersect` IntersectionObserver callback, and defining/dispatching `init()`. This violates both the line-count and "each function does one thing" guidance, and makes the orchestration harder to unit-reason about in isolation.
- **Recommendation:** Hoist `onIntersect` and `init` to named top-level functions within the IIFE (they don't need `sections`/`animationMap` closures if passed as parameters), leaving `run()` as a short dispatcher.

### F-7: `cookie_consent.js`'s `createBanner()` exceeds the 25-line guideline

- **Severity:** Medium
- **Category:** JavaScript
- **Location:** `cookie_consent.js` lines 72-111
- **Issue:** `createBanner()` is ~40 lines of imperative DOM construction (wrapper, message, two buttons, wiring). It does one conceptual thing ("build the banner") but its length makes it hard to scan for the one behavior that matters (the accept/reject wiring) among the boilerplate `createElement`/`className` calls.
- **Recommendation:** Split into `buildMessage()`, `buildActions()`, and `buildBanner()` (composing the two), each well under 25 lines.

### F-8: `service-worker.js`'s single `fetch` handler mixes navigation and asset-caching logic

- **Severity:** Medium
- **Category:** JavaScript
- **Location:** `service-worker.js` lines 78-129
- **Issue:** One `fetch` event listener body handles method/origin filtering, a full network-first navigation strategy, and a full cache-first asset strategy, all inline (~50 lines total). This is a single function doing three distinct jobs, making it harder to test or modify one strategy without touching the other.
- **Recommendation:** Extract `handleNavigation(request)` and `handleAsset(request)` named functions; keep the top-level listener as a short dispatcher based on `request.mode`.

### F-9: Data tables lack `<thead>`/`<tbody>` semantic wrapping

- **Severity:** Medium
- **Category:** HTML
- **Location:** All tables site-wide, e.g. `index.html` lines 287-296 and 627-634, `hobbies.html` lines 212-224, `tech_resources.html` (every book/podcast table), `tech_takes.html` lines 312-319
- **Issue:** Every table's header `<tr>` sits as a direct child of `<table>` alongside the data `<tr>`s, with no `<thead>`/`<tbody>` grouping. `scope="col"`/`scope="row"` (correctly present) covers the primary accessibility need, but the missing structural grouping is still a "clean, standard HTML" gap under the Robust principle — some AT table-navigation commands and print/style hooks rely on `thead`/`tbody` being explicit.
- **Recommendation:** Wrap the first `<tr>` in `<thead>` and the remainder in `<tbody>` across all data tables; no visual change is expected since `%*Table` placeholders don't currently style `thead`/`tbody` specifically.

### F-10: Inconsistent attribute formatting for sibling `<div>`s on the same page

- **Severity:** Low
- **Category:** HTML
- **Location:** `index.html` lines 2227-2230 (`certificationsDiv`) and 2254-2257 (`otherSkillsDiv`) vs. every other top-level section `<div>` on the same page (e.g. line 163, single-line attributes)
- **Issue:** Two `<div>`s break `class`/`id` onto separate lines while every sibling on the same page (and every other page) keeps them on one line. This is a formatting-consistency violation with no discernible reason (both elements are structurally identical to their neighbors).
- **Recommendation:** Normalize to the single-line form used by every other section wrapper.

### F-11: `manifest.json` declares only one icon size

- **Severity:** Low
- **Category:** Cross-cutting (config)
- **Location:** `manifest.json` lines 9-16
- **Issue:** Only a single 256×256 `any maskable` icon is declared. Standard PWA installability guidance (and Lighthouse's PWA audit) expects at least a 192×192 and a 512×512 icon so different platforms/launchers can pick an appropriately-sized asset without upscaling.
- **Recommendation:** Export 192×192 and 512×512 PNGs from the existing `favicon.xcf` source and add both entries to the `icons` array; remember to add the new files to `service-worker.js` `PRECACHE_URLS` and bump `CACHE_VERSION`.

### F-12: Commented-out dead palette definitions clutter every SCSS partial

- **Severity:** Low
- **Category:** SCSS
- **Location:** `index.scss` lines 3-22, `hobbies.scss` lines 3-34, `tech_takes.scss` lines 3-44, `tech_resources.scss` lines 3-16
- **Issue:** Each partial carries several fully commented-out alternate color palettes (e.g. `// $sunset_glow_1: #ffb84d;` blocks). These aren't comments explaining intent — they're disabled code retained "just in case," which the comment standards' "avoid redundancy" guidance argues against; they add scroll/reading overhead with no runtime value.
- **Recommendation:** If these are genuinely candidate palettes for future pages, move them to a single `_palette_archive.scss` (not `@import`ed) or a dated markdown note in `assets/markdown/`; otherwise delete them.

### F-13: Magic numbers repeated instead of named constants

- **Severity:** Low
- **Category:** JavaScript / SCSS
- **Location:** `default.scss` line 50 and `page_not_found.scss` line 26 (`@media (max-width: 768px)` repeated literal), and animation offset strings like `">-300"`/`">-400"` repeated 30+ times across every `*_animations.js` file
- **Issue:** The mobile breakpoint (`768px`) and the timeline overlap offsets are literal strings/numbers copy-pasted at every use site rather than named once. A future breakpoint change means grepping every SCSS file; an animation-timing tweak means auditing every animation function for the same magic offset.
- **Recommendation:** For SCSS, introduce a `$breakpoint-mobile: 768px;` variable in `default.scss`. For the JS offsets, this is a minor stylistic nit given each is tuned per-animation — lower priority than the SCSS breakpoint constant.

### F-14: Deprecated `<meta name="keywords">` retained on every page

- **Severity:** Low
- **Category:** HTML
- **Location:** e.g. `index.html` line 9, `tech_takes.html` line 40, `hobbies.html` line 39, `tech_resources.html` line 40, `guides.html` line 40, `privacy.html` line 39
- **Issue:** No major search engine has used the `keywords` meta tag for ranking in over a decade; it's pure maintenance surface that must be kept in sync with content changes for zero benefit.
- **Recommendation:** Not urgent, but consider dropping it opportunistically the next time each page's content is touched, rather than as a dedicated cleanup pass.

### F-15: `current_time.js` remains unused dead weight (already known)

- **Severity:** Low
- **Category:** JavaScript
- **Location:** `assets/js/current_time.js`; referenced only in `service-worker.js` line 27 `PRECACHE_URLS`
- **Issue:** Per the task's own known-deviations list this is already flagged as legacy/unreferenced; noting it here only for completeness since it's actively precached (wasted bytes) despite no page loading it.
- **Recommendation:** Confirm no external consumer, then delete the file and its `PRECACHE_URLS` entry (with a `CACHE_VERSION` bump) in a future pass.

## What the code does well

- Contrast-ratio math is documented inline for nearly every color decision in every SCSS file (e.g. `tech_takes.scss` lines 48-53, `privacy_policy.scss` lines 4-9), making future palette edits auditable rather than guesswork.
- The reduced-motion strategy is applied consistently and safely: every animated partial pairs its `html.js-animations { opacity: 0 }` gate with a `@media (prefers-reduced-motion: reduce)` safety net that force-reveals content, so a bug can never trap content at `opacity: 0`.
- `animation_helpers.js` is a genuine, well-commented DRY improvement over what the code comments say used to be six copies of the same IntersectionObserver/timeline wiring.
- Accessibility patterns are applied uniformly: `visually-hidden` table captions, `scope`-ed `th`s, `aria-hidden`/`focusable="false"` on decorative SVGs, a real skip link, and `aria-expanded`/`aria-controls` on the mobile nav toggle.
- The `file://`/CORS tradeoffs (manifest injection, `404.html`'s relative-path caveat, cookie-consent gating of GA) are each explained with a comment describing *why*, not just *what* — exactly the "comments should explain intent" standard in practice.
- `service-worker.js` correctly distinguishes navigation (network-first, so stale HTML is never trapped) from asset requests (cache-first for speed), and only caches same-origin, successful responses.
- Cookie consent is properly gate-keeping: `cookie_consent.js` never touches `dataLayer`/`gtag` until explicit acceptance, matching the stated GA policy.

## Suggested remediation order

1. Extract the shared SCSS `%*Section`/table/animation-gating boilerplate into parameterized mixins (F-2) — the single highest-leverage fix, since it currently multiplies every future styling change by 6.
2. Move inline SVG `style` attributes into SCSS classes (F-1) — restores the "one styling source of truth" invariant the project explicitly requires.
3. Extract the duplicated `isHttp`/`isNested` logic into a shared script (F-4) — small, low-risk, removes a drift hazard.
4. Refactor the three oversized functions — `run()`, `createBanner()`, the service-worker `fetch` handler (F-6, F-7, F-8) — into smaller named pieces; do this alongside any unrelated future edit to those files rather than as a standalone pass.
5. Clean up dead/confusing markup: redundant class/id pairs (F-3), commented-out palettes (F-12), `thead`/`tbody` (F-9), and the one formatting inconsistency (F-10) — batch these as a low-risk housekeeping pass.
6. Address the remaining low-severity items (manifest icon sizes, magic numbers, keywords meta, `current_time.js`) opportunistically whenever the touched file is already being edited for another reason.

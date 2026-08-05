# Website Code Review Report

**Last Updated:** 2026-08-04
**Scope:** all 13 scripts in `assets/js/`, `service-worker.js`, the SCSS entry point and its seven partials, the root metadata files (`sitemap.xml`, `feed.xml`, `robots.txt`, `manifest.json`), and the head/script wiring plus representative body markup of all seven pages.
**Method:** static read-through by the `website-code-reviewer` agent. Every finding below was independently re-verified against the source before publication; verification notes are recorded per finding. Two findings were extended during verification, as noted.

## Executive summary

This codebase is unusually mature and well-audited for a personal site. The SCSS uses a shared mixin library (`sectionShell`, `headingRamp`, `proseLinks`, `dataTable`, `animationGate`) that keeps seven per-page palettes and their contrast math consistent without duplicating structure across partials. The JavaScript is uniformly defensive: nearly every DOM query is null-guarded, animation respects `prefers-reduced-motion` in two independent layers, and the `file://` versus `http(s)` split is handled explicitly and documented inline at the point of decision.

Cross-file metadata is genuinely synchronized, which is rare and worth stating plainly. All seven `feed.xml` entries match the corresponding `Article` JSON-LD dates in `tech_takes.html` and the in-page "Last Updated" lines exactly. `PRECACHE_URLS` lists all 13 shipped JavaScript files with no stale or missing entries.

The defects are narrow and all cheaply fixable. Two components exist in CSS and JavaScript with no HTML left to drive them, one accessibility regression concerns where the reading progress bar inserts itself, and one duplicate-ID bug appears in a narrow cookie-consent path. None are user-blocking.

**One scope note.** This review evaluated `PRECACHE_URLS` for *correctness* and found it accurate: every listed path resolves to a real file. It did not evaluate the list for *weight*. The six image entries in that list total roughly 22 MB and are covered as a separate finding in the SEO report. Both conclusions are correct; they are answers to different questions.

## Findings

### [MEDIUM] Reading progress bar is inserted ahead of the skip link

- **File:** `assets/js/reading_engagement.js:78`
- **Category:** accessibility
- **Verified:** yes. Independently found by the accessibility audit as well; see the cross-report note below.
- **What:** `createProgressBar()` inserts the bar as the literal first child of `<body>` via `document.body.insertBefore(bar, document.body.firstChild)`, placing it ahead of the `<a href="#main" class="visually-hidden">Skip to main content</a>` link that is otherwise first in `<body>` on every page. This affects `tech_takes.html` and `guides.html`, the only two pages loading this script.
- **Why it matters:** Tab operability is unaffected, since the bar carries no `tabindex` and is never a tab stop. But a screen reader user browsing linearly with a virtual cursor now meets "Reading progress, progress indicator, 0%" before "Skip to main content," on every load of the two longest pages on the site, which is exactly where a skip link earns its keep. It quietly undermines a pattern this project deliberately maintains.
- **Fix:** Insert after the skip link rather than at `body.firstChild`. The bar is `position: fixed`, so its visual placement is unaffected by DOM position:

  ```js
  var skipLink = document.querySelector('a[href="#main"]');
  if (skipLink) {
      skipLink.insertAdjacentElement("afterend", bar);
  } else {
      document.body.insertBefore(bar, document.body.firstChild);
  }
  ```

- **Cross-report note:** the accessibility audit reached the same conclusion by a different route and recommends the stronger remedy of marking the bar `aria-hidden="true"` and dropping its `role="progressbar"` and `aria-valuenow` bookkeeping entirely, on the grounds that the indicator is decorative and conveys nothing a screen reader user cannot get from scroll position. That remedy supersedes this one, since an `aria-hidden` element cannot be encountered by a virtual cursor regardless of where it sits. Apply the accessibility report's version. If the bar is instead kept exposed for some reason, apply the reposition above.

### [MEDIUM] Orphaned `.takesIndex` styles have no HTML consumer

- **File:** `assets/css/tech_takes.scss:154`, `assets/css/tech_takes.scss:186-227`
- **Category:** maintainability
- **Verified:** yes. `grep -rn 'takesIndex' assets/html/ index.html` returns nothing, while `assets/css/default.css` contains the compiled rules at lines 385, 389, 419, 422, 425, 429, and 432.
- **What:** `tech_takes.scss` defines a fully styled `.takesIndex` component (label, list, `time`, link states, roughly 42 lines) plus a dedicated `@include animationGate("#introSectionDiv", "> .takesIndex");` at line 154. No element with that class exists anywhere in the HTML. `#introSectionDiv` in `tech_takes.html` goes straight from the disclaimer paragraph to the `.feedSubscribe` link and closes.
- **Why it matters:** Roughly 50 lines of compiled CSS plus an animation-gate rule ship to every visitor and can never match anything. The block's own comment describes "the six takes" while the page now has seven, so the dead code has already drifted from the page it claims to style. That is the real cost: a future maintainer either debugs why the index does not render, or writes fresh markup against a stale comment and reintroduces a second desynchronized source of truth.
- **Fix:** Decide the feature's fate rather than leaving it ambiguous. Either build it (add a `<nav class="takesIndex">` under `#introSectionDiv` listing all seven takes with dates, matching the existing label/list/`time` structure) or delete the CSS block, the `animationGate` call, and the stale comment at lines 149-154. Deleting requires recompiling `default.css` and bumping `CACHE_VERSION`.
- **Worth noting:** building it would be a genuine improvement. A dated index of all seven stances at the top of the page would help both readers and crawlers, and the styling is already written.

### [LOW] Dead `<svg>` animation steps and selectors on pages with no SVGs

- **Files:** `assets/js/tech_resources_animations.js:62`, `:93`, `:127`, `:158`, `:189`, `:220`; `assets/css/tech_resources.scss:60`; `assets/css/hobbies.scss:91`
- **Category:** maintainability
- **Verified:** yes, and **extended**. The original finding covered `tech_resources` only. Verification showed the same dead selector in `hobbies.scss:91`.
- **What:** All six section-animation functions in `tech_resources_animations.js` include an `addStep(tl, directChildren(el, "svg"), ...)` step, but `tech_resources.html` contains zero `<svg>` elements. The `animationGate` child selector lists in both `tech_resources.scss:60` and `hobbies.scss:91` also include `> svg`, and `hobbies.html` likewise contains zero SVGs.
- **Confirming evidence that this is drift rather than intent:** `index_animations.js` contains exactly 6 SVG steps and `index.html` contains exactly 6 `<svg>` elements, a perfect match. The `tech_resources` and `hobbies` versions were clearly copied from the index pattern and kept after the SVGs were dropped. `index.scss:129` is the one `> svg` selector that is doing real work.

  | File | SVG animation steps | SVGs in the page | Status |
  | ---- | ------------------- | ---------------- | ------ |
  | `index_animations.js` | 6 | 6 | Alive |
  | `tech_resources_animations.js` | 6 | 0 | Dead |
  | `guides_animations.js` | 0 | 0 | Consistent |
  | `hobbies_animations.js` | 0 | 0 | Consistent (but see `hobbies.scss:91`) |
  | `tech_takes_animations.js` | 0 | 0 | Consistent |
  | `404_animations.js` | 0 | 0 | Consistent |

- **Why it matters:** No user-facing bug. `addStep` guards against empty targets, so nothing throws. The cost is six unreachable animation steps plus two CSS selectors matching nothing, all of them one copy-paste away from being reproduced on the next page added.
- **Fix:** Remove the six `directChildren(el, "svg")` steps from `tech_resources_animations.js`, and drop `> svg` from the `animationGate` calls in `tech_resources.scss:60` and `hobbies.scss:91`. Leave `index.scss:129` alone. Recompile and bump `CACHE_VERSION`.

### [LOW] Duplicate banner IDs when consent is reset while the banner is visible

- **File:** `assets/js/cookie_consent.js:75` (the hardcoded id), `:120-133` (`hideBanner`), `:143-147` (`revoke`)
- **Category:** correctness
- **Verified:** yes, by tracing the call path.
- **What:** `createBanner()` hardcodes `wrap.id = "cookieConsent"`. `hideBanner()` sets the module-level `banner` to `null` immediately but detaches the DOM node on a 320ms `setTimeout`. `revoke()` calls `hideBanner()` then `showBanner()` in the same tick. Because `showBanner()`'s guard is `if (banner) return;` and `banner` is already `null`, it proceeds to build and append a second element carrying the same id while the first is still in the document.
- **Why it matters:** Any time a visitor clicks "Reset choice" on `privacy.html` while a banner is already on screen, two `<div id="cookieConsent">` elements coexist for up to 320ms, both `position: fixed` at the same spot, one fading out and one fading in. That is invalid HTML and a brief visual double-banner flash. It is cosmetic rather than functional, since `pointer-events` prevents interaction with the stale copy.
- **Why it is genuinely narrow:** in the common path the visitor has already chosen, so no banner is showing, `hideBanner()` returns early, and nothing duplicates. The bug needs a banner visible at the moment revoke is clicked.
- **Fix:** Remove the outgoing node synchronously in `revoke()` rather than waiting for the transition:

  ```js
  function revoke() {
      clearConsent();
      if (banner && banner.parentNode) {
          banner.parentNode.removeChild(banner);
      }
      banner = null;
      showBanner();
  }
  ```

### [LOW] `protocol` / `isHttp` / `isNested` detection duplicated across two scripts

- **Files:** `assets/js/cookie_consent.js:25-27`, `assets/js/service_worker_register.js:14-16`
- **Category:** duplication
- **Verified:** yes.
- **What:** Both scripts compute the identical three-line block deriving `protocol`, `isHttp`, and `isNested` from `window.location`.
- **Why it matters:** Minor. If the definition of "nested page" ever changes, for instance if the site gains a second level of directory nesting, it has to be found and updated in two independent places, and nothing keeps the copies in sync.
- **Fix:** Not worth acting on now. Three lines duplicated once is cheaper than a shared helper file, which would itself need a `PRECACHE_URLS` entry and a `CACHE_VERSION` bump per this project's own checklist, and would add a load-order dependency between two scripts that are currently independent. Revisit if a third script needs the same check. Recorded here so the duplication is a known, deliberate choice rather than an unnoticed one.

## What is already good

- **Shared SCSS mixin architecture** (`default.scss:40-210`: `sectionShell`, `headingRamp`, `bodyText`, `listText`, `blockQuote`, `proseLinks`, `dataTable`, `animationGate`) removes what the file's own comments describe as six-file-lockstep duplication, and all seven partials consume it consistently.
- **Inline WCAG AA contrast documentation on every palette**, with exact ratios recorded and justified at the point of definition (`index.scss:26-28`, `tech_takes.scss:48-53`, `hobbies.scss:3-13`, `page_not_found.scss:1-10`). Recording the arithmetic next to the colors is what keeps the next edit from silently breaking contrast.
- **`animation_helpers.js` centralizes the hard parts** (the reduced-motion guard, the `anime`-availability guard, the `.js-animations` toggle, and the `IntersectionObserver` wiring at `:91-139`) so all six page-specific animation files stay declarative: a section map plus per-section functions.
- **Reduced motion is honored in two independent layers**, a JavaScript check plus a CSS `@media (prefers-reduced-motion: reduce)` safety net, in `back_to_top.js`, `easter_egg.js`, `animation_helpers.js`, and the `animationGate` mixin. The consequence is that an OS setting toggled mid-session can never strand content at `opacity: 0`, which is the failure mode most scroll-animation implementations ship with.
- **Cross-file metadata is actually in sync.** All seven `feed.xml` entry dates match the `Article` JSON-LD in `tech_takes.html` and the in-page "Last Updated" lines. `PRECACHE_URLS` covers all 13 shipped JS files with nothing stale or missing.
- **`file://` versus `http(s)` handling is explicit and documented where the decision is made**: `cookie_consent.js:25-28`, `service_worker_register.js:14-24`, and the header comment in `404.html:5-15` explaining its relative-path tradeoffs.
- **Focus management in the Konami-code easter egg** (`easter_egg.js:67-79`, `:137-156`) restores focus to the previously focused element on close, scopes its Escape handler to the card rather than the document, and defends against a mid-session reduced-motion toggle. This is more care than the feature strictly needed.
- **Analytics gating is correct.** `loadAnalytics()` (`cookie_consent.js:56-70`) is only ever reached from an explicit acceptance or a previously stored one.
- **The service worker's install handler tolerates a bad precache entry without failing the whole install**, and logs the skip rather than swallowing it (`service-worker.js:52-59`), with a comment explaining why the warning matters.

## Suggested order of work

1. Fix the reading progress bar insertion, using the accessibility report's `aria-hidden` remedy. Shared item, counted once.
2. Fix `revoke()` in `cookie_consent.js`. Four lines.
3. Delete the dead SVG steps and the two dead `> svg` selectors. Recompile, bump `CACHE_VERSION`.
4. Decide `.takesIndex`: build it or delete it. Building it is the better outcome if there is appetite for it.
5. Leave the `protocol`/`isHttp`/`isNested` duplication alone until a third caller appears.

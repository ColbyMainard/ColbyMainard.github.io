# Code Review: 2026-10-30

Source: a full-site run of the `website-code-reviewer` agent, with each finding then spot-checked against the source before it was written here.

## Scope

- Pages: `index.html`, `404.html`, and the five pages in `assets/html/`.
- Styles: all eight SCSS files in `assets/css/`, plus spot checks of the seven compiled stylesheets against their SCSS.
- Scripts: the sixteen site scripts in `assets/js/` and `service-worker.js`. The vendored `assets/js/vendor/anime.umd.min.js` was skipped because it is never edited.
- Cross-file contracts in `CLAUDE.md` and `AGENTS.md`, plus `feed.xml`, `sitemap.xml`, `llms.txt`, `manifest.json`, `robots.txt`, and `.github/workflows/static.yml`.

Documented deliberate exceptions are not flagged. These include the hidden skip links, the `abbr[title]` rule, `privacy.html` without animation scripts, the `404.html` script omissions and relative paths, and the unprecached large media.

## Summary

| Severity | Count |
| -------- | ----- |
| Critical | 0 |
| High | 0 |
| Medium | 1 |
| Low | 8 |

**Line numbers** refer to commit `b7c1db0`. The working tree now has uncommitted comment-only deletions in four SCSS files, and they shift two cited lines: `hobbies.scss:98` is now line 96, and `default.scss:1017` is now line 961.

"Verified" means the problem was read directly in the source for this report. "Plausible" means the code supports the conclusion, but it was not reproduced in a browser.

## Findings (most severe first)

### CR-1. Medium: gallery controls render when they should be hidden

- **File:** `assets/css/hobbies.scss`, line 98 (compiled to `assets/css/hobbies.css`, line 627). The markup is `assets/html/hobbies.html`, line 192.
- **Status:** Verified.
- **Problem:** The rule `#photography .photoGallery-controls { display: flex; }` outranks the browser's built-in `[hidden] { display: none; }` rule. As a result, the controls `<div>` at `hobbies.html:192` still draws even though it has the `hidden` attribute. With scripting off, or if `photo_gallery.js` fails, visitors see "Previous photo" and "Next photo" buttons that do nothing. That breaks the "no dead buttons" contract stated in `photo_gallery.js` and in both agent guides. The same problem is already solved for `.cookiePreferences` at `default.scss:1015-1017`.
- **Fix:** Add `&[hidden] { display: none; }` inside the `.photoGallery-controls` block in `hobbies.scss`, then recompile `hobbies.css` and bump `CACHE_VERSION`.

### CR-2. Low: above-the-fold hero image is lazy-loaded

- **File:** `assets/html/hobbies.html`, line 129.
- **Status:** Verified.
- **Problem:** The intro image (`DEFCON33.jpeg`, 2100×2800, about 2.1 MB) is the page's largest visible element, yet it carries `loading="lazy"`. Lazy loading delays the fetch until layout decides the image is near the viewport, which pushes back Largest Contentful Paint.
- **Fix:** Remove `loading="lazy"` from this one image and add `fetchpriority="high"`.

### CR-3. Low: gallery serves multi-megabyte originals with no smaller variant

- **File:** `assets/html/hobbies.html`, lines 163, 169, 175, 181, 187.
- **Status:** Verified.
- **Problem:** Each slide loads a 3000×2000 original (3.5 to 5.0 MB) into a box at most 70vh tall. There is no `srcset` or resized copy, so every photo a mobile visitor steps through costs several megabytes.
- **Fix:** Export roughly 1600 px wide derivatives, reference them through `src` and `srcset`, and link each one to its full-size original.

### CR-4. Low: YouTube embed contacts Google before any visitor choice

- **File:** `assets/html/hobbies.html`, line 141.
- **Status:** Verified.
- **Problem:** The privacy-enhanced YouTube `iframe` loads as soon as it nears the viewport, with no click. That sends the visitor's IP address to Google, while the cookie banner describes only analytics. `privacy.html` line 193 discloses the embed, so this is a gap between disclosure and consent, not an undisclosed leak.
- **Fix:** Replace the iframe with a click-to-load facade (a thumbnail button that inserts the iframe on activation). Keep the existing plain YouTube link at line 143 as the no-script fallback.

### CR-5. Low: league acronyms are not marked up with `<abbr>`

- **File:** `assets/html/tech_takes.html`, lines 843-849, and `index.html`, line 266.
- **Status:** Verified.
- **Problem:** The site convention wraps each acronym in `<abbr title="...">` on first use in a section. MLB, NBA, PGA, NHL, PFL, UFL, and NFL are bare in the `tech_takes.html` list, and NFL, NHL, MLB, and NBA are bare in the `index.html` work-history bullet. Screen-reader and unfamiliar readers get no expansion.
- **Fix:** Wrap the first use of each league name in each section in `<abbr title="...">` (for example, `<abbr title="National Football League">NFL</abbr>`). Then update the counts in CR-6.

### CR-6. Low: agent guides overstate the `<abbr>` count

- **File:** `CLAUDE.md`, line 20, and `AGENTS.md`, line 78.
- **Status:** Verified.
- **Problem:** Both guides say `index.html` has 10 `<abbr>` elements and the site has 84. The actual counts are 8 on `index.html` and 82 site-wide. The other five per-page counts are correct. An agent that trusts the guides will chase two elements that do not exist.
- **Fix:** Change both guides to `index.html` (8) and a total of 82, or to the new totals if CR-5 lands first.

### CR-7. Low: `navbar.js` starts only on `DOMContentLoaded`

- **File:** `assets/js/navbar.js`, line 147.
- **Status:** Verified.
- **Problem:** Every other site script uses a `document.readyState === "loading"` guard so it still starts if it runs after the DOM is ready. `navbar.js` registers only a `DOMContentLoaded` listener. If the tag ever loses `defer` or is injected after parsing, the nav toggle, Escape handling, `--header-height`, and section tracking never start, and nothing logs an error.
- **Fix:** Move the listener body into a named `init()` function and call it through the same `readyState` guard the other scripts use.

### CR-8. Low: last section-nav entry may never be marked current

- **File:** `assets/js/navbar.js`, line 98.
- **Status:** Plausible (derived from the code, not reproduced in a browser).
- **Problem:** The observer watches a band from 25% to 35% of the viewport height (`rootMargin: "-25% 0px -65% 0px"`). The final "Contact Me" entry points at the short footer section. When the page is scrolled to the bottom, that section can sit below the band and never intersect it. The previous section then keeps `aria-current="location"`, so screen-reader and sighted users get the wrong "you are here" cue.
- **Fix:** In `createCurrentMarker().update` (line 54), mark the last tracked entry whenever the window is scrolled to the bottom of the document.

### CR-9. Low: em dash in the installed-app name

- **File:** `manifest.json`, line 2.
- **Status:** Verified.
- **Problem:** The PWA name is `"Colby Mainard — Machine Learning Engineer"`. The site's copy style avoids em dashes, and this string appears in install prompts and app launchers.
- **Fix:** Change it to `"Colby Mainard: Machine Learning Engineer"` and bump `CACHE_VERSION`, because `manifest.json` is precached.

## Checked and found correct

- **Script order:** `path_helpers.js` sits directly above `cookie_consent.js` on all six non-404 pages. On `tech_takes.html` and `guides.html`, `section_permalinks.js` sits below `reading_engagement.js` with its explanatory comment. The AnimeJS bundle precedes `animation_helpers.js` on every animated page. `easter_egg.js` loads on all seven pages.
- **Precache:** `PRECACHE_URLS` covers all seven pages, all seven stylesheets, and all seventeen scripts. The large media is deliberately excluded, and every linked stylesheet and script exists on disk.
- **Stylesheets and inline code:** Each page links only its own stylesheet, and no `default.css` exists. No page has inline styles, inline scripts, or a hardcoded manifest link.
- **Privacy and `file://`:** Google Analytics loads only after consent. No fetch, XHR, or module scripts exist.
- **Structured data:** The sitewide Person `@id` appears exactly 46 times (23 / 18 / 5). `tech_resources.html` has 104 Person and 3 Organization nodes with no `@id`. All JSON-LD parses. The dates in the feed, sitemap, `llms.txt`, and pages agree.
- **Styles:** Mixin call counts match the guides. Every element hidden by the animation gate is also animated. Sampled color pairs meet WCAG AA.
- **Accessibility:** Tables have captions and scoped headers, images have `alt`, and the iframe has a `title`. Focus moves only after visitor actions, and reduced motion is honored.

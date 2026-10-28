# Accessibility Audit: 2026-10-27

Last Updated: 2026-10-27

The `accessibility-audit-runner` skill has no real audit specification, so this audit was done by hand against WCAG 2.2 AA. It covers all seven pages, the shared and per-page SCSS, and every script that injects or controls interactive elements.

Findings are ranked most severe first. Each gives the file, the line, the problem, and one recommended fix. Impact and Effort use the shared H/M/L anchors so the roadmap can merge them. No site file was changed.

## Overall state

The site's accessibility foundation is strong. Each of these checks passed:

- Every page declares `lang="en"`, has exactly one `h1`, and skips no heading levels.
- Every `<img>` has descriptive `alt` text, and the one `<iframe>` has a `title` plus a plain-link fallback.
- All 15 data tables have a `<caption>`, `scope`-ed header cells, and a focusable, labelled `.tableScroll` region for horizontal overflow.
- Every interactive element in `default.scss` has a `:focus-visible` outline.
- `prefers-reduced-motion` is honored by the animation gate, smooth scrolling, the reading-progress bar, and the easter-egg card.
- Forced-colors mode restores card boundaries.
- The cookie banner is the second tab stop and reserves scroll padding so a focused element is never hidden behind it.

The findings below are therefore all Medium or Low.

## Findings

### A11Y-1. Medium. Gallery controls appear as dead buttons when JavaScript is off (WCAG 4.1.2, 2.5.3 spirit)

- **File:** `assets/css/hobbies.scss:98`. The markup is at `assets/html/hobbies.html:192`.
- **Problem:** `.photoGallery-controls { display: flex; }` overrides the `hidden` attribute on `#photoGalleryControls`. Without scripting, the "Previous photo" and "Next photo" buttons render and do nothing. Screen-reader users hear two operable-sounding buttons that have no effect.
- **Fix:** Add `&[hidden] { display: none; }` inside `.photoGallery-controls` in `hobbies.scss`. Then recompile `hobbies.css` and bump `CACHE_VERSION`.
- **Impact:** M. **Effort:** L. (Same defect as code-review CR-1.)

### A11Y-2. Low. "Copy link" drops keyboard focus to `<body>` on `file://` and non-secure origins (WCAG 2.4.3 Focus Order)

- **File:** `assets/js/section_permalinks.js:175`.
- **Problem:** The `execCommand` fallback calls `select()` on a temporary textarea, which moves focus to it, and then removes the textarea. Focus falls back to `<body>`, so the keyboard user's next Tab starts from the top of the page. On https the Clipboard API path is used and focus is unaffected.
- **Fix:** Store `document.activeElement` before `select()` (line 175), and restore it with `.focus({ preventScroll: true })` after the `removeChild` call (line 180). The two-line snippet is in code-review CR-2.
- **Impact:** M. **Effort:** L. (Same defect as code-review CR-2.)

### A11Y-3. Low. The current-section indicator is announced but not shown (WCAG 1.3.1 parity, 2.4.8 Location, AAA)

- **File:** `assets/js/navbar.js:57`. The style belongs in `assets/css/default.scss` beside the `#siteMenu` rules (lines 480-522).
- **Problem:** `navbar.js` sets `aria-current="location"` on the section-nav link for the section in view, but no rule styles it. Screen-reader users get a "you are here" cue that sighted keyboard and mouse users do not.
- **Fix:** Add an `&[aria-current="location"]` rule inside the `#siteMenu` `a { }` block, after its `&:hover` rule (`default.scss:515`). The rule sets bold weight, the hover background, and a 3px inset underline in `$emerald_efficiency_5`. The exact SCSS is in code-review CR-4. Then recompile all seven stylesheets and bump `CACHE_VERSION`.
- **Impact:** M. **Effort:** L. (Same defect as code-review CR-4.)

### A11Y-4. Low. The slide-deck link does not say it downloads a 6.9 MB PDF (WCAG 2.4.4 Link Purpose, advisory)

- **File:** `index.html:2377`.
- **Problem:** The link text is "Download", and it opens a 6.9 MB PDF. Screen-reader users browsing by link list hear only "Download", and mobile visitors get no warning about the file's size or type.
- **Fix:** Replace the line with `<a href="./assets/pdf/InvisibleDataSlides.pdf">Download the slides (PDF, 6.9 MB)</a>.` This removes the trailing "the slides!" that now duplicates the link text.
- **Impact:** L. **Effort:** L. (Same as code-review CR-8.)

### A11Y-5. Low. The gallery's accessible name does not match its contents

- **File:** `assets/js/photo_gallery.js:67`.
- **Problem:** The gallery is announced as "Landscape photography gallery", but the first slide is a close-up of roses in a vase (`hobbies.html`, first `photoGallery-slide`). The name tells screen-reader users what to expect, and here it is slightly wrong.
- **Fix:** Change the label to "Photography gallery".
- **Impact:** L. **Effort:** L.

### A11Y-6. Low. Lazy-loading the above-the-fold Hobbies hero delays the first meaningful image (plausible)

- **File:** `assets/html/hobbies.html:129`.
- **Problem:** The intro image is the first content under the `h1`, and it is marked `loading="lazy"`. On slow connections, the page's main visual appears late. This is a performance issue first. It is listed here because a late image shifts the reading flow for low-vision users who zoom in on the intro.
- **Fix:** Remove `loading="lazy"` from this image and add `fetchpriority="high"`. Its `width` and `height` are already set, so the layout will not shift.
- **Impact:** L. **Effort:** L. (Same as code-review CR-7.)

## Known limitations, not re-reported

- The `abbr[title]` expansions are unreachable by keyboard and touch. CLAUDE.md already records this as a deliberate half-fix. The guidance stands: spell a term out in prose wherever its meaning matters.
- Skip links are screen-reader-only by design.
- `privacy.html` has no animation gate by design.

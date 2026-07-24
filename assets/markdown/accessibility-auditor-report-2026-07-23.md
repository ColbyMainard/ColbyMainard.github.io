# Accessibility Audit Report

**Date:** 2026-07-23
**Scope:** `index.html`, `404.html`, `assets/html/{tech_takes,hobbies,tech_resources,guides,privacy}.html`, plus `assets/css/default.scss` and the shared deferred scripts.
**Standard applied:** WCAG 2.2 AA, plus the four POUR principles (Perceivable, Operable, Understandable, Robust).

## Executive summary

The site is in noticeably better accessibility shape than most personal portfolios. Skip links, `scope`-ed table headers, visually-hidden `<caption>` elements, a horizontal-scroll wrapper that preserves table semantics, `scroll-padding-top` to keep anchor targets clear of the sticky header, `prefers-reduced-motion` gating on smooth scroll, intrinsic `width`/`height` on every image, and a titled YouTube iframe are all already in place. The SCSS carries inline comments showing contrast ratios were actually computed rather than guessed.

What remains is mostly structural rather than technical. The biggest problems are that headings are used as data labels in several places, that no navigation link is marked as the current page, and that `index.html` has grown to a size where the heading outline itself becomes the barrier. None of these are blockers, but all of them degrade the experience specifically for screen reader and keyboard users, who are the people the rest of the markup was clearly built to serve.

Two known project decisions were reviewed and deliberately left alone: skip links are always hidden rather than focus-revealed, and `404.html` omits the consent and service-worker scripts. Neither is reported as a defect.

## Findings

Severity key: **High** = blocks or seriously degrades a task for an assistive-technology user. **Medium** = measurable friction. **Low** = polish.

### A-1: No navigation link identifies the current page

- **Severity:** High
- **Principle:** Understandable (WCAG 2.4.8 Location, AAA; and 4.1.2 Name/Role/Value at AA once state is conveyed visually)
- **Location:** The `#primaryNav` block in all seven pages, for example [index.html:142](index.html:142) and [tech_takes.html:180](assets/html/tech_takes.html:180)
- **Issue:** Every page renders the identical five-link primary nav with no `aria-current="page"` on the link pointing at the page you are already on. A screen reader user tabbing the nav on `hobbies.html` hears the same list, in the same order, with no signal that "Hobbies" is where they already are. The same is true visually: there is no active-state styling.
- **Recommendation:** Add `aria-current="page"` to the self-referential link in each page's `#primaryNav`, and add a matching visual treatment in `default.scss` (an underline or left border, not color alone). This is a one-attribute-per-page edit with no scripting required, which suits the static architecture.

### A-2: Dates and secondary labels are marked up as headings

- **Severity:** High
- **Principle:** Robust / Understandable (WCAG 1.3.1 Info and Relationships)
- **Location:** [index.html:1753](index.html:1753) onward in the Projects section, for example `<h3>COVID-19 Diagnosis ML Model</h3>` followed by `<h4>Design and Build Model</h4>` and then `<h4>Fall 2020</h4>`. Repeats at lines 1767 and 1778.
- **Issue:** "Fall 2020" is a date, not a section. Two sibling `<h4>` elements under one `<h3>` tell assistive technology there are two subsections when there is one. Screen reader users navigating by heading (a primary navigation mode) get a heading list polluted with bare dates. Work History has a milder version of the same pattern: `<h4>` for the job title is defensible, but the adjacent `Start Date` / `End Date` paragraphs are correctly not headings, which makes the Projects treatment inconsistent with the page's own convention.
- **Recommendation:** In Projects, keep the project name as `<h3>`, demote the role to a single `<h4>`, and move the term to a paragraph matching Work History's pattern, for example `<p><strong>Term:</strong> Fall 2020</p>`. This makes the two sections structurally consistent and removes the phantom subsections.

### A-3: The home page heading outline is too large to navigate

- **Severity:** High
- **Principle:** Operable (WCAG 2.4.10 Section Headings; also 2.4.5 Multiple Ways)
- **Location:** [index.html](index.html) in full, 2,317 lines. Education alone contributes roughly 40 course rows, each with a nested `<details>` containing up to four levels of nested `<ul>`.
- **Issue:** A screen reader user pulling up the heading list on this page has to move past dozens of entries to reach Certifications or Other Skills. The section nav helps sighted users but only exposes seven jump targets for a document with far more content than that. The Cybersecurity skills list at [index.html:1888](index.html:1888) is a single flat `<ul>` of roughly 120 items with nested sublists, read linearly with no intermediate headings. The Forensic Investigations course entry at [index.html:1162](index.html:1162) alone nests four list levels deep, which several screen readers announce with a depth callout on every item.
- **Recommendation:** Split coursework onto its own page (`assets/html/coursework.html`) linked from Education, leaving a summary table of degrees on the home page. If splitting is unwanted, at minimum break the Cybersecurity skill list into `<h4>`-headed subgroups (Network, Cryptography, Malware, Access Control, Web) so heading navigation works inside it. This finding is the single largest usability win available on the site and it also serves SEO and content goals, so sequence it early.

### A-4: Decorative SVGs carry `<desc>` but are hidden from assistive technology

- **Severity:** Medium
- **Principle:** Perceivable / Robust (WCAG 1.1.1 Non-text Content)
- **Location:** Six inline SVGs on `index.html`: [index.html:179](index.html:179) (`<desc>Laptop Bag SVG</desc>`), [265](index.html:265) (`Graduation Cap`), [1746](index.html:1746) (`Blank HTML End Tag`), [1791](index.html:1791) (`Complex Circuit`), [2233](index.html:2233) (`Framed Credential`), [2260](index.html:2260) (`Clipboard`).
- **Issue:** Each of these is `aria-hidden="true" focusable="false"` and yet also contains a `<desc>`. The `<desc>` is entirely inert under `aria-hidden`, so the markup contradicts itself: someone wrote a description that no user will ever receive. `Laptop Bag SVG` also ends in the word "SVG", which is implementation detail rather than description.
- **Recommendation:** Pick one intent per graphic. Where the illustration reinforces the section (the graduation cap over Education, the credential frame over Certifications), convert it to `role="img"` with a `<title>` and drop `aria-hidden`, matching the project's stated preference for new inline SVGs. Where it is purely ornamental, keep `aria-hidden="true"` and delete the orphaned `<desc>`. Either way the contradiction goes away.

### A-5: Data tables omit `<thead>` and `<tbody>`

- **Severity:** Medium
- **Principle:** Robust (WCAG 1.3.1)
- **Location:** Every table on the site, for example [index.html:287](index.html:287), [tech_takes.html:312](assets/html/tech_takes.html:312), [tech_resources.html:131](assets/html/tech_resources.html:131), [hobbies.html:212](assets/html/hobbies.html:212).
- **Issue:** The header row is a plain `<tr>` holding `<th scope="col">`. Browsers imply a `<tbody>`, and `scope` does most of the work, but without an explicit `<thead>` some assistive technology and most table-navigation shortcuts cannot distinguish the header row from a data row when the user jumps into the middle of a long table. `tech_resources.html` has tables running hundreds of lines, which is exactly the case where this matters.
- **Recommendation:** Wrap the first row in `<thead>` and the remainder in `<tbody>` on every table. This is mechanical, changes no visual output, and pairs naturally with a `CACHE_VERSION` bump since nothing else in the render changes.

### A-6: `<details>` elements give no cue about their expanded state or content volume

- **Severity:** Medium
- **Principle:** Understandable (WCAG 3.2.4 Consistent Identification)
- **Location:** Roughly 40 `<details>` blocks on `index.html`, for example [index.html:298](index.html:298).
- **Issue:** Each summary reads "Course details" plus a visually-hidden course name, which is good. But the disclosures vary wildly in size: Deep Learning expands to three bullets while Forensic Investigations expands to over 70 across four nesting levels. A user cannot tell before expanding whether they are opening a sentence or a wall. Native `<details>` does communicate expanded state, so that part is fine.
- **Recommendation:** If A-3 is implemented and coursework moves to its own page, this largely resolves itself. Otherwise, append an item count to the summary text, for example "Course details (8 topics)", so the disclosure sets expectations.

### A-7: The `siteMenu` section nav has no accessible relationship to the sections it lists

- **Severity:** Medium
- **Principle:** Operable (WCAG 2.4.1 Bypass Blocks)
- **Location:** [index.html:150](index.html:150) and the equivalent block on every page.
- **Issue:** `#sectionNav` is labelled `aria-label="Page sections"`, which is correct, but its links point at wrapper `<div>` ids (`#workHistoryDiv`, `#KANDiv`) rather than at the `<section>` elements inside them, and none of those `<section>` elements has an accessible name. A screen reader user landing on `#workHistoryDiv` hears no landmark announcement, just the `<h2>`.
- **Recommendation:** Give each `<section>` an `aria-labelledby` pointing at its own `<h2>` (add ids to the `<h2>` elements). Sections with accessible names are exposed as `region` landmarks, which gives screen readers a second, landmark-based way to move through the page.

### A-8: The nav toggle button's accessible name never reflects its state

- **Severity:** Low
- **Principle:** Understandable (WCAG 4.1.2)
- **Location:** [index.html:141](index.html:141) and the same button on every page; behavior in [navbar.js](assets/js/navbar.js).
- **Issue:** The button is `aria-label="Toggle navigation"` with `aria-expanded` toggled by script. That combination is correct and passes. The nit is that the visible label is the `&#9776;` hamburger glyph, which some screen readers read as "trigram for heaven" if `aria-label` is ever dropped. It is currently fine because `aria-label` overrides, but it is a fragile arrangement.
- **Recommendation:** Wrap the glyph in `aria-hidden="true"` so the label cannot fall through to the character if the attribute is later refactored. Low priority, zero risk.

### A-9: Contact headings read as fragments

- **Severity:** Low
- **Principle:** Understandable (WCAG 2.4.6 Headings and Labels)
- **Location:** Footer on every page, for example [index.html:2295](index.html:2295): `<h2>Contact:</h2>`.
- **Issue:** A trailing colon in a heading is announced literally by some screen readers and reads as an unfinished label rather than a section title in a heading list.
- **Recommendation:** Change to `<h2>Contact</h2>` on all seven pages.

### A-10: Large images are served at full capture resolution

- **Severity:** Low
- **Principle:** Perceivable (indirect: WCAG 2.2 has no size limit, but slow loads harm low-bandwidth and cognitive-load users)
- **Location:** [hobbies.html:108](assets/html/hobbies.html:108) (`DEFCON33.jpeg`, declared 2100x2800) and [hobbies.html:133-137](assets/html/hobbies.html:133) (five photographs declared 3000x2000).
- **Issue:** These carry correct intrinsic dimensions and `loading="lazy"`, which is the right foundation, but they are being downloaded at capture resolution and scaled down by CSS. On a metered mobile connection the Hobbies page is by far the heaviest on the site.
- **Recommendation:** Export width-capped derivatives (roughly 1600px on the long edge) and either swap them in or add a `srcset`. The alt text on all six is already specific and well written, which is worth noting: it describes the scene rather than naming the file.

## What the site already does well

- Skip link present on all seven pages, and `<main>` carries `tabindex="-1"` so the skip target actually receives focus.
- Every data table has a `visually-hidden` `<caption>` and `scope`-ed `<th>` elements for both rows and columns.
- `.tableScroll` wraps wide tables in an `overflow-x` container rather than applying `display: block` to the `<table>`, which would have destroyed the semantics. The SCSS comment at [default.scss:70](assets/css/default.scss:70) shows this was a deliberate choice.
- `scroll-padding-top` is set on `html` to keep fragment targets clear of the sticky header, with a mobile override, and the comment explains why `scroll-margin-top` was omitted rather than stacked.
- Smooth scrolling is gated behind `@media (prefers-reduced-motion: no-preference)`.
- Contrast was calculated, not guessed: [default.scss:104](assets/css/default.scss:104) documents the 3.31:1 versus 4.78:1 tradeoff on the nav brand hover and picks the safe value.
- All six photographic images have descriptive, scene-level alt text and intrinsic `width`/`height`, so there is no layout shift.
- The YouTube embed at [hobbies.html:120](assets/html/hobbies.html:120) has a `title`, uses `youtube-nocookie.com`, and sets a restrictive `referrerpolicy`.
- Visually-hidden context is added inside link and summary text (`<span class="visually-hidden">History of Everything on </span>Spotify`) so link lists are not a run of identical "Spotify" links.
- `abbr title` is used consistently for ETL, ELT, RAG, AML, PII, CV, and VAEs.
- The cookie preference status paragraph at [privacy.html:143](assets/html/privacy.html:143) carries `role="status"` so consent changes are announced.

## Reviewed and intentionally not flagged

- **Always-hidden skip links.** `.visually-hidden` on the skip link never reveals on focus. This is a documented project decision and is left as-is.
- **`404.html` omitting `cookie_consent.js` and `service_worker_register.js`,** and using relative paths that break at nested missing URLs. Documented tradeoff.
- **`privacy.html` loading no animation scripts.** Documented and, for a privacy disclosure, defensible on its own merits.

## Suggested remediation order

1. **A-1** (`aria-current="page"`) — one attribute per page, immediate orientation win.
2. **A-9** (drop the colon in Contact headings) — trivial, batches with A-1.
3. **A-2** (dates are not headings) — small edit, removes phantom structure.
4. **A-5** (`<thead>` / `<tbody>`) — mechanical sweep, no visual change.
5. **A-4** (resolve the SVG `<desc>` contradiction) — six graphics, decide per graphic.
6. **A-7** (`aria-labelledby` on sections) — adds landmark navigation site-wide.
7. **A-3** (split coursework off the home page) — highest impact, highest effort, and it unblocks A-6.
8. **A-10** (image derivatives) and **A-8** (hamburger glyph) — polish.

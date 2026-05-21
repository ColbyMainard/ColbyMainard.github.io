# Interactivity Improvement Suggestions

Prioritized ideas for adding user-driven interactivity to ColbyMainard.github.io. The existing stack (AnimeJS, vanilla JS, SCSS compiled via `sass`) should cover everything here without new library dependencies unless noted.

---

## Tier 1 — High Value, Low Complexity

### 1. Photography Lightbox (`hobbies.html`)

**What:** Click any of the 5 photography `<img>` tags to open a full-screen overlay with previous/next navigation and a close button.

**Why:** The images are landscape photography and lose impact at thumbnail size. Lightboxes are the standard UX pattern for galleries and raise engagement significantly without being distracting.

**Implementation:**
- Add `role="button"` and `tabindex="0"` to each `<img>` wrapper for accessibility.
- Inject a single overlay `<div id="lightbox">` into the DOM on first image click (lazy creation).
- Keyboard support: Escape closes, Arrow keys navigate.
- New file: `assets/js/hobbies_lightbox.js`
- SCSS additions: overlay backdrop (`position: fixed`, `background: rgba(0,0,0,0.92)`), nav arrows, close button — all in `hobbies.scss`.
- No external library needed.

**Files affected:** `hobbies.html`, `assets/js/hobbies_lightbox.js` (new), `assets/css/hobbies.scss`

---

### 2. Smooth Section Scroll + Active Section Highlighting (`index.html`)

**What:** The siteMenu nav links (`#work-history`, `#education`, etc.) currently trigger instant browser jumps that land behind the sticky two-tier header (~110px). Fix the offset and highlight the active section in the siteMenu as the user scrolls.

**Why:** The sticky header covers the section heading on every anchor click — a known UX paper cut. Active highlighting helps users orient themselves in the long single-page layout.

**Implementation:**
- Intercept `click` on all `a[href^="#"]` inside `.siteMenu`; call `window.scrollTo({ top: target.offsetTop - headerHeight, behavior: "smooth" })`.
- Use a single `IntersectionObserver` (reuse the existing pattern from `index_animations.js`) watching all sections; toggle an `.active-section` class on the corresponding `<a>` in the siteMenu.
- New file or extend: `assets/js/section_scroll.js`; add `.active-section` link styles in `default.scss`.

**Files affected:** `assets/js/section_scroll.js` (new), `assets/css/default.scss`

---

### 3. Copy-to-Clipboard for Email and PGP Key (all pages)

**What:** A small clipboard icon next to the email address and PGP key link in the contact footer. Clicking it copies the value and briefly shows a "Copied!" tooltip.

**Why:** Users want to paste contact details directly into email clients or password managers; a mailto link alone doesn't serve that workflow.

**Implementation:**
- Use `navigator.clipboard.writeText()` (no fallback needed for modern browsers; GitHub Pages is always HTTPS).
- Inject the icon via JS so the footer degrades cleanly without JS.
- AnimeJS short opacity/scale animation on the tooltip element.
- Shared utility: `assets/js/clipboard.js`; tooltip styles in `default.scss`.

**Files affected:** `assets/js/clipboard.js` (new), `assets/css/default.scss`, footer markup in all HTML files

---

### 4. Reading Progress Bar (`tech_takes.html`)

**What:** A thin (3–4px) horizontal bar fixed to the top of the viewport that fills left-to-right as the user scrolls down the page.

**Why:** The tech takes articles are long; a progress indicator reduces uncertainty about how much remains and signals to potential employers that the content is worth reading to completion.

**Implementation:**
- Single `<div id="reading-progress">` injected at the top of `<body>`.
- Passive `scroll` event listener: `width = (scrollY / (scrollHeight - innerHeight)) * 100 + "%"`.
- Extend existing `assets/js/tech_takes_engagement.js` rather than adding a new file.
- Color: emerald accent (`#00c27c` or CSS var); `z-index` above header.

**Files affected:** `assets/js/tech_takes_engagement.js`, `assets/css/tech_takes.scss`

---

### 5. Table of Contents / Jump Links (`tech_takes.html`)

**What:** A collapsible "In this article" block injected at the top of each tech take section, built dynamically from the `<h3>` headings within it. Clicking a link smooth-scrolls to that subheading.

**Why:** Articles like the AGI and Privacy takes have 4–5 subsections; a TOC lets users scan and jump directly to the part they care about, which is a strong signal of well-organized technical writing.

**Implementation:**
- Scan each `.take-section` (or equivalent wrapper) for `<h3>` elements; assign stable IDs if absent.
- Build a `<nav class="toc">` with an ordered list; inject before the first `<p>` in each section.
- Toggle open/close with an AnimeJS height animation; default closed on mobile, open on desktop.
- Use `IntersectionObserver` on the `<h3>` elements to highlight the current heading in the TOC.
- Extend `assets/js/tech_takes_engagement.js`.

**Files affected:** `assets/js/tech_takes_engagement.js`, `assets/css/tech_takes.scss`

---

## Tier 2 — Medium Value, Medium Complexity

### 6. Skills Category Filter (`index.html`)

**What:** Filter buttons above the technical skills grid (Languages, AI/ML, Databases, Cloud, OS, Other) that show/hide skill `<span>` tags with an AnimeJS fade transition.

**Why:** The skills section is a long flat list; recruiters looking for a specific competency (e.g., "Does he know Kubernetes?") benefit from rapid filtering more than scrolling.

**Implementation:**
- Add `data-category="cloud"` (etc.) attributes to each skill `<span>` in the HTML.
- New file `assets/js/skills_filter.js`: click handler toggles a hidden class; AnimeJS staggers the re-appearance of matching items.
- "All" button resets the filter.
- Active filter button gets an `.active` style (already used in `default.scss` for nav).

**Files affected:** `index.html` (data-category attributes), `assets/js/skills_filter.js` (new), `assets/css/index.scss`

---

### 7. Work History Expand/Collapse (`index.html`)

**What:** Each work entry shows only the job title, employer, and date range by default. A chevron button expands the full bullet list with an AnimeJS height animation.

**Why:** The work history section is the longest single block on the page. Collapsed by default reduces cognitive load on first impression while preserving all detail on demand. Useful on mobile where scrolling past unexpanded entries is tedious.

**Implementation:**
- Wrap each entry's `<ul>` in a `<div class="work-details">` with `overflow: hidden; height: 0`.
- New file `assets/js/work_history_accordion.js`: click handler toggles height via AnimeJS; rotates chevron SVG.
- `aria-expanded` attribute updated on each toggle for screen readers.
- "Expand all" convenience button at section top.

**Files affected:** `index.html` (wrapper divs + chevron buttons), `assets/js/work_history_accordion.js` (new), `assets/css/index.scss`

---

### 8. Dark/Light Mode Toggle (global)

**What:** A sun/moon toggle button in the site header switches between the current dark palette and a light variant, persisted in `localStorage`. Respects `prefers-color-scheme` on first visit.

**Why:** Some users (and many employers viewing in bright offices) prefer light mode. Supporting it demonstrates frontend polish and accessibility awareness.

**Implementation:**
- Refactor all SCSS color literals into CSS custom properties (e.g., `--color-bg`, `--color-fg`, `--color-accent`).
- Define two sets of values: `:root` (dark, current) and `[data-theme="light"]` on `<html>`.
- New file `assets/js/theme_toggle.js`: reads `localStorage`, sets `data-theme`, wires the button.
- AnimeJS short scale/rotate on toggle icon.
- **Note:** This is the most invasive SCSS change. A full variable audit across all 6 `*.scss` files should precede implementation.

**Files affected:** All `assets/css/*.scss`, all HTML files (toggle button in header), `assets/js/theme_toggle.js` (new)

---

### 9. Tech Takes Tag Filter (`tech_takes.html`)

**What:** Each article section gets one or more topic tags (e.g., `ML`, `Crypto`, `Privacy`, `Quantum`). A filter bar at the page top hides non-matching sections using AnimeJS opacity + height transitions.

**Why:** As the number of takes grows, discoverability by topic becomes more valuable than reading sequentially. Tag filtering is a natural complement to the reading-time indicator already shown.

**Implementation:**
- Add `data-tags="ml crypto"` (space-separated) to each section wrapper in HTML.
- New file `assets/js/tech_takes_filter.js`: builds filter buttons dynamically from all unique tags; click toggles active tags.
- Hidden sections slide up with AnimeJS `height: 0, opacity: 0` tween.
- "All" resets the filter.

**Files affected:** `tech_takes.html` (data-tags attributes), `assets/js/tech_takes_filter.js` (new), `assets/css/tech_takes.scss`

---

### 10. Animated Typing Effect on Hero (`index.html`)

**What:** The `<h2>Machine Learning Engineer</h2>` subtitle cycles through alternate descriptors ("AI Researcher", "Lifelong Learner", "Privacy Advocate") with a typewriter-style character animation.

**Why:** Adds kinetic energy to the hero section without being gimmicky; demonstrates both personality and breadth of identity. AnimeJS character stagger makes it easy to implement cleanly.

**Implementation:**
- Define an array of alternates in JS; shuffle or cycle in order.
- Use AnimeJS to animate characters in (stagger left-to-right) then out (stagger right-to-left); pause between cycles.
- `aria-live="polite"` on the `<h2>` so screen readers announce each change once.
- Respect `prefers-reduced-motion`: skip animation, just swap text directly.

**Files affected:** `index.html`, `assets/js/index_animations.js` (extend) or new `assets/js/hero_typing.js`

---

## Tier 3 — Lower Priority / More Complex

### 11. Live Search for Tech Resources (`tech_resources.html`)

**What:** A text `<input>` at the top of the page filters resource table rows in real time as the user types, highlighting matching text.

**Why:** The resource tables contain 60+ entries across 6 categories. Search dramatically reduces time-to-find for a returning user who remembers "there was a book about X."

**Implementation:**
- Single `keyup` handler on the input; iterate `<tr>` elements and compare `.textContent.toLowerCase()` against the query.
- Hide non-matching rows; wrap matching terms in `<mark>` for highlight (replace `innerHTML` carefully to avoid XSS — sanitize query before inject).
- "No results" empty-state message.
- New file: `assets/js/tech_resources_search.js`.

**Files affected:** `tech_resources.html`, `assets/js/tech_resources_search.js` (new), `assets/css/tech_resources.scss`

---

### 12. Bookmarking / Reading List (`tech_resources.html`)

**What:** A star icon on each resource row lets users save items to a personal reading list stored in `localStorage`. A slide-in panel (AnimeJS) shows the saved list with an export option.

**Why:** Tech enthusiasts browsing resources may want to collect titles for later without copy-pasting. This is a differentiator that makes the resources page a tool rather than just a reference.

**Implementation:**
- LocalStorage key `bookmarks_v1` storing an array of `{title, url, category}` objects.
- Star toggle updates icon state (filled/outlined) and the stored list in real time.
- "My List" button in the page header opens the panel; panel has a plaintext/JSON export button.
- New file: `assets/js/bookmarks.js`.

**Files affected:** `tech_resources.html`, `assets/js/bookmarks.js` (new), `assets/css/tech_resources.scss`

---

### 13. Skills Radar / Spider Chart (`index.html`)

**What:** An SVG-based radar chart visualizing skill breadth across 6–8 competency axes (ML/AI, Systems, Cloud, Security, Languages, Data), drawn with vanilla JS and animated via AnimeJS on scroll.

**Why:** A visual summary of skill distribution is faster to parse than a tag grid and creates a memorable visual anchor. It demonstrates front-end capability beyond typical portfolio sites.

**Implementation:**
- Pure SVG + JS; no Chart.js or D3 dependency (keeps bundle minimal per AGENTS.md).
- Self-scores per axis defined as a JS constant (subjective, disclosed as self-assessed).
- AnimeJS animates `stroke-dashoffset` for the polygon fill and axis labels stagger in.
- Triggered by the existing `IntersectionObserver` pattern.
- New file: `assets/js/skills_chart.js`.

**Files affected:** `index.html`, `assets/js/skills_chart.js` (new), `assets/css/index.scss`

---

### 14. Contact Form (`index.html`)

**What:** Replace the mailto link with a proper HTML `<form>` submitted via Formspree (free tier). Fields: Name, Email, Message. Client-side validation with AnimeJS error shake on invalid submit.

**Why:** A mailto link opens the user's local email client, which many users (especially those on web-only email) find disruptive. A web form lowers the barrier to contact.

**Implementation:**
- Formspree endpoint (`https://formspree.io/f/<id>`) handles delivery; no backend code needed; CORS-safe for GitHub Pages.
- Client-side validation before fetch: non-empty fields, email regex.
- AnimeJS `translateX` shake on validation failure; fade-in success message on `200` response.
- Requires a Formspree account (free, up to 50 submissions/month).
- **Privacy note:** Update `privacy.html` to disclose Formspree as a third-party processor.

**Files affected:** `index.html`, `assets/css/index.scss`, `assets/html/privacy.html`

---

## Implementation Notes

- **JS files** must be imported with `defer` in the `<head>` of the relevant HTML file, matching the existing pattern.
- **SCSS changes** require recompiling via `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css` (and corresponding page-specific files).
- **AnimeJS** is loaded from jsDelivr CDN; all animation files already assume `anime` is available globally — new files should follow the same guard pattern used in `index_animations.js`.
- **Accessibility:** Every new interactive element must have a keyboard equivalent and appropriate ARIA attributes. Existing `prefers-reduced-motion` patterns in the animation files should be extended to cover new animations.
- **`prefers-color-scheme`** should be checked before any theme default is applied (item 8).

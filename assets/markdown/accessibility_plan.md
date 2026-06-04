# Accessibility Audit & Remediation Plan

_Audit of the Colby Mainard personal website (static GitHub Pages site)._
_Reference frame: **WCAG 2.1 Level AA**. This document is an analysis and a
prioritized remediation plan — no code has been changed yet._

---

## 1. Scope & method

**Pages audited (5,553 lines of HTML):**

| File | Lines | Notes |
|---|---|---|
| `index.html` | 2,172 | Landing page — work history, education, projects, skills, contact |
| `assets/html/tech_resources.html` | 1,390 | Curated resources (9 tables) |
| `assets/html/tech_takes.html` | 815 | Opinions (2 tables) |
| `assets/html/guides.html` | 576 | Starter guides |
| `assets/html/hobbies.html` | 352 | Photography gallery (6 images, 1 table) |
| `assets/html/privacy.html` | 248 | Privacy policy |

**Supporting files reviewed:** `assets/js/{navbar,index_animations,back_to_top,clipboard}.js`,
`assets/css/*.scss` (compiled to `default.css`).

**Approach:** static inspection of semantic structure, landmarks, headings,
text alternatives, table semantics, keyboard operability, motion handling, and
color usage, mapped to WCAG 2.1 AA success criteria.

---

## 2. Findings at a glance

| # | Priority | Issue | WCAG | Affected files |
|---|---|---|---|---|
| 1 | **P1** | No skip-to-content link | 2.4.1 (A) | all 6 HTML + `default.scss` |
| 2 | **P1** | JS animations ignore `prefers-reduced-motion` | 2.3.3 | `index_animations.js`, `back_to_top.js`, `clipboard.js` |
| 3 | **P2** | Tables lack `<caption>` and `scope` | 1.3.1 (A) | `index`, `tech_resources`, `tech_takes`, `hobbies` |
| 4 | **P2** | Decorative SVGs have no text alternative | 1.1.1 (A) | `index.html` (6 SVGs) |
| 5 | **P3** | Nav toggle missing `aria-expanded`/`aria-controls` | 4.1.2 (A) | `navbar.js` + 6 HTML files |
| 6 | **P3** | Color contrast not yet verified | 1.4.3 (AA) | themed `*.scss` palettes |

---

## 3. Existing strengths (preserve — do not regress)

The site already follows many accessibility best practices. Any remediation work
must keep these intact:

- **Language & titles:** `lang="en"` on all 6 pages; each page has a unique,
  descriptive `<title>`.
- **Headings:** exactly one `<h1>` per page with logical `h2 → h3 → h4` nesting.
- **Landmarks:** `<header>`, `<main id="main">`, and `<footer>` on every page.
- **Navigation:** `<nav>` elements carry distinct `aria-label`s
  ("Site navigation" and "Page sections").
- **Images:** every `<img>` has descriptive `alt` text plus explicit
  `width`/`height` and `loading="lazy"`.
- **Links:** descriptive link text throughout (no "click here"); no
  `target="_blank"` new-window traps.
- **Focus visibility:** comprehensive `:focus-visible` outline styling in
  `default.scss`.
- **Injected controls:** the runtime "Back to top" and "Copy" buttons
  (`back_to_top.js`, `clipboard.js`) set `aria-label` + `title`, handle
  Enter/Space, and announce status via an `aria-live="polite"` tooltip.
- **Motion (CSS):** a `prefers-reduced-motion` media block already disables the
  reading-progress bar transition.

---

## 4. Detailed findings & recommended fixes

### P1 — High impact

#### 4.1 No skip-to-content link · WCAG 2.4.1 Bypass Blocks (A)

**Problem:** Every page opens with the site/section navigation. A keyboard or
screen-reader user must tab through the entire nav on every page before reaching
the main content. There is no mechanism to bypass these repeated blocks.

**Recommended fix:** Add a skip link as the **first focusable child** of
`<body>` on all 6 pages, targeting the existing `id="main"`:

```html
<body>
    <a class="skip-link" href="#main">Skip to main content</a>
    <header> ... </header>
```

Add a `.skip-link` rule to `default.scss` that keeps it off-screen until focused:

```scss
.skip-link {
    position: absolute;
    left: -999px;
    top: 0;
    z-index: 1000;
    padding: 0.5em 1em;
    background: #000;
    color: #fff;

    &:focus {
        left: 0; // slide into view on keyboard focus
    }
}
```

> Reuses the existing `id="main"` landmark — no new IDs required.

#### 4.2 JS animations ignore `prefers-reduced-motion` · WCAG 2.3.3 Animation from Interactions

**Problem:** `index_animations.js` runs AnimeJS entrance animations
unconditionally. The CSS `prefers-reduced-motion` block (section 3) **cannot**
stop JavaScript-driven animation, so users who request reduced motion still see
the full movement — a vestibular-safety concern. `back_to_top.js` and
`clipboard.js` use the same pattern for smaller micro-animations.

**Recommended fix:** Add an early guard and short-circuit to the final visual
state when reduced motion is requested:

```js
const prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
    // Skip entrance animations: render elements in their final, visible state
    // (e.g. opacity:1, no translate) instead of calling anime.animate(...).
    return;
}
```

Apply primarily in `index_animations.js`; mirror the guard in `back_to_top.js`
and `clipboard.js` so their fade/slide micro-animations resolve instantly.

---

### P2 — Medium impact

#### 4.3 Tables lack `<caption>` and `scope` · WCAG 1.3.1 Info and Relationships (A)

**Problem:** ~14 data tables across the site. None has a `<caption>`, and no
`<th>` carries a `scope` attribute. Some tables (e.g. the `index.html` education
and course tables) use `<th>` for **both** the header row and the first column,
which without `scope` leaves screen readers unable to reliably associate data
cells with their headers.

**Recommended fix:**

1. Add a `.visually-hidden` utility to `default.scss`:

   ```scss
   .visually-hidden {
       position: absolute;
       width: 1px; height: 1px;
       padding: 0; margin: -1px;
       overflow: hidden;
       clip: rect(0, 0, 0, 0);
       white-space: nowrap;
       border: 0;
   }
   ```

2. Give each table a `<caption>` (visually hidden if it would be visually
   redundant with a nearby heading) and add `scope`:

   ```html
   <table>
       <caption class="visually-hidden">Relevant graduate coursework</caption>
       <tr>
           <th scope="col">Course Name</th>
           <th scope="col">Course Number</th>
           <th scope="col">Brief Description</th>
       </tr>
       <tr>
           <th scope="row">Analysis of Algorithms</th>
           <td>CSCE 629</td>
           <td>…</td>
       </tr>
   </table>
   ```

   - `scope="col"` on header-row cells.
   - `scope="row"` on first-column header cells (the tables that use `<th>` per row).

**Table locations:** `index.html` (2), `tech_resources.html` (9),
`tech_takes.html` (2), `hobbies.html` (1).

#### 4.4 Decorative SVGs have no text alternative · WCAG 1.1.1 Non-text Content (A)

**Problem:** `index.html` contains 6 inline section-icon SVGs (lines 168, 256,
1601, 1649, 2084, 2113) with no `role`, `<title>`, or `aria-hidden`. Screen
readers may surface them as unlabeled graphics.

**Recommended fix:** These icons are decorative — the adjacent `<h2>` already
names each section — so hide them from assistive tech:

```html
<svg width="20%" viewBox="0 0 300 200" aria-hidden="true" focusable="false">
```

`focusable="false"` also prevents legacy browsers from placing them in the tab
order.

---

### P3 — Enhancement

#### 4.5 Nav toggle missing `aria-expanded` / `aria-controls` · WCAG 4.1.2 Name, Role, Value (A)

**Problem:** The hamburger button has a good `aria-label="Toggle navigation"`,
but `navbar.js` only toggles CSS classes — it never communicates whether the
menu is open or closed, so screen-reader users don't know the menu's state.

**Recommended fix:**

- In the HTML, give the controlled menu container a stable `id` and wire the
  button to it:

  ```html
  <button class="nav-toggle" aria-label="Toggle navigation"
          aria-expanded="false" aria-controls="primary-nav">&#9776;</button>
  ```

- In `navbar.js`, flip the state inside the existing click handler:

  ```js
  const isOpen = pageNav.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
  ```

#### 4.6 Color-contrast verification · WCAG 1.4.3 Contrast (Minimum) (AA)

**Problem:** `AGENTS.md` requires sufficient contrast, but the themed per-page
palettes have not been measured. Candidate pairs to check include
`#f9c54e` text on `#1f1b79` (cybersecurity section), the `#00c27c` accent, and
link colors in each themed block.

**Recommended action:** Run each foreground/background pair through a contrast
checker (e.g. WebAIM) against AA thresholds — **4.5:1** for normal text,
**3:1** for large (≥ 18.66px bold or 24px). Record any failing pair and propose
a minimal lightness/hue tweak. (No CSS change is made in this task; failures are
logged as follow-ups.)

---

## 5. Suggested implementation order

For a later, separately-approved coding pass:

1. **P1 first** — skip link (4.1) and reduced-motion guard (4.2). Both are
   isolated, low-risk, and high-value.
2. **P2 next** — table captions/scope (4.3) and SVG `aria-hidden` (4.4). The
   table work touches the most lines but is mechanical.
3. **P3 last** — nav-toggle state (4.5) and contrast verification (4.6).

Remember: any SCSS changes must be recompiled to `default.css` via
`sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`.

---

## 6. Verification checklist

After implementing the fixes, verify:

- [ ] **Keyboard:** Tab from page load → the skip link appears first and jumps
      focus to `#main`; all nav links are reachable; focus rings are visible.
- [ ] **Reduced motion:** Enable the OS "reduce motion" setting (or emulate in
      DevTools) → the index page renders with no entrance movement.
- [ ] **Screen reader (NVDA / VoiceOver):** table captions are announced; `th`
      associations are correct when navigating cells; decorative SVGs are
      skipped; the nav toggle announces "expanded" / "collapsed".
- [ ] **Automated:** axe DevTools and/or Lighthouse accessibility audit report
      no critical violations.
- [ ] **Contrast:** every flagged color pair passes WCAG AA in a contrast
      checker.

---

## 7. Out of scope (this task)

This document is the deliverable. No HTML, CSS, or JavaScript was modified and no
`sass` recompile was run. The remediations above are recorded for a later
implementation pass.

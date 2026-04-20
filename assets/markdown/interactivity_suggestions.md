# Interactivity Improvement Suggestions for ColbyMainard.github.io

## Context

This is a static GitHub Pages personal site (4 pages: [index.html](../../index.html), [hobbies.html](../html/hobbies.html), [tech_takes.html](../html/tech_takes.html), [tech_resources.html](../html/tech_resources.html)) targeting three audiences: prospective employers, fellow engineers, and tech enthusiasts. It already has solid scroll-triggered AnimeJS animations, a sticky two-tier nav, mobile hamburger, and a manifest. What it lacks is **interactivity** — every page is currently a one-way scroll experience. There are no forms, modals, filters, lightboxes, theme toggles, collapsibles, search, or PWA caching. The dense tables (courses, podcasts, certifications, resources) and the long [index.html](../../index.html) (~2,000 lines) especially leave engagement on the table. This document is a menu of feature ideas — not a build plan — so the user can pick which ones to pursue.

The constraints to respect across all suggestions:
- Static-only (GitHub Pages, no backend)
- Vanilla JS or NodeJS-style libs only, minimize dependencies ([AGENTS.md](../../AGENTS.md))
- CORS-safe, all client-side
- Must scale across mobile + desktop, screen-reader-friendly ([AGENTS.md](../../AGENTS.md))
- AnimeJS 4.3.5 already loaded — reuse where possible
- Progressive enhancement (`html.js-animations` pattern is already established)

---

## Tier 1 — Low effort, high audience value

These give a noticeable lift for under a day each. Most are vanilla JS, no new dependencies.

### 1. Copy-to-clipboard buttons for contact info
**Where:** Footer `#contactMe` on every page; PGP key block in [assets/other/pgp_email_key.asc](../other/pgp_email_key.asc).
**What:** Small button next to email and PGP fingerprint that copies to clipboard with a 1-second "Copied!" toast.
**Why it helps:** Recruiters and engineers who want to ping you don't have to triple-click + manual copy. PGP key especially — long ASCII blobs are painful to select on mobile.
**Effort:** ~30 min. `navigator.clipboard.writeText()` + tiny toast div.

### 2. Scroll-spy active section in `siteMenu`
**Where:** [assets/js/navbar.js](../js/navbar.js).
**What:** As the user scrolls, highlight the current section's link in the secondary navigation (the in-page anchor menu). Already have Intersection Observer infrastructure from the animation files — reuse it.
**Why it helps:** Long pages (index is huge) leave users wondering "where am I?" A live indicator gives spatial orientation without a separate ToC.
**Effort:** ~1 hour. Add observer with lower threshold; toggle `.current` class on matching `siteMenu` link.

### 3. Reading progress bar
**Where:** Top of viewport, fixed, 3px tall, emerald accent color.
**What:** A progress bar that fills as the user scrolls a page. CSS-only with `scroll-timeline` or one-line JS fallback.
**Why it helps:** Long-form pages (especially [tech_takes.html](../html/tech_takes.html)) feel less daunting when readers can see how much is left.
**Effort:** ~20 min.

### 4. Smooth-scroll "Back to Top" floating button
**Where:** All four pages.
**What:** Floating circular button in bottom-right, fades in after 400px of scroll, scrolls to top on click. Currently the site has inline `backToTop` links per section but no floating affordance.
**Why it helps:** Faster nav up from anywhere on a long page; matches modern site conventions.
**Effort:** ~30 min. AnimeJS opacity tween already in the toolkit.

### 5. Theme toggle (dark/light) with `localStorage`
**Where:** Add toggle button in `pageMenu` header on all pages; CSS variables in [assets/css/default.scss](../css/default.scss).
**What:** Switch between current dark Noir palette and a light variant. Save preference to `localStorage`. Respect `prefers-color-scheme` on first visit.
**Why it helps:** Some readers (employers reviewing during the day, accessibility users) prefer light. Showing the toggle signals attention to UX detail.
**Effort:** ~3 hours. Refactor color references to CSS custom properties is the bulk of the work.

### 6. External-link visual marker + `target="_blank" rel="noopener"`
**Where:** All `<a href="http...">` site-wide.
**What:** Tiny ↗ icon after external links; ensure they open in new tab safely. The resource pages have many outbound links — this clarifies what leaves the site.
**Why it helps:** Reduces "I lost the portfolio tab" friction in [tech_resources.html](../html/tech_resources.html).
**Effort:** ~30 min. Pure CSS via `a[href^="http"]:not([href*="colbymainard"])::after`.

---

## Tier 2 — Medium effort, distinguishes the site

These are differentiators — features many personal sites don't bother with.

### 7. Filterable / searchable resource tables
**Where:** [tech_resources.html](../html/tech_resources.html) (multiple tables: cybersecurity, AI, C++, Python, scripting, OS) and [hobbies.html](../html/hobbies.html) podcast table.
**What:** Search box above each table that filters rows live as the user types. Tag chips for category filtering ("Free", "Book", "Course", "Cert"). No library needed — vanilla `input` event + `display: none` on non-matching `<tr>`.
**Why it helps:** Resource pages today are walls of tables. A reader who wants "free Python resources" has to skim everything. Filter turns the page into a useful tool.
**Effort:** ~4 hours. Wire one reusable filter component, apply to each table.

### 8. Photography lightbox gallery
**Where:** [hobbies.html](../html/hobbies.html) `#photographyDiv` (5 images currently inline at 60% width).
**What:** Click an image → full-screen modal with the photo at native resolution, prev/next arrows, ESC to close, swipe support on mobile. AnimeJS for the open/close transition.
**Why it helps:** Photos are currently hard to appreciate at small inline size. A proper viewer signals you take the hobby seriously.
**Effort:** ~4 hours. Vanilla JS modal + keyboard handlers. No carousel library needed for 5 images.

### 9. Collapsible long sections
**Where:** [index.html](../../index.html) Education section (lines 168–1445 — the course table is enormous), and Tech Takes deep-dive subsections.
**What:** "Show full course list ▾" toggle that collapses the table by default, expands on click. Persist state per visit in `sessionStorage`.
**Why it helps:** First-time visitors get a scannable page; deep-divers can expand. Today, the course table dominates the page and pushes Projects/Skills below the fold.
**Effort:** ~2 hours. `<details>`/`<summary>` is the no-JS path; AnimeJS enhancement for smooth height transition.

### 10. Skill tag cloud with project cross-linking
**Where:** [index.html](../../index.html) `#technicalSkillsDiv` ↔ `#projectsDiv`.
**What:** Click a skill (e.g., "Python") and the matching projects highlight; non-matching projects fade. Same in reverse — click a project tag, related skills glow.
**Why it helps:** Lets recruiters validate "you say Python — what did you build with it?" in one click instead of cross-referencing.
**Effort:** ~5 hours. Add `data-tags` attributes to projects + skills, simple JS to coordinate the highlight class.

### 11. Print / PDF resume view
**Where:** New stylesheet `assets/css/print.scss` + a "Print resume" button on [index.html](../../index.html).
**What:** Print-specific CSS that hides nav, animations, and decorative SVGs; reformats Work History + Education + Skills + Certifications into a clean one-column resume; uses `@media print`.
**Why it helps:** Recruiters who want a PDF can `Ctrl+P → Save as PDF` and get a real resume from the same source of truth as the site. Reduces "send me your resume" emails.
**Effort:** ~4 hours mostly tweaking print CSS.

### 12. Keyboard navigation shortcuts
**Where:** New `assets/js/keyboard_shortcuts.js` loaded on all pages.
**What:** `g h` → Home, `g t` → Tech Takes, `g r` → Resources, `g b` → Hobbies (Vim-style chord), `?` → modal listing shortcuts. Like GitHub.
**Why it helps:** Power users (the engineering audience) appreciate it immediately. Signals technical taste.
**Effort:** ~3 hours.

---

## Tier 3 — Ambitious, high-payoff for tech-enthusiast audience

Bigger lifts, but each could be a portfolio piece in itself.

### 13. Interactive demos inside Tech Takes
**Where:** [tech_takes.html](../html/tech_takes.html) sections.
**What:**
- **Quantum Computing section:** Tiny qubit visualizer — click to put a qubit in superposition, see probability amplitudes change. Pure SVG + JS, no external lib.
- **Cryptocurrency section:** Mini hash demo — type text, see SHA-256 update live; flip a character, watch the avalanche.
- **KAN section:** Side-by-side activation function plot (MLP vs KAN) the user can drag to reshape.
**Why it helps:** Turns opinion essays into demonstrations of understanding. This is the kind of thing tech enthusiasts share, which drives organic traffic.
**Effort:** 1–3 days per demo. Start with one (the hash demo is easiest).

### 14. Service worker for offline / PWA install
**Where:** New `service-worker.js` at root + registration in each page.
**What:** Cache HTML/CSS/JS/images on first visit; site loads offline thereafter. Triggers the "Install App" prompt on mobile (manifest is already in place at [manifest.json](../../manifest.json)).
**Why it helps:** Loads instantly on repeat visits, works on flaky conference Wi-Fi (DEFCON image suggests the audience attends those), and the install prompt itself is a conversation starter.
**Effort:** ~6 hours including a basic cache-first strategy.

### 15. Live "current focus" widget on landing page
**Where:** [index.html](../../index.html) intro section.
**What:** Small box ("Currently exploring: KAN architectures · Reading: <book> · Listening to: <podcast>") sourced from a JSON file the user updates. No build step — just edit `assets/data/now.json`.
**Why it helps:** Signals the site is maintained and gives a personality hook. Inspired by the "/now page" movement.
**Effort:** ~2 hours.

### 16. Site-wide search
**Where:** Search icon in `pageMenu` opens a modal; results across all 4 pages.
**What:** Pre-built lunr.js index (built at sass-compile time or by hand) of headings + paragraph text. Modal shows results with section anchors.
**Why it helps:** Easier than scanning four long pages. The resource pages especially benefit.
**Effort:** ~1 day. Lunr.js is small; the index can be regenerated with a one-shot Node script.

---

## What I'd recommend first

If you only do three things, my pick:

1. **#7 Filterable resource tables** — biggest UX leap on the page that suffers most today.
2. **#8 Photography lightbox** — visual polish, easy win, makes the hobby section actually showcase work.
3. **#5 Theme toggle** — most-noticed "this site cares" detail, used by everyone every visit.

Combined, these are roughly two days of work and touch all four pages.

---

## Critical files referenced

- [index.html](../../index.html) — main landing page
- [assets/html/hobbies.html](../html/hobbies.html) — photography, D&D, history, quantum
- [assets/html/tech_takes.html](../html/tech_takes.html) — opinion long-reads
- [assets/html/tech_resources.html](../html/tech_resources.html) — resource tables
- [assets/js/navbar.js](../js/navbar.js) — nav toggle + active link
- [assets/js/index_animations.js](../js/index_animations.js) — Intersection Observer pattern to reuse
- [assets/css/default.scss](../css/default.scss) — color palettes, sticky header, transitions
- [manifest.json](../../manifest.json) — PWA scaffolding already in place

## Verification

This document is a menu, not a build. Each idea above includes its own implementation surface; the verification step happens when one is selected and built. For any chosen feature, the universal test loop is:

1. Recompile SCSS: `sass --trace ./assets/css/default.scss ./assets/css/default.css`
2. Open the affected page in a browser, exercise the feature on desktop and mobile widths
3. Tab through with keyboard, confirm screen-reader semantics (per [AGENTS.md](../../AGENTS.md))
4. Verify graceful no-JS fallback (the site already follows progressive enhancement)

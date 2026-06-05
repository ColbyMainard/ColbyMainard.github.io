# Accessibility Audit & Remediation Plan

_Audit date: 2026-06-03 · Standard: WCAG 2.2 Level A/AA · Status: planning document (no code changed)_

## Summary

The site is in **good** accessibility shape for a hand-built static portfolio. It already gets the hard, easy-to-miss things right: every page declares a language, uses real landmark elements, labels its navigation, gives every image alt text and every table a caption, ships visible keyboard-focus rings, and honors reduced-motion preferences. There are no forms, which removes a whole class of common failures.

The gaps that remain are concentrated and fixable. The most impactful is the **absence of a skip-to-content link** — on every page a keyboard or screen-reader user must step through the full sticky navigation before reaching the content. Two structural defects in `index.html` (a missing closing tag and eight invalid list nestings) affect parsing and list semantics. The largest recurring theme is **color contrast**: several per-section palettes put normal-size body text below the 4.5:1 AA threshold. The rest are low-severity polish items.

This document is the plan; no HTML, SCSS, or JS has been modified. Each finding lists the exact location and the concrete fix so the work can be picked up directly.

## What's already strong (don't regress these)

| Area | Status |
| ------ | -------- |
| Language | `lang="en"` on every page |
| Landmarks | `<header>`, `<nav aria-label="…">`, `<main id="main">`, `<footer>`, `<section>` used consistently |
| Mobile nav | Hamburger is a real `<button>` with `aria-label`, `aria-controls`, and `aria-expanded` toggled live in `navbar.js` |
| Images | All `<img>` carry descriptive `alt` text (and explicit `width`/`height` + lazy loading) |
| Embedded video | YouTube `<iframe>` uses privacy-enhanced mode **and** a `title` attribute |
| Tables | **All 14 tables** have `<caption class="visually-hidden">` and `scope`-d `<th>` headers |
| Focus | `:focus-visible` rings (box-shadow) on links, buttons, and the back-to-top control |
| Motion | `@media (prefers-reduced-motion: reduce)` handled in `default.css` and `tech_takes.scss` |
| Live regions | `aria-live="polite"` on the clipboard "Copied!" toast and the cookie banner |
| Progress bar | Reading-progress bar exposes `role="progressbar"` + `aria-valuenow/min/max` |
| Utilities | Reusable `.visually-hidden` class already exists (`assets/css/default.scss:39`) |
| Forms | None on the site — no label/association gaps to worry about |
| Headings | Clean, sequential outlines on tech_takes, guides, hobbies, tech_resources, privacy |

## Findings

| ID | Severity | WCAG (2.2) | Location | Issue |
| ---- | ---------- | ----------- | ---------- | ------- |
| A1 | **High** | 2.4.1 Bypass Blocks (A) | All 6 pages | No "skip to main content" link |
| A2 | **High** | 4.1.1 / valid parsing | `index.html:2174` | Missing closing `</html>` tag |
| A3 | **High** | 1.3.1 Info & Relationships (A) | `index.html` (8×) | Invalid `<ul>`-in-`<ul>` list nesting |
| B1 | Medium | 1.4.3 Contrast Minimum (AA) | `index.scss`, `default.scss`, other partials | Normal-size text below 4.5:1 in several palettes |
| C1 | Low | 2.4.4 Link Purpose (A) | `hobbies.html`, `tech_resources.html` | Repeated ambiguous "Spotify" link text |
| C2 | Low | 2.1.1 Keyboard (A) — enhancement | `navbar.js` | Mobile menu has no Escape-to-close / focus return |
| C3 | Low | 1.3.1 Info & Relationships (A) | `hobbies.html`, `tech_resources.html` | Data-table first column should be `<th scope="row">` |
| C4 | Low | Readability nit | `hobbies.html` | Inline links run into the following word (no space) |

---

### A1 — Add a skip-to-content link  ·  High  ·  WCAG 2.4.1 (A)

**Problem.** Every page renders a sticky `<header>` containing ~10 navigation links (a primary nav
and a section nav) before `<main>`. Keyboard and screen-reader users have no way to bypass that
block, so they must tab through all of it on every page load.

**Why it's easy here.** `<main>` already carries `id="main"` on all pages, so the link target
exists. A reusable off-screen pattern (`.visually-hidden`) already exists to model the styling on.

**Fix.**
1. Add, as the **first focusable element** inside `<header>` on all 6 pages:
   ```html
   <a class="skip-link" href="#main">Skip to main content</a>
   ```
   Header locations: `index.html:128`, `assets/html/hobbies.html:74`,
   `assets/html/privacy.html:62`, `assets/html/tech_takes.html` (header ~line 156),
   `assets/html/tech_resources.html` (header ~line 79), `assets/html/guides.html` (header ~line 80).
2. Add a `.skip-link` rule to `assets/css/default.scss` (near `.visually-hidden`, line 39): visually
   hidden by default, but moved on-screen with a visible background when `:focus`/`:focus-visible`.
   Then recompile `default.scss → default.css`.

---

### A2 — Add the missing `</html>` close in `index.html`  ·  High  ·  parsing

**Problem.** `index.html` opens `<html lang="en">` at line 2 but the document ends at `index.html:2174` with `</body>` — there is no closing `</html>`. (Every other page closes both tags correctly; compare `assets/html/hobbies.html:353-354`.)

**Fix.** Append `</html>` after the final `</body>` in `index.html`.

---

### A3 — Fix invalid list nesting in `index.html` (8 occurrences)  ·  High  ·  WCAG 1.3.1 (A)

**Problem.** In **Technical Skills → Competencies**, several child `<ul>` lists are placed as direct children of a parent `<ul>` — i.e. immediately after a closed `</li>` — rather than being nested **inside** the `<li>` they belong to. A `<ul>` whose parent is another `<ul>` is invalid HTML, and assistive tech announces the list relationships incorrectly (the sub-items lose their association with the parent item).

Representative location — `index.html:1877`:

```html
<li>Supervised Learning</li>      <!-- li is closed here … -->
<ul>                              <!-- … so this ul is a child of the outer ul (invalid) -->
    <li>Long Short-Term Memory (LSTM) Networks</li>
    ...
```

The same pattern repeats for the Unsupervised Learning, Semi-Supervised Learning, Clustering, Recommendation Systems, and Data Privacy sublists, spanning roughly `index.html:1877`–1945 (8 instances total). The correctly-nested pattern is already used elsewhere in the same file (e.g. Database Technologies, `index.html:1721`–1728) and on the other pages.

**Fix.** For each occurrence, move the orphaned `<ul>` inside its preceding `<li>`:

```html
<li>Supervised Learning
    <ul>
        <li>Long Short-Term Memory (LSTM) Networks</li>
        ...
    </ul>
</li>
```

---

### B1 — Raise text contrast in low-contrast section palettes  ·  Medium  ·  WCAG 1.4.3 (AA)

**Problem.** This is not a single global bug. Each page's SCSS partial defines its own color palette, and several pair body text with backgrounds that fall **below the 4.5:1 minimum for normal-size text**. Two computed, representative failures:

| Text | Background | Ratio | Where |
| ------ | ----------- | ------- | ------- |
| `#b5307e` (`$cyberpunk_dreams_2`) | `#200b4b` (`$cyberpunk_dreams_5`) | **≈ 3.05:1** ❌ | `index.scss:64` text / `index.scss:40` bg — and the 5 other sections reusing `$cyberpunk_dreams_5` |
| `#a0a0b0` (`$noir_4`) | `#3e3e41` (`$noir_2`) | **≈ 4.1:1** ❌ | global body/intro `p`: `default.scss:229` / `default.scss:214` |

Both miss 4.5:1. (Large headings at ≥150% size only need 3:1 and are mostly fine; the failures are in normal-size paragraph/list text.) The other partials — `hobbies.scss`, `tech_takes.scss`, `tech_resources.scss`, `guides.scss`, `privacy_policy.scss` — each define their own palettes and should be checked the same way rather than assumed safe.

**Fix direction.**

1. Run an automated contrast checker over every rendered page (see _How to verify_) to enumerate the full set of failing pairs across all palettes — don't rely on these two examples alone.
2. For each failing pair, lighten the **text** value (or darken the **background**) in the relevant SCSS partial until it clears 4.5:1 for normal text. For the two above, raising body text toward the palette's lightest tints (e.g. `$cyberpunk_dreams` / `$noir` "_5" values) is the natural lever while preserving the existing look.
3. Recompile after editing SCSS.

> **Build note.** CSS is generated from SCSS — edit the `.scss`, then run `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`. On this project the **owner runs the compile step manually**; deliver SCSS edits and let them recompile.

---

### C1 — Disambiguate repeated "Spotify" links  ·  Low  ·  WCAG 2.4.4 (A)

**Problem.** The hobbies "Interesting Podcasts" table has five links whose visible text is just "Spotify" (`assets/html/hobbies.html:252, 269, 286, 299, 318`), each pointing to a different show. A screen-reader user pulling up a links list hears "Spotify, Spotify, Spotify…" with no way to tell them apart. The tech_resources podcast tables have the same pattern.

**Fix.** Give each link a distinguishing accessible name without changing the visual text, e.g. `aria-label="History of Everything on Spotify"`, or append `<span class="visually-hidden">` text.

---

### C2 — Let the mobile menu close on Escape / manage focus  ·  Low  ·  WCAG 2.1.1 (enhancement)

**Problem.** `navbar.js` correctly toggles `aria-expanded` and the open/active classes, but the expanded menu can't be dismissed with the Escape key and focus isn't returned to the toggle button. The menu is fully operable by keyboard otherwise, so this is an enhancement rather than a blocker.

**Fix.** In `assets/js/navbar.js`, add an Escape-key handler (and optionally an outside-click handler) that closes the menu, resets `aria-expanded="false"`, and returns focus to `.nav-toggle`.

---

### C3 — Promote data-table identifier cells to row headers  ·  Low  ·  WCAG 1.3.1 (A)

**Problem.** In the hobbies and tech_resources data tables, the first column (the row's identifier — e.g. the podcast or book name) uses `<td>`. The index "Relevant Courses" table already does this correctly with `<th scope="row">`, so the markup is inconsistent.

**Fix.** Change the first-column identifier cell in each data row to `<th scope="row">` so screen readers associate each row with its name.

---

### C4 — Add spacing between inline links and adjacent text  ·  Low  ·  readability

**Problem.** Several links in `hobbies.html` butt directly against the following word because the closing `</a>` sits flush against the next text — e.g. `…<a …>D&D</a>and…` and `…<a …>Warhammer,</a>it…` around `assets/html/hobbies.html:156`–161 (and similar in the History paragraphs). It reads as "D&Dand" / "Warhammer,it".

**Fix.** Insert a space (or move the trailing punctuation/word outside the anchor) so link text and surrounding prose don't merge. Cosmetic, but it also tightens link-name accuracy.

## Prioritized remediation roadmap

**Phase 1 — Structure & bypass (High).** Best done together; touches `index.html` + all headers + one SCSS rule.

- A2: add `</html>` to `index.html`.
- A3: fix the 8 invalid list nestings in `index.html`.
- A1: add the skip link to all 6 pages and the `.skip-link` style to `default.scss`; recompile.

**Phase 2 — Contrast (Medium).** Tooling-driven; touches the SCSS palettes.

- B1: scan all pages, enumerate failing pairs, adjust palette text/background values per partial, recompile, re-scan until clean.

**Phase 3 — Polish (Low).** Independent, low-risk edits.

- C1 (link labels), C3 (row headers), C4 (link spacing) — markup-only.
- C2 (Escape-to-close) — small `navbar.js` enhancement.

## How to verify (when fixes are implemented)

- **Keyboard-only pass.** Tab from page top: the skip link should appear first and jump to `<main>`; every interactive element should show a visible focus ring; the mobile menu should open, operate, and (after C2) close on Escape.
- **Automated scan.** Run **axe DevTools**, **Lighthouse** (Accessibility), or **WAVE** on each of the 6 pages — primarily to confirm contrast (B1) and catch any regressions.
- **HTML validation.** Run `index.html` through the W3C Nu HTML Checker to confirm A2 (missing `</html>`) and A3 (list nesting) are resolved and no new parsing errors were introduced.
- **Screen-reader spot check.** With NVDA or VoiceOver, navigate by links (C1 names should be distinct) and by table (C3 row headers should be announced).
- **Doc integrity.** Re-confirm the `file:line` references in this document still match the markup before acting on them, since line numbers drift as files are edited.

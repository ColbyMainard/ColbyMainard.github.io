# Accessibility Audit

Last Updated: 2026-10-30

## How this audit was run

The `accessibility-audit-runner` skill is a generic stub with no audit procedure. The checks below were therefore carried out directly against WCAG 2.2 AA, by reading the markup of all seven pages, the shared SCSS, and the scripts. No browser or screen reader was run, so every finding is code-derived. The one finding whose effect depends on runtime layout is marked "Plausible".

Prior reports checked: `assets/markdown/code-review-2026-10-30.md` (written earlier today). Where a finding overlaps it, the code-review ID is given so the roadmap can merge them.

Line numbers refer to commit `b7c1db0`. Uncommitted comment deletions in the working tree move `hobbies.scss:98` to line 96 and `default.scss:1017` to line 961.

Severity scale: **High** blocks or misleads a group of users on a primary path. **Medium** causes real friction for some users. **Low** is a small barrier or a best-practice gap.

## Findings (most severe first)

| # | Severity | File and line | Problem | Recommended fix | Impact | Effort |
| - | -------- | ------------- | ------- | --------------- | ------ | ------ |
| A-1 | Medium | `assets/css/hobbies.scss:98` (markup `assets/html/hobbies.html:192`) | `display: flex` on `.photoGallery-controls` overrides the `hidden` attribute. With scripting off, or if `photo_gallery.js` fails, keyboard and screen-reader users reach "Previous photo" and "Next photo" buttons that do nothing (WCAG 4.1.2 name/role/value is met, but the controls are dead). Same defect as CR-1. | Add `&[hidden] { display: none; }` inside the `.photoGallery-controls` rule, as `default.scss:1017` already does for `.cookiePreferences`. | M | L |
| A-2 | Low | `assets/js/navbar.js:98` | Plausible. The section tracker only marks a section current while it crosses the 25% to 35% band of the viewport. The short footer "Contact" section can never reach that band, so `aria-current="location"` stays on the previous entry at the bottom of every page. Same as CR-8. | In `createCurrentMarker().update` (line 54), mark the last tracked entry whenever the page is scrolled to the bottom. | L | L |
| A-3 | Low | `index.html:266` and `assets/html/tech_takes.html:843-849` | NFL, NHL, MLB, NBA, PGA, PFL, and UFL appear with no expansion. The `<abbr title>` pattern would help mouse users, but the title is unreachable by keyboard and touch, so readers outside the US sports world get no meaning on a phone. Related to CR-5. | Spell each league out in prose on first use, for example "National Football League (NFL)", and wrap the short form in `<abbr>`. | L | L |
| A-4 | Low | `index.html:2378` | The link text is the single word "Download", and nothing says the target is a 6.9 MB PDF. Out of context (a screen reader's links list) the purpose is unclear (WCAG 2.4.4 advisory), and mobile users are not warned about the file size. | Change to `<a href="./assets/pdf/InvisibleDataSlides.pdf">Download the slides (PDF, 6.9 MB)</a>`. | L | L |
| A-5 | Low | `assets/html/privacy.html:162` | The link text "Google Search Console" points to `https://policies.google.com/privacy`, Google's privacy policy. The link text and its destination disagree (WCAG 2.4.4). | Point the link at `https://search.google.com/search-console/about`, or reword the text to "Google's privacy policy". | L | L |
| A-6 | Low | `index.html:1888, 1904, 1924, 1943, 1951, 2074, 2210, 2223, 2330, 2339` | Ten `<h3>` headings end in a colon ("Programming Languages:"). Screen readers at higher punctuation verbosity read "colon" in the headings list, and no other page's headings use one. | Remove the trailing colon from each heading. | L | L |
| A-7 | Low | `index.html:1951-2073` | The Cybersecurity skills list is about 120 nested list items with no way to skip it except the section nav. Screen-reader users who move by list item, and anyone scanning on a phone, must work through all of it to reach Competencies. | Wrap each top-level group in `<details>`/`<summary>`, as the coursework tables on the same page already do. | L | M |
| A-8 | Low | `assets/html/hobbies.html:274` | "suitcases got wheels AFTER humanity landed on the moon" uses all capitals for emphasis. Some screen readers spell all-caps words letter by letter, and the emphasis is not conveyed semantically. | Write `<em>after</em>` and let CSS style the emphasis. | L | L |

## Checked and found correct

- One `<h1>` per page, with no skipped heading levels on any page.
- Every data table has a visually hidden `<caption>`, `scope` on its header cells, and a focusable scrolling region labelled by that caption.
- Every `<img>` has descriptive `alt` text, and the YouTube iframe has a `title`.
- Decorative SVGs on `index.html` carry `aria-hidden="true"` and `focusable="false"`.
- The nav toggle has an accessible name, `aria-expanded`, and `aria-controls`. Escape closes the menu and returns focus.
- The cookie banner is the second tab stop, `scroll-padding-bottom` keeps focused elements clear of it, and the privacy-page status text is announced.
- The photo gallery never auto-advances and never moves focus.
- Reduced motion is honored, and animation gating cannot strand content at zero opacity.
- `<abbr>` markup is in place for 82 acronyms. The always-hidden skip links are a documented decision and are not flagged.

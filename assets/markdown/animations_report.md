# Animation Implementation Report

## Overview

AnimeJS v4.3.5 timeline animations run on six pages of the site: `index.html`, `tech_resources.html`, `tech_takes.html`, `hobbies.html`, `guides.html`, and `404.html`. Each content section within a page has an animation style that triggers once as the user scrolls it into view. Elements within the same section share a consistent style, coordinated through AnimeJS timelines. `privacy.html` deliberately has no animations so the privacy disclosure is readable immediately and looks identical with JavaScript disabled.

## Architecture

### File Structure

| File | Purpose |
| --- | --- |
| `assets/js/animation_helpers.js` | Shared helpers reused by every page's animation script |
| `assets/js/index_animations.js` | Animations for `index.html` |
| `assets/js/tech_resources_animations.js` | Animations for `tech_resources.html` |
| `assets/js/tech_takes_animations.js` | Animations for `tech_takes.html` |
| `assets/js/hobbies_animations.js` | Animations for `hobbies.html` |
| `assets/js/guides_animations.js` | Animations for `guides.html` |
| `assets/js/404_animations.js` | Animations for `404.html` |

Each page still has a dedicated animation file rather than one shared script, because section IDs and animation styles are page-specific. What the six page files now have in common lives in `animation_helpers.js`, which they all consume through the `window.AnimationHelpers` global.

### How It Works

1. **Shared helpers load first**: `animation_helpers.js` is a classic deferred script that runs before each page's `*_animations.js`. It attaches `window.AnimationHelpers = { directChildren, addStep, animateContact, prefersReducedMotion }`. Each page script aliases these locally instead of redeclaring them.

2. **Two guards before anything animates**: every page script runs two checks at the top and returns early if either fails.
   - **Reduced motion**: if `matchMedia("(prefers-reduced-motion: reduce)")` matches, the script skips all animation.
   - **Graceful degradation**: `if (typeof anime === "undefined" || !window.AnimationHelpers) return;` so a failed AnimeJS CDN load or a missing helpers file does not break the page.
   In both cases the `js-animations` class is never added, so the CSS never hides anything and all content stays fully visible.

3. **Initial state (SCSS)**: once the guards pass, the script adds `js-animations` to `document.documentElement` (the `<html>` element). A rule scoped under `html.js-animations` sets `opacity: 0` on the direct children of each animated section. Because the class is only added by JavaScript, content remains visible when JS is disabled or fails.

4. **Scroll trigger (Intersection Observer)**: each section is tagged with a `data-animate` attribute and observed with a low threshold (`0.02`) and a bottom-margin offset (`-50px`). As soon as 2% of a section enters the viewport, its animation fires. An `animated` map plus `observer.unobserve(el)` ensures each section animates only on its first view. The observer is bootstrapped on `DOMContentLoaded` (or immediately if the DOM is already parsed).

5. **Timeline coordination (AnimeJS)**: each section's animation is built as an `anime.createTimeline({ ease: "..." })`. Elements within a section are staggered using relative offsets (for example `">-300"`) so headings appear first, followed by SVGs/images, then body content. `addStep` wraps every `.add()` call so empty target lists are skipped (avoiding AnimeJS "No target found" warnings), and `directChildren` restricts a step to top-level children of a section.

### Design Decisions

**Separate JS files per page:** keeps each file focused and avoids loading animation logic for sections that do not exist on the current page. It also prevents ID collision issues.

**Shared helpers in `animation_helpers.js`:** the four functions that were identical across every page (`directChildren`, `addStep`, `animateContact`, `prefersReducedMotion`) were extracted so they are declared once. The refactor is deliberately partial: the IntersectionObserver plumbing, the two guards, and the `js-animations` toggle are still copied into each `*_animations.js`, because they read page-specific `sections` and `animationMap` values.

**`directChildren` helper:** several sections (especially Education on `index.html`, and History on `hobbies.html`) contain deeply nested tables with hundreds of inner elements. Using `querySelectorAll("ul, table, p")` would select every nested descendant, causing performance issues and unintended animations. `directChildren` filters `el.children` by CSS selector so only top-level elements are animated; nested content inherits visibility from its parent.

**Low Intersection Observer threshold (0.02):** the Education section on `index.html` spans over 1,200 lines of HTML. A higher threshold like `0.15` would require 15% of that massive element to be visible simultaneously, which may never happen on typical viewports. The low threshold ensures animations trigger reliably for all section sizes.

**`rootMargin: "0px 0px -50px 0px"`:** adds a 50px inset from the bottom of the viewport so animations trigger slightly after the section begins entering, rather than at the very edge. This ensures the user can actually see the animation play.

**`html.js-animations` guard class:** added to `<html>` by JavaScript before any animation runs. The SCSS rules that set `opacity: 0` are scoped under this class, so if JavaScript fails to load or is disabled, all content remains visible. This is an accessibility and progressive enhancement decision.

**Reduced-motion support:** `prefersReducedMotion()` is evaluated per call rather than cached at load, so a mid-session OS toggle is honored. Each page script bails out before creating any timeline when reduced motion is preferred, and `addStep`/`animateContact` re-check the preference so any future caller that forgets its own guard is still covered. A CSS safety net (below) re-reveals any gated element so content is never trapped at `opacity: 0`.

**Graceful degradation:** if the AnimeJS module fails to load from the CDN, or the shared helpers are missing, the page script returns before adding `js-animations`. The opacity-hiding CSS keys on that class, so content stays in its natural, fully-visible state.

## Animation Styles by Page

Timelines use the AnimeJS v4 easing syntax (`ease: "outExpo"`), not the v3 `easing: "easeOutExpo"` form. The tables below list each section's headline easing; a few timelines override individual steps to a different curve (for example the `outBounce` sections drop to `outQuart` for their SVG
and body steps).

### index.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop from above | `outExpo` | Dramatic first impression |
| Work History | Slide from left | `outQuart` | Professional, directional |
| Education | Fade + slight rotation | `outSine` | Turning pages of a book |
| Projects | Slide from right | `outQuart` | Contrasts work history direction |
| Technical Skills | Cascade from top | `outBounce` | Building blocks stacking |
| Certifications | Zoom/scale from center | `outBack` | Presenting a certificate |
| Other Skills | Rise from bottom | `outCubic` | Skills surfacing |
| Contact | Simple fade | `outSine` | Clean, unobtrusive |

### tech_resources.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop | `outExpo` | Consistent with other pages |
| Cybersecurity | Glitch/flicker + alternating slides | `outQuart` | Hacker aesthetic |
| AI | Scale + bloom outward | `outBack` | Neural network expansion |
| C/C++ | Structured slide from left | `outCubic` | Methodical, precise |
| Python | Smooth slide from right | `outSine` | Flowing, contrasts C++ |
| Scripting | Rise from bottom | `outExpo` | Command-line text appearing |
| Operating Systems | Bounce cascade from top | `outBounce` | OS abstraction layers |
| Contact | Simple fade | `outSine` | Clean exit |

### tech_takes.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop | `outExpo` | Consistent with other pages |
| KAN | Slide from left + rotation | `outCubic` | Mathematical, structured |
| Cryptocurrency | Scale + flicker | `outQuart` | Digital currency glitch |
| Quantum Computing | Scale oscillation | `outSine` | Superposition shimmer |
| AGI | Slide from right + expand | `outBack` | Intelligence expanding |
| Privacy | Rise from bottom | `outExpo` | Hidden becoming visible |
| Product Placement | Cinematic focus pull (scale down + slight rotation settle) | `outQuint` | Broadcast camera zooming in to lock on a logo |
| Physical Media Supremacy | Record drop and settle (tilt in, rock past level, lie flat) | `outCirc` | Vinyl record dropped onto a platter |
| Contact | Simple fade | `outSine` | Clean exit |

`outQuint` is used only by Product Placement, and it is the only section with 650ms/550ms step durations rather than the site's usual 500-800ms. `outCirc` is used only by Physical Media Supremacy, and appears nowhere else on the site.

### hobbies.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade heading + image scale | `outExpo` | Photo showcase entrance |
| Quantum Computing | Scale oscillation | `outSine` | Consistent with tech_takes quantum |
| Photography | Zoom + bloom from center | `outBack` | Camera aperture opening |
| Dungeons and Dragons | Slide from left + bounce | `outBounce` | Dramatic quest reveal |
| History | Rise from bottom | `outCubic` | Uncovering ancient text |
| Contact | Simple fade | `outSine` | Clean exit |

The Intro animates an `img` centerpiece rather than paragraphs, and Quantum Computing animates an embedded `iframe` in addition to its text, both page-unique to hobbies.

### guides.html

All seven guide sections share a single `animateGuide` timeline rather than each receiving a bespoke style. This is a deliberate departure from the other pages: the guides are meant to read as a uniform reference collection where no topic visually dominates the others, and seven distinct entrance styles on a single long page would feel noisy rather than expressive. Visual identity comes from the page-specific "Guides Aurora" color palette in `guides.scss`, not from per-section animation choreography.

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop from above | `outExpo` | Consistent with other pages |
| Data Engineering | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Computer Vision | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Generative AI | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Natural Language Processing | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Reinforcement Learning | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Software Engineering | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Cybersecurity | Rise from bottom + staggered children | `outExpo` | Shared `animateGuide` |
| Contact | Simple fade | `outSine` | Clean exit |

Within each guide timeline, the `h2` heading enters first (700ms, 40px rise), `h3` and `h4` subheadings follow with an 80ms stagger and 30px rise, and body elements (`p, blockquote, ul, a`) finish with a 50ms stagger and 20px rise. Relative offsets (`">-300"`) overlap the phases so each guide reads as one continuous reveal.

### 404.html

The 404 page uses a single easing family (`outExpo`, plus `outSine` for Contact) so the reveal feels calm and uniform rather than playful, which suits an error page.

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | 404 figure drops in, brief dropped-signal flicker, then heading and lead rise | `outExpo` | Signal lost, then recovered |
| What Happened | Rise from bottom + staggered paragraphs | `outExpo` | Explanation surfacing calmly |
| Where To Next | Heading and lead rise, then page links stagger in one by one | `outExpo` | Guiding the visitor onward |
| Contact | Simple fade | `outSine` | Clean exit |

The Intro's `.errorCode` figure is the only element on the site with a multi-step opacity flicker
(a 90ms dim to `0.3`, then a 140ms return to `1`), mimicking a dropped signal recovering. The
"Where To Next" links animate as individual `li` elements so they cascade in one at a time (450ms,
14px rise, 90ms stagger).

## SCSS Changes

`default.scss` is the single compile entry point. It `@import`s seven partials in order (`index`, `hobbies`, `tech_takes`, `tech_resources`, `privacy_policy`, `guides`, `page_not_found`) and compiles to one committed `default.css` that every page links. The animation initial-state rules live inside each animated partial, not in a separate stylesheet.

Six partials carry a `html.js-animations` initial-state block: `index.scss`, `hobbies.scss`, `tech_takes.scss`, `tech_resources.scss`, `guides.scss`, and `page_not_found.scss`. `privacy_policy.scss` has none, matching that page's lack of animations.

All use the same base pattern:

```scss
html.js-animations {
    #sectionId {
        > h1, > h2, > h3, > h4, > p, > ul, > svg, > table, > a {
            opacity: 0;
        }
    }
}
```

The exact list of child selectors varies by partial based on the element types each page uses. The gate has to stay in step with that page's JS: an element type that is animated but not gated flashes, while one that is gated but never animated is stranded invisible.

- `> h4` is gated on `index.scss`, `tech_takes.scss`, and `guides.scss`, the three pages that use `<h4>` and the three whose partials carry an `h4` style rule. `hobbies.scss` and `tech_resources.scss` omit it: those pages have no `<h4>`, and no `h4` rule to style one if it were added.
- `hobbies.scss` adds `> img`, `> blockquote`, and `> iframe`.
- `tech_takes.scss` adds `> dl`.
- `tech_resources.scss` adds `> blockquote`. `guides.scss` gates only `> h1, > h2, > h3, > h4, > p, > ul, > blockquote, > a`, since `guides.html` contains no `<svg>` or `<table>`.
- `page_not_found.scss` uses a shorter list (`> h1, > h2, > h3, > p, > ul, > a`) for its intro, not-found, and contact sections, plus a separate `#helpfulLinks` rule that gates a bare `li` so the page links stagger in individually.

### Reduced-motion safety net

Each animated partial also wraps a duplicate rule inside a reduced-motion media query so gated elements are re-revealed if the OS setting is toggled on after load:

```scss
@media (prefers-reduced-motion: reduce) {
    html.js-animations {
        #sectionId {
            > h1, > h2, > h3, > h4, > p, > ul, > svg, > table, > a {
                opacity: 1 !important;
            }
        }
    }
}
```

Separately, `default.scss` opts into smooth scrolling only for users who do not prefer reduced motion (`@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`), and `tech_takes.scss` disables the reading-progress bar transition under the same reduced-motion condition.

## HTML Changes

Each animated page includes the following in its `<head>`, in this order (the helpers file always loads immediately before the page-specific animation file):

```html
<script type="importmap">{"imports": {"animejs": "https://cdn.jsdelivr.net/npm/animejs@4.3.5/+esm"}}</script>
<script type="module">import * as anime from 'animejs'; window.anime = anime;</script>
<script src="../js/animation_helpers.js" defer></script>
<script src="../js/{page}_animations.js" defer></script>
```

AnimeJS v4 is ESM-only. The importmap resolves the `animejs` specifier to jsDelivr's `+esm` endpoint, which serves the package's declared entry point with the correct MIME type and CORS headers. The inline module script imports all named exports (`createTimeline`, `stagger`, etc.) and assigns them to `window.anime` so the deferred, classic animation files can access them as globals. `animation_helpers.js` and the page file both use `defer` to run after the DOM is parsed and after the module script has executed.

Page-specific notes:

- On `index.html` and `404.html` (both at the repo root) the script paths are `./assets/js/...` rather than `../js/...`.
- `privacy.html` loads none of these: no importmap, no module shim, no helpers, and no `*_animations.js`.
- `404.html` loads both `animation_helpers.js` and `404_animations.js` using relative `./assets/js/` paths, while deliberately omitting `cookie_consent.js` and `service_worker_register.js` (whose relative-path logic breaks when the 404 content is served at an arbitrary missing URL).

## Build

The SCSS has been compiled and the resulting `default.css` is committed, so the initial hidden states are in effect. When editing the SCSS, recompile before committing:

```bash
sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css
```

Without the compiled rules, animations still run (AnimeJS sets `opacity: [0, 1]` inline), but there can be a brief flash of unstyled content before JS executes because the CSS would not yet include the `opacity: 0` rules.

## Changelog

### Physical Media Supremacy section added (tech_takes.html)

A new `#PhysicalMediaSupremacy` section ("Physical Media Supremacy: Why is Streaming Struggling?") was added to `tech_takes.html`, inside `#PhysicalMediaSupremacyDiv`. Wiring it into the page's animation system took three edits:

- **`assets/css/tech_takes.scss`**: `#PhysicalMediaSupremacy` was appended to the `animationGate` selector list, so its direct children start at `opacity: 0` and are re-revealed by the mixin's reduced-motion duplicate. The section's own `%techTakeSection` styling was already in place.
- **`assets/css/default.css`**: has to be regenerated from `default.scss` to pick up the widened gate. Until it is, the new section's children are ungated and flash on first view: they paint at full opacity, snap to `opacity: 0` when the timeline applies its from-value, then fade back in.
- **`assets/js/tech_takes_animations.js`**:
  - Added `physicalMedia: "#PhysicalMediaSupremacy"` to the `sections` map, positioned after `productPlacement` so the map reads in page order.
  - Added `animatePhysicalMedia(el)`, a "record drop and settle" timeline on `outCirc`. The `h2` enters at `scale: 0.88` tilted `-10deg`, rocks past level to `2deg`, then lies flat at `0deg` (950ms). Sub-headings (`h3`, `h4`) drop 18px from above with a smaller `-6deg -> 0deg` tilt, staggered by 90ms (600ms). Body elements (`p, ul, dl, .tableScroll, a`) finish with a plain 24px rise staggered by 55ms (520ms). Relative offsets (`">-400"`, `">-300"`) overlap the phases so the section reads as one landing rather than three.
  - Registered `physicalMedia: animatePhysicalMedia` in `animationMap`.
- **`service-worker.js`**: `CACHE_VERSION` bumped to `v51` so returning visitors get the new script and stylesheet instead of the cached ones.

`outCirc` was chosen because no other animation on the site uses it, and its long glide into a hard stop matches a disc coasting down onto a platter. The three-keyframe `rotate` on the `h2` is what separates this section from the page's two other rotation users: `#KAN` rotates once by `-2deg` while sliding in, and `#ProductPlacement` unwinds `2deg` while scaling down, but neither overshoots and settles back.

The section's markup has only `h2`, `h3`, and `p` direct children. The `ul`, `dl`, `.tableScroll`, and `a` selectors in the body step are inert here and were kept for symmetry with the sibling take sections, which is safe in this direction: `addStep` skips a step whose target list is empty, and a gated-but-absent element cannot be stranded invisible. If the take later grows a list or a table, it animates with no further change.

### h4 gating fix and dead-selector sweep

`<h4>` headings flashed on `index.html` and `tech_takes.html`. The JS animated them (`directChildren(el, "h3, h4")`, and `"h4, p, ul, a"` in `animateWork`) but no partial gated `> h4`, so each heading rendered at full opacity, snapped to `opacity: 0` when its timeline step applied the tween's from-value, then faded back in. On `index.html` they also jumped sideways, because `animateWork` tweens `translateX: ["-40px", "0px"]`.

- **`assets/css/index.scss`, `assets/css/tech_takes.scss`**: added `> h4` to both the initial-state list and its reduced-motion duplicate. No JS change was needed, since `index_animations.js` and `tech_takes_animations.js` already animated h4 in exactly the sections that have one.
- **`assets/css/guides.scss` + `assets/js/guides_animations.js`**: guides had the same gap, but symmetrically (neither gated nor animated), so its 15 h4s pre-painted while the rest of each guide faded in around them. `guides.scss` now gates `> h4` and `animateGuide` animates `directChildren(el, "h3, h4")`, folding the subheadings into the guide's single continuous reveal. Both edits are required together: gating without animating would strand all 15 headings invisible.
- **Dead-selector sweep**: `<address>` appears on no page of the site, so `> address` was dropped from all five partials' gate lists and the `address` rule was removed from `footer #contactMe` in `default.scss`. `guides.scss` and `guides_animations.js` also dropped `> svg`, `> table`, and `> div.guideInfographic`, none of which exist in `guides.html`. `privacy_policy.scss` lost its `h3` and `h4` rules, since `privacy.html` has only `h1` and `h2` headings, and the comment on `$refined_professionalism_3` no longer cites them.

The rule this restores: the style rule, the CSS gate, and the JS target move as one set, per page, per element type. Animated but not gated flashes. Gated but not animated disappears. `hobbies_animations.js` and `tech_resources_animations.js` still name `h4` in their step selectors even though neither page has an `<h4>`. Those are harmless no-ops and were left alone, because neither partial gates `> h4`, so there is nothing for them to strand.

### Product Placement section added (tech_takes.html)

A new `#ProductPlacement` section ("Product Placement in Sports Marketing") was added to `tech_takes.html`. To keep it consistent with the rest of the page, the following changes were made:

- **`assets/css/tech_takes.scss`**: `#ProductPlacement` was appended to the selector list inside the `html.js-animations` initial-state block, so its direct children (`h1, h2, h3, p, ul, dl, table, a, address`) start at `opacity: 0` before animation.
- **`assets/css/default.css`**: Recompiled from `default.scss` to pick up the new initial-state rule.
- **`assets/js/tech_takes_animations.js`**:
  - Added `productPlacement: "#ProductPlacement"` to the `sections` map.
  - Added `animateProductPlacement(el)`, a "cinematic focus pull" timeline on `outQuint`. The `h2` starts at `scale: 1.3` with a `2deg` rotation and settles to `scale: 1` at `0deg` (duration 900ms). Subheadings (`h3`, `h4`) follow with `scale: 1.15 -> 1` and `1.5deg -> 0deg`, staggered by 90ms (650ms). Body elements (`p, ul, dl, table, a`) finish with a subtle `scale: 1.05 -> 1` and a 20px rise, staggered by 55ms (550ms). The relative offsets (`">-400"`, `">-300"`) overlap phases so the section reads as one continuous camera move rather than three separate beats.
  - Registered `productPlacement: animateProductPlacement` in `animationMap`.

The easing (`outQuint`) was chosen because it is not used elsewhere on the page, and its strong late deceleration matches the feel of a broadcast camera snapping into focus on an on-field logo, which is thematically appropriate for a section about product placement visibility, orientation, and motion blur.

### Guides page added (guides.html)

A new `guides.html` page was added containing seven topical starter guides (Data Engineering, Computer Vision, Generative AI, NLP, Reinforcement Learning, Software Engineering, Cybersecurity). The animation work for it:

- **`assets/js/guides_animations.js`** (new): Mirrors the `tech_resources_animations.js` scaffolding, with the `js-animations` guard class, an IntersectionObserver using the standard `0.02` threshold and `-50px` bottom inset, and a `sections` map covering `#introSectionDiv`, all seven `#xxxGuide` sections, and `#contactMe`.
  - `animateGuide(el)` is a single shared timeline used by all seven guides: `h2` rises 40px (700ms), `h3` rises 30px staggered 80ms (`">-300"`), then body elements rise 20px staggered 50ms (`">-300"`). Easing is `outExpo` throughout.
  - `animationMap` registers each guide key against the shared `animateGuide` function rather than a per-section variant.
- **`assets/css/guides.scss`** (new): An `html.js-animations` block sets `opacity: 0` on direct children of `#introSectionDiv`, every `#xxxGuide`, and `#contactMe`.
- **`assets/css/default.scss`**: `@import "guides";` appended to the import list.
- **`assets/html/guides.html`**: Includes the standard AnimeJS importmap, the inline module that exposes `window.anime`, and the deferred animation scripts in the head, identical to the other animated pages.

### Shared-helper refactor and reduced-motion support

The animation scripts were made more robust and DRY:

- **`assets/js/animation_helpers.js`** (new): Extracts the four functions that had been duplicated across every page (`directChildren`, `addStep`, `animateContact`, `prefersReducedMotion`) into a single classic deferred script that exposes `window.AnimationHelpers`. It loads before each page's `*_animations.js`.
- **All six `*_animations.js`**: Now alias the helpers from `window.AnimationHelpers` instead of redeclaring them. Each also gained two guards at the top: a reduced-motion early return, and a graceful-degradation return (`if (typeof anime === "undefined" || !window.AnimationHelpers) return;`). In both cases `js-animations` is never added, leaving content visible. The IntersectionObserver plumbing and `js-animations` toggle stayed per file.
- **The six animated SCSS partials**: Each gained a `@media (prefers-reduced-motion: reduce)` block that resets the gated children to `opacity: 1 !important`, so content is never trapped hidden if the OS reduced-motion setting is toggled on after load. `default.scss` gained an opt-in smooth-scroll rule for users who do not prefer reduced motion.
- **`assets/js/animations.js` was renamed to `assets/js/index_animations.js`** for naming consistency with the other page scripts.

### 404 page animations (404.html)

A custom `404.html` error page was added with its own entrance animations:

- **`assets/js/404_animations.js`** (new): Uses the same scaffolding and shared helpers as the other pages. Its `sections` map covers `#introSectionDiv`, `#notFound`, `#helpfulLinks`, and `#contactMe`, all animating on `outExpo` (Contact uses the shared `animateContact` on `outSine`). The Intro drops the oversized `.errorCode` figure in, flickers it like a dropped signal (90ms dim, then 140ms recover), then rises the heading and lead. "Where To Next" staggers its page links in as individual `li` elements.
- **`assets/css/page_not_found.scss`**: Gained the `html.js-animations` initial-state block (with a dedicated `#helpfulLinks` rule gating bare `li`) and the reduced-motion safety net.
- **`404.html`**: Loads the AnimeJS importmap, module shim, `animation_helpers.js`, and `404_animations.js` with relative `./assets/js/` paths, while deliberately omitting `cookie_consent.js` and `service_worker_register.js` because their relative-path logic breaks at arbitrary missing URLs.

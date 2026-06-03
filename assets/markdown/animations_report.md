# Animation Implementation Report

## Overview

AnimeJS v4.3.5 timeline animations were added to all four pages of the site. Each content section within a page has a unique animation style that triggers once as the user scrolls it into view. Elements within the same section share a consistent animation style, coordinated through AnimeJS timelines.

## Architecture

### File Structure

| File | Purpose |
| --- | --- |
| `assets/js/animations.js` | Animations for `index.html` |
| `assets/js/tech_resources_animations.js` | Animations for `tech_resources.html` |
| `assets/js/tech_takes_animations.js` | Animations for `tech_takes.html` |
| `assets/js/hobbies_animations.js` | Animations for `hobbies.html` |
| `assets/js/guides_animations.js` | Animations for `guides.html` |

Each page has a dedicated animation file rather than a shared one, because section IDs and animation styles are page-specific.

### How It Works

1. **Initial State (SCSS)**: A rule under `html.js-animations` sets `opacity: 0` on direct children of each animated section. This class is only added by JavaScript, so content remains fully visible if JS is disabled.

2. **Scroll Trigger (Intersection Observer)**: Each section is observed with a low threshold (`0.02`) and a bottom margin offset (`-50px`). As soon as 2% of a section enters the viewport, its animation fires once and the observer disconnects for that section.

3. **Timeline Coordination (AnimeJS)**: Each section's animation is built as an `anime.createTimeline()`. Elements within the same section are staggered using relative offsets (e.g., `">-300"`) so that headings appear first, followed by SVGs/images, then body content.

### Design Decisions

**Separate JS files per page** — Keeps each file focused and avoids loading animation logic for sections that don't exist on the current page. This also prevents ID collision issues.

**`directChildren` helper** — Several sections (especially Education on `index.html`, and History on `hobbies.html`) contain deeply nested tables with hundreds of inner elements. Using `querySelectorAll("ul, table, p")` would select every nested descendant, causing performance issues and unintended animations. The `directChildren` function filters `el.children` by CSS selector so only top-level elements are animated; nested content inherits visibility from its parent.

**Low Intersection Observer threshold (0.02)** — The Education section on `index.html` spans over 1,200 lines of HTML. A higher threshold like `0.15` would require 15% of that massive element to be visible simultaneously, which may never happen on typical viewports. The low threshold ensures animations trigger reliably for all section sizes.

**`rootMargin: "0px 0px -50px 0px"`** — Adds a 50px inset from the bottom of the viewport so animations trigger slightly after the section begins entering, rather than at the very edge. This ensures the user can actually see the animation play.

**`html.js-animations` guard class** — Added to `<html>` by JavaScript before any animation runs. The SCSS rules that set `opacity: 0` are scoped under this class, so if JavaScript fails to load or is disabled, all content remains visible. This is an accessibility and progressive enhancement decision.

## Animation Styles by Page

### index.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop from above | `easeOutExpo` | Dramatic first impression |
| Work History | Slide from left | `easeOutQuart` | Professional, directional |
| Education | Fade + slight rotation | `easeOutSine` | Turning pages of a book |
| Projects | Slide from right | `easeOutQuart` | Contrasts work history direction |
| Technical Skills | Cascade from top | `easeOutBounce` | Building blocks stacking |
| Certifications | Zoom/scale from center | `easeOutBack` | Presenting a certificate |
| Other Skills | Rise from bottom | `easeOutCubic` | Skills surfacing |
| Contact | Simple fade | `easeOutSine` | Clean, unobtrusive |

### tech_resources.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop | `easeOutExpo` | Consistent with other pages |
| Cybersecurity | Glitch/flicker + alternating slides | `easeOutQuart` | Hacker aesthetic |
| AI | Scale + bloom outward | `easeOutBack` | Neural network expansion |
| C/C++ | Structured slide from left | `easeOutCubic` | Methodical, precise |
| Python | Smooth slide from right | `easeOutSine` | Flowing, contrasts C++ |
| Scripting | Rise from bottom | `easeOutExpo` | Command-line text appearing |
| Operating Systems | Bounce cascade from top | `easeOutBounce` | OS abstraction layers |
| Contact | Simple fade | `easeOutSine` | Clean exit |

### tech_takes.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop | `easeOutExpo` | Consistent with other pages |
| KAN | Slide from left + rotation | `easeOutCubic` | Mathematical, structured |
| Cryptocurrency | Scale + flicker | `easeOutQuart` | Digital currency glitch |
| Quantum Computing | Scale oscillation | `easeOutSine` | Superposition shimmer |
| AGI | Slide from right + expand | `easeOutBack` | Intelligence expanding |
| Privacy | Rise from bottom | `easeOutExpo` | Hidden becoming visible |
| Product Placement | Cinematic focus pull (scale down + slight rotation settle) | `easeOutQuint` | Broadcast camera zooming in to lock on a logo |
| Contact | Simple fade | `easeOutSine` | Clean exit |

### hobbies.html

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade heading + image scale | `easeOutExpo` | Photo showcase entrance |
| Quantum Computing | Scale oscillation | `easeOutSine` | Consistent with tech_takes quantum |
| Photography | Zoom + bloom from center | `easeOutBack` | Camera aperture opening |
| Dungeons and Dragons | Slide from left + bounce | `easeOutBounce` | Dramatic quest reveal |
| History | Rise from bottom | `easeOutCubic` | Uncovering ancient text |
| Contact | Simple fade | `easeOutSine` | Clean exit |

### guides.html

All seven guide sections share a single `animateGuide` timeline rather than each receiving a bespoke style. This is a deliberate departure from the other pages: the guides are meant to read as a uniform reference collection where no topic visually dominates the others, and seven distinct entrance styles on a single long page would feel noisy rather than expressive. Visual identity comes from the page-specific "Guides Aurora" color palette in `guides.scss`, not from per-section animation choreography.

| Section | Style | Easing | Rationale |
| --- | --- | --- | --- |
| Intro | Fade + drop from above | `easeOutExpo` | Consistent with other pages |
| Data Engineering | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` — uniform across all guides |
| Computer Vision | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Generative AI | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Natural Language Processing | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Reinforcement Learning | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Software Engineering | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Cybersecurity | Rise from bottom + staggered children | `easeOutExpo` | Shared `animateGuide` |
| Contact | Simple fade | `easeOutSine` | Clean exit |

Within each guide timeline, the `h2` heading enters first (700ms, 40px rise), `h3` subheadings follow with an 80ms stagger and 30px rise, and body elements (`p, blockquote, ul, table, a, svg`) finish with a 50ms stagger and 20px rise. Relative offsets (`">-300"`) overlap the phases so each guide reads as one continuous reveal.

## SCSS Changes

Animation initial-state rules were appended to each page's SCSS file:

- `assets/css/index.scss`
- `assets/css/tech_resources.scss`
- `assets/css/tech_takes.scss`
- `assets/css/hobbies.scss`
- `assets/css/guides.scss`

All use the same pattern:

```scss
html.js-animations {
    #sectionId {
        > h1, > h2, > h3, > p, > ul, > svg, > table, > a, > address {
            opacity: 0;
        }
    }
}
```

The exact list of child selectors varies by page based on what element types are present (e.g., `dl` for tech_takes, `blockquote` for hobbies/history, `img` for hobbies).

## HTML Changes

Each HTML page received two script tags in the `<head>`:

```html
<script type="importmap">{"imports": {"animejs": "https://cdn.jsdelivr.net/npm/animejs@4.3.5/+esm"}}</script>
<script type="module">import * as anime from 'animejs'; window.anime = anime;</script>
<script src="../js/{page}_animations.js" defer></script>
```

AnimeJS v4 is ESM-only. The importmap resolves the `animejs` specifier to jsDelivr's `+esm` endpoint, which serves the package's declared entry point with the correct MIME type and CORS headers. The inline module script imports all named exports (`createTimeline`, `stagger`, etc.) and assigns them to `window.anime` so the deferred animation files can access them as globals. The page-specific animation file uses `defer` to ensure it runs after the DOM is parsed and after the module script has executed.

## Pending

The SCSS changes need to be compiled to CSS before the initial hidden states take effect:

```bash
sass --trace ./assets/css/default.scss ./assets/css/default.css
```

Without compilation, animations still run (AnimeJS sets `opacity: [0, 1]` inline), but there may be a brief flash of unstyled content before JS executes since the CSS doesn't yet include the `opacity: 0` rules.

## Changelog

### Product Placement section added (tech_takes.html)

A new `#ProductPlacement` section ("Product Placement in Sports Marketing") was added to `tech_takes.html`. To keep it consistent with the rest of the page, the following changes were made:

- **`assets/css/tech_takes.scss`**: `#ProductPlacement` was appended to the selector list inside the `html.js-animations` initial-state block, so its direct children (`h1, h2, h3, p, ul, dl, table, a, address`) start at `opacity: 0` before animation.
- **`assets/css/default.css`**: Recompiled from `default.scss` (via WSL, since `sass` had issues running directly on Windows) to pick up the new initial-state rule.
- **`assets/js/tech_takes_animations.js`**:
  - Added `productPlacement: "#ProductPlacement"` to the `sections` map.
  - Added `animateProductPlacement(el)` — a "cinematic focus pull" timeline on `easeOutQuint`. The `h1` starts at `scale: 1.3` with a `2deg` rotation and settles to `scale: 1` at `0deg` (duration 900ms). Subheadings (`h2`, `h3`) follow with `scale: 1.15 → 1` and `1.5deg → 0deg`, staggered by 90ms. Body elements (`p, ul, dl, table, a`) finish with a subtle `scale: 1.05 → 1` and a 20px rise, staggered by 55ms. The relative offsets (`">-400"`, `">-300"`) overlap phases so the section reads as one continuous camera move rather than three separate beats.
  - Registered `productPlacement: animateProductPlacement` in `animationMap`.

The easing (`easeOutQuint`) was chosen because it is not yet used elsewhere on the page, and its strong late deceleration matches the feel of a broadcast camera snapping into focus on an on-field logo — thematically appropriate for a section about product placement visibility, orientation, and motion blur.

### Guides page added (guides.html)

A new `guides.html` page was added containing seven topical starter guides (Data Engineering, Computer Vision, Generative AI, NLP, Reinforcement Learning, Software Engineering, Cybersecurity). The animation work for it:

- **`assets/js/guides_animations.js`** (new): Mirrors the `tech_resources_animations.js` scaffolding — `js-animations` guard class, `directChildren` and `addStep` helpers, IntersectionObserver with the standard `0.02` threshold and `-50px` bottom inset. The `sections` map covers `#introSectionDiv`, all seven `#xxxGuide` sections, and `#contactMe`.
  - `animateIntro(el)` and `animateContact(el)` are copied verbatim from the existing pattern.
  - `animateGuide(el)` is a single shared timeline used by all seven guides: `h2` rises 40px (700ms), `h3` rises 30px staggered 80ms (`">-300"`), then body elements (`p, blockquote, ul, table, a, svg`) rise 20px staggered 50ms (`">-300"`). Easing is `easeOutExpo` throughout.
  - `animationMap` registers each guide key against the shared `animateGuide` function rather than a per-section variant.
- **`assets/css/guides.scss`** (new): An `html.js-animations` block sets `opacity: 0` on direct children (`h1, h2, h3, p, ul, svg, table, blockquote, a, address`) of `#introSectionDiv`, every `#xxxGuide`, and `#contactMe` — same selector list as `tech_resources.scss`.
- **`assets/css/default.scss`**: `@import "guides";` appended to the import list.
- **`assets/css/default.css`**: Recompiled from `default.scss` to pick up the new initial-state rules.
- **`assets/html/guides.html`**: Includes the standard AnimeJS importmap, the inline module that exposes `window.anime`, and `<script src="../js/guides_animations.js" defer></script>` in the head — identical pattern to the other animated pages.

The decision to use one shared `animateGuide` rather than seven bespoke styles is documented in the Animation Styles by Page table above: seven distinct entrance styles on a single long page would compete for attention rather than support reading, and the guides are meant to be a uniform reference rather than a showcase of distinct topics.

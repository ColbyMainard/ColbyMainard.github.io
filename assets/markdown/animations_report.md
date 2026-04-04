# Animation Implementation Report

## Overview

AnimeJS v3.2.2 timeline animations were added to all four pages of the site. Each content section within a page has a unique animation style that triggers once as the user scrolls it into view. Elements within the same section share a consistent animation style, coordinated through AnimeJS timelines.

## Architecture

### File Structure

| File | Purpose |
|---|---|
| `assets/js/animations.js` | Animations for `index.html` |
| `assets/js/tech_resources_animations.js` | Animations for `tech_resources.html` |
| `assets/js/tech_takes_animations.js` | Animations for `tech_takes.html` |
| `assets/js/hobbies_animations.js` | Animations for `hobbies.html` |

Each page has a dedicated animation file rather than a shared one, because section IDs and animation styles are page-specific.

### How It Works

1. **Initial State (SCSS)**: A rule under `html.js-animations` sets `opacity: 0` on direct children of each animated section. This class is only added by JavaScript, so content remains fully visible if JS is disabled.

2. **Scroll Trigger (Intersection Observer)**: Each section is observed with a low threshold (`0.02`) and a bottom margin offset (`-50px`). As soon as 2% of a section enters the viewport, its animation fires once and the observer disconnects for that section.

3. **Timeline Coordination (AnimeJS)**: Each section's animation is built as an `anime.timeline()`. Elements within the same section are staggered using relative offsets (e.g., `"-=300"`) so that headings appear first, followed by SVGs/images, then body content.

### Design Decisions

**Separate JS files per page** — Keeps each file focused and avoids loading animation logic for sections that don't exist on the current page. This also prevents ID collision issues.

**`directChildren` helper** — Several sections (especially Education on `index.html`, and History on `hobbies.html`) contain deeply nested tables with hundreds of inner elements. Using `querySelectorAll("ul, table, p")` would select every nested descendant, causing performance issues and unintended animations. The `directChildren` function filters `el.children` by CSS selector so only top-level elements are animated; nested content inherits visibility from its parent.

**Low Intersection Observer threshold (0.02)** — The Education section on `index.html` spans over 1,200 lines of HTML. A higher threshold like `0.15` would require 15% of that massive element to be visible simultaneously, which may never happen on typical viewports. The low threshold ensures animations trigger reliably for all section sizes.

**`rootMargin: "0px 0px -50px 0px"`** — Adds a 50px inset from the bottom of the viewport so animations trigger slightly after the section begins entering, rather than at the very edge. This ensures the user can actually see the animation play.

**`html.js-animations` guard class** — Added to `<html>` by JavaScript before any animation runs. The SCSS rules that set `opacity: 0` are scoped under this class, so if JavaScript fails to load or is disabled, all content remains visible. This is an accessibility and progressive enhancement decision.

## Animation Styles by Page

### index.html

| Section | Style | Easing | Rationale |
|---|---|---|---|
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
|---|---|---|---|
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
|---|---|---|---|
| Intro | Fade + drop | `easeOutExpo` | Consistent with other pages |
| KAN | Slide from left + rotation | `easeOutCubic` | Mathematical, structured |
| Cryptocurrency | Scale + flicker | `easeOutQuart` | Digital currency glitch |
| Quantum Computing | Scale oscillation | `easeOutSine` | Superposition shimmer |
| AGI | Slide from right + expand | `easeOutBack` | Intelligence expanding |
| Privacy | Rise from bottom | `easeOutExpo` | Hidden becoming visible |
| Contact | Simple fade | `easeOutSine` | Clean exit |

### hobbies.html

| Section | Style | Easing | Rationale |
|---|---|---|---|
| Intro | Fade heading + image scale | `easeOutExpo` | Photo showcase entrance |
| Quantum Computing | Scale oscillation | `easeOutSine` | Consistent with tech_takes quantum |
| Photography | Zoom + bloom from center | `easeOutBack` | Camera aperture opening |
| Dungeons and Dragons | Slide from left + bounce | `easeOutBounce` | Dramatic quest reveal |
| History | Rise from bottom | `easeOutCubic` | Uncovering ancient text |
| Contact | Simple fade | `easeOutSine` | Clean exit |

## SCSS Changes

Animation initial-state rules were appended to each page's SCSS file:

- `assets/css/index.scss`
- `assets/css/tech_resources.scss`
- `assets/css/tech_takes.scss`
- `assets/css/hobbies.scss`

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
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
<script src="../js/{page}_animations.js" defer></script>
```

AnimeJS is loaded from the jsDelivr CDN. The page-specific animation file uses `defer` to ensure it runs after the DOM is parsed.

## Pending

The SCSS changes need to be compiled to CSS before the initial hidden states take effect:

```bash
sass --trace ./assets/css/default.scss ./assets/css/default.css
```

Without compilation, animations still run (AnimeJS sets `opacity: [0, 1]` inline), but there may be a brief flash of unstyled content before JS executes since the CSS doesn't yet include the `opacity: 0` rules.

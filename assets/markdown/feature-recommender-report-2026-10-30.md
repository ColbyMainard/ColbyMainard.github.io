# Feature Recommendations

Last Updated: 2026-10-30

**Severity scale:** High means a primary audience is missing something on a path it actually uses. Medium means an improvement for a subset of visitors. Low means polish.

## Executive summary

The site already has a mature static feature set: an offline PWA, an Atom feed with visible subscribe links, reading time with a progress bar, per-section "Copy link" buttons, a manual photo gallery, a section tracker in the nav, and an easter egg. The remaining gaps are about connection and freshness. Seven of the eight stances end without pointing anywhere, the landing page gives no sign of recent writing, and the talk exists only as a PDF. Of the five recommendations below, the highest-leverage is a consistent "Related on this site" block at the end of every stance and guide.

## Existing-feature inventory

Checked against every page's `<head>`, `assets/js/`, and the root files.

- **Navigation:** a responsive header with a toggle and Escape-to-close (`navbar.js`), a per-page section nav with `aria-current` tracking, a back-to-top button (`back_to_top.js`), and a 404 page linking every page.
- **Reading aids:** reading time and a progress bar on `tech_takes.html` and `guides.html` (`reading_engagement.js`), and "Copy link" buttons on every section of `tech_takes.html`, `guides.html`, and `tech_resources.html` (`section_permalinks.js`).
- **Syndication:** a hand-maintained `feed.xml` with one entry per stance and guide (summary only), linked from both page heads and from a visible "Subscribe (Atom)" link.
- **Platform:** offline precache and install (`service-worker.js`, `manifest.json`), plus `llms.txt` with a citation policy.
- **Media:** a manual one-at-a-time photo gallery (`photo_gallery.js`) with CC BY 4.0 licensing and `ImageObject` license metadata, a YouTube embed, and talk slides as a PDF.
- **Engagement:** an easter egg on all seven pages (`easter_egg.js`) and per-page entrance animations.
- **Privacy:** consent-gated Google Analytics (`cookie_consent.js`) and a privacy-page preferences panel.
- **Prior reports:** today's code review, accessibility, and content reports were checked, and nothing below repeats them. No earlier feature report exists.

## Recommendation table

| # | Severity | Feature | Where it applies | Who it serves and why | Impact | Effort |
| - | -------- | ------- | ---------------- | --------------------- | ------ | ------ |
| 1 | Medium | "Related on this site" block | End of each stance on `tech_takes.html` (lines 348, 517, 552, 695, 825, 954, 1008) and each guide on `guides.html` | Enthusiasts who finish one piece get a next step. Seven of the eight stances (all but Vibe Coding) currently end with no onward link. | H | L |
| 2 | Medium | "Latest writing" block on the landing page | `index.html` intro, after line 228 | Employers see within seconds that the site is maintained. Enthusiasts land on the newest work. | H | M |
| 3 | Medium | Click-to-load YouTube facade | `assets/html/hobbies.html:141` | Every hobbies visitor. Google is no longer contacted until the visitor asks for the video. | M | M |
| 4 | Low | HTML talk summary with slide thumbnails | `index.html` Public Speaking section, lines 2357-2381 | Employers and event organizers can read the talk's argument without a 6.9 MB PDF, and screen-reader users get an accessible alternative. | M | M |
| 5 | Low | Level filter for the resource tables | `assets/html/tech_resources.html`, all book tables (for example line 974) | Beginners can narrow 65 books to "Beginner" in one click, using the existing Level column. | M | M |

## Recommendation details

**1. "Related on this site" block.** Close each stance and guide with a short `<aside>` titled "Related on this site" that lists two or three real connections. For example, Post-Internet Privacy could point to the cybersecurity guide and resources, Product Placement to the computer vision guide, and Future of Quantum Computing to the Quantum Computing hobby section. Use plain markup styled through a new shared mixin in `default.scss` that both page files call. It does not depend on anything else in this report. Cost: markup and SCSS only, with no new script. Each new stance needs one more block, which is small ongoing upkeep.

**2. "Latest writing" block.** Add a three-item list to the landing-page intro, linking the newest stance or guide entries with their "Last Updated" dates (today: Data Engineering Guide, Software Engineering Guide, Vibe Coding). Keep it hand-written rather than reading `feed.xml` at runtime, because a fetch of `feed.xml` fails on `file://`. Cost: markup only, but the list must be edited whenever the feed changes. Add that step to the feed's header-comment workflow so it is not forgotten.

**3. Click-to-load YouTube facade.** Replace the iframe with a button that shows the video title and a locally stored thumbnail. On activation, a small deferred script inserts the existing `youtube-nocookie.com` iframe. Without scripting, the existing "Watch this explainer on YouTube" link at line 143 remains the fallback. This duplicates CR-4 in the code review, so the roadmap should treat them as one action. Cost: one new script plus a thumbnail image, both in `PRECACHE_URLS`, and a `CACHE_VERSION` bump. Update the YouTube paragraph in `privacy.html` at line 193 to match.

**4. HTML talk summary.** Under the abstract, add four to six short paragraphs or bullets carrying the talk's main points, each paired with a small exported slide image that has descriptive `alt` text. Keep the PDF link, labelled with its type and size (accessibility A-4). This also becomes the talk's linkable asset (see the backlink and web-authority reports). Cost: a handful of compressed images registered in `PRECACHE_URLS` and a `CACHE_VERSION` bump. There is no ongoing upkeep.

**5. Level filter.** Add a small radio group above the book tables ("All", "Beginner", "Intermediate", "Advanced"). A deferred script hides non-matching rows, and it announces the count through a `role="status"` paragraph, as `#sectionPermalinkStatus` does. Without scripting, the radio group stays `hidden` and every row shows. Cost: one new script registered in `PRECACHE_URLS` and a `CACHE_VERSION` bump. The filter reads the existing Level column, so it needs no extra upkeep.

## Not recommended

- **Easter eggs** (maintainer candidate): already built. See `assets/js/easter_egg.js`, which every page loads.
- **Citation guidance** (maintainer candidate): already covered by the "Copy link" buttons in `section_permalinks.js` and by the citation policy in `llms.txt`. Per-section citation lines were removed on purpose on 2026-09-06.
- **Abbreviation markup** (maintainer candidate): already in place for 82 terms. The eleven unmarked league acronyms are handed to accessibility A-3 and code review CR-5.
- **Site search:** with seven pages and a section nav on each, search would add a script and an index file to maintain for little gain.
- **Full-content feed entries:** every edit would mean copying the text into `feed.xml` by hand, which is high upkeep for a small feed-reader audience.
- **Responsive photo derivatives:** this is a performance fix, not a feature, and it is already code review CR-3.

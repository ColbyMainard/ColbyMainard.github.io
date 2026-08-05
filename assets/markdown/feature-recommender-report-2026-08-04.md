# Feature Recommendation Report

**Last Updated:** 2026-08-04
**Scope:** new capabilities for the site, constrained to what a static, client-side-only site on GitHub Pages can do.
**Constraint applied throughout:** no backend, no build server, no npm dependency added without confirmation, must work from both `file://` and `https://`, and AnimeJS stays the only external library.

## Executive summary

The site's structure is complete for what it currently does. It covers professional background, opinions, resources, guides, and hobbies, and each of those sections is genuinely finished rather than stubbed. So the useful question is not "what section is missing" but "what does an existing visitor want to do that they currently cannot."

Three answers stand out. A recruiter cannot get a resume out of this site. A reader who wants to find one specific thing across 4,700 lines of guides and resources has only Ctrl+F on a single page. And the credibility the press mentions represent is sitting in a CSV file in the repository, invisible to every visitor. Those three, in that order, are the highest-value additions.

## Recommendation 1: Press mentions page

**Impact:** High. **Effort:** Low. **Why now:** the content already exists and is already maintained.

`press_mentions.csv` tracks seven articles that quote Colby by name, in publications including DevX, Financial Tech Times, and Label Your Data. None of this is visible to visitors.

For a semi-professional landing page, third-party validation is the single most persuasive content type available, and it is the one thing a candidate cannot manufacture. A hiring manager reading a self-authored skills list discounts it automatically. The same person reading "quoted on AI security in finance by Financial Tech Times" does not, because someone else vouched for it.

**Shape:** a new section on the home page, placed between Certifications and Other Skills, or its own small page if the list is expected to keep growing. A section is the better starting point; seven entries do not justify a page, and the home page is where the credibility is needed.

**Content:** publication, article title as a link, author, and date. Do not publish the `Comments` column from the CSV, which contains candid editorial assessments ("Butchered the quote to the point of meaninglessness") that are correct as private notes and unwise as public copy.

**Note on implementation:** hand-write the markup rather than fetching and parsing the CSV at runtime. A `fetch()` of a local CSV fails under `file://` CORS rules, which would violate the site's dual-origin requirement. The list changes a few times a year; a runtime parser is the wrong tool for that cadence.

## Recommendation 2: Downloadable resume

**Impact:** High. **Effort:** Low. **Why now:** it is the most common unmet visitor intent on a portfolio site.

There is currently no way to leave this site with a document. A recruiter who wants to forward Colby to a hiring manager has to send a URL and hope it gets opened, or copy-paste from the page.

**Shape:** a PDF at `assets/other/colby-mainard-resume.pdf`, linked from the intro section near the top of `index.html` and again from the contact section in the footer. The home page already contains everything the resume needs, so this is an export rather than new writing.

**Checklist items this triggers:** add to `PRECACHE_URLS`, bump `CACHE_VERSION`. Consider whether it belongs in `llms.txt` under Pages (probably yes, as a supplementary link).

**Optional refinement:** add a `print` stylesheet to `default.scss` so `index.html` prints cleanly to PDF. That gives a serviceable fallback without maintaining a separate document, and it means the printed version can never drift from the page. If the print stylesheet is good enough, it may remove the need to maintain a separate PDF at all.

## Recommendation 3: Client-side search across guides and resources

**Impact:** Medium-high. **Effort:** Medium. **Why now:** the content has outgrown the navigation.

`tech_resources.html` is 1,606 lines and `guides.html` is 716. A visitor looking for the Python resources, or for the section on reinforcement learning, currently has to know which page it is on, load that page, and scan. The section navigation helps within a page but does nothing across pages.

**Shape:** a search box in the header that filters a small hand-maintained index of section titles, anchors, and one-line summaries, rendering matches as links. Roughly 150 lines of vanilla JavaScript plus a JSON index.

**The `file://` constraint matters here.** `fetch()` of a local JSON index fails under `file://`. Two workable options:

1. Author the index as `assets/js/search_index.js` assigning to a global (`window.SEARCH_INDEX = [...]`), loaded as a normal deferred script. Works identically from both origins. This is the approach that fits this site's existing patterns.
2. Fetch a JSON file and degrade gracefully to a hidden search box when the fetch fails. More correct architecturally, worse in practice, because the feature silently disappears in exactly the environment the project requires support for.

Option 1 is the right call here.

**Scope discipline:** index section titles and summaries, not full body text. Full-text search would mean shipping the entire site content as a JavaScript payload, which reintroduces the weight problem the SEO report is trying to solve. Title and summary matching covers the realistic query set for a site this size.

## Recommendation 4: Project case studies

**Impact:** Medium. **Effort:** Medium-high. **Why now:** it addresses the biggest gap in the professional story, not the biggest gap in the site structure.

The work history is strong on responsibilities and thin on narrative. "Led development of model performance tracking and data quality pipelines, enabling systematic optimization of CV models and identifying ~$1M in cost savings" is the best line on the page, and it is one sentence about what was presumably months of work.

Engineers get hired on how they think, and a bullet cannot show that. Two or three case studies of roughly 800 words each, structured as problem, constraints, what was tried, what worked, and what was learned, would show it.

**Candidates, based on what the home page already claims:**

1. The MVP cost-savings work. It has a number attached, which makes it the most compelling.
2. The custom variational autoencoder. It is the most technically distinctive claim on the page and currently gets one clause.
3. The image auto-labeling utilities. Dataset-scaling work is broadly relatable to other ML teams.

**Shape:** a new `assets/html/projects.html` following the existing page conventions, with `Article` JSON-LD per case study, similar to how `tech_takes.html` is built. This is the largest item in this report and should be sequenced after the quick wins.

**Caveat to check first:** confirm what can be said about MVP and RiskScout work without breaching confidentiality. Write at the level of technique and tradeoff rather than of proprietary detail. If that turns out to be too constraining for the employer work, an academic or personal project would still serve the purpose.

## Recommendation 5: Lightweight image viewer for the photography gallery

**Impact:** Low-medium. **Effort:** Low. **Why now:** it pairs naturally with the image resizing work the SEO report requires.

Once the gallery images are resized for the web, the full-resolution originals become useful again as a click-to-enlarge target rather than dead weight. A small dialog-based viewer would let visitors see the photographs at a size that does them justice while the page itself stays light.

**Shape:** use the native `<dialog>` element rather than building a custom overlay. It gives focus trapping, Escape-to-close, and backdrop rendering for free, all of which are easy to get wrong by hand. Keep it under 60 lines, keep keyboard navigation working (arrow keys between images), and respect `prefers-reduced-motion` for the open and close transitions, consistent with how the rest of the site's motion is gated.

**Do this only after the resize work**, not before. Without resized derivatives it makes the weight problem worse rather than better.

## Considered and not recommended

- **A comments system.** Every option requires a third-party service, which means an external dependency, a privacy policy change, and a moderation burden. The technical stances would benefit from discussion, but the cost is disproportionate. The Atom feed and email contact already give readers a way to respond.
- **Dark and light mode toggle.** The site's palettes are deliberately chosen per page and documented with contrast notes in the SCSS. Adding a theme toggle means maintaining a second accessible palette for all seven pages and doubling the contrast verification burden, for a preference most visitors will not exercise on a site they read once.
- **Runtime CSV or Markdown parsing** for the press mentions or the markdown reports. Breaks under `file://`, as described above.
- **A newsletter signup.** Requires a backend or a third-party embed. The Atom feed already serves the readers who want to follow the technical stances, and it does so without collecting anyone's email address, which is more consistent with the privacy position the site argues for.
- **Analytics dashboard on the site.** Interesting to build, of no value to visitors, and awkward next to a privacy policy that emphasizes restraint in data collection.

## Suggested sequence

1. **Press mentions section.** Content exists, effort is hours, and it strengthens the site's core purpose.
2. **Resume PDF or print stylesheet.** Closes the most common visitor intent gap.
3. **Image viewer**, bundled with the SEO report's resizing work so the images are touched once.
4. **Client-side search.** Worth doing, but only after the content weight problems are resolved.
5. **Project case studies.** The most valuable item long-term and the most expensive. Start when there is time to write properly rather than squeezing it in.

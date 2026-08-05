# SEO Audit Report

**Last Updated:** 2026-08-04
**Scope:** on-page and technical SEO across all seven pages, plus `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml`, and `service-worker.js`.
**Method:** static review of markup and metadata. No crawl, no Search Console data, no live Core Web Vitals measurement. Performance claims below are derived from asset sizes on disk, not from field data.

## Executive summary

The metadata layer of this site is close to exemplary. Every page has a unique, keyword-appropriate title and a hand-written meta description of sensible length; canonical URLs, Open Graph, Twitter, and LinkedIn cards are complete and consistent; structured data is present on all seven pages and correctly varied by page type; `robots.txt` is thorough and ends with a valid `Sitemap:` directive; and `llms.txt` is a genuinely well-built crawler summary that most sites do not have at all.

The problem is not metadata. It is that the service worker forces every first-time visitor, on every page, to download roughly 22 MB of full-resolution photography in the background. That is the dominant SEO issue on this site, because it converts a hobbies-page weight problem into a sitewide page-experience problem. Everything else in this report is small by comparison.

## Findings

### [CRITICAL] The service worker precaches 22 MB of images on every first visit

- **Files:** `service-worker.js:36-41` (the precache entries), `service-worker.js:45-64` (install handler)
- **What:** `PRECACHE_URLS` includes all five photography JPEGs plus `DEFCON33.jpeg`. On install, the worker fetches every entry in that list. Measured sizes on disk:

  | Asset | Size |
  | ----- | ---- |
  | `DSC_0110.JPG` | 5,038,064 B |
  | `DSC_0237.JPG` | 3,870,068 B |
  | `DSC_0396.JPG` | 3,860,288 B |
  | `DSC_0004.JPG` | 3,695,476 B |
  | `DSC_0023.JPG` | 3,498,380 B |
  | `DEFCON33.jpeg` | 2,145,821 B |
  | **Total** | **~22.1 MB** |

- **Why it matters:** The service worker is registered from every page except `404.html`. A visitor who lands on the home page from a search result, reads it, and leaves has still been made to download 22 MB of photographs they never saw, competing for bandwidth with the page they are actually reading. On mobile this is the difference between a fast site and a slow one, and page experience is a live ranking input. It is also a real cost imposed on visitors with metered data, for zero benefit to them.
- **The aggravating factor:** because the fetch handler is cache-first for sub-resources, these files stay cached until `CACHE_VERSION` changes, at which point every returning visitor re-downloads all 22 MB. The version is currently `v55`, so this has already happened many times.
- **Fix, in order:**
  1. **Remove the six image entries from `PRECACHE_URLS` immediately.** They are the wrong kind of asset for a precache list, which should hold the shell (HTML, CSS, JS, icons) and nothing heavy. The runtime cache-first handler at `service-worker.js:84-130` will still cache each photo the first time someone actually visits the hobbies page, which is the correct behavior and requires no new code.
  2. Bump `CACHE_VERSION` so existing visitors drop the stale 22 MB.
  3. Then resize the source images (next finding), which reduces the remaining cost for people who do visit the hobbies page.

  Step 1 alone is a one-line-per-entry deletion and recovers essentially all of the sitewide loss.

### [HIGH] Photography is served at full DSLR resolution with no responsive variants

- **File:** `assets/html/hobbies.html:109`, `:134-138`
- **What:** Six images are served at their original capture resolution (3000x2000 for the gallery, 2100x2800 for the DEF CON photo) and scaled down by CSS. There is no `srcset`, no `sizes`, and no modern image format.
- **Why it matters:** Even after the precache fix above, the hobbies page itself remains a Core Web Vitals failure. Largest Contentful Paint on that page is gated by a multi-megabyte JPEG. A phone with a 400px-wide viewport downloads a 3000px-wide image and throws away roughly 98% of the pixels.
- **Fix:** Export web derivatives and use `srcset`. Resizing to 1600px and re-encoding at quality 80 typically lands these files between 200 KB and 400 KB, a reduction of over 90%:

  ```html
  <img src="../images/photographyHobby/DSC_0004-1600.jpg"
       srcset="../images/photographyHobby/DSC_0004-800.jpg 800w,
               ../images/photographyHobby/DSC_0004-1600.jpg 1600w"
       sizes="(max-width: 700px) 100vw, 700px"
       alt="Close-up of two pink and cream roses with layered petals against a soft gray background."
       width="1600" height="1067" loading="lazy" decoding="async">
  ```

  Keep the existing `alt`, `loading="lazy"`, and explicit `width`/`height`; all three are already correct and the dimensions only need updating to match the new files. Remember to update `PRECACHE_URLS` paths if any precached image path changes, and bump `CACHE_VERSION`.
- **Note:** adding WebP or AVIF via `<picture>` would save more, but plain resized JPEG captures the large majority of the win at a fraction of the maintenance burden. Do the resize first and treat format conversion as optional.

### [MEDIUM] `feed.xml` contains two elements that are not valid Atom

- **File:** `feed.xml:17-18`
- **What:** The feed declares `<language>en-us</language>` and `<copyright>2026 Colby Mainard - All rights reserved.</copyright>`. Both are RSS 2.0 elements. Atom 1.0 does not define either one.
- **Why it matters:** The W3C Feed Validator reports these as undefined feed elements, so the feed does not validate cleanly. Most readers will ignore the unknown elements rather than fail, but an invalid feed is a weaker citation target and some aggregators do reject on validation. The language information is also redundant, since `xml:lang="en"` is already correctly set on the `<feed>` element at `feed.xml:9`.
- **Fix:** Delete the `<language>` line, since `xml:lang` already carries it, and rename `<copyright>` to its Atom equivalent:

  ```xml
  <rights>2026 Colby Mainard - All rights reserved.</rights>
  ```

  This is a metadata-only change to `feed.xml`, so per the project checklist it needs a `CACHE_VERSION` bump but no entry `<id>` changes.

### [MEDIUM] `privacy.html` is missing from `sitemap.xml`

- **File:** `sitemap.xml`
- **What:** The sitemap lists five URLs: the home page, tech stances, tech resources, guides, and hobbies. `assets/html/privacy.html` is absent, although `robots.txt` allows it, it is linked from the footer of every page, it carries its own BreadcrumbList JSON-LD, and it appears in `llms.txt` under "Optional."
- **Why it matters:** Small but real. A privacy policy is a trust signal that search engines associate with site legitimacy, particularly for a site that runs analytics. Excluding it from the sitemap while linking it sitewide is an inconsistency with no upside.
- **Fix:** Add the entry with a low priority, matching the existing format:

  ```xml
  <url>
      <loc>https://colbymainard.github.io/assets/html/privacy.html</loc>
      <lastmod>2026-08-04</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.3</priority>
  </url>
  ```

### [LOW] Author linkage is inconsistent across structured data

- **Files:** `assets/html/tech_resources.html`, `assets/html/hobbies.html`
- **What:** JSON-LD `@type` coverage by page:

  | Page | Types present |
  | ---- | ------------- |
  | `index.html` | Person, ProfilePage, WebSite, Organization, CollegeOrUniversity, EducationalOccupationalCredential |
  | `tech_takes.html` | Blog, Article, Person, BreadcrumbList, ListItem |
  | `guides.html` | HowTo, HowToStep, ItemList, Person, BreadcrumbList, ListItem |
  | `tech_resources.html` | ItemList, BreadcrumbList, ListItem |
  | `hobbies.html` | ItemList, BreadcrumbList, ListItem |
  | `privacy.html` | BreadcrumbList, ListItem |
  | `404.html` | BreadcrumbList, ListItem |

  `tech_takes.html` and `guides.html` both attach a `Person`. `tech_resources.html` and `hobbies.html` do not.
- **Why it matters:** The curated resource lists are recommendation content, and recommendations carry more weight in entity terms when they are attributably authored. Attaching the same `Person` node ties those pages into the entity graph the home page establishes rather than leaving them as orphan `ItemList`s.
- **Fix:** Add an `author` property referencing the existing Person by `@id` (reuse whatever `@id` the home page Person node already uses so the graph resolves to one entity rather than four copies).

### [LOW] Structured data advertises an expired credential

- **File:** `index.html:82`
- **What:** The `EducationalOccupationalCredential` node for the AWS Certified Cloud Practitioner declares `"expires": "2026-05"`. That date has passed.
- **Why it matters:** Structured data is a machine-readable set of claims about the entity, and this one currently reads "holds a certification that expired three months ago." It is a small accuracy problem rather than a penalty risk, but expired credential data is exactly the kind of stale signal that structured data exists to prevent.
- **Fix:** Update `expires` if the certification was renewed, or remove the `expires` property and reframe the credential as previously held. Keep the visible copy at `index.html:2259-2261` in sync in the same edit; see the content report, which covers the reader-facing side of the same issue.

### [LOW] `meta name="keywords"` is dead weight

- **File:** `index.html:8`, and the equivalent line on other pages
- **What:** `<meta name="keywords" content="computer vision, natural language processing, ...">`.
- **Why it matters:** Google has ignored this tag since 2009 and Bing treats it as a spam signal at worst, a no-op at best. It does nothing.
- **Fix:** Optional. Removing it is tidier and costs nothing; leaving it costs almost nothing either. Listed here only for completeness. Do not spend a work item on it.

## Checked and deliberately not raised as a finding

**Sitemap `lastmod` values do not match git commit dates.** Every page in the repository was last committed on 2026-08-04, but the sitemap carries dates ranging from 2026-06-17 (guides) to 2026-08-04 (home). This looks like drift and is not. Google's guidance is that `lastmod` should reflect the last *significant* content change, not every commit, and the recent commits touching all pages were formatting and minor-tweak passes. Hand-maintaining these dates against meaningful edits is the correct behavior and more useful to crawlers than automatically stamping every file on every push. No change recommended. This is noted only so a future audit does not "fix" it.

## What is already correct and should be preserved

- **Titles are unique, descriptive, and correctly formatted** on all seven pages, with the brand suffix pattern applied consistently (`Beginner Tech Guides: Data, AI, ML & Cybersecurity | Colby Mainard`). Lengths sit in the range that renders without truncation.
- **Meta descriptions are hand-written per page**, specific, and within display limits. None are duplicated, none are auto-generated boilerplate. The guides description in particular front-loads the exact terms someone would search.
- **Social cards are complete and consistent.** Canonical URL, `og:type`, `og:url`, `og:title`, `og:description`, `og:image` with explicit width, height, and alt, plus `og:site_name`, and parallel Twitter and LinkedIn tags on every page. The `og:type="profile"` choice on the home page correctly agrees with its `ProfilePage` JSON-LD, and the inline comment at `index.html:20-21` documents why.
- **`robots.txt` is thorough and correctly structured**, with a deliberate policy separating AI training crawlers from live-search and link-preview agents, explanatory comments, and a valid `Sitemap:` directive at line 326.
- **`llms.txt` is a strong asset.** Key facts, an FAQ block, per-section deep links for both the guides and the resources pages, and an explicit citation policy. This is better than what most commercial sites publish, and the per-section link lists are exactly the right structure for assistant citation.
- **Structured data is present on all seven pages** and appropriately varied by page type, with `HowTo`/`HowToStep` on the guides and `Blog`/`Article` on the technical stances. BreadcrumbList coverage on all six non-home pages is complete.
- **The Atom feed exists and is wired correctly**, linked from `tech_takes.html` via `<link rel="alternate">`, with permanent `tag:` URIs for entry IDs and a header comment documenting the maintenance workflow. The two invalid elements noted above are the only defect in an otherwise well-built feed.
- **Images already carry `loading="lazy"`, `decoding="async"`, and explicit `width`/`height`.** The dimensions attribute in particular prevents layout shift, which is the right instinct. Only the underlying file sizes are wrong.

## Recommended sequence

1. Delete the six image entries from `PRECACHE_URLS`, bump `CACHE_VERSION`. Minutes of work, removes a sitewide penalty.
2. Add `privacy.html` to `sitemap.xml`. Minutes.
3. Fix the two invalid Atom elements in `feed.xml`. Minutes.
4. Resize the photography and add `srcset`. Hours, and the only item here that requires image tooling.
5. Add author linkage to the two orphan JSON-LD pages. Optional polish.

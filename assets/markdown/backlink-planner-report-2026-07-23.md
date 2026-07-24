# Backlink Strategy Plan

**Date:** 2026-07-23
**Scope:** `index.html`, `assets/html/{guides,tech_resources,tech_takes,hobbies,privacy}.html`
**Nature of this document:** a plan. No site files were edited.

## Page notes (what each page actually has)

| Page | Core topic and audience | Linkable assets it has | What it lacks | Interactive or visual? |
| ---- | ----------------------- | ---------------------- | ------------- | ---------------------- |
| `index.html` | Credentials, for employers and colleagues | Detailed work history, ~40 course breakdowns, a named project with a measurable result (94% accuracy, second of twenty teams) | Any reason for a third party to link to it. Resumes are not linkable assets. | Six decorative SVGs, no interactivity |
| `guides.html` | Seven beginner guides, for newcomers | Genuine comprehensive-guide material, seven `HowTo` schema blocks, per-guide "Cite this guide" URLs, a tools list per topic | Depth: each guide runs roughly 400 to 900 words where the pages that win these queries run 3,000+. No diagrams, no examples with code. | **Static text only** |
| `tech_resources.html` | Curated books, certifications, podcasts | The site's strongest directory asset. Roughly 30 books with authors and difficulty levels, five cybersecurity certifications, podcast lists, all personally vetted | Deep-link ids on half the `<h3>` headings; no way to filter or compare | **Static tables only** |
| `tech_takes.html` | Six long-form opinions, for enthusiasts | The best writing on the site. The Product Placement piece contains first-hand professional knowledge that exists almost nowhere else publicly | Citation lines; any internal outbound links | Reading time and a progress bar, but no visual or interactive content |
| `hobbies.html` | Photography, quantum, D&D, history | Five original photographs, two named books, five podcast recommendations with links, a local business recommendation | Gallery treatment; captions | An embedded video and six images |
| `privacy.html` | Disclosure | None, by design | Nothing. This page should not chase links. | None, correctly |

**Existing off-site footprint:** `press_mentions.csv` records eight external mentions. Five are noted as faithful quotes; three were misunderstood or, in one case, "butchered to the point of meaninglessness." That is useful evidence: the site already attracts citation without asking, and the failure mode is misquotation rather than obscurity. Several strategies below are shaped around making the author easier to quote correctly.

---

## S-1: Internal linking across the guide / resource / opinion triad

**Strategy & target pages:** Internal linking. `index.html`, `guides.html`, `tech_resources.html`, `tech_takes.html`, `hobbies.html`.

**Pros.** This is the cheapest work in this document and the only strategy here with a guaranteed outcome, because it does not depend on anyone else's cooperation. The site's link graph is currently lopsided in a way that actively wastes authority: `guides.html` sends seven links to `tech_resources.html` and receives none back, `tech_takes.html` emits zero internal links and receives exactly one (from the quantum section of `hobbies.html`), and `index.html` emits zero internal body links across 2,317 lines despite being the page most likely to accumulate external links from LinkedIn profiles and job applications. Every external link the home page earns currently dead-ends there. The topic triad also already exists conceptually: there is a cybersecurity guide, a cybersecurity resource list, and a privacy opinion piece, and none of the three references the other two.

**Cons.** Internal links do not create authority, they only redistribute it. If the site has little external authority to begin with, this amplifies a small signal rather than a large one. It also has to be done with restraint: adding a link to every plausible destination produces a page that reads like a wiki and degrades the plain-spoken tone the site depends on. There is real overlap with the SEO report here, which reaches the same conclusion from a rankings angle; treat the two as one piece of work, not two.

**On-site content steps.**

1. From `index.html` Technical Skills, link the Computer Vision competency to the [computer vision guide](assets/html/guides.html#computerVisionGuideDiv) and the Cybersecurity list to the [cybersecurity resource list](assets/html/tech_resources.html#cybersecurityResourcesDiv). Two links, in-context, nothing more.
2. From `index.html` Work History, link the MVP sports-analytics bullet to the [product placement stance](assets/html/tech_takes.html#ProductPlacementDiv). This is the strongest natural link on the site: the bullet describes the work, the stance explains the thinking behind it.
3. In `tech_resources.html`, close each of the six topic sections with one link to the matching guide. This makes the guides-to-resources relationship reciprocal.
4. In `tech_takes.html`, add a short related-reading block at the end of each of the six sections. This is the same component the feature-recommender report proposes, and `tech_takes_engagement.js` already excludes a `.relatedStances` selector from its reading-time count, so the class name is reserved and the reading times will stay accurate.
5. Vary the anchor text. `guides.html` currently uses "my list of AI resources" five separate times pointing at the same URL. Replace with distinct descriptive anchors per guide.

**Outreach steps.** N/A — internal.

**Expected success rate.** High for the mechanism, indirect for the outcome. This will not earn a single new backlink on its own. It makes every link earned by S-3 through S-7 worth more, which is why it is listed first.

**Expected effort level.** Low. Roughly two hours of markup edits across five files, no scripts, no service-worker changes, no ongoing upkeep beyond adding a link when new content ships.

---

## S-2: Add interactivity to the three static pages

**Strategy & target pages:** Interactivity and visualization (stickiness). `guides.html`, `tech_resources.html`, `tech_takes.html`.

**Flagged for lacking interactivity or visualization:** `guides.html` (static text only), `tech_resources.html` (static tables only), `index.html` (static, and correctly so — a resume does not need a calculator). `tech_takes.html` has engagement instrumentation but no visual content.

**Pros.** Interactive assets are the single most reliably linkable thing a small technical site can host, because they are useful rather than merely readable. A person writing a blog post about computer vision has a hundred articles to link to and almost no tools. The three additions below are all things this site is uniquely positioned to build, because they encode judgment the author actually has rather than information anyone could look up.

**Cons.** Each addition is a new deferred script, a `PRECACHE_URLS` entry, and a `CACHE_VERSION` bump, and each must work from `file://` with no dependency beyond what already ships. More importantly, an interactive widget that is merely decorative earns nothing: if the CV problem-class picker just restates the five headings already on the page, nobody links to it. The bar is that the tool must save the reader a decision they would otherwise have to make by reading everything. There is also scope overlap with the feature-recommender report, which owns interactivity aimed at visitor experience rather than link earning. The three below are proposed specifically as link targets.

**On-site content steps.**

1. **Computer vision problem-class picker**, in `guides.html` inside the Computer Vision guide, directly under the existing "Problem Classes" list. Three or four questions ("Do you need to tell two objects of the same type apart?", "Do you need a label for every pixel?", "Do you need to know where a person's limbs are?") resolving to one of the five classes already documented on the page, with a one-line justification and a link to the matching section. Pure DOM plus a small decision table, no dependency.
2. **Certification comparison filter**, in `tech_resources.html` inside the Cybersecurity section. The five certifications already carry structured attributes in prose (experience required, target role, seniority). Normalize those into data attributes on the table rows and let a reader filter by "no experience required" or "management track." The data already exists; only the filter is new.
3. **Placement-value illustration**, in `tech_takes.html` inside the Product Placement stance. An inline SVG diagram (`role="img"` with a `<title>`, per project convention) showing a schematic broadcast frame with the seven visual signals the piece names, each labeled. Static SVG is enough; interactivity is optional. This section currently explains seven visual factors entirely in prose, which is the one place on the site where a picture is unambiguously better than the paragraph.

**Outreach steps.** Deferred until built. Once live, these become the concrete assets that S-4 and S-5 point at. A community post saying "I wrote a guide" earns nothing; "I built a picker that tells you whether you need instance or semantic segmentation" earns a link.

**Expected success rate.** Medium to high, conditional on quality. Assumes the picker and filter are genuinely useful rather than restating headings. The SVG diagram is the safest bet of the three: diagrams get embedded and credited more reliably than tools get linked.

**Expected effort level.** Medium per item. Each is roughly a day: script, SCSS, accessibility pass (keyboard operation, `role="status"` for results), `PRECACHE_URLS`, `CACHE_VERSION`. Build the SVG diagram first; it is the cheapest and has the highest ratio of value to risk.

---

## S-3: Publish the sports placement valuation framework as original research

**Strategy & target pages:** Original research and case study. `tech_takes.html#ProductPlacementDiv`, expanded, plus a link from `index.html` Work History.

**Pros.** This is the highest-value opportunity on the site and it is not close. The Product Placement stance describes production computer vision work valuing brand placements across MLB, NBA, PGA, NHL, PFL, UFL, and NFL, and it names seven visual signals that correlate with placement value. That combination of first-hand professional experience and a public, structured writeup essentially does not exist elsewhere: sports sponsorship valuation is a commercial industry where methodology is a trade secret, and computer vision writing about sports is almost entirely about player tracking rather than sponsorship. The piece is already the site's best co-citation opportunity, because anyone writing about sponsorship measurement has almost nothing credible to cite. It also has unusual persistence: the underlying signals will not go stale the way a model benchmark would.

**Cons.** The obvious one is confidentiality. Anything that reveals a former employer's proprietary methodology, client relationships, or internal figures is off limits, and the maintainer is the only person who can draw that line. The piece as written already handles this well by describing signals rather than implementations, and the expansion must hold that same discipline. Second, there is a real risk of the material being taken without attribution by exactly the commercial vendors who would benefit most, which is an argument for the citation block in step 4 rather than an argument against publishing. Third, this audience is small: sports sponsorship measurement is a niche within a niche, so expect few links of high quality rather than many.

**On-site content steps.**

1. Expand each of the seven signals from a short paragraph into a fuller treatment: what it is, why it moves value, how it interacts with the other six, and one concrete illustrative scenario. The Digitally-Enhanced versus Analog Assets section in particular is currently two sentences on a topic (virtual glass, digitally enhanced dasherboards) that almost nobody outside the industry has written about publicly.
2. Add the schematic SVG from S-2 step 3 so the framework has a visual anchor that other sites can embed with credit.
3. Add a short "How this framework was derived" paragraph stating the leagues, the scale, and the role, without proprietary detail. Sourcing is what turns an opinion into citable research.
4. Add a citation block: canonical anchor URL, author name, and last-updated date, matching the "Cite this guide" pattern already used on all seven guides. Given that three of eight recorded press mentions garbled the author's words, giving writers a copyable citation is the cheapest defense available.
5. Give the piece a stable, descriptive anchor and confirm the `feed.xml` entry's `<updated>` and the JSON-LD `dateModified` both move when it is revised.

**Outreach steps.** Go to the sponsorship-measurement and sports-technology communities directly, not to journalists.

- **SportTechie / Sports Business Journal community coverage** (<https://www.sportsbusinessjournal.com/>) — reader-submitted analysis is occasionally picked up. Low probability, high value.
- **MIT Sloan Sports Analytics Conference** (<https://www.sloansportsconference.com/>) — the research-paper track is the single best-fit venue for this material. Papers are archived, cited, and permanently linked. Submission windows are annual, so plan ahead.
- **The Analytics Power Hour** (<https://analyticshour.io/>) and **Practical AI** (<https://practicalai.fm/>) — both run guest episodes with linked show notes. Sponsorship valuation via CV is an unusual enough topic to be a genuine pitch rather than a favor.
- **Ultralytics discussions** (<https://github.com/ultralytics/ultralytics/discussions>) — the piece mentions YOLO in production; a substantive post about production considerations for logo detection fits the community's actual interest.

Template, adapted per venue:

> Subject: Computer vision framework for valuing sports brand placements
>
> Hi [name],
>
> I spent two and a half years building the computer vision pipelines that valued brand placements for MLB, NBA, NHL, NFL, PGA, PFL, and UFL broadcasts. I have written up the seven visual signals that actually correlate with placement value, including a few (motion blur, digitally enhanced versus analog assets, relative clutter) that I have not seen discussed publicly anywhere.
>
> It is here: [URL]
>
> I am not selling anything. If it is useful to [community/show], I am happy to go deeper on any part of it, and equally happy if it is not a fit.
>
> Colby Mainard

**Expected success rate.** Medium to high for quality, low for volume. Assumes the expansion adds real substance beyond the current version. Expect a handful of links over six to twelve months, but from sources with genuine topical authority. The Sloan submission is the highest-value single shot and also the longest odds.

**Expected effort level.** High. Roughly 15 to 25 hours: substantial writing, the SVG diagram, a careful confidentiality review, and outreach. This is the one item here worth doing slowly.

---

## S-4: Get `tech_resources.html` into curated resource directories

**Strategy & target pages:** Resource directories and co-citation. `tech_resources.html`, secondarily `guides.html`.

**Pros.** `tech_resources.html` is already a resource directory. It lists roughly 30 books with named authors and difficulty ratings, five cybersecurity certifications with plain-language descriptions, and vetted podcast lists, and it carries a real differentiator most such lists do not: the intro states every item was personally read, owned, or listened to. Curated "awesome" lists on GitHub are the highest-trust, most persistent link sources available to a page like this, because they are version-controlled, actively maintained, widely mirrored, and heavily crawled. They also deliver strong co-citation: an entry sitting between two well-known resources is exactly the adjacency that gets a site treated as a peer.

**Cons.** Awesome-list maintainers reject most submissions, and the bar is that the resource is not duplicative. A book list competes against hundreds of book lists. The realistic angle is submitting to narrower lists where the site's specific combination (personally vetted, difficulty-rated, spanning security and ML) is actually distinctive, rather than the flagship lists where it is not. Some of these lists are also semi-abandoned, so a merged pull request may sit on a page nobody visits. Check recent commit activity before spending time on any of them.

**On-site content steps.**

1. Fix the deep-link gap first. Only five of the page's `<h3>` headings carry ids, and neither "Podcasts" heading does. A directory submission needs a precise URL to point at, and half of this page is currently unlinkable below the `<h2>` level.
2. Add the missing `<h3>Books</h3>` headings to the Scripting and Operating Systems sections so all six topics have parallel structure.
3. Make the vetting claim prominent rather than buried in the third intro paragraph. It is the reason a maintainer would accept the submission over the fiftieth generic book list.
4. Add a visible last-reviewed date per section, not just one for the whole page. Directory maintainers prune stale entries, and per-section freshness is what keeps a listing alive.

**Outreach steps.** Submit by pull request, following each repository's contribution guidelines exactly.

- **awesome-machine-learning** (<https://github.com/josephmisiti/awesome-machine-learning>)
- **awesome-computer-vision** (<https://github.com/jbhuang0604/awesome-computer-vision>)
- **awesome-security** (<https://github.com/sbilly/awesome-security>)
- **awesome-quantum-computing** (<https://github.com/desireevl/awesome-quantum-computing>) — a better fit for the `hobbies.html` quantum section than for the resources page
- **Awesome list index** (<https://github.com/sindresorhus/awesome>) — use this to find narrower, more accepting lists in each topic rather than submitting here directly

Pull request description template:

> Adds a curated learning-resource list covering cybersecurity, AI/ML, C/C++, Python, scripting, and operating systems. Every book and podcast listed was personally read, owned, or listened to by the author, and each book carries a difficulty rating (beginner / intermediate / advanced), which I did not find in the existing entries.
>
> Link: [section-specific URL]

**Expected success rate.** Medium. Assumes the maintainer targets narrower lists rather than the flagship ones and that the deep-link ids are fixed first. Expect roughly one acceptance for every four or five submissions, but accepted entries are durable and highly crawled.

**Expected effort level.** Low to medium. Two to three hours of on-site fixes, then about 30 minutes per submission. The main cost is patience: pull requests on large awesome lists routinely sit for months.

---

## S-5: Direct community participation in the topics the guides already cover

**Strategy & target pages:** Direct community engagement. `guides.html`, `tech_takes.html`.

**Pros.** The guides answer beginner questions, and these are the forums where beginners ask exactly those questions, in public, permanently, with high crawl frequency. A genuinely helpful answer that happens to link to a relevant guide is the most natural link the site can earn, and it is contextual by construction: the link is surrounded by the explanation of why it is relevant. This also satisfies the trust and persistence priorities better than almost anything else, since forum threads stay indexed for years. The author's DEF CON 33 attendance is a real, already-documented connection to the security community rather than a manufactured one.

**Cons.** This is a slow, ongoing commitment, not a campaign. Communities detect and punish drive-by link dropping, and a single self-promotional post can cost standing that takes months to rebuild. The correct ratio is roughly one link for every ten substantive contributions that link to nothing. It also does not scale: this is the author's own time, and it cannot be delegated or batched. If the maintainer cannot sustain a few hours a month, skip this rather than doing it badly.

**On-site content steps.**

1. Deepen the guides before pointing anyone at them. Each currently runs a few hundred words, which is thin next to what these communities already consider a good answer. Add at least one worked example per guide.
2. Ensure every guide section has a stable deep-link URL, which it already does via the "Cite this guide" lines.
3. Complete S-1 first so a visitor arriving at one guide can find the matching resource list and opinion piece.

**Outreach steps.** Participate first, link later, and only where the link genuinely answers the question asked.

- **fast.ai forums** (<https://forums.fast.ai/>) — the most beginner-friendly serious ML community; the computer vision and generative AI guides fit its audience directly.
- **PyTorch discussion forums** (<https://discuss.pytorch.org/>) — heavily indexed, strongly moderated, and the guides name PyTorch throughout.
- **Hugging Face forums** (<https://discuss.huggingface.co/>) — best fit for the generative AI and NLP guides.
- **OpenCV forum** (<https://forum.opencv.org/>) — matches the computer vision guide's tooling section.
- **Quantum Computing Stack Exchange** (<https://quantumcomputing.stackexchange.com/>) — fits the quantum stance and the `hobbies.html` self-study section, including the two named books.
- **OWASP chapters** (<https://owasp.org/chapters/>) and **DEF CON Groups** (<https://defcongroups.org/>) — both have Austin-area chapters and both publish chapter resources online. Presenting at a local chapter meeting typically earns a linked listing, and the author already attends DEF CON.
- **Lobsters** (<https://lobste.rs/>) — invite-only, low-noise, and receptive to genuine technical writing. Self-submission is permitted but limited; read the rules before posting.

Note on Hacker News: it is not one of the platforms ruled out in this plan's constraints, but self-submission there is high variance and a failed submission burns the piece. If any single item is submitted, make it the expanded Product Placement research from S-3, which is the only piece novel enough to survive that audience.

Template for a forum reply, not a post:

> [Direct, complete answer to the actual question, 150 or more words, useful on its own with no link.]
>
> I wrote up the longer version of this, including [the specific additional thing the guide covers], here if it helps: [deep-link URL]. Happy to go into any part of it further.

**Expected success rate.** Medium, and slow. Assumes sustained participation over six or more months. Most forum links are `nofollow`, so the value is referral traffic, credibility, and retrievability by AI answer engines rather than raw link equity. That is still worth having.

**Expected effort level.** Medium to high, and recurring. Two to four hours per month indefinitely. This is the strategy most likely to be abandoned halfway, so commit to it or skip it.

---

## S-6: Syndicate two pieces with canonical links back

**Strategy & target pages:** Content syndication. `tech_takes.html#KANDiv` and the Computer Vision guide.

**Pros.** Both dev.to and Hashnode support a canonical URL field, so the original keeps its ranking authority while the republished copy reaches an audience the GitHub Pages site will never reach on its own. Both platforms have far more domain authority than a personal `github.io` subdomain, and both are heavily crawled by AI answer engines, which serves the retrievability priority directly. The KAN piece is the right first candidate: it covers a topic with real search interest, low competition, and few good explanations, and it stands alone without the rest of the site's context.

**Cons.** Syndicated copies routinely outrank the original even with a canonical set, so the maintainer should expect the dev.to version to be the one people find and link to. That is an acceptable trade for reach but it is a trade. The site is on a `github.io` subdomain, which means it will never win an authority contest against these platforms. Also, syndicating everything dilutes the site's purpose; two pieces is the right number, not seven.

**On-site content steps.**

1. Finish the piece on-site first. Syndicate the final version, not a draft, since keeping two copies in sync is upkeep nobody sustains.
2. Add the citation block from S-3 step 4 to the KAN section before syndicating, so the on-site version is the one that looks canonical to a human reader as well as to a crawler.
3. Note the syndication in the on-site piece with a short line at the end pointing to the republished copy. This is what makes the relationship visibly deliberate rather than accidental duplication.

**Outreach steps.**

- **dev.to** (<https://dev.to/>) — set the `canonical_url` field in the post's front matter to the on-site anchor URL. Tag with `machinelearning`, `deeplearning`, `computervision`.
- **Hashnode** (<https://hashnode.com/>) — same approach; the "Original article URL" field lives in post settings.
- **LinkedIn articles** (<https://www.linkedin.com/>) — reasonable for the professional-network audience specifically, and the author's LinkedIn profile is already the `sameAs` target in the `Person` schema. LinkedIn does not honor canonicals properly, so post an abridged version with a link to the full piece rather than the whole thing.

**Expected success rate.** Medium. Assumes the KAN piece is genuinely one of the better explanations available, which on reading it, it is. Expect referral traffic and some organic links to the syndicated copy; expect fewer directly to the original.

**Expected effort level.** Low. Two to three hours total, mostly reformatting to Markdown. No ongoing upkeep if syndication happens once per piece and the copies are not maintained in parallel.

---

## S-7: Build an applied computer vision pillar page

**Strategy & target pages:** Pillar page. A new page, linking to `guides.html#computerVisionGuideDiv`, `tech_takes.html#ProductPlacementDiv`, `tech_resources.html#artificialIntelligenceResourcesDiv`, and the relevant `index.html` work history and project entries.

**Pros.** Computer vision is the one topic this site covers from four independent angles: a beginner guide explaining the problem classes, a professional opinion piece on a real production application, a curated resource list, and verifiable work history spanning sports analytics, medical imaging, and facial tracking. Right now those four live on four pages and none of them references the others, so anyone wanting to link to "this person on computer vision" has to pick one thin page or link to the site root. A pillar page gives them one obvious URL. It also concentrates the topical authority that is currently spread across four URLs, and it is the natural landing point for links earned by S-3, S-5, and S-6.

**Cons.** This is a new page, which means the full checklist: an SCSS partial, an `@import` in `default.scss`, a recompile, nav updates on all seven existing pages, `sitemap.xml`, `llms.txt`, `PRECACHE_URLS`, and a `CACHE_VERSION` bump. It also adds a seventh nav item to a bar that already holds five, which is a real usability cost on mobile. And a pillar page that just links elsewhere is a doorway page with no value of its own; it has to carry substantive original framing to justify existing. Consider it only after S-3 has produced enough material to anchor it.

**On-site content steps.**

1. Create `assets/html/computer_vision.html` following the head pattern of an existing page: canonical, OG tags, `BreadcrumbList`, and an `Article` block.
2. Open with 600 to 1,000 words of original framing that exists nowhere else on the site: what applied computer vision actually looks like in production, as distinct from the tutorials. Draw on the concrete detail already scattered across the site (the auto-labeling utilities, the custom VAE, the model performance tracking that identified roughly $1M in savings, the facial-landmark work at Shiseido).
3. Section it by the four angles, each with a substantive summary and a deep link to the detailed page.
4. Register it everywhere: nav on all seven pages, `sitemap.xml`, `llms.txt` Pages list, `PRECACHE_URLS`, `CACHE_VERSION` bump.
5. Redirect the outreach in S-3 and S-5 to point here rather than at the individual sections, once it is live.

**Outreach steps.** Same targets as S-3 and S-5, retargeted to the pillar URL. Do not run a separate outreach campaign for this page; it is the destination, not a new pitch.

**Expected success rate.** Medium, and entirely dependent on S-3. A pillar page over thin content is a doorway page and earns nothing. A pillar page over genuinely original production experience is the most linkable asset this site could have.

**Expected effort level.** High. Roughly 20 to 30 hours including the writing, the new SCSS partial, and the seven-page nav change. Do this last, if at all, and only after S-3 proves the material has an audience.

---

## S-8: Add sourced expert quotes and notify the people quoted

**Strategy & target pages:** Sourced expert quotes. `tech_takes.html#KANDiv`, `tech_takes.html#PrivacyDiv`.

**Pros.** The site already does this well in two places, which is proof the pattern fits the voice: the John Woods maintainability quote in the software engineering guide, and the Twain attribution on the hobbies page. Extending it to the technical stances adds credibility exactly where the content is most opinionated, and notifying the person quoted is a genuinely low-friction outreach move, because it asks for nothing. Researchers in particular tend to share thoughtful public engagement with their work.

**Cons.** It only works if the quote actually supports the argument. A decorative quote adds nothing and dilutes the piece. Notification also has a low hit rate: most people will not respond, and a few will read it as a disguised link request no matter how it is phrased. Keep the note short and make no ask. Note also that the Twain attribution currently used on `hobbies.html` links to an article that is itself about that quote being misattributed, which should be fixed before this pattern is extended anywhere else.

**On-site content steps.**

1. In the KAN stance, quote directly from the Kolmogorov-Arnold Networks paper (<https://arxiv.org/abs/2404.19756>), which is already linked, on the specific claim about interpretability. Attribute to the authors and link to the paper.
2. In the Privacy stance, the 87%-reidentification figure already links to <https://aboutmyinfo.org/identity/about>. Attribute that finding to Latanya Sweeney by name rather than leaving it as an unattributed statistic. Named attribution is stronger evidence and creates a real notification target.
3. Fix the Twain attribution on `hobbies.html` to say "widely attributed to Mark Twain, though disputed," which the linked source actually supports.
4. Keep the total to two or three quotes across the whole site. Scarcity is what makes them land.

**Outreach steps.** A short note through whatever public channel the person already uses (an academic contact page, a personal site contact form). No mainstream social platforms, per this plan's constraints.

> Subject: Cited your work on [topic]
>
> Hi [name],
>
> I referenced your [paper / talk / finding] on [specific topic] in a piece I wrote about [subject]: [URL]. I wanted to make sure the characterization is fair to your actual argument, so if I have misread anything, tell me and I will correct it.
>
> No ask here, just a heads up.
>
> Colby Mainard

**Expected success rate.** Low for links, meaningful for relationships. Assumes two or three notifications, not a campaign. The realistic outcome is one useful conversation rather than a link, and the accuracy check is worth the email on its own.

**Expected effort level.** Low. Two to three hours total including the on-site edits.

---

## What was considered and set aside

- **Skyscraper technique on "Kolmogorov-Arnold Networks explained."** Genuinely viable on topic fit, since the incumbent pages are mostly paper summaries. Set aside because the technique requires identifying and contacting every site linking to the weaker page, which needs a backlink-analysis tool the maintainer does not have, and because it is a poor use of time next to S-3, where the site has a durable advantage rather than a temporary one.
- **Expert roundup posts.** Effective, but they require an existing network willing to contribute, and soliciting contributions from a site with little current authority mostly produces silence.
- **`index.html` as a link target.** Deliberately excluded from every strategy above. Nobody links to a resume. The home page should receive internal links (S-1) and profile links, not be the subject of outreach.
- **`privacy.html`.** Correctly `noindex`. No strategy applies and none should.
- **Publishing `press_mentions.csv` as a press page.** Three of the eight recorded mentions are logged as misquotes, one severely. Publishing the list as-is would advertise those. A curated version listing only the five faithful quotes is defensible, but the higher-value response to that file is the citation blocks in S-3 and S-6, which reduce future misquotation rather than cataloguing past ones.

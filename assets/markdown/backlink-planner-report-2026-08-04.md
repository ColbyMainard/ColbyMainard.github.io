# Backlink Strategy Report

**Last Updated:** 2026-08-04
**Scope:** off-page link acquisition for `https://colbymainard.github.io/`.
**Method:** review of on-site linkable assets and of `press_mentions.csv`. No backlink tool data (Ahrefs, Semrush, Search Console) was available, so nothing below asserts current domain authority, referring-domain counts, or whether existing mentions actually pass link equity. Verifying that is step one.

## Executive summary

There is one finding here that matters more than all the others combined: this site already has a working backlink channel and is not harvesting it. `press_mentions.csv` records seven external articles that quote Colby by name, across fintech, AI ethics, and ML training publications. Not one of them is surfaced anywhere on the site, and it is unknown whether any of them actually links back.

That changes what this strategy should be. The usual advice for a new personal site is to go find link opportunities. That is not the situation. The situation is that expert-quote syndication is already producing placements at a rate of roughly one every few weeks, and the pipeline is running unmeasured and uncaptured. Fix the measurement and the capture first. Prospecting for new links is the second priority, not the first.

## Existing footprint

From `press_mentions.csv`:

| Publication | Author | Quote fidelity |
| ----------- | ------ | -------------- |
| freeduhm.com (AI and music collaboration) | Scent Tolentino | Faithful |
| financialtechtimes.com (AI security in finance) | Spencer Hulse | Faithful |
| devx.com (tech development resources roundup) | Unknown | Faithful but misunderstood |
| freeduhm.com (AI and news literacy) | Scent Tolentino | Faithful |
| fintechly.com (autonomous AI in fintech) | Derin Cag | Butchered to the point of meaninglessness |
| promptlibrary.monster (AI ethics and art) | admin | Faithful |
| labelyourdata.com (how to train an AI model) | Karyna Naminas | Faithful |

Two observations worth acting on:

- **devx.com is the most valuable placement in this list** by a wide margin. It is an established developer publication with real domain authority, unlike the rest, which range from mid-tier trade blogs to what appear to be low-authority content sites. It is also, notably, the one roundup where the quote was misunderstood.
- **Two placements came from the same author** (Scent Tolentino at freeduhm.com). A journalist who has quoted you twice is a relationship, not a coincidence. That is worth maintaining directly rather than through a query platform.

## Priority 1: Audit whether the existing seven actually link

**Effort:** an hour. **Impact:** determines whether the rest of this strategy is worth running.

For each of the seven URLs, check three things:

1. **Is there a link at all,** or only a name mention? Expert-quote roundups frequently name the source without linking, which produces zero SEO value.
2. **If linked, is it `rel="nofollow"` or `rel="sponsored"`?** Many quote-syndication outlets nofollow by default.
3. **Where does it point?** A link to a LinkedIn profile instead of to `colbymainard.github.io` is a common outcome and is worth correcting for future placements.

Record the answers as three new columns in `press_mentions.csv` (`links_back`, `rel`, `target`). The file is already tracked in the repo and already has a `Comments` column, so this fits its existing shape.

**Why this is first:** if six of seven are nofollowed name-drops, the correct conclusion is that this channel builds reputation but not links, and effort should shift accordingly. If most are followed links to the site, this channel is the highest-return activity available and should be scaled. Right now that question is unanswered, and every downstream decision depends on it.

**Immediate corrective action regardless of outcome:** the fintechly.com quote is recorded as "butchered to the point of meaninglessness." A misrepresented quote attributed to you by name is a reputational liability that outweighs any link value. Email the author and request a correction or removal. The devx.com "misunderstood" entry deserves the same treatment at lower urgency.

## Priority 2: Publish a press mentions page

**Effort:** a few hours. **Impact:** high, and compounding.

`press_mentions.csv` is tracked in the repository but rendered nowhere. Publishing it as a page does four things at once:

1. **Establishes third-party credibility** for the two human audiences this site is written for. "Quoted in DevX and Financial Tech Times" is a claim a hiring manager can verify in one click.
2. **Creates an E-E-A-T signal** that search engines read as external validation of expertise.
3. **Gives future journalists a reason to pick you.** Reporters working a deadline check whether a source has been quoted competently before. A page that shows a track record shortens that decision.
4. **Creates a natural reciprocal-link surface.** Linking out to a publication that quoted you is a low-friction reason to email its author again.

Build it as a static page following the existing conventions (see the feature report for the implementation checklist, which covers the sitemap, `llms.txt`, `PRECACHE_URLS`, and `CACHE_VERSION` steps). Two content notes specific to link strategy:

- Link to the articles plainly. Do not nofollow them; outbound links to relevant publications are a normal quality signal.
- Do not publish the `Comments` column. "Butchered the quote to the point of meaninglessness" is an accurate private note and a bad public one. Keep the editorial assessment in the CSV and render only the publication, author, date, and topic.

## Priority 3: Keep running the expert-quote channel, but aim it

**Effort:** ongoing, roughly an hour a week. **Impact:** proven, given seven existing placements.

The channel already works. Two adjustments would make it work better:

- **Always request the site URL as the attribution target,** specifically a deep link to the relevant technical stance or guide rather than the home page. If a question is about AI safety, the attribution should point at the AGI stance on `tech_takes.html`. Deep links are more useful to the reader, more likely to survive an editor, and they distribute authority across the site instead of concentrating it on the root.
- **Answer fewer queries, better.** The fidelity column shows the failure mode: two of seven quotes were mangled. Mangling correlates with answers that are long, hedged, or full of jargon an editor has to compress. Short, self-contained, quotable paragraphs survive editing intact. A two-sentence answer that can be lifted verbatim is worth more than six paragraphs that get cut down badly.

## Priority 4: Targeted outreach for the guides

**Effort:** moderate. **Impact:** medium, and slower to materialize.

The guides page is the site's most linkable asset. Seven plain-spoken starter guides, each with its own anchor and its own `HowTo` structured data, aimed at newcomers, is exactly the resource people link to when someone asks "where do I start with computer vision." The technical stances are more interesting to read but less linkable, because opinion pieces attract discussion rather than citation.

Realistic targets, in descending order of likelihood:

1. **Texas A&M CS student organizations and department resource pages.** The alumni connection is a genuine reason for them to say yes, and `.edu` links are disproportionately valuable. This is the single best prospect on this list.
2. **Awesome-list repositories on GitHub** for computer vision, ML, and cybersecurity. Submission is a pull request, the bar is a genuinely useful resource, and the guides clear it. Read each list's contribution guidelines first; drive-by additions get closed.
3. **Subreddit and forum answers** in r/learnmachinelearning, r/computervision, and similar. These are nofollowed and carry no direct SEO value, but they drive real referral traffic from exactly the audience the guides are written for, and they occasionally get picked up by people who do link.
4. **The Austin tech and D&D community.** The hobbies page already links out to Tribe Comics and Games. Local community sites are low-authority but the outreach cost is near zero and the relationship is real rather than transactional.

**What to avoid:** paid link placements, guest-post farms, and directory submissions. For a personal site whose value is credibility with human readers, a spammy backlink profile is worse than a thin one.

## Measurement

Whatever is pursued, track it in one place. Extend `press_mentions.csv` with `date`, `links_back`, `rel`, and `target` columns and treat it as the system of record. Without those columns there is no way to tell which of the four priorities above is actually producing, and this report will be equally speculative a year from now.

If Google Search Console is not already set up for the property, do that first. The site has a `google-site-verification` meta tag at `index.html:49`, so verification is already done, which means the referring-domain data is one login away and would answer most of Priority 1 automatically.

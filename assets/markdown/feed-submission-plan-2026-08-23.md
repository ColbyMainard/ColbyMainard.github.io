# Atom Feed Submission Plan

**Date:** 2026-08-23
**Covers:** roadmap action 31, "Submit the Atom feed to ML and security aggregators" (`roadmap-report-2026-08-23.md`, Phase 3 Reach).

**Nothing was submitted and nobody was contacted in producing this document.** It is a recommendation for the maintainer to act on by hand.

**On accuracy:** every target below carries a "Verified" note saying exactly how far I confirmed it. Where I could not reach a page or could not confirm a contact address, the row says so rather than guessing. Two of the rows are recommendations *against* submitting. Confirm the mechanism yourself before you send anything, because submission pages move.

---

## The short version

Three things are worth doing, in this order:

1. Submit to `indieblog.page`. It is a two-field form and the site meets its stated criteria as written.
2. Submit to `ooh.directory`. Human-curated, and the Technical Resources and Guides pages are the kind of thing it lists.
3. Decide whether the Security Creators Network is worth pursuing, because it is the only high-value security target and it needs a real conversation rather than a form.

Two things are worth deliberately *not* doing: Feedspot and the threat-intel feed lists. Reasons in the exclusions section.

One target, Kagi Small Web, is the highest-quality fit on this list and the site currently fails one of its published rules. That is a real decision, not a formality, and it gets its own section.

---

## Things to settle before the first submission

None of these block a submission outright. Item 1 is a hosting constraint with no fix available; items 2 through 4 are decisions, not defects.

### 1. The served `Content-Type` is `application/xml`, not `application/atom+xml`

Verified against the live site on 2026-08-23:

```bash
curl -sSI https://colbymainard.github.io/feed.xml
```

returns `Content-Type: application/xml`. GitHub Pages assigns content types by file extension and gives you no way to override them, so this is not fixable while the site is hosted there. Renaming the file would not help either, since `.atom` is not in GitHub Pages' type map and would likely serve as something worse.

Most aggregators sniff the document body rather than trusting the header, so this usually does not matter. It matters for one target: `indieblog.page` states outright that a submission needs "a valid RSS or ATOM feed with the correct MIME type." Submit anyway, because the served type is a valid generic XML type and the document is well-formed Atom, but if that submission is rejected without explanation, this is the first thing to suspect. Do not spend time trying to fix it on GitHub Pages; there is no lever.

### 2. Entries carry `<summary>` and no `<content>` (decision)

Every entry gives a one-sentence `<summary>` and links back to the anchor on `tech_takes.html`. That is valid Atom and it is the right shape for a discovery aggregator, which only needs enough text to show a listing.

It is the wrong shape for a *syndication* network, which republishes the post body on its own site. If the Security Creators Network route is pursued, expect this to come up, because a feed with no `<content>` gives them nothing to republish.

Adding full `<content>` to a hand-maintained feed means maintaining a second copy of seven long essays by hand, which will drift. The honest recommendation is to leave the feed as it is and treat syndication networks as a separate question rather than reshaping the feed to chase one of them.

### 3. The feed publishes an email address (decision)

`feed.xml:21` puts `colby.mainard@proton.me` in the feed-level `<author>` block. That is already public in the repository and on the site, so submitting the feed does not disclose anything new. It does increase how many automated systems parse and store it. Atom does not require `<email>`; `<name>` alone satisfies the spec, and `<uri>` already points at the site.

No action recommended. Flagged so the choice is deliberate rather than accidental.

### 4. The feed is one feed covering six unrelated topics (positioning)

Seven entries spanning KANs, cryptocurrency safety, quantum computing, AGI, privacy, sports marketing, and physical media. Every topic-specific aggregator on this list is going to look at that and see a general personal blog rather than an ML feed or a security feed.

That is not a defect, and splitting the feed by topic would be a bad trade for seven posts. It does mean the general personal-blog directories are a better fit than the topic-specific ones, and the target table below is ordered accordingly. Expect the ML-specific and security-specific targets to be the harder sells, which is the opposite of what action 31's one-line description implies.

---

## Target table

Ordered by expected return, best first.

| # | Target | URL | Mechanism | Contact point | What it expects | Odds | Verified |
| - | ------ | --- | --------- | ------------- | --------------- | ---- | -------- |
| 1 | indieblog.page | `https://indieblog.page/suggest` | Web form | None needed; the form is the channel | One field: "Enter the URL to an RSS/ATOM feed or a homepage link." Stated policy: "If it's a personal site with an RSS feed, it is probably welcome." Exclusions: "No illegal stuff, no corporate blogs, no nazis." Requires a valid RSS/Atom feed with correct MIME type; JSON Feed unsupported. | High | Fetched the suggest page 2026-08-23; quotes above are verbatim from it. |
| 2 | ooh.directory | `https://ooh.directory/add/` | Web form, human review | None published that I could confirm | A hand-curated blog directory, roughly 2,100 blogs. Each listing gets its own page carrying category, description, author, country, posting frequency, feed link, and recent posts, so expect to supply a category and a short description. | Medium-high | Directory and its listing format confirmed via its own blog posts. **The `/add/` page returned HTTP 403 to my fetch, so I could not read the form itself.** Open it in a browser and confirm the fields before writing anything. |
| 3 | Security Creators Network (Techstrong Group) | `https://techstronggroup.com/our-network`, published at `https://securityboulevard.com` | Direct contact, then a syndication arrangement | **Not confirmed.** See the warning below. | Formerly the Security Bloggers Network, rebranded April 2024. 450+ member blogs, 30,000+ posts, ranging from CISO thought leadership to technical vulnerability research. Syndicates member posts onto Security Boulevard with attribution. | Unknown, high value if it lands | Network, rebrand, and scale confirmed from Techstrong's own announcement. **I could not find or confirm a current public submission form or address.** An older third-party source mentions `info@securitybloggersnetwork.com`; I could not verify that it is still monitored, so do not treat it as good. Use the contact route on `techstronggroup.com` instead. |
| 4 | Kagi Small Web | `https://github.com/kagisearch/smallweb` | GitHub pull request adding the feed URL to `smallweb.txt`, alphabetical order | GitHub PR | See the dedicated section below. The site currently fails one published rule. | Blocked, see below | Rules read from the repository README on 2026-08-23 and quoted in that section. |
| 5 | Planet AI | `https://www.planet-ai.net/`, contact at `/contact.html` | Web form: "Submit Your RSS Feed" | The form, or the contact page | Fields: Site/Blog Name (required), RSS Feed URL (required), Your Email (required), Description (optional). States a 48-hour review and that submissions are judged on "quality and relevance." | Low-medium | Form and fields confirmed by fetching the site 2026-08-23. **I did not verify how established or trafficked this aggregator is**, and its existing sources are OpenAI, Anthropic, Google, and Hugging Face, which is a different class of publisher. Treat it as a cheap lottery ticket, not a priority. |

### Kagi Small Web deserves its own decision

This is the best-quality target on the list. Kagi Small Web feeds a real search product, the list is public and auditable, and the audience is exactly the sort of reader who would appreciate long-form technical opinions. It is also the one target where the site currently does not qualify.

The README's rules, read on 2026-08-23:

- English only. **Site passes.**
- Personal blogs exclusively, single-author only. **Site passes.**
- A post within the last 12 months. **Site passes**, newest take updated 2026-08-16.
- No auto-generated, LLM-generated, or spam content. **Site passes.**
- No advertisements or undisclosed affiliate links. **Site passes.**
- No popups, and the rule names its examples explicitly: "newsletter signups, cookie banners, etc." **Site fails.** `cookie_consent.js` renders a consent banner on six of the seven pages.
- Self-submission rule: "If submitting your own website, you must add at least 2 other sites that are not yours (and are not in list yet) in the same commit."

The cookie banner is not decoration and it is not removable without consequence. It is what gates Google Analytics behind consent, which is a documented hard rule for this project and the right call on the merits. Trading a working consent gate for one directory listing would be a bad deal.

Three options, in order of preference:

1. **Do not submit.** Accept that this particular door is closed as long as the site loads analytics. This is the recommended option.
2. **Submit anyway and let the reviewer decide.** The rule's spirit is aimed at interstitials that obstruct reading. This site's banner is a non-modal bottom-of-viewport strip that does not trap focus or cover the content. A human reviewer might well pass it. Cost is one PR and a possible rejection; there is no reputational downside, and the required two non-self submissions are a genuine contribution either way.
3. **Drop Google Analytics entirely**, which removes the reason the banner exists. That is a much larger decision than a feed submission and should be made on its own merits, not to satisfy a directory. Do not let this document be the reason.

If you take option 2, honour the self-submission rule properly. Two other single-author technical blogs that are genuinely worth reading and not already in `smallweb.txt`, added in the same commit, alphabetically placed. Picking two at random to satisfy a quota is the kind of thing maintainers notice.

---

## Deliberately excluded, and why

The roadmap's Phase 3 rules are "no paid links, no link exchanges, no directory submissions, no comment-link posting," and its stated reason is that this is a credential site read by potential employers, where one spammy backlink finding costs more than the links are worth. These are the targets that came up in research and fail that test.

| Excluded | Why |
| -------- | --- |
| Feedspot (`rss.feedspot.com`) | It ranks for every "top N RSS feeds" query and looks like the obvious target. Its model is inclusion-driven outreach: listed publishers are contacted about paid placement and reciprocal promotion. That is the paid-links and directory-submission pattern the roadmap rules out by name. Its lists also carry no editorial weight. Skip it, and expect to keep seeing it in search results. |
| Generic "submit your RSS to 27 directories" lists | Link-farm territory. Precisely the spammy-backlink finding the roadmap warns about. |
| `awesome-threat-intel-rss` and similar threat-intel feed lists | Real, well-maintained repositories, but they index threat intelligence sources: analysts, government agencies, journalists, and vendor research teams. Seven opinion essays are not threat intel and a maintainer would be right to decline. Submitting would burn credibility on a list you might want later. Note also that `awesome-*` pull requests are roadmap action 32 and are aimed at the Technical Resources page, which genuinely fits. Keep the two efforts separate. |
| Hacker Newsletter | Curates exclusively from what already ranks on Hacker News. There is no direct submission channel, so there is nothing to submit. |
| Hacker News, Lobsters | Not feed aggregators, so out of scope for action 31. The roadmap covers them separately and caps submissions at one; Lobsters is invitation-only besides. |

---

## Draft text

Adapt these rather than pasting them.

### For ooh.directory's description field

Confirm the actual field names first, since I could not read the form. Keep it factual and under about 40 words; directory descriptions get truncated.

> Long-form technical opinion pieces by an AI/ML engineer, covering machine learning, cryptocurrency safety, quantum computing, privacy, and computer vision in sports marketing. The same site carries beginner guides and curated reading lists for each area.

Suggested category: whichever of technology, programming, or artificial intelligence the directory actually offers. Feed URL: `https://colbymainard.github.io/feed.xml`.

### For Planet AI's optional description field

> Technical Stances is the long-form opinion section of Colby Mainard's site. AI-related entries cover Kolmogorov-Arnold Networks, why AGI is more buzzword than imminent threat, and computer vision applied to valuing sports brand placements. Written by a practicing ML engineer, roughly one substantial entry a month.

### For the Kagi Small Web pull request, if you take option 2

Put this in the PR description so the reviewer can rule on the cookie banner rather than discovering it later. Being upfront about a rule you might fail is what makes the difference between a considered exception and a rejected submission.

> Adding three feeds, one of which is my own as required by the self-submission rule.
>
> Mine: https://colbymainard.github.io/feed.xml — single-author personal site, long-form technical opinion pieces on ML, quantum computing, privacy, and computer vision. No ads, no affiliate links, no tracking beyond consent-gated analytics.
>
> Flagging one thing myself rather than having you find it: the site shows a cookie consent banner, which the no-popups rule names. It is a non-modal strip at the bottom of the viewport. It does not cover the article, does not trap focus, and exists specifically so that analytics do not load until a reader agrees. If that still counts as a popup under the rule, close this and I will not argue.
>
> The other two feeds are not mine and are not currently in the list: [feed one], [feed two].

### For the Security Creators Network, if you pursue it

Send this only after confirming a current contact route through `techstronggroup.com`. Do not send it to the unverified `info@securitybloggersnetwork.com` address.

> Subject: Adding a security-adjacent blog to the Security Creators Network
>
> Hello,
>
> I write long-form technical opinion pieces at https://colbymainard.github.io/assets/html/tech_takes.html. I am an AI/ML engineer working on security-focused machine learning, including fraud detection, anomaly detection, and anti-money laundering.
>
> Two of the seven entries are squarely in your subject area: a piece on post-internet privacy covering advertising economics, threat models, and defenses from privacy-preserving browsers through differential privacy and federated learning, and one on cryptocurrency security covering wallets and practical safeguards. The site also carries a beginner cybersecurity guide and a curated cybersecurity reading list.
>
> The Atom feed is at https://colbymainard.github.io/feed.xml. One thing worth saying upfront: entries carry summaries rather than full content, since the feed is hand-maintained. If the network needs full-text entries to syndicate, tell me now and I will not waste your time.
>
> Happy to answer anything about the writing or the setup.
>
> Colby Mainard

That last paragraph costs you nothing and saves a round trip. See item 2 above.

---

## Sequencing and timing

Submissions clustered into one afternoon across a dozen sites is the pattern that gets flagged. These are small communities with overlapping maintainers, and several of them publish their submission queues. Spread it out.

**Before anything (one sitting):**

1. Run the live feed through the W3C Feed Validation Service at `https://validator.w3.org/feed/`. Several targets run a validator on submission, so see what they will see before they see it.
2. Confirm the seven entry links still resolve to live anchors on `tech_takes.html`. Action 7 renamed two take headings on 2026-08-23 but left the anchor IDs alone, so they should be fine. Check anyway, because a feed with dead links is the one failure a reviewer will not forgive.
3. If either check turns up something worth changing, fix it, bump `CACHE_VERSION` in `service-worker.js` since `feed.xml` is precached, push, and wait for Pages to deploy before submitting anywhere.

**Week 1:** indieblog.page only. It is the lowest-friction target and it tells you whether the served `application/xml` content type causes trouble in practice. That answer shapes everything after it.

**Week 2:** ooh.directory. Open `/add/` in a browser, read the real form, adapt the description.

**Week 3:** Decide on Kagi Small Web. If you take option 2, that is also the week to find the two other blogs, which is the part that actually takes time.

**Week 4 or later:** Planet AI, and the Security Creators Network conversation if you want it. Both are lower-confidence, and by this point you will know how the first three went.

**Then stop.** This is a one-time channel, not an ongoing programme. The roadmap rates it Medium impact and Low effort, and it is Low effort only if you resist the urge to keep finding more directories. When these five are done, action 31 is done. The high-return reach items are actions 32, 34, and 35, and every hour spent hunting for a sixth aggregator is an hour not spent on the guest post.

---

## Tracking

Keep using `press_mentions.csv`. It already has the right three columns and it is already the file that answers "where has this site been linked from."

Add a row at submission time rather than waiting for acceptance, and carry the state in the `Comments` column:

```csv
Link,Author,Comments
https://indieblog.page/,indieblog.page,Feed submitted 2026-08-24; pending.
```

Then edit that row in place when it resolves:

```csv
https://indieblog.page/,indieblog.page,Feed listing; submitted 2026-08-24, accepted 2026-08-27.
```

For a rejection, keep the row and say so. A record of what was declined and why is worth more than a clean file, and it stops a future you from resubmitting to a site that already said no.

Two notes on fit:

- `Author` currently holds a person's name. For these rows it holds the aggregator or directory name, since there is no journalist involved. That reads fine and needs no schema change.
- Roadmap action 37 proposes adding a `linked?` column to this file. These rows work either way. If action 37 lands first, feed submissions get `yes` once accepted and `no` while pending, and the date detail stays in `Comments`.

Do not start a separate submissions tracker. One file that records every external link, however it was earned, is worth more than two files that each tell half the story.

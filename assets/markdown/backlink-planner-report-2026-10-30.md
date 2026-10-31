# Backlink Strategy

Last Updated: 2026-10-30

Prior reports found in `assets/markdown/`: today's code review, accessibility, content, feature, and SEO reports.

`press_mentions.csv` shows seven mentions, all about AI or fintech. Five are logged as quoted faithfully. The devx.com quote is logged as "misunderstood", and the fintechly.com quote as "butchered". The `feed.xml` feed already carries every stance and guide, so syndication below builds on it.

No backlink count, authority score, or traffic figure appears here, because none can be measured from this repository.

**Severity scale:** High means a missed link opportunity that is already earned or nearly free. Medium means a solid opportunity that needs some work. Low means worthwhile only alongside something else.

**Pages lacking interactivity or visualization:** every section of `guides.html` and `tech_takes.html` is text, lists, or tables. Strategy B-6 recommends one concrete visual for the computer vision guide. The Kolmogorov-Arnold Networks stance (`tech_takes.html:275-349`) would also suit a client-side spline visualizer, but that needs a canvas script and is High effort, so it is listed only as a follow-on.

## Strategies (highest expected return first)

### B-1. Get the LLMday talk linked from the organizer (High)

- **Target page:** `index.html:2357-2381` (Public Speaking).
- **Problem:** The talk on 2026-10-14 is the site's strongest third-party credential. However, the only link between the event and the site is the speaker certificate on certified.fyi, which does not link back.
- **Pros:** The organizer is topically perfect (an LLM conference in Austin) and already has a reason to list speakers. A link from its event or speaker page is relevant, contextual, and likely to persist.
- **Cons:** Many meetup-style events do not keep speaker pages after the event. If LLMday has none, this yields nothing.
- **On-site steps:** (1) Ship the HTML talk summary (feature 4) so the link target is a readable page section, not just a PDF. (2) Label the PDF link (accessibility A-4).
- **Outreach:** Contact the organizer through <https://llmday.com>. Template: "Hi, thanks again for having me at LLMday Austin on October 14. I've published a written summary of 'Invisible Data: The Largest Problem Facing AI' along with the slides at https://colbymainard.github.io/#publicSpeakingDiv. If you keep a speaker or recap page for the event, I'd be glad to have it linked there."
- **Expected success:** Moderate. It depends on whether LLMday publishes per-event recap pages.
- **Expected effort:** Under an hour once the summary exists.
- **Impact / Effort:** H / L.

### B-2. Ask for corrections on the two misrepresented quotes (Medium)

- **Target:** `press_mentions.csv`, rows 4 (devx.com) and 6 (fintechly.com).
- **Problem:** A quote that is "misunderstood" or "butchered to the point of meaninglessness" attaches your name to something you did not mean. Those are weak authority signals.
- **Pros:** Editors usually fix attributed quotes when asked politely. A corrected quote can become a credited link.
- **Cons:** Small sites may not respond. Do not escalate if they ignore the request.
- **On-site steps:** None.
- **Outreach:** Email each article's editor through the contact page on its site: <https://www.devx.com/fintech/11-tech-development-resources-experts-share-their-top-picks/> and <https://fintechly.com/ai/the-rise-of-autonomous-ai-in-modern-fintech/>. Template: "Hi, I was quoted in [article]. The quote as published reads [X], but my point was [Y]. Could you update it to [corrected wording]? If you link contributors, https://colbymainard.github.io/ is my site. Thank you."
- **Expected success:** Moderate for devx (a clarification). Lower for fintechly.
- **Expected effort:** Two short emails.
- **Impact / Effort:** M / L.

### B-3. Link each stance to its matching guide and resource list (Medium)

- **Target pages:** `assets/html/tech_takes.html`. Seven of the eight stances end without an internal link. Their sections end at lines 348, 517, 552, 695, 825, 954, and 1008.
- **Problem:** Guides link out to the stances (for example `guides.html:605, 758, 862`), but the stances rarely link back, so equity and readers flow one way.
- **Pros:** This is fully in your control. It strengthens the topic clusters the web-authority report identifies.
- **Cons:** Too many links read as filler. Add only real connections.
- **On-site steps:** Privacy → the cybersecurity guide (`guides.html#cybersecurityGuideDiv`) and cybersecurity resources. Cryptocurrency → the cybersecurity guide. Product Placement → the computer vision guide. Future of Quantum Computing → `hobbies.html#quantumComputingDiv`. KAN and AGI → the generative AI guide and the AI resources. Physical Media → the media-preservation point is standalone, so leave it. Use descriptive anchors ("my computer vision starter guide"), not repeated keywords. This merges with feature 1 ("Related on this site").
- **Outreach:** N/A. This is internal.
- **Expected success:** Not a backlink tactic in itself. It multiplies the value of every external link the stances earn.
- **Expected effort:** About an hour of markup.
- **Impact / Effort:** M / L.

### B-4. Pitch "Invisible Data" as a podcast guest topic (High)

- **Target page:** `index.html#publicSpeakingDiv` and `guides.html#dataEngineeringGuideDiv`.
- **Pros:** Podcast show notes and transcripts are persistent, crawlable, and exactly the retrievable format AI systems cite. The talk gives you a ready-made, already-presented topic, and data quality is a perennial subject for these shows.
- **Cons:** Guest pipelines are slow and competitive, so expect weeks of lead time and some rejections.
- **On-site steps:** Ship B-1's summary first, so the show notes have a page to link.
- **Outreach:**
  - Data Engineering Podcast: <https://www.dataengineeringpodcast.com>
  - MLOps Community podcast: <https://mlops.community>
  - Practical AI: <https://practicalai.fm>

  Template: "Hi, I'm an ML engineer working on anti-money-laundering models, and I previously built computer vision pipelines for professional sports leagues. I recently spoke at LLMday Austin on 'Invisible Data', about how biased and incomplete real-world data sabotages ML systems, with examples from cybersecurity, sports marketing, and money laundering. Summary and slides: https://colbymainard.github.io/#publicSpeakingDiv. I think it would make a practical episode for your listeners. Happy to share an outline."
- **Expected success:** Low to moderate per show. Pitching three raises the odds of one booking.
- **Expected effort:** A few hours of pitching, plus recording time if accepted.
- **Impact / Effort:** H / M.

### B-5. Syndicate the Vibe Coding stance with a canonical link (Medium)

- **Target page:** `tech_takes.html#VibeCodingScourgeDiv` (lines 1010-1138).
- **Pros:** It is the most shareable and timely piece. dev.to supports a canonical URL field, so the original keeps its ranking, and the republished copy carries a contextual link to a new audience.
- **Cons:** A strong opinion on a contested topic attracts pushback in comments. Syndicate only after the content fixes (content-polisher, `tech_takes.html` lines 1033, 1062, 1078, 1109, 1123) land.
- **On-site steps:** Apply those content fixes. No markup change is needed.
- **Outreach:** Republish at <https://dev.to> with the canonical URL set to `https://colbymainard.github.io/assets/html/tech_takes.html#VibeCodingScourgeDiv`. Optionally do the same at <https://hashnode.com>. The only "template" is a one-line footer: "Originally published at colbymainard.github.io."
- **Expected success:** Moderate. One syndicated piece reliably yields one contextual link.
- **Expected effort:** One to two hours.
- **Impact / Effort:** M / M.

### B-6. Add a problem-class diagram to the computer vision guide (Medium)

- **Target page:** `guides.html:505-540` (Problem Classes).
- **Problem:** Five problem classes are explained in text only. One annotated image that shows the same scene as a bounding box, an instance mask, a semantic mask, and a pose skeleton would make the section the thing beginners link to.
- **Pros:** Original diagrams earn links from course pages and forum answers. It also improves the guide for readers.
- **Cons:** It must be your own image (for example one of your CC BY photos, or a simple inline SVG) to avoid licensing problems.
- **On-site steps:** Create a single inline SVG with `role="img"` and a `<title>`, matching your SVG preference. Place it after line 515 and caption it.
- **Outreach:** Hand off. Once it is live, it is a natural link target for B-4's show notes.
- **Expected success:** Low to moderate, and slow.
- **Expected effort:** Half a day.
- **Impact / Effort:** M / M.

### B-7. Offer the cybersecurity guide as a lightning talk at Austin OWASP (Low)

- **Target page:** `guides.html#cybersecurityGuideDiv` (lines 762-865).
- **Pros:** A local chapter is a relevant, real community. Chapter meeting pages list speakers with links.
- **Cons:** The guide is beginner-level, so it suits a newcomer or student night rather than a main talk.
- **On-site steps:** None beyond the content fixes in the cybersecurity guide.
- **Outreach:** Contact the chapter through <https://owasp.org/www-chapter-austin/>. Template: "Hi, I'm an Austin-based ML engineer with a cybersecurity minor and work history at Vectra. I'd be glad to give a short beginner-focused talk on the cybersecurity fields and the everyday practices in my starter guide (https://colbymainard.github.io/assets/html/guides.html#cybersecurityGuideDiv) at a future meeting."
- **Expected success:** Moderate for a slot. The link only follows if the chapter posts speaker pages.
- **Expected effort:** Preparing a 10-minute talk.
- **Impact / Effort:** M / M.

### B-8. Publish the CC BY photographs on Wikimedia Commons (Low)

- **Target page:** `hobbies.html#photographyDiv` (lines 153-202).
- **Pros:** The photos are already CC BY 4.0 with `ImageObject` license metadata, which is exactly what Commons accepts. Each file page credits the author and can link the source.
- **Cons:** Commons links are `nofollow`. Most of the value is attribution and discovery, not ranking.
- **On-site steps:** None.
- **Outreach:** Upload through <https://commons.wikimedia.org/wiki/Special:UploadWizard>, setting the source to the hobbies page and the author to Colby Mainard.
- **Expected success:** High for the upload itself. Link value is low.
- **Expected effort:** About an hour.
- **Impact / Effort:** L / M.

## Not pursued

- Self-promotion on Reddit, X, Facebook, or Instagram is excluded by policy.
- `promptlibrary.monster` (in `press_mentions.csv`, author "admin") looks like a low-quality aggregator. Do not cite it or seek more mentions there.

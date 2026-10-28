# Backlink Strategy

Last Updated: 2026-10-27

## Inputs read

- **Pages:** all six in scope.
- **`press_mentions.csv`:** seven logged mentions. Five were quoted faithfully: freeduhm.com (twice, on AI and creativity and on AI news literacy), financialtechtimes.com (AI security in finance), promptlibrary.monster (AI ethics and art), and labelyourdata.com (how to train an AI model). devx.com is logged as "quoted faithfully but misunderstood", and fintechly.com as "butchered the quote to the point of meaninglessness". None of those venues is pitched again on the same topic below. labelyourdata.com already covers model training, and devx.com already covers tech-development resources.
- **`feed.xml`:** an Atom feed with 15 entries (8 stances, 7 guides). Syndication below builds on it.
- **Sibling reports dated today:** code review, accessibility, content-polisher, feature-recommender, and SEO. This plan defers to them on internal linking (SEO) and on visitor-experience features (feature-recommender).

**Interactivity and visualization check:** `guides.html` has no images, SVGs, or tables at all. `tech_takes.html` has two tables and no visuals. `tech_resources.html` has ten tables and no visuals. All three are flagged, and strategies 5 and 6 add an interactive or visual asset where it also earns links.

No backlink counts, authority scores, or traffic figures were available, and none are stated.

## Strategies, ranked by expected return

### 1. Turn the LLMday talk into a linked speaker credit

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Direct community outreach plus a co-citation link. Target: `index.html#publicSpeakingDiv`. |
| Pros | The talk ("Invisible Data: The Largest Problem Facing AI", October 14, 2026) is the most authoritative, most relevant hook the site has. An event page listing speakers puts Colby next to the other AI practitioners on the program, and that page persists. The site already hosts the slides and a summary, so the link has a real destination. |
| Cons | The organizer may not keep per-speaker bios or link them. A web search did not surface a public speaker list for LLMday Austin, so check llmday.com before writing. If no such page exists, the ask becomes "please add one", which is less likely to succeed. |
| On-site content steps | 1. Fix the slide link text first (code-review CR-8), so visitors arriving from the event know what they are downloading. 2. After the abstract (`index.html:2369`), add three takeaway sentences. Use the three points that `llms.txt` already records for the talk. The first is the biases hidden in training data. The second is how those biases appear in cybersecurity, sports marketing, and money-laundering data. The third is the practical checks to run before and after training. The anchor `#publicSpeakingDiv` then stands on its own as a citation target. |
| Outreach steps | Contact LLMday through the organizer URL the site's own `Event` JSON-LD records: <https://llmday.com>. Template: "Hi, thank you again for having me at LLMday Austin on October 14. I've posted the talk summary and slides for 'Invisible Data: The Largest Problem Facing AI' at https://colbymainard.github.io/#publicSpeakingDiv. If the event page lists speakers, would you be open to linking my name there so attendees can find the slides? Thanks, Colby" |
| Expected success rate | Moderate to high, if a speaker listing exists. Organizers generally want attendees to find slides. This assumes the event site stays live after the event. |
| Expected effort level | Under an hour: one small copy edit and one email. |
| Impact and Effort (H/M/L) | Impact H, Effort L |

### 2. Request a correction for the butchered fintechly.com quote

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Correction request for an existing mention. Target: `index.html` (author identity). |
| Pros | `press_mentions.csv` logs <https://fintechly.com/ai/the-rise-of-autonomous-ai-in-modern-fintech/> as "Butchered the quote to the point of meaninglessness." A garbled quote under Colby's name on a fintech site works against him, and fintech is his current field. A corrected quote with a link to the site turns that liability into a relevant, contextual mention. |
| Cons | Editors may ignore correction requests on older pieces, and the page may not credit sources with links. Ask for the correction first. A link is a bonus, not a condition. |
| On-site content steps | None. Before writing, keep a copy of the original answer that was sent, so the exact intended wording is ready to quote. |
| Outreach steps | Contact the author, Derin Cag, through fintechly.com's contact page (find it from the article's footer). Template: "Hi Derin, thanks for including my comment in 'The Rise of Autonomous AI in Modern FinTech'. The published version reads differently from what I sent, and the meaning changed in editing. My original wording was: '[original text]'. Would you be able to update it? If you credit contributors with a link, https://colbymainard.github.io/ is the right one. Thanks, Colby Mainard" |
| Expected success rate | Moderate. Factual corrections succeed more often than link requests, because they protect the publication's credibility too. |
| Expected effort level | About 30 minutes, including finding the original text. |
| Impact and Effort (H/M/L) | Impact M, Effort L |

The devx.com row ("misunderstood") could get the same treatment, but only if the misunderstanding changes what readers take away. Otherwise, leave it alone.

### 3. Internal linking between stances, guides, and resources

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Internal linking. Targets: `tech_takes.html` ↔ `guides.html`, and `index.html` → both. |
| Pros | Every external link a page earns passes value only as far as the internal links carry it. Today, `tech_takes.html` and `guides.html` link to each other only through the nav, and `index.html` links to neither from its body. |
| Cons | None significant. Avoid exact-match anchors repeated across pages. |
| On-site content steps | Merged into SEO report actions (tech_takes, guides, and index Internal links rows), which list the specific source and target anchors. Use descriptive anchors such as "beginner software engineering guide". |
| Outreach steps | N/A, internal. |
| Expected success rate | Not a link-earning tactic. It multiplies the value of strategies 1, 4, and 5. |
| Expected effort level | One to two hours of markup. |
| Impact and Effort (H/M/L) | Impact H, Effort L (merged with the SEO report) |

### 4. Present the talk again at Austin Deep Learning

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Direct community outreach (professional community). Targets: `index.html#publicSpeakingDiv` and `guides.html#dataEngineeringGuideDiv`. |
| Pros | Austin Deep Learning (<https://meetup.com/austin-deep-learning>) is a long-running, technical Austin group focused on computer vision, predictive modeling, and NLP. That is Colby's exact specialty, and it is local. The talk already exists, so the marginal cost is low. Meetup event pages name the speaker and usually carry a link, and attendees who meet a speaker in person are the most likely people to link to them later. |
| Cons | The Meetup link itself carries little search weight. The value is in co-citation and peer relationships. Organizers may already have a full speaker queue. |
| On-site content steps | 1. Do strategy 1's on-site step first, so the summary is ready to share. 2. After the talk, add a line under Public Speaking ("Also presented at Austin Deep Learning, [date]") with a link to the event page, which is a reciprocal and persistent citation. |
| Outreach steps | Message the organizers through the group's Meetup page: <https://meetup.com/austin-deep-learning>. Template: "Hi, I'm an Austin ML engineer (fraud and AML models now, sports computer vision before that). I recently gave 'Invisible Data: The Largest Problem Facing AI' at LLMday Austin. It covers how biased and incomplete training data shows up in cybersecurity, sports marketing, and money-laundering data, plus practical checks before and after training. Slides are at https://colbymainard.github.io/#publicSpeakingDiv. Would it fit an upcoming meetup? Happy to adapt the length. Colby" |
| Expected success rate | Moderate. Community meetups regularly need speakers, and an already-delivered talk lowers the organizers' risk. |
| Expected effort level | Two to four hours, plus the evening itself. |
| Impact and Effort (H/M/L) | Impact M, Effort M |

### 5. Expand "The Importance of Clean Data" into a data-quality checklist

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | On-site linkable asset (template or framework), built from existing content. Target: `guides.html`, Data Engineering Guide, "The Importance of Clean Data" (line 416 onward). |
| Pros | The talk's "practical checks before and after training" are a reusable framework that practitioners and educators link to. Placing them in an existing guide, rather than on a new page, follows the "optimize existing content first" rule, and it ties the guide to the talk. A checklist is also easy for AI answer engines to extract. This section is currently plain text, so it also addresses the static-page flag. |
| Cons | It is only as linkable as it is specific. A generic "check for nulls" list earns nothing. It must use the concrete checks from the talk. |
| On-site content steps | 1. At the end of "The Importance of Clean Data" (`guides.html:416`, before "Handling User Data Responsibly" at line 446), add an `h4` "Data quality checklist". Under it, add two ordered lists, "Before training" and "After training". Fill them with the checks from the "Invisible Data" slides (`assets/pdf/InvisibleDataSlides.pdf`). 2. Link it to and from `index.html#publicSpeakingDiv`. 3. Bump the guide's `TechArticle` `dateModified`, the visible "Last Updated" line, and its `feed.xml` entry. 4. Do not add `HowTo` or `ItemList` markup for the checklist. Google no longer shows `HowTo` rich results (SEO report), so the markup would add upkeep and earn no search feature. |
| Outreach steps | Point to it from the strategy 4 talk and its Q&A. A cold pitch is not needed. Do not pitch labelyourdata.com, which already quoted Colby on model training. |
| Expected success rate | Low to moderate on its own. Higher once it is referenced from talks. |
| Expected effort level | Three to five hours to write. |
| Impact and Effort (H/M/L) | Impact M, Effort M |

### 6. Interactive "which computer vision task do I need?" chooser

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Interactivity for link earning (stickiness). Target: `guides.html`, Computer Vision Guide, "Problem Classes" (line 502 onward). |
| Pros | This section already describes five task types (object detection, instance segmentation, semantic segmentation, classification, pose estimation), each with "This is best for..." guidance. A three-question chooser ("Do you need location? Exact outline? Separate instances?") that highlights the matching task turns prose into a tool that instructors and beginner tutorials can link to. It also gives the guides page its first interactive element. |
| Cons | It needs a new deferred script, a `PRECACHE_URLS` entry, and a `CACHE_VERSION` bump. It must work without JavaScript, which means keeping the existing prose as the fallback, and it must be keyboard- and screen-reader-accessible. The link return is speculative until it is promoted. |
| On-site content steps | 1. Build it as a `<fieldset>` of radio questions with a `role="status"` result line that names and links to the matching subsection. Use a `.js-` class gate like `photo_gallery.js` so it is hidden without scripting. 2. Keep the five existing subsections unchanged as the canonical content. 3. No new dependency is needed. |
| Outreach steps | Share it at the strategy 4 meetup as a resource for newcomers. Do not post it to Reddit or X. |
| Expected success rate | Low to moderate. Small interactive tools earn links slowly through teaching material. |
| Expected effort level | One to two days, including accessibility testing. |
| Impact and Effort (H/M/L) | Impact M, Effort M |

### 7. Syndicate the Vibe Coding stance on DEV with a canonical link

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Content syndication. Target: `tech_takes.html#VibeCodingScourgeDiv`. |
| Pros | It is the newest stance and the most widely debated topic on the site, and it addresses developers directly. DEV (<https://dev.to/>) supports a `canonical_url` front-matter field, so the original keeps the ranking credit while a second developer audience reads it, and the republished post carries a contextual link back. |
| Cons | Fix the sentence fragment first (code-review CR-5) and apply the content-polisher edits, because syndicated copy is hard to correct everywhere. Opinion pieces on hot topics draw combative comments. A canonical link is a hint to search engines, not a guarantee. |
| On-site content steps | 1. Apply the CR-5 fix and the Vibe Coding rows of the content-polisher report. 2. No other on-site change. |
| Outreach steps | Publish on DEV with `canonical_url: https://colbymainard.github.io/assets/html/tech_takes.html#VibeCodingScourgeDiv` and the three tags `ai`, `programming`, and `career`. Open with one line: "Originally published on my site." No pitch template is needed. |
| Expected success rate | Moderate for the direct canonical link, which is guaranteed if published. Low for secondary links. |
| Expected effort level | About one hour. |
| Impact and Effort (H/M/L) | Impact M, Effort L |

### 8. Offer a privacy and security talk to OWASP Austin

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Direct community outreach. Targets: `tech_takes.html#PrivacyDiv` and `guides.html#cybersecurityGuideDiv`. |
| Pros | OWASP Austin (<https://austin.owasp.org>, archive at <https://owasp.org/www-chapter-austin/pasteventsarchive.html>) is a security-practitioner community whose chapter guidance invites people to contact the chapter leader to present independent research. Colby's ML-for-threat-detection background and the Post-Internet Privacy stance fit that audience. owasp.org is a highly trusted domain. |
| Cons | The newest listing found was April 2024, so confirm the chapter is still active before investing time. It needs a new talk, because the LLMday talk is AI-focused, not application-security-focused. |
| On-site content steps | 1. Refresh the Post-Internet Privacy stance first (last updated 2026-06-19, per the SEO report's freshness row). 2. After presenting, add the talk to Public Speaking with the same `Event` JSON-LD pattern. |
| Outreach steps | Contact the chapter leader through <https://austin.owasp.org>. Template: "Hi, I'm an Austin ML engineer who has built ML-driven threat-detection tooling and now works on fraud and AML models. I'd like to propose a talk on [privacy threats from data aggregation / attacking ML pipelines]. Background reading: https://colbymainard.github.io/assets/html/tech_takes.html#PrivacyDiv. Is the chapter taking speakers? Colby" |
| Expected success rate | Low to moderate, depending on whether the chapter is active. |
| Expected effort level | High: a new talk takes 10 or more hours to prepare. |
| Impact and Effort (H/M/L) | Impact M, Effort H |

### 9. Pitch Practical AI as a guest (long shot)

| Component | Detail |
| --------- | ------ |
| Strategy & target page(s) | Topic-specific podcast outreach. Target: `index.html#publicSpeakingDiv`. |
| Pros | Practical AI (<https://changelog.com/practicalai>) is a weekly, practitioner-focused show with guest interviews. Its show notes and transcripts are durable and easy for AI systems to retrieve. The "Invisible Data" theme matches its practical bent. |
| Cons | A web search found no published guest-pitch process, so the right contact is unconfirmed. Find it in the show's episode notes or on Changelog's contact page. Large shows receive many pitches, so expect a low hit rate. |
| On-site content steps | None beyond strategy 1. |
| Outreach steps | Use the contact route found on <https://changelog.com/practicalai>. Template: "Hi Chris and Daniel, I recently spoke at LLMday Austin on 'Invisible Data', about how biased and incomplete training data quietly breaks ML in fraud detection, cybersecurity, and sports analytics, and what to check before and after training. Slides: https://colbymainard.github.io/#publicSpeakingDiv. If that fits an upcoming episode, I'd be glad to join. Colby Mainard" |
| Expected success rate | Low. It is included because one acceptance would outweigh several smaller links. |
| Expected effort level | One email. Preparation only if accepted. |
| Impact and Effort (H/M/L) | Impact M, Effort L |

## Pages not given a strategy

- **`tech_resources.html`:** it is already the best internally linked page. devx.com already covered Colby's resource picks, so a resource-roundup pitch would repeat that venue's topic. The feature report's filter (recommendation 4) addresses its static tables for visitors.
- **`hobbies.html`:** low link-earning value for the site's audiences. The CC BY 4.0 photographs could go on Wikimedia Commons with attribution, but those links are `nofollow` and off-topic. Not recommended now.
- **`privacy.html`:** `noindex`, and not a link target.

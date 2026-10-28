# Web Authority Assessment

Last Updated: 2026-10-27

This assessment extends today's sibling reports rather than restating them: `code-review-2026-10-27.md`, `accessibility-auditor-report-2026-10-27.md`, `content-polisher-report-2026-10-27.md`, `feature-recommender-report-2026-10-27.md`, `seo-report-2026-10-27.md`, and `backlink-planner-report-2026-10-27.md`. Where a finding belongs to one of them, the Hand-off field says so.

No authority score, backlink count, ranking, or traffic figure was available, and none is stated. No site file was edited.

## 1. Authority baseline

| Component | Current state | Evidence | Biggest gap |
| --------- | ------------- | -------- | ----------- |
| Link power | Modest but real, and earned the right way, through direct expert-quote requests. One conference talk adds a strong new hook. | `press_mentions.csv` logs seven mentions across six venues (AI and creativity, AI security in finance, tech resources, autonomous AI in fintech, AI ethics, model training). Five were quoted faithfully. One was misunderstood (devx.com) and one was butchered (fintechly.com). The CSV does not record whether each mention links to the site. The October 14, 2026 LLMday Austin talk is on `index.html` with slides and an `Event` node. | The talk and the existing mentions are not yet converted into links or on-site evidence. The butchered quote is a liability under Colby's name in his current field. |
| Organic traffic potential | Good topical fit for informational queries, held back by weak connections between the three content pages. | `guides.html` opens each guide with a direct definition (for example line 413). `tech_resources.html` is a deep curated directory (65 books, 10 podcasts, 5 certifications in JSON-LD). `tech_takes.html` has eight long-form stances. Internal links: guides → resources 11 times, resources → guides 10 times, but stances ↔ guides only through the nav, and `index.html` links to no content page from its body. | Stances and guides on the same topics do not reinforce each other, and the home page passes nothing to either. |
| Spam factors | Clean. | No reciprocal arrangements, no paid placements, and no keyword-stuffed anchors. Internal anchors are descriptive ("my list of AI resources"). Two of the mention venues are small (promptlibrary.monster lists its author as "admin"), but they came from genuine quote requests, so they are low-value rather than manipulative. | Nothing to fix. Keep favoring persistent, relevant venues over volume. |
| AI retrievability | Strong. | `robots.txt` allows the live-search and assistant agents and blocks training bots by policy. `llms.txt` has current key facts, an FAQ, and a citation policy (Last updated 2026-10-24). `feed.xml` carries 15 entries. All 41 JSON-LD blocks parse, and the 46 Colby nodes carry the `#person` `@id` with `name`. Pages are static HTML with progressive enhancement, so no meaning depends on JavaScript. | The `h3`s in the guides and stances are labels rather than questions, so extractable answers sit under headings that do not say what they answer (SEO report). The feed title names only stances (code-review CR-9). |
| User experience (technical health) | Good overall, with one heavy page. | Self-hosted AnimeJS, deferred scripts, and a service-worker cache. `hobbies.html` serves five photographs of 3.5 to 5.0 MB each plus a 2.1 MB hero, which is lazy-loaded despite being above the fold (code-review CR-7). | Oversized photographs on `hobbies.html`. |

## 2. Topic clusters

| Topic | Pillar page | Spoke pages | Cluster health | Action |
| ----- | ----------- | ----------- | -------------- | ------ |
| AI and machine learning | `guides.html` (Computer Vision, Generative AI, NLP, and Reinforcement Learning guides) | `tech_resources.html#artificialIntelligenceResourcesDiv`. `tech_takes.html` KAN, AGI, and Vibe Coding stances. `index.html` profile and talk. | Half wired. Pillar ↔ resources is strong both ways. Resources → stances exists (KAN, AGI). Pillar ↔ stances is missing, and the home page links to none of them from its body. | Recommendation 1. |
| Cybersecurity and privacy | `guides.html#cybersecurityGuideDiv` | `tech_resources.html#cybersecurityResourcesDiv` (the largest resource section). `tech_takes.html` Post-Internet Privacy and Cryptocurrency stances. | Same pattern. Guide ↔ resources is strong, and the stances are disconnected from the guide. | Recommendation 1. |
| Software engineering | `guides.html#softwareEngineeringGuideDiv` | `tech_takes.html#VibeCodingScourgeDiv`. `tech_resources.html` C/C++, Python, and Systems sections. | The Vibe Coding stance links to resources but not to the guide whose "Why GenAI Can't Kill Software Engineering" section makes the same argument. | Recommendation 1. |
| Data quality | `guides.html#dataEngineeringGuideDiv` ("The Importance of Clean Data") | `index.html#publicSpeakingDiv` (the "Invisible Data" talk). | Latent. The site's strongest credential on this topic, a conference talk, is not connected to the guide at all. | Recommendation 2. |
| Sports computer vision and marketing | `tech_takes.html` Product Placement in Sports Marketing | `index.html` Work History (the MVP role). `guides.html` Computer Vision guide. | Single page. This is the site's most first-hand, hardest-to-copy content, but it is not framed as evidence. | Recommendation 5. |
| Quantum computing | `tech_takes.html#FutureOfQuantumDiv` | `hobbies.html#quantumComputingDiv` | Shallow. Hobbies links to the stance, but not the other way. Two short treatments do not make a cluster worth building. | Add the one reverse link as part of recommendation 1, and do not invest further. |

## 3. Recommendations, ranked by leverage

### 1. Wire the stances to the guides, and the home page to both

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Internal link equity across three clusters. `tech_takes.html`, `guides.html`, `index.html`. |
| Authority component | Organic traffic potential, plus link power distribution. |
| Why it works here | The site's link-earning assets (the home page's talk and credentials, the stances) sit beside its best informational content (the guides) with no path between them. Stances and guides already argue the same points. Vibe Coding and the Software Engineering guide both explain why GenAI cannot replace engineers, and Post-Internet Privacy and the Cybersecurity guide overlap on best practices. |
| Trade-offs and failure modes | Pays off only if each link sits where the topic genuinely connects. A block of "related links" at the bottom of every section would read as filler. Avoid repeating the same exact-match anchor across pages. |
| Steps | 1. Vibe Coding ↔ Software Engineering guide. 2. Post-Internet Privacy ↔ Cybersecurity guide. 3. AGI → Generative AI guide. 4. Future of Quantum → `hobbies.html#quantumComputingDiv`. 5. Two or three contextual links from `index.html` body copy (profile and talk) into the guides and stances. Use descriptive anchors for every link. |
| Leverage | High. Impact high (it lifts three clusters and the whole site's internal equity). Effort low (markup on existing pages). |
| Effort | Two to three hours. Assumes no copy rewrites beyond the linking sentence. Stance and guide edits also update `dateModified` and `feed.xml`. |
| Hand-off | search-engine-optimization (its Internal links rows on `index.html`, `tech_takes.html`, and `guides.html` carry the specific anchors) |

### 2. Connect the "Invisible Data" talk to the Data Engineering guide

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Topic cluster plus linkable asset. `index.html#publicSpeakingDiv` ↔ `guides.html#dataEngineeringGuideDiv`. |
| Authority component | Link power and organic traffic potential. |
| Why it works here | A conference talk is third-party validation of expertise. Linking it to the guide on the same subject lends that validation to the guide. Adding the talk's before-training and after-training checks to "The Importance of Clean Data" turns the guide into a reusable checklist that others can cite. |
| Trade-offs and failure modes | The checklist must carry the talk's specific checks. A generic list adds nothing. If the slides contain material Colby cannot publish in prose, link the slides instead. |
| Steps | 1. Add a reciprocal link between the talk summary and the guide section. 2. Add the checklist to the guide (backlink plan strategy 5). 3. Update the guide's `TechArticle` dates and `feed.xml`. |
| Leverage | High. Impact high (it connects the strongest credential to its topic). Effort medium (the link is minutes, the checklist a few hours). |
| Effort | Three to five hours, assuming the talk's checks can be published as prose. |
| Hand-off | backlink-strategy-planner (strategy 5 owns the checklist build) |

### 3. Request a correction for the fintechly.com quote

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Mention repair. Off-site, affecting `index.html` author identity. |
| Authority component | Link power (mention quality). |
| Why it works here | `press_mentions.csv` records the quote as "Butchered ... to the point of meaninglessness", on a fintech page, and fintech is Colby's current field. A meaningless quote attributed to him is a negative signal. A corrected one becomes a relevant, persistent mention. |
| Trade-offs and failure modes | The editor may not respond. Treat the correction as the goal and any link as a bonus. |
| Steps | Find the originally submitted answer, then send the correction request. The backlink plan's strategy 2 has the template. Log the outcome in `press_mentions.csv`. |
| Leverage | High. Impact medium (one mention, in the right field). Effort low (one email). |
| Effort | About 30 minutes. |
| Hand-off | backlink-strategy-planner (strategy 2) |

### 4. Secure a speaker link from LLMday

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Mention conversion. `index.html#publicSpeakingDiv`. |
| Authority component | Link power and co-citation. |
| Why it works here | An event program puts Colby beside other AI practitioners, which is exactly the co-citation that tells search and AI systems who his peers are. The certified.fyi speaker certificate is already linked from the site, so the claim is verifiable. |
| Trade-offs and failure modes | It depends on whether llmday.com publishes speaker listings. A web search did not confirm one. |
| Steps | Fix the slide link text (code-review CR-8), then contact the organizer. The backlink plan's strategy 1 has the template. |
| Leverage | High. Impact high if a listing exists. Effort low. |
| Effort | Under an hour. |
| Hand-off | backlink-strategy-planner (strategy 1) |

### 5. Reframe the sports product-placement stance as a case study

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Linkable asset (case study with methodology). `tech_takes.html`, Product Placement in Sports Marketing. |
| Authority component | Link power and organic traffic potential. |
| Why it works here | This is the site's most first-hand content. It distills computer-vision pipeline work across professional leagues at MVP (`index.html` Work History) into the factors that drive placement value: size, rotation, occlusion, motion blur, clutter, and game context. Sports-marketing and computer-vision writers cannot copy that experience. Today it reads as tips. Stating the setting and the method (what the models measured, at what level of detail, under what constraints) turns it into a citable source. |
| Trade-offs and failure modes | `index.html` notes that most professional work "is not publicly shareable". Publish only what the former employer permits, describing the method without client names or numbers. If nothing more can be said, leave the stance as it is. |
| Steps | 1. After the stance's opening paragraph, which ends at `tech_takes.html:837`, add a "How these factors were identified" paragraph of three to five sentences. State the role (Machine Learning Engineer at MVP), the four leagues (NFL, NHL, MLB, NBA), and the model types (detection and segmentation). That is the level of detail `index.html:263` and `:272` already make public. 2. Link it to the Computer Vision guide's Problem Classes section, and the guide back to it. 3. Update `dateModified` and `feed.xml`. |
| Leverage | Medium. Impact high (original first-party material is the hardest asset to replicate). Effort medium (writing, plus an NDA judgment call). |
| Effort | Two to four hours. Assumes the maintainer already knows what is disclosable. |
| Hand-off | content-polisher (for the new paragraph's wording) |

### 6. Show the press mentions on the site and in the Person graph

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Turn off-site mentions into on-site evidence. `index.html` (a short "Quoted in" list), and the Person JSON-LD. |
| Authority component | AI retrievability and link power (corroboration). |
| Why it works here | Five faithful quotes exist, but nothing on the site points to them, so a recruiter or an AI system reading the site cannot see them. A short list of linked publications, with topics, is verifiable third-party evidence. Adding them as `subjectOf` entries on the canonical `#person` node lets crawlers connect the mentions to the entity. |
| Trade-offs and failure modes | Include only the faithful mentions, and leave out fintechly.com unless it is corrected. Small or "admin"-authored venues add little, so list them only if they are on-topic. This adds a list the maintainer must keep in step with `press_mentions.csv`. |
| Steps | 1. After the slide link (`index.html:2377`), add a "Quoted in" subsection that lists the five faithful mentions from `press_mentions.csv` rows 2, 3, 5, 7, and 8. These are freeduhm.com (twice), financialtechtimes.com, promptlibrary.monster, and labelyourdata.com. Give the publication, the article title, and the link for each. 2. Add matching `subjectOf` nodes to the Person JSON-LD, without touching the `@id`. 3. Validate with the Rich Results Test. |
| Leverage | Medium. Impact medium (credibility for the employer audience). Effort medium (new markup plus ongoing upkeep). |
| Effort | Two hours, plus a minute per future mention. |
| Hand-off | search-engine-optimization (JSON-LD validity) |

### 7. Put question headings above the guides' existing answers

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Extractability. `guides.html`, and the stances that open with a definition. |
| Authority component | AI retrievability and organic traffic potential. |
| Why it works here | The guides already answer "what is X" in the first sentence. A question heading directly above lets answer engines quote the passage whole and attribute it. |
| Trade-offs and failure modes | The `h2`s are mirrored in `feed.xml` and the JSON-LD and must not change. Add `h3`s only. |
| Steps | Per the SEO report's guides and tech_takes "Headings (snippet targeting)" rows. |
| Leverage | Medium. Impact medium. Effort low. |
| Effort | About one hour. |
| Hand-off | search-engine-optimization |

### 8. Resize the hobbies photographs

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | User experience as an authority signal. `hobbies.html` and `assets/images/photographyHobby/`. |
| Authority component | Technical health. |
| Why it works here | Five originals of 3.5 to 5.0 MB each, displayed in a gallery at a fraction of their native 3000×2000 size, make this the site's slowest page on mobile. CLAUDE.md already keeps them out of `PRECACHE_URLS` because of their size. |
| Trade-offs and failure modes | This is a hobby page with little search value, so the authority gain is indirect. Keep the full-resolution originals available (for example linked from each figure) so the CC BY 4.0 licence offer stays useful. |
| Steps | 1. In GIMP, which the repo already uses for its `.xcf` sources, export each of the five photographs as a 1600×1067 JPEG. Save each one beside its original with a `-1600` suffix (for example `DSC_0004-1600.jpg`). 2. Point the five `<img>` tags (`hobbies.html:163-187`) at the new files, and change their `width` and `height` to 1600 and 1067. 3. Link each original from its `<figcaption>` with the text "Full resolution", so the CC BY 4.0 offer still includes the full-size file. 4. Leave the `ImageObject` `contentUrl` values on the originals, since those are the licensed files. 5. Bump `CACHE_VERSION`. 6. Apply code-review CR-7 to the hero at `hobbies.html:129` in the same change. |
| Leverage | Medium. Impact medium (one page, but a large improvement). Effort medium (asset work across five files plus markup). |
| Effort | Two hours. |
| Hand-off | none |

### 9. Re-present the talk to a local practitioner community

| Component | Detail |
| --------- | ------ |
| Recommendation and target page(s) | Outreach opportunity. `index.html#publicSpeakingDiv`. |
| Authority component | Link power and co-citation. |
| Why it works here | The talk already exists, and Austin has a technical deep-learning community aligned with Colby's specialty. Each delivery adds a persistent event page and peer awareness. |
| Trade-offs and failure modes | Meetup pages carry little search weight. The value is relationships and future mentions. |
| Steps | See the backlink plan's strategy 4 (Austin Deep Learning) and strategy 8 (OWASP Austin, with a new talk). |
| Leverage | Medium. Impact medium. Effort medium. |
| Effort | Two to four hours for a re-delivery. |
| Hand-off | backlink-strategy-planner (strategies 4 and 8) |

## 4. Open questions

- **Do the existing press mentions link to the site?** `press_mentions.csv` records quote quality but not whether each page links, or whether the link is `nofollow`. Check by opening each URL and inspecting the credit line, then add a "Linked" column to the CSV. This changes whether recommendation 6 is corroboration only or also link equity.
- **Which pages already earn impressions, and for which queries?** This would show whether the guides or the stances should be treated as the stronger pillar, and whether question headings (recommendation 7) target queries the site already appears for. Check Google Search Console → Performance → Pages and Queries.
- **Inbound link profile.** Without Ahrefs, Semrush, or Search Console's Links report, the real referring-domain set is unknown. Check Search Console → Links → Top linking sites before prioritizing outreach over on-site work.
- **Does LLMday publish speaker pages?** This decides whether recommendation 4 is a link request or a request to create one. Check llmday.com.
- **What can be disclosed about the MVP work?** This decides whether recommendation 5 is viable. Only the maintainer can answer it.

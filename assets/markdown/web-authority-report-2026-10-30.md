# Web Authority Assessment

Last Updated: 2026-10-30

This assessment extends the five specialist reports and the code review written earlier today rather than restating them. Each recommendation names the sibling that owns the follow-up. No authority score, backlink count, ranking, or traffic figure is stated, because none can be measured from this repository.

**Severity scale:** High means it undermines credibility with a primary audience now. Medium means a clear authority gap. Low means a minor or slow-payoff gap.

## 1. Authority baseline

| Component | Current state | Evidence | Biggest gap |
| --------- | ------------- | -------- | ----------- |
| Link power | Modest but real, and concentrated on AI and fintech. | `press_mentions.csv` has seven mentions: five faithful, one misunderstood (devx.com), one butchered (fintechly.com). There is one conference talk (LLMday Austin, `index.html:2357`). The file does not record whether any mention links back. | No inbound link is known to point at a specific guide or stance, and the talk is not linked from its organizer. |
| Organic traffic potential | Good topical breadth in a narrow technical band, but the content is beginner depth. | Seven beginner guides (`guides.html`), eight stances (`tech_takes.html`), and a 65-book curated list (`tech_resources.html`). Most guide sections are three to six sentences. | Depth. The guides answer "what is X" but rarely show a worked example, which is what earns links. |
| Spam factors | Clean. | Internal anchors are descriptive and varied (for example `tech_resources.html:1371, 1449, 1490, 1646` use four different anchors for one target). There are no reciprocal-link arrangements. | One low-quality mention source (`promptlibrary.monster`). Do not build on it. |
| AI retrievability | Strong. | Server-rendered HTML, one `#person` `@id` across 46 nodes, `llms.txt` with a citation policy, a feed, and per-section permalinks. The allowed `robots.txt` stanza covers the live-search agents, and the blocked training stanza is deliberate. | A few claims an expert would dispute, and several statistics sourced to aggregators. An AI engine that quotes them passes the weakness on under your name. |

## 2. Topic clusters

| Topic | Pillar page | Spoke pages | Cluster health | Action |
| ----- | ----------- | ----------- | -------------- | ------ |
| Data quality and engineering | `guides.html#dataEngineeringGuideDiv` | The talk (`index.html#publicSpeakingDiv`), the AI resources | Linked both ways (`guides.html:447`, `index.html:2370`) and backed by off-site proof (the talk, plus press mentions about AI data). The best-evidenced cluster, but the guide is thin. | Deepen the guide with the talk's examples (W-4). |
| Applied AI/ML | The AI resources (`tech_resources.html#artificialIntelligenceResourcesDiv`) | Computer vision, generative AI, NLP, and RL guides; the KAN and AGI stances | Resources link to the guides and stances (`tech_resources.html:968-969`), and the guides link back. The KAN stance links nowhere on the site. | Add stance back-links (W-1). |
| Cybersecurity and privacy | `guides.html#cybersecurityGuideDiv` | Cybersecurity resources; the Privacy and Cryptocurrency stances | The guide links out to both stances (`guides.html:862`), but neither stance links back. | Add stance back-links (W-1). |
| Software engineering | `guides.html#softwareEngineeringGuideDiv` | The Vibe Coding stance; the C/C++, Python, scripting, OS, and DSA resources | Healthy and linked in both directions (`guides.html:756-758`, `tech_takes.html:1104-1132`). | None. |
| Sports computer vision | The Product Placement stance | The MVP role on `index.html:260-283` | The stance and the work history do not link to each other or to the computer vision guide. | Add links (W-1). |
| Quantum computing | The Future of Quantum Computing stance | `hobbies.html#quantumComputingDiv` | One-way (hobbies → stance at `hobbies.html:149`). Shallow on both sides. | Treat it as a personal interest, not a cluster. Add the return link only. |

## 3. Recommendations (ranked by leverage)

### W-1. Close the one-way links from stances back to their pillars (High)

- **Target:** `assets/html/tech_takes.html`, the ends of the KAN, Cryptocurrency, Quantum, AGI, Privacy, and Product Placement sections (lines 348, 517, 552, 695, 825, 954).
- **Authority component:** Organic traffic (internal link equity).
- **Why it works here:** Six of the stances receive links from guides and resources but pass none back, so the stances, which are the most opinionated and quotable content, are dead ends for both readers and crawlers.
- **Trade-offs:** Each link must be a real topical connection. A blanket footer of every page would read as filler.
- **Steps:** Add one sentence or a "Related on this site" block per stance, with descriptive anchors, using the mapping in backlink B-3.
- **Leverage:** High. Impact M (it strengthens four clusters at once). Effort L (markup only).
- **Effort:** About an hour.
- **Hand-off:** `backlink-strategy-planner` (B-3), which already lists the exact targets. It is also `feature-recommender` item 1.

### W-2. Replace aggregator sources with primary citations (High)

- **Target:** `tech_takes.html:785` (`nikolaroza.com` for "80% of cyberattacks"), `tech_takes.html:797` (`aboutmyinfo.org` for the 87% re-identification figure), `tech_takes.html:1044` (`quotememaybe.com` for "Good, Fast, Cheap"), and `guides.html:741` (a personal blog for the John Woods quote).
- **Authority component:** AI retrievability and trust.
- **Why it works here:** These pages already make cite-worthy claims. Linking the primary study, such as Sweeney (2000) for the 87% figure, turns a borrowed number into a properly sourced one. If a primary source for the 80% figure cannot be found, soften the claim instead.
- **Trade-offs:** Some popular statistics have no solid primary source. Expect to rewrite one sentence rather than relink it.
- **Steps:** (1) Find the original for each figure or quote. (2) Replace the link. (3) Adjust the wording where the original says something narrower.
- **Leverage:** High. Impact M, Effort L.
- **Effort:** One to two hours of research.
- **Hand-off:** `search-engine-optimization` (S-4).

### W-3. Review claims an expert reader would dispute (High)

- **Target:**
  - `guides.html:468`: k-anonymity described as adding noise.
  - `tech_takes.html:536-537`: quantum computers presented as speeding up NP problems, and computing power growing "exponentially with the number of qubits". Both are oversimplified in ways quantum researchers object to.
  - `tech_takes.html:547`: GPUs and TPUs given as examples of ASICs (GPUs are general-purpose).
  - `tech_takes.html:426-430`: a "(relatively) safe" cryptocurrency list that includes Monero and TRON, with no source for the stability claim. This is financial advice, where trust standards are strictest.
  - `hobbies.html:241`: the Luddites given as the origin of "sabotage".
- **Authority component:** Trust and AI retrievability.
- **Why it works here:** The audience includes engineers and employers who will spot these. Answer engines quote passages whole, so a mistaken sentence can be repeated under your name.
- **Trade-offs:** These are content decisions only you can make. Some may be deliberate simplifications for beginners, in which case say so in the text ("roughly speaking...").
- **Steps:** Decide on each claim in turn: keep it, qualify it, or correct it. For the crypto table, either add a source for "more stable" or reframe it as "well-known" rather than "safe".
- **Leverage:** High. Impact H (credibility with the primary audience), Effort M.
- **Effort:** Two to three hours.
- **Hand-off:** `content-polisher` (its accuracy flags on `guides.html:468` and `hobbies.html:241`).

### W-4. Make the LLMday talk the site's flagship linkable asset (Medium)

- **Target:** `index.html:2357-2381` and `guides.html#dataEngineeringGuideDiv`.
- **Authority component:** Link power.
- **Why it works here:** The talk is original material backed by a third party, and it is the only asset no one else can copy. Today it is an abstract plus a 6.9 MB PDF, which is hard to cite and hard for crawlers to read.
- **Trade-offs:** It needs writing time, and the payoff depends on outreach (B-1, B-4).
- **Steps:** (1) Publish the talk's main points as HTML under the abstract (feature 4). (2) Fold two or three concrete examples into the data engineering guide's "Importance of Clean Data" section (lines 416-448), so the pillar carries the evidence. (3) Then run B-1 and B-4.
- **Leverage:** Medium. Impact H, Effort M.
- **Effort:** Half a day.
- **Hand-off:** `feature-recommender` (item 4) and `backlink-strategy-planner` (B-1, B-4).

### W-5. Request corrections for the two misrepresented quotes (Medium)

- **Target:** `press_mentions.csv`, lines 4 and 6.
- **Authority component:** Link power.
- **Why it works here:** A butchered quote is a mention you would not want an employer to find. A corrected one becomes a clean credential.
- **Trade-offs:** No guarantee of a response.
- **Steps:** Send the correction emails, then update the CSV comment column with the outcome.
- **Leverage:** Medium. Impact M, Effort L.
- **Effort:** 30 minutes.
- **Hand-off:** `backlink-strategy-planner` (B-2).

### W-6. Record link status in `press_mentions.csv` (Medium)

- **Target:** `press_mentions.csv` (all rows).
- **Authority component:** Link power (measurement).
- **Why it works here:** The log says whether each quote survived editing, but not whether it links to the site or which page it links to. Without that column, link power cannot be assessed and correction priorities are guesses.
- **Trade-offs:** None beyond five minutes per row.
- **Steps:** Add a `Linked` column (none / home / specific page) and fill it by visiting each article.
- **Leverage:** Medium. Impact M, Effort L.
- **Effort:** 30 minutes.
- **Hand-off:** none.

### W-7. Keep `llms.txt` and the visible pages in exact agreement (Low)

- **Target:** `llms.txt` (the education line in Key facts and the feed label in Pages).
- **Authority component:** AI retrievability.
- **Why it works here:** `llms.txt` tells AI systems it is authoritative, so any mismatch with the page ("Masters in" vs "Masters of", a feed label that omits the guides) weakens that claim.
- **Trade-offs:** None.
- **Steps:** Apply SEO S-13 after content fix 1 on `index.html` lands.
- **Leverage:** Low. Impact L, Effort L.
- **Effort:** 10 minutes.
- **Hand-off:** `search-engine-optimization` (S-13).

### W-8. Fix hobbies page weight (Low)

- **Target:** `hobbies.html:129` and `hobbies.html:163-187`.
- **Authority component:** User experience as an authority signal.
- **Why it works here:** About 22 MB of unoptimized imagery is a real load-time drag on the one page that shows your photography. That is the page most likely to be shared casually.
- **Trade-offs:** It needs an image-export pass.
- **Steps:** See code review CR-2 and CR-3.
- **Leverage:** Low. Impact M, Effort M.
- **Effort:** One to two hours.
- **Hand-off:** none (it is already a code review finding).

### W-9. Publish one piece of original first-party analysis (Low)

- **Target:** `tech_takes.html#KANDiv` (lines 275-349).
- **Authority component:** Link power.
- **Why it works here:** The KAN stance argues pros and cons from the 2024 paper alone. A small reproducible benchmark (KAN vs MLP on one public dataset, with methodology stated) would be the only original data on the site. Original data is what a well-funded content team cannot copy.
- **Trade-offs:** High effort, and the results may be unremarkable. Only do it if the experiment interests you anyway.
- **Steps:** Run the comparison in a public notebook, then add a short "What I measured" subsection that links the notebook.
- **Leverage:** Low. Impact H, Effort H.
- **Effort:** Several days.
- **Hand-off:** `backlink-strategy-planner`, for promotion once it exists.

## 4. Open questions

- **Do any press mentions link back, and to which page?** Visit each URL in `press_mentions.csv` and check the link (W-6 makes this permanent).
- **Does LLMday publish speaker or recap pages that link speakers?** Check <https://llmday.com>. This decides whether B-1 is high or low return.
- **Which pages earn impressions?** Check Search Console under Performance, then Pages. If the stances outperform the guides, W-4's deepening should move to a stance instead.
- **Is the AutoDrive link at `index.html:1836` still live?** Open it in a browser.
- **What is the site's actual backlink profile?** A free backlink checker or Search Console's Links report would show whether any guide has earned an inbound link yet.

# Content Polish Report

**Last Updated:** 2026-08-04
**Scope:** visitor-facing copy on `index.html`, `assets/html/tech_takes.html`, `assets/html/tech_resources.html`, `assets/html/guides.html`, `assets/html/hobbies.html`.
**Constraint:** every suggestion below preserves the original meaning. Nothing here invents a credential, a metric, or a claim that is not already on the page.

## Executive summary

The writing on this site is already better than most engineering portfolios. The home page opener is specific and quantified, the work history bullets lead with verbs and name real systems, and the guides and technical stances read as though a person wrote them for another person. The copy does not need a rewrite.

What it needs is pruning in two specific places. The "Other Skills" section is a to-item list of bare adjectives that reads as filler and quietly undercuts the credibility the rest of the page earns. The technical skills lists have the same problem in milder form: length is being used as a proxy for depth, and a reader skimming for signal has to do the sorting themselves. Fixing those two sections is the highest-value copy work on the site.

## Priority 1: Rewrite the "Other Skills" section

**File:** `index.html:2272-2304`

**Current state.** Two bare lists under "Other Skills": an "Interpersonal" list of 6 items (`index.html:2280`) and a "Miscellaneous" list of 12. The miscellaneous list reads in full: Problem Solving, Curiosity, Adaptability, Flexibility, Loyalty, Integrity, Time Management, Critical Thinking, Continuous Learning, Creativity, Lateral Thinking, Strategic Thinking.

**Why this is the top item.** This is the last content section before the footer, so it is what a reader sees right after the certifications, and it is the weakest writing on the site. Twelve unsupported virtue words are the single most common resume anti-pattern; hiring managers discount them on sight because every candidate claims them and none of them are falsifiable. "Loyalty" and "Flexibility" in particular read as filler. The cost is not neutral: a page that has just spent 2,000 lines proving specific things with specific numbers ends by asserting unprovable ones, and the contrast is noticeable. Note also that "Adaptability" and "Flexibility" are the same claim twice, as are "Critical Thinking" and "Problem Solving."

**Recommended replacement.** Cut the lists and keep only the claims the rest of the page can already back up, stated as sentences with their evidence attached. This preserves the meaning of the section, which is "I work well with people and I keep learning," while making it checkable.

> ### Other Skills
>
> **Explaining AI to non-technical audiences.** Most of my work only matters once somebody outside the ML team can act on it. At MVP that meant translating model performance work into the cost terms that justified it. The guides and technical stances on this site are the same habit applied in public.
>
> **Working across function boundaries.** Every role above involved partnering outside engineering, whether with sports league stakeholders, security analysts, or compliance-facing teams in banking.
>
> **Continuous learning.** The quantum computing self-study on my hobbies page is not job-adjacent. I picked it up because the subject was interesting, which is roughly how I have picked up most things that later turned out to be useful.

Three specific claims that point at evidence elsewhere on the page will outperform eighteen generic ones. If the full list is worth keeping for keyword coverage, keep it as a single comma-separated line under the sentences rather than as two prominent bulleted lists.

## Priority 2: Signal depth in the technical skills lists

**File:** `index.html`, technical skills section (ends at `index.html:2238`)

**Current state.** Long flat lists of technologies. A sample of the tail: Ruby on Rails, Sportradar API, Robotic Operating System (ROS), Testing, Debugging, Regular Expressions (RegEx).

**The problem.** "Testing," "Debugging," and "Regular Expressions" are not skills that distinguish a senior ML engineer; they are baseline competence, and listing them next to PyTorch and Databricks flattens the difference between what this person is expert in and what they have merely touched. A recruiter skimming cannot tell which is which, so they fall back on the résumé.

**Recommended change.** Do not rewrite the section. Do two smaller things:

1. **Drop the items that only add noise:** Testing, Debugging, Regular Expressions. Nobody will conclude their absence means anything.
2. **Split each list into two tiers,** using wording that stays honest about the difference:

   > **Core (daily use):** Python, PyTorch, OpenCV, SQL, Docker, AWS
   >
   > **Working familiarity:** TensorFlow, Keras, Ruby on Rails, ROS, Sportradar API

The reader now gets the sorting for free, and the "working familiarity" label is more credible than an undifferentiated list, not less. Claiming less precisely tends to read as claiming more reliably.

## Priority 3: Small fixes worth making while nearby

### Certification date reads as expired

**Files:** `index.html:2259-2261` (visible copy), `index.html:76-83` (the matching JSON-LD)

The AWS Certified Cloud Practitioner shows "Held: May 2023 to May 2026." Today is August 2026, so as written this credential lapsed three months ago, and a reader will read it that way. If it was renewed, update the end date. If it genuinely lapsed, consider moving it under a short "Previously held" heading so the page is not silently presenting an expired credential alongside a current one. Either way the current framing is the worst of the three options because it leaves the reader to work it out.

**This one is not only a copy fix.** The same credential is mirrored in the `EducationalOccupationalCredential` block in the head, which carries `"expires": "2026-05"` at `index.html:82`. That date is now in the past, so the page is actively telling search engines it holds an expired certification. Whatever is decided about the visible copy, the JSON-LD has to be updated in the same edit or the two will disagree.

Note also that Microsoft Azure Fundamentals (AZ-900) directly below has no date at all, in either the copy or the structured data, so the two entries are inconsistent in a way that draws the eye to exactly the wrong thing.

### The opener buries its strongest sentence

**File:** `index.html:167-177`

The three intro paragraphs currently run: years of experience, then domains, then model design. The third paragraph contains the most differentiating claim on the page, which is that this person both designs novel models and extends large foundation models. That is the sentence that separates an ML engineer from an ML-adjacent one, and it is in the position readers skip.

Consider promoting it to second, so the order is: what I am, what I can build, where I have applied it. The paragraphs need no rewording, only reordering.

### "Proven ability" and "demonstrated impact" are hedges

**File:** `index.html:172-176`

Both phrases are résumé-speak that adds words without adding information. The sentences are stronger with them removed, since the surrounding content is already the proof:

- "Proven ability to design novel models (e.g., VAEs) as well as extend large-scale foundational models" becomes "I design novel models (for example, VAEs) and extend large-scale foundation models."
- "with demonstrated impact across sports analytics, cybersecurity, advertising, healthcare, and applied research" becomes "with work shipped across sports analytics, cybersecurity, advertising, healthcare, and applied research."

Note "foundational models" should be "foundation models," which is the standard term.

### Quantify one more work history bullet

**File:** `index.html:2214` area, MVP role

The MVP entry contains the best number on the page: "identifying ~$1M in cost savings." It is doing a lot of work alone. The surrounding bullets describe pipelines "supporting professional sports leagues (NFL, NHL, MLB, NBA)" without a scale figure. If any of the following can be stated without disclosing anything confidential, one of them would meaningfully strengthen the entry: number of games or hours of footage processed, dataset size produced by the auto-labeling utilities, or the number of models under performance tracking. One more concrete number is worth more than another bullet.

## What is already working and should not be touched

- **The home page opening line.** "Machine learning engineer with 5+ years of experience designing, deploying, and operating production ML systems" is specific, scannable, and correctly avoids the summary-statement throat-clearing most portfolios open with. The verb triple is doing real work: designing, deploying, and operating are three different jobs and claiming all three is a genuine differentiator.
- **Work history bullets lead with strong verbs** and name real systems (YOLO, ResNet, Databricks, variational autoencoders) rather than gesturing at categories. The RiskScout entry in particular is well constructed: it describes the data reality (CSV, XML, JSON, fixed-width, SFTP drops) rather than claiming generic "data engineering."
- **Jargon is expanded on first use** with `<abbr title="...">` for VAE, ETL, ELT, RAG, AML, PII, and CV. This is unusual care and it is exactly right for a page with two audiences of differing technical depth.
- **The hobbies page connects hobbies back to the technical work** rather than presenting them as unrelated trivia. The quantum computing section linking through to the corresponding technical stance is a good structural instinct, and the D&D section explains why it matters (new city, new friendships) instead of just naming the game.
- **The guides and technical stances are genuinely plain-spoken.** They read as written rather than assembled, which is the whole value proposition of that content.

## Style notes for future edits

- Keep writing without em dashes. The existing copy uses commas, periods, and parentheses, and it reads cleanly; keep new copy consistent with that.
- Prefer "Last Updated:" over "Last Reviewed:" or other variants on date lines, which is the convention the rest of the site follows.
- Continue expanding acronyms on first use per page. It is one of the things this site does better than its peers.

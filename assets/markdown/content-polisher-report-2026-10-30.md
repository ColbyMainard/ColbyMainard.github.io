# Content Polish Suggestions

Last Updated: 2026-10-30

Prior reports found in `assets/markdown/`: today's code review and accessibility audit. Where a suggestion overlaps one of them, it is noted so the roadmap can merge it.

All suggestions change prose only. They leave `<abbr>` elements, JSON-LD, `id` values, and link targets alone, except where a row says a mirrored file must change too. None of the suggested headings are mirrored in `feed.xml` or the `Article`/`TechArticle` JSON-LD.

**Severity scale:** High means a credibility risk a recruiter or expert would notice. Medium means a real clarity or grammar problem. Low means polish.

Rows marked **Accuracy flag** are not rewrites. They point at a claim an expert reader may dispute, so you can decide whether it needs changing. They are not counted as meaning-preserving edits.

## index.html

The tone is confident and résumé-like, which suits employers. The rough spots are credential wording, tool-name capitalization, and a few long sentence fragments.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| High | 326, 671 | grammar | "Masters of Computer Science" / "Bachelors of Science, Computer Science" | "Master of Computer Science" / "Bachelor of Science in Computer Science" | Degree names take the singular form. Recruiters read these headings first. `llms.txt` says "Masters in Computer Science" and should match. |
| Medium | 1915, 1922, 2217, 2228, 2254, 2284 | accuracy of names | "Numpy", "MLFlow", "Sagemaker", "ScraPy", "ScaPy", "Robotic Operating System (ROS)" | "NumPy", "MLflow", "SageMaker", "Scrapy", "Scapy", "Robot Operating System (ROS)" | These are each project's official spelling. Technical readers notice them. |
| Medium | 224 | clarity | "Proven ability to design novel models such as variational autoencoders (VAEs) as well as extend large-scale foundational models, while partnering cross-functionally to deliver measurable business value." | "Designs novel models such as variational autoencoders (VAEs) and extends large-scale foundation models. Partners across teams to deliver measurable business value." | Splits a run-on sentence into two. "Foundation model" is the standard term. |
| Medium | 312 | clarity | "Identified and corrected erroneous research paper attribution for professors (utilizing domain / subject matter as a filter methodology) employing both manual review and automation." | "Found and corrected misattributed research papers in professors' records, filtering by subject area and combining manual review with automation." | Removes the parenthetical and the stacked participles. |
| Low | 2367-2370 | tone | "In fact, it is probably safer to say that real-world data is the number one saboteur of existing machine learning applications. This talk will go over common data problems that have been seen in enterprise systems..." | "Real-world data is arguably the number one saboteur of machine learning applications. This talk covers common data problems seen in enterprise systems..." | Cuts the hedging and the passive voice from the talk abstract. |
| Low | 2378 | accessibility | "Download the slides!" | "Download the slides (PDF, 6.9 MB)." | Tells readers what they are getting. Same as accessibility A-4. |
| Low | 266 | accessibility | "professional sports leagues (NFL, NHL, MLB, NBA)" | "professional sports leagues, including the National Football League (NFL), National Hockey League (NHL), Major League Baseball (MLB), and National Basketball Association (NBA)" | Phone readers cannot reach an `abbr` title. Same as accessibility A-3. |

## assets/html/guides.html

The guides are plain-spoken and well scoped for beginners. The main issues are bullet lists that mix grammatical forms, a few run-on sentences, and two sections whose text does not match their heading.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| Medium | 704-706 | clarity | "This is generally considered its own paradigm... In reinforcement learning, it is usually very clear to measure the quality of a solution objectively... it might not always be obvious to humans the most optimal strategy..." | "Reinforcement learning is generally considered its own paradigm, separate from supervised and unsupervised learning. Its results are usually easy to measure objectively (for example, a high score in a video game). Humans, however, may not know the best strategy, or whether a higher score is even possible." | Fixes "clear to measure" and "most optimal". Note that the `h3` above it says "Applications", but the paragraph describes how RL differs rather than where it is used. Consider renaming the heading. Only this page would change. |
| Medium | 590-591 | clarity | "These are the predecessor of modern GenAI. One of the most obvious differences was the introduction of the Transformer's multi-head attention layers and the architectural flexibility they allow." | "GANs came before today's generative models. The most visible change since then is the Transformer's multi-head attention layers, and the architectural flexibility they allow." | Clarifies what "these" refers to. The section never says what a GAN is, so a one-sentence definition in your own words would help beginners. |
| Medium | 468 | Accuracy flag | "Add k-anonymity and differential privacy to add noise for attackers" | For example: "Apply k-anonymity to generalize identifying fields, and differential privacy to add statistical noise" | k-anonymity generalizes or suppresses values rather than adding noise. A privacy engineer would notice. |
| Low | 463-468 | flow | "Hashing sensitive fields to make it less readable" / "Salting..." / "Least privileged access to data" / "Add cybersecurity checks..." | "Hash sensitive fields so they cannot be read at a glance" / "Salt hashed fields to prevent frequency analysis" / "Grant least-privilege access to data" / "Add checks that monitor and verify access" | Puts every item in the same imperative form and fixes "it" referring to "fields". |
| Low | 436, 444 | grammar | "Deduplicate data in a consistent policy" / "Impute value via either a default or estimate based on other columns" | "Deduplicate data using a consistent policy" / "Impute missing values with either a default or an estimate based on other columns" | Fixes the preposition and the missing article. |
| Low | 720 | clarity | "For my purposes, I will focus on the design, testing, and maintenance of this definition, as this is where many beginners go wrong." | "Here, I focus on the design, testing, and maintenance parts of that definition, because that is where many beginners go wrong." | You focus on parts of the field, not of the definition. |
| Low | 809 | clarity | "By doing so, it removes bugs that malicious actors could use to attack users as soon as possible." | "That way, bugs that attackers could exploit are found and removed as early as possible." | "As soon as possible" currently attaches to the attack. |
| Low | 825 | clarity | "Most have some level of cybersecurity practices..." | "Most organizations have some cybersecurity practices in place..." | "Most" has no noun to refer to. |
| Low | 786 | clarity | "Ignore all scam emails and delete immediately - they may contain malware" | "Do not open links or attachments in scam emails. Delete them right away, because they may contain malware." | Removes the dash and says what "ignore" means in practice. |
| Low | 778 | clarity | "Use penetration tests or similar when possible" | Consider moving this item to the Ethical Hacking section, or naming who it is for, such as "If you run a business, consider a professional penetration test" | The list is addressed to non-technical users, who cannot run a penetration test themselves. |
| Low | 838-858 | grammar | "Ghidra - demystifying binaries" / "Nmap - Exploring what devices..." / "Burpsuite - ..." | Use one capitalization style after each hyphen, and write "Burp Suite" | The list currently mixes the two styles, and the product name is two words. |
| Low | 618 | clarity | "autonomously determine the sentiment" | "automatically determine the sentiment" | "Autonomously" suggests an agent acting on its own. |

## assets/html/tech_takes.html

These pieces have the strongest voice on the site, and the humor works. The issues are one sentence that misreads badly, a few redundant phrasings, and one pop-culture reference that is left implicit.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| High | 755 | grammar | "While best-known for allowing access to the dark web, I would recommend browsers like Tor to browse the clear web." | "Tor is best known for reaching the dark web, but I also recommend it for everyday browsing on the clear web (the ordinary, publicly indexed web)." | The dangling modifier says that you are best known for dark-web access. An employer could read it that way. |
| Medium | 693 | clarity | "Otherwise, we had better start protecting every Sarah/John Connor we can." | "Otherwise, we had better start protecting every Sarah and John Connor we can, the people the machines hunt in The Terminator films." | Makes the reference explicit for readers who miss it. |
| Medium | 1033 | flow | "Effectively, it acts as a genie that finds loopholes in your wish and exploits those to make your life worse as it makes things worse." | "In effect, the paw is a genie that finds loopholes in each wish and uses them to make your life worse." | Removes the repeated "worse" and the unclear "it". |
| Medium | 1062 | flow | "It is equally easy to destroy all three arguments for outright replacing humans with AI in all three of these fields: ..." | "The case for replacing humans outright falls apart the same way in all three fields: ..." | Removes the doubled "all three". |
| Medium | 314 | clarity | "As the paper I was able to find demoing this technology was only released in 2024, most AI developers haven't had much time to experiment with it." | "The earliest paper I could find demonstrating KANs was published in 2024, so most AI developers have not had much time to experiment with them." | Reorders the sentence so the cause comes first. |
| Medium | 359-360 | flow | "Similarly, the blockchain stores an immutable history of transactions that stores information regarding all approved transactions. ... in which it can be explored how to reach consensus..." | "The blockchain, in turn, stores an immutable history of every approved transaction. ... which asks how a group can reach consensus without a trusted central authority." | Removes "stores" twice and the passive construction. |
| Low | 398 | flow | "Similarly, it is much easier to perform unsavory activity." | "As a result, illicit activity is much easier." | "Similarly" is the wrong link, because this is a consequence. |
| Low | 713 | flow | "This means that most people who have been online long enough have experienced at least one data breach in their life." | "As a result, most people who have been online long enough have had their data exposed in at least one breach." | The original reads as if the breaches follow logically from the sentence before. |
| Low | 657, 689 | grammar | "treated different" / "I believe it fair to assume" | "treated differently" / "I believe it is fair to assume" | Fixes the adverb and adds the missing verb. |
| Low | 972 | clarity | "...often supplemented by online piracy for those willing to use less reputable sources and reputable antivirus." | "Piracy filled the gaps for those willing to use less reputable sources, ideally with reputable antivirus." | The joined "less reputable / reputable" is confusing. |
| Low | 992 | grammar | "This is doubly accurate for media..." | "This is doubly true for media..." | Uses the idiomatic phrase. |
| Low | 1078 | clarity | "Humans do not need to extend bandwidth to verify/correct AI output." | "Humans do not need to spend time verifying or correcting AI output." | "Extend bandwidth" is jargon. |
| Low | 1109, 1123 | flow | "Learning to program without generative AI." / "Getting comfortable with design patterns." | "Learn to program without generative AI." / "Get comfortable with design patterns." | Matches item 1 ("Understand applications..."), so the steps read as a parallel list. |
| Low | 262 | tone | "When developing software, it is best to keep an eye on recent developments and generate informed opinions about the technology." | "Good engineering means keeping an eye on new developments and forming informed opinions about them." | You form opinions rather than generate them, and the new opening is more direct. |

## assets/html/tech_resources.html

The descriptions are concise and personal ("I found it covers..."), which helps credibility. The intro is choppy.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| Low | 258-262 | flow | Three one-sentence paragraphs: "Most of us are curious..." / "However, it is not always obvious where to start..." | "Most of us are curious about the technology we use every day, but it is not always obvious where to start." | Merges three fragments into one sentence. |
| Low | 266 | clarity | "Certification lists were selected largely based on anecdotes and feedback from those in the relevant industry, as well as the relevant podcasts listed." | "I chose the certifications based mostly on feedback from people working in each field and on the podcasts listed here." | Active voice, and "relevant" no longer appears twice. |
| Low | 1371 | clarity | "...my software engineering guide, which covers the design and maintainability side of writing C++." | "...my software engineering guide, which covers the design and maintainability side of writing code." | The guide does not discuss C++ specifically. |
| Low | 1748-1749 | grammar | "The below books have formed the backbone..." | "The books below have formed the backbone..." | Uses the standard word order. |
| Low | 986 | grammar | "Charu C Aggarwal" | "Charu C. Aggarwal" | Adds the missing initial period. The matching JSON-LD `author.name` would need the same change, which is a structured-data edit for the SEO pass. |

## assets/html/hobbies.html

The page is warm and conversational, and the history oddities are a good hook. It has a few grammar slips and one etymology claim to verify.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| Medium | 241 | Accuracy flag | "The Luddite movement actually was the origin of the word sabotage" | Verify against the cited source. The usual etymology ties "sabotage" to the French *sabot* (wooden shoe), not the English Luddites. A softer version is "A similar fear of machines is often linked to the origin of the word sabotage." | A history reader may challenge this. |
| Medium | 239 | grammar | "concerns around automation negatively impacting the labor market is a uniquely 21st century problem" | "concerns about automation hurting the labor market are a uniquely 21st-century problem" | Fixes the subject-verb agreement and adds the compound-adjective hyphen. |
| Low | 247 | clarity | "My curiosity was then intrigued by people and events..." | "My curiosity is drawn to people and events..." | You cannot intrigue a curiosity. |
| Low | 352 | flow | "Another husband-wife duo that delves into, as the name suggests, unusual stories that tend to throw people off for the unusual or seemingly-anachronistic stories from real history." | "Another husband-and-wife duo who, as the name suggests, dig into unusual and seemingly anachronistic stories from real history." | Removes the repeated "unusual stories". |
| Low | 146 | clarity | "I was able to teach myself to a reasonably fine-grain level with..." | "I taught myself the subject in reasonable depth with..." | More direct wording. |
| Low | 274 | accessibility | "suitcases got wheels AFTER humanity landed on the moon" | "suitcases got wheels *after* humanity landed on the moon" (with `<em>`) | Same as accessibility A-8. |

## assets/html/privacy.html

The policy reads clearly and specifically. There is one fix.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| Low | 162 | clarity | Link text "Google Search Console" pointing at Google's privacy policy | Link to Search Console's own page, or reword the link text to "Google's privacy policy" | Same as accessibility A-5. |

## 404.html

The page reads well. There is one small update.

| Severity | Line | Type | Original | Suggested revision | Why |
| -------- | ---- | ---- | -------- | ------------------ | --- |
| Low | 151 | accuracy | "long-form opinions on quantum computing, AGI hype, privacy, and more" | "long-form opinions on vibe coding, physical media, privacy, AGI hype, and more" | The list names the older stances and leaves out the two newest. |

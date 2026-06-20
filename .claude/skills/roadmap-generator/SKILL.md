---
name: "roadmap-generator"
description: |
  This skill is designed to build a roadmap based on tried and true strategies.
  Triggers on: roadmap generator, roadmap builder
  Use when cleaning up content. Trigger with phrases like "roadmap generator", and "roadmap builder".
allowed-tools: "Read"
version: 1.0.0
author: "Colby Mainard <colby.mainard@proton.me>"
compatible-with: claude-code
---

## Goal

Builds a roadmap to determine what should be done to optimize site performance.

## Dependencies

| Skill name | Use Case |
| ---------- | -------- |
| accessibility-audit-runner | Determine any navigation and readability issues. |
| backlink-strategy-planner | Build up a way to get more references to the site. |
| content-polisher | Develop a way to make sure content is production-ready. |
| search-engine-optimization | Garner additional visibility via search engines. |

## Steps

1. Write the notes from the accessibility auditor to `accessibility-auditor-report-YYYY-MM-DD.md` in the markdown directory.
2. Write the notes from the backlink strategy to `backlink-planner-report-YYYY-MM-DD.md` in the markdown directory.
3. Write the notes from the content polisher to `content-polisher-report-YYYY-MM-DD.md` in the markdown directory.
4. Write the notes from the accessibility auditor to `accessibility-auditor-report-YYYY-MM-DD.md` in the markdown directory.
5. Create an overview of the four above files into an overall report that blends the information into a detailed strategy. Condense steps where possible and eliminate inconsistencies.
6. Write the overview from step 5 to `roadmap-report-YYYY-MM-DD.md`.

OPERATION — ART DIRECTION PASS

This document defines the procedure for a focused art direction review.
Perform this pass as the Art Director role (see docs/roles/art-director.md).

------------------------------------------------------------

STEP 1 — READ BEFORE REVIEWING

Read in this order before evaluating anything:

1. CLAUDE.md (or equivalent) — design system: type scale, spacing scale, color tokens, motion rules
2. docs/context/sapira-ui-rules.md (or equivalent UI rules file) — component-level constraints
3. docs/tasks/current.md — what was changed and what the scope was
4. The source files modified in the current task

Do not skip this step. Critique without system knowledge produces noise, not direction.

------------------------------------------------------------

STEP 2 — EVALUATE IN ORDER

Review in this sequence. Structure > Typography > Spacing > Color > Motion > Polish.

STRUCTURE
- Is the layout aligned with the defined grid?
- Are sections ordered correctly for the intended hierarchy?
- Is there any unintended overlap, clipping, or broken stacking?
- Does the layout hold at mobile and desktop without degrading?

TYPOGRAPHY
- Does the type scale match the defined system?
- Are weights correct? (Only permitted weights should be used.)
- Are tracking and line-height values consistent with the spec?
- Are there any widows, orphans, or awkward wrapping?
- Is text never forced into a nowrap that causes overflow?

SPACING
- Are all spacing values from the defined scale?
- Is vertical rhythm consistent between sections?
- Are lateral margins correct at mobile and desktop?
- Are touch targets sufficiently large on mobile?

COLOR
- Is the accent color used only in its permitted contexts?
- Is the background the correct value (not defaulting to pure white or black)?
- Is contrast sufficient for all text elements?
- Are there any unintended color bleed or gradient artifacts?

MOTION
- Are animation cycles within the defined range?
- Is movement within the defined maximum?
- Is scale change within the defined maximum?
- Does motion disappear into the background, or does it draw attention?

POLISH
- Are there any visual artifacts?
- Are hover and focus states correct and consistent?
- Are shadow values soft, directional, and diffused — not hard or centered?
- Does the page feel intentional, or are there elements that look accidental?

------------------------------------------------------------

STEP 3 — PRODUCE THE CRITIQUE REPORT

Format:

SUMMARY
One to three sentences on the overall visual state.
State clearly whether the current implementation is directionally correct.

CRITICAL ISSUES
Issues that violate the design system or break the intended hierarchy.
Each item:
- Element affected
- Problem described precisely
- Expected behavior or rule being violated

REFINEMENTS
Lower priority improvements. Do not block release on these alone.
Each item:
- Element affected
- Observation
- Suggested direction

VERDICT
APPROVED — implementation meets system requirements, no critical issues.
NEEDS REVISION — one or more critical issues must be resolved before proceeding.

If NEEDS REVISION: list the exact changes required.
Do not include vague direction. Every item must be actionable.

------------------------------------------------------------

RULES FOR THIS PASS

- Do not write or suggest code
- Do not propose changes that require redesigning the system
- Do not comment on copy, messaging, or product strategy
- If an issue is outside the current task scope, note it and add to backlog — do not block the current cycle for out-of-scope concerns unless they are genuinely critical

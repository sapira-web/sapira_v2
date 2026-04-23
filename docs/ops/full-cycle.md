OPERATION — FULL CYCLE

This document defines the complete execution workflow for a scoped design and development task.
Follow this sequence in order. Do not skip phases. Do not mix roles.

------------------------------------------------------------

PHASE 0 — ORIENTATION (required before anything else)

Read in this order:
1. CLAUDE.md (or equivalent project instruction file)
2. docs/tasks/current.md — active task, scope, constraints, done criteria
3. docs/context/ — brand, UI rules, or any relevant context files
4. docs/roles/ — review the role you are about to perform

Do not proceed until orientation is complete.
If the current task is ambiguous, stop and ask before proceeding.

------------------------------------------------------------

PHASE 1 — ART DIRECTION REVIEW

Role: Art Director (see docs/roles/art-director.md)
Trigger: before implementation, or after implementation before release.
Reference: docs/ops/art-pass.md

What happens:
- Review the current visual state against the design system
- Identify critical issues, refinements, and anything out of system
- Produce a critique report with a clear APPROVED / NEEDS REVISION verdict

Output required:
- Written critique report (see art-pass.md for format)
- If NEEDS REVISION: list of minimum changes before proceeding

Do not implement during this phase.

------------------------------------------------------------

PHASE 2 — PRODUCT STRATEGY REVIEW (conditional)

Role: Product Strategy (see docs/roles/product-strategy.md)
Trigger: when copy, messaging, or narrative structure is in scope.
Skip if: the task is purely visual or technical with no messaging changes.

What happens:
- Evaluate narrative clarity and positioning
- Identify messaging gaps or misalignments with target audience
- Produce a strategy review with ALIGNED / NEEDS REVISION verdict

Do not implement during this phase.

------------------------------------------------------------

PHASE 3 — FRONTEND IMPLEMENTATION

Role: Frontend Engineer (see docs/roles/frontend-engineer.md)
Trigger: after art direction is APPROVED (and strategy if applicable).

What happens:
- Read the scoped task in full before writing any code
- Implement only what is in scope
- Respect all system constraints (spacing, type, color, motion)
- Run npm run verify before marking done

Rules:
- Do not touch files outside the defined scope
- Do not refactor or clean up outside the task
- Do not introduce dependencies without approval
- If implementation requires out-of-scope changes, stop and flag

Output required:
- List of files modified
- Build status (PASS / FAIL)
- Mobile check confirmation
- Any decisions made or flags raised

------------------------------------------------------------

PHASE 4 — QA REVIEW

Role: QA Reviewer (see docs/roles/qa-reviewer.md)
Trigger: after implementation is complete and build passes.
Reference: docs/ops/build-pass.md

What happens:
- Run npm run verify
- Run npm run qa (screenshots, overflow check, visual diff if baseline exists)
- Review output at all defined breakpoints
- Produce a QA report with APPROVED / BLOCKED verdict

Do not implement during this phase.

------------------------------------------------------------

PHASE 5 — RELEASE DECISION

Role: Release Manager (see docs/roles/release-manager.md)
Trigger: after QA is APPROVED.
Reference: docs/ops/release-pass.md

What happens:
- Collect outputs from all prior phases
- Verify all required checks are green
- Issue READY or NOT READY verdict with documented reasoning

Do not implement during this phase.

------------------------------------------------------------

STRICT RULES

1. Roles do not overlap.
   The Art Director does not write code.
   The Frontend Engineer does not critique aesthetics.
   The QA Reviewer does not implement fixes.
   The Release Manager does not redesign.

2. No phase is skipped under time pressure.
   A failed phase must be resolved before proceeding to the next.

3. Scope is fixed per cycle.
   Changes discovered during a cycle that are out of scope go to docs/tasks/backlog.md.
   They are not implemented mid-cycle.

4. Every cycle ends with a documented verdict.
   READY or NOT READY. No ambiguous states.

------------------------------------------------------------

CYCLE SUMMARY OUTPUT

At the end of a full cycle, produce a summary containing:

TASK
Name of the task completed.

PHASES COMPLETED
List with verdict per phase.

FILES MODIFIED
Complete list.

BUILD STATUS
npm run verify: PASS / FAIL

QA STATUS
npm run qa: PASS / FAIL
Issues found: none / list

VERDICT
READY / NOT READY

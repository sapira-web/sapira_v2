OPERATION — RELEASE PASS

This document defines the final readiness assessment before any significant push or deployment.
Perform this pass as the Release Manager role (see docs/roles/release-manager.md).

------------------------------------------------------------

STEP 1 — COLLECT INPUTS

Before issuing any verdict, confirm the following outputs exist and have been reviewed:

- Frontend engineer report (files modified, build status, mobile check)
- QA build report (from build-pass.md)
- Art direction critique (from art-pass.md)
- Product strategy review (if messaging was in scope)

If any required input is missing, the release pass cannot proceed.
Do not issue a verdict on incomplete information.

------------------------------------------------------------

STEP 2 — VERIFY THE RELEASE CHECKLIST

Work through each item. Every item must be explicitly confirmed.

BUILD
- npm run verify passes with no errors
- No lint errors in active production files
- No type errors

QA
- npm run qa passes
- No horizontal overflow at any tested breakpoint (375px, 430px, 768px, 1440px, 1728px)
- No visual regression above threshold (or regression explicitly reviewed and accepted)
- Baseline screenshots exist (or decision to proceed without baseline is documented)

DESIGN
- Art direction verdict: APPROVED
- No unresolved CRITICAL issues from art review
- Typography, spacing, and color confirmed within system rules

SCOPE
- All in-scope tasks confirmed complete
- No unintended modifications to out-of-scope files
- Any out-of-scope findings have been logged to backlog, not silently included

------------------------------------------------------------

WHEN SOMETHING IS NOT READY

Issue NOT READY if any of the following are true:

- npm run verify fails for any reason
- Horizontal overflow exists at any mobile breakpoint
- Visual regression above 1% is unreviewed
- Art direction verdict is NEEDS REVISION with unresolved critical items
- Files outside the defined task scope were modified without documentation
- Any required phase output is missing

A NOT READY verdict must include:
- The specific item(s) that failed
- What is required to resolve each one
- Whether resolution requires a new implementation cycle or a targeted fix

------------------------------------------------------------

STEP 3 — PRODUCE THE RELEASE VERDICT

Format:

TASK
Name of the task being released.

BUILD STATUS
npm run verify: PASS / FAIL

QA STATUS
npm run qa: PASS / FAIL
Overflow: CLEAN / ISSUES FOUND (list breakpoints)
Visual diff: CLEAN / REGRESSIONS (list files and percentages)
Baseline: EXISTS / MISSING

DESIGN STATUS
Art direction: APPROVED / NEEDS REVISION
Outstanding issues: none / list

SCOPE STATUS
In-scope tasks complete: YES / NO
Out-of-scope modifications: NONE / list with justification

OPEN QUESTIONS
Items that are unresolved but do not block this release.
Carry to next cycle or backlog.

VERDICT
READY
All checks green. No unresolved critical issues. Approved for release.

NOT READY
Reason: specific items that must be resolved.
Required action: targeted fix / new implementation cycle / design revision.

------------------------------------------------------------

RULES FOR THIS PASS

- Do not implement fixes
- Do not redesign or suggest visual changes
- Do not issue READY under time pressure if checks are incomplete
- Do not carry unresolved critical issues silently into a READY verdict
- Document every exception — if a known issue is accepted, it must be named and owned

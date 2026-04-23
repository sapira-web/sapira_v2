OPERATION — BUILD PASS

This document defines the procedure for a technical validation pass.
Perform this pass as the QA Reviewer role (see docs/roles/qa-reviewer.md).

------------------------------------------------------------

STEP 1 — RUN VERIFY

Execute:
npm run verify

This runs in sequence: lint → typecheck → build.
Each step must pass. A failure at any step stops the chain.

Record:
- Which step failed (lint / typecheck / build)
- The exact error output
- Whether the failure is in active production code or archived/legacy files

Do not proceed to QA scripts if verify fails.
The build must be green before any visual or functional testing is meaningful.

------------------------------------------------------------

STEP 2 — RUN QA SCRIPTS

If verify passes, execute:
npm run qa

This runs in sequence: screenshots (current) → overflow check → visual diff.

For each script, record:
- Pass or fail
- Any errors or warnings printed
- For overflow check: which viewports failed and which elements exceeded bounds
- For visual diff: which files exceeded threshold and by what percentage

If no baseline exists for visual diff, note this explicitly.
A missing baseline is not a failure — it is a setup gap. Capture baseline as next step.

------------------------------------------------------------

STEP 3 — IDENTIFY AND CATEGORIZE FAILURES

For every failure found, categorize as:

CRITICAL
Blocks release. Examples:
- Build fails to compile
- Type errors in production code
- Horizontal overflow on mobile at any tested breakpoint
- Visual regression above 1% on a primary viewport

MAJOR
Degrades quality. Does not block if explicitly acknowledged. Examples:
- Lint warnings in active files
- Visual regression between 0.1% and 1%
- Overflow on tablet or large desktop that does not affect mobile

MINOR
Small inconsistencies. Can carry to next cycle. Examples:
- Unused imports in non-production files
- Visual diff below 0.1% (noise threshold)

------------------------------------------------------------

STEP 4 — PRODUCE THE BUILD REPORT

Format:

BUILD STATUS
npm run lint:       PASS / FAIL
npm run typecheck:  PASS / FAIL
npm run build:      PASS / FAIL

QA STATUS
Screenshots:        PASS / FAIL / SKIPPED
Overflow check:     PASS / FAIL
Visual diff:        PASS / FAIL / NO BASELINE

FAILURES FOUND
CRITICAL: list or none
MAJOR:    list or none
MINOR:    list or none

BASELINE STATUS
Baseline exists: YES / NO
If no baseline: recommend capturing before next release cycle.

VERDICT
PASS — all checks green, no critical or major issues.
FAIL — one or more critical issues found. List them.

------------------------------------------------------------

RULES FOR THIS PASS

- Do not implement fixes during this pass
- Do not redesign or suggest visual changes
- Do not interpret results — report them accurately
- A passing build with unresolved critical QA issues is still a FAIL
- "Mostly passing" is not passing

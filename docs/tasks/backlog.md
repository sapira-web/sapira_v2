SAPIRA — BACKLOG

This file tracks all pending, in-progress, and planned work for the Sapira website.
It is a living document. Items move to docs/tasks/current.md when actively being worked.
Completed items are removed, not archived here.

------------------------------------------------------------

PRIORITY 1 — CORE EXPERIENCE

Hero — Mobile stabilization
- Confirm no horizontal overflow at 375px, 390px, 430px
- Verify 16px lateral padding is respected across all mobile breakpoints
- Ensure headline wraps naturally without orphans or clipping
- Confirm CTA is visible, aligned, and has 44px minimum touch target
- Validate atmosphere layers render correctly on mobile (no artifacts)

Hero — Desktop hardening
- Confirm 12-column grid alignment at 1440px
- Confirm hero text sits on columns 1–7 with correct gutter
- Validate eyebrow, headline, subheadline, and CTA spacing against type scale
- Check large desktop (1728px+) — no unintended stretching

TrustSignal block
- Validate counter animation triggers correctly on scroll-into-view
- Confirm reduced-motion variant works and jumps to final state cleanly
- Check €100M+ line wraps correctly on all mobile viewports
- Confirm vertical rhythm with Hero on scroll

------------------------------------------------------------

PRIORITY 2 — NAVIGATION & STRUCTURE

Navbar
- Replace remaining <a> elements with next/link where appropriate
- Validate sticky behavior at all breakpoints
- Confirm backdrop blur / semi-transparent background doesn't create banding
- Add focus-visible states to all interactive elements

Page structure
- Confirm scroll container has no overflow-x at root level
- Validate z-index stack — no unintended layer collisions between sections
- Review section ordering for narrative flow: Hero → Trust → Architecture → Close

Footer
- Define structure (minimal — logo, legal, one CTA)
- No social links unless explicitly added to scope

------------------------------------------------------------

PRIORITY 3 — VISUAL SYSTEM

Atmosphere
- Audit all background layers — confirm max 4–5 layers per section
- Remove any blur filters (not permitted per design rules)
- Verify grain layer is white/warm and not noisy or dirty
- Confirm all atmospheric animations are ≥ 30s cycle, ≤ 20px movement

Typography audit
- Full pass against type scale: Display XL, Body Large, Eyebrow, Caption, CTA, Nav
- Confirm no weights other than 400, 500, 700 are loaded or applied
- Verify DM Sans is the sole typeface at all sizes
- Check letter-spacing values are consistent with spec

Color audit
- Confirm Ignition Red (#C64444) appears only on: primary CTAs, accent moments
- Confirm no gradients outside approved atmospheric use
- Confirm background is #EFEBE6 (warm cream), not pure white

PharoArchitecture 3D module
- Validate camera rig behavior at all viewport sizes
- Confirm the module degrades gracefully on mobile (hidden or simplified)
- Audit particle and connector performance — no frame drops on target devices

------------------------------------------------------------

PRIORITY 4 — PERFORMANCE & CLEANUP

Build
- Confirm npm run verify passes on every merge
- Keep npm run build output clean — no warnings, no unused exports

Dead code
- Remove or formally archive Hero.old.tsx and Hero.v2.tsx once confirmed unused
- Audit for any other unused components in src/components/sections/home/

QA pipeline
- Capture baseline screenshots once Hero is locked
- Run visual diff before each significant change
- Add overflow check to pre-merge workflow

Bundle
- Audit Three.js / R3F import size — confirm tree-shaking is working
- Confirm Framer Motion is not importing unused variants

------------------------------------------------------------

OPEN QUESTIONS

1. PharoArchitecture on mobile
   Does the 3D module render on mobile, or is it conditionally hidden?
   Decision needed before mobile QA is considered complete.

2. Additional sections
   What comes after the Trust block? Define the narrative sequence.
   Candidates: Value proposition, How it works, Enterprise signal, Contact.

3. Contact / CTA flow
   Where does "See it on your data →" link? A form, a Calendly, or a page?
   Required before any CTA is considered production-ready.

4. Analytics
   Is any tracking planned? If so, define before launch — not after.

5. Accessibility baseline
   Is WCAG AA required for launch? Affects contrast decisions and focus states.

------------------------------------------------------------

RULE

An item enters current.md only when it is the active focus.
An item leaves the backlog only when it is done or explicitly descoped.
Nothing ships without passing: build, overflow check, and visual diff.

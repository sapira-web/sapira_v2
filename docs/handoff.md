SAPIRA — DESIGN PROPOSAL HANDOFF

Author: Jose Carmona
Date:   April 2026
Status: Proposal — work in progress

------------------------------------------------------------

OBJECTIVE

Establish a design direction for the Sapira website that reflects the nature of the product: infrastructure, not software. The goal is not a feature showcase or a conversion funnel. It is a presence — controlled, precise, and authoritative.

The site must do one thing: make the right person feel that Sapira understands the problem they carry and has built something serious to solve it.

------------------------------------------------------------

APPROACH

The reference frame for this proposal is not the SaaS landing page. It is the editorial publication and the institutional report. Typography carries the weight. Color is used once, deliberately. Motion is atmospheric, not decorative.

Three references shaped the direction:

Studio X — compositional clarity, editorial restraint, generous whitespace.
Palantir — institutional confidence, no feature lists, no enthusiasm.
Nucleate — soft, living backgrounds that feel considered rather than generated.

The design language is built around a single typeface (DM Sans), a strict spacing scale, a warm off-white background, and a single accent color — Ignition Red — reserved for primary CTAs and one moment of visual emphasis.

------------------------------------------------------------

WHAT HAS BEEN BUILT

Hero section — the primary deliverable of this proposal.
Includes: eyebrow label, display headline, subheadline, dual CTAs, full atmospheric background system, and a 3D architectural diagram (PharoArchitecture) on desktop.

Atmospheric background — a layered radial gradient system with subtle grain and slow movement. Designed to feel alive without being noticeable.

PharoArchitecture — a Three.js / R3F orthographic 3D diagram representing Pharo's infrastructure layer model. Camera responds to mouse position. Intended as a visual argument, not a decoration.

TrustSignal block — an animated counter displaying €100M+ in annual procurement. Minimal, typographic, scroll-triggered.

Navigation — fixed, minimal, semi-transparent. Logo, nav items (desktop only), and a single CTA.

Responsive system — mobile, tablet, and desktop breakpoints defined and tested across the hero and trust block. Mobile receives a simplified layout with reduced motion and no complex layering.

QA infrastructure — automated screenshot capture, horizontal overflow detection, and visual regression diffing via Playwright and pixelmatch. Runs locally as npm run qa.

------------------------------------------------------------

KEY PRINCIPLES APPLIED

Typography as structure.
The type scale is strict and intentional. Display XL at 88px carries the headline. Body Large at 20px carries the supporting thought. No decorative type, no mixing of families.

Restraint over expression.
Every element earns its place. Nothing is added for visual interest alone. If removing something does not weaken the page, it should be removed.

Motion that disappears.
Atmospheric animations run at 30–60 second cycles, move less than 20px, and scale less than 5%. The rule: if motion is noticeable, it is wrong.

Mobile as a simplified system.
Mobile does not attempt to replicate desktop. Parallax, blur-on-scroll, and complex layering are removed. The layout becomes clean, vertical, and readable.

Infrastructure framing throughout.
No copy has been written, but the spatial language — the layered 3D diagram, the typographic weight, the absence of product screenshots — reinforces the positioning: this is not a tool. It is a system.

------------------------------------------------------------

LIMITATIONS

This is a proposal, not a production-ready website.

The following are out of scope for this delivery:
- Production copywriting (placeholder intent only)
- CTA destination (form, booking flow, or page — undefined)
- Additional sections beyond Hero, TrustSignal, and Architecture
- Analytics or tracking implementation
- Accessibility audit (WCAG AA not yet verified)
- Cross-browser testing beyond Chromium
- Performance profiling on real mobile devices

The PharoArchitecture module has not been tested on low-powered mobile hardware. It may require a conditional render or simplified fallback depending on device targets.

------------------------------------------------------------

WHAT FEELS STRONG

The atmospheric background system. It achieves the "slightly alive" quality without noise or distraction. The radial structure and warm palette feel coherent with the brand.

The typographic hierarchy. The headline at Display XL reads with authority. The eyebrow at 12px uppercase creates quiet structure. The scale works.

The PharoArchitecture diagram. It communicates the infrastructure concept visually without requiring copy. The orthographic projection and the camera rig give it a physical, grounded quality.

The overall restraint. The page does not try to explain too much. There is space to think.

------------------------------------------------------------

WHAT NEEDS FURTHER WORK

Mobile rendering of PharoArchitecture. The current implementation has no defined mobile behavior. A decision is needed: render at reduced fidelity, or conditionally hide and replace with a static visual.

Copy. The current state uses structural placeholders. Real copy, written with the same restraint as the design, is essential. The visual language is ready for it.

Section continuity. The hero is defined. What follows — value propositions, how it works, enterprise signal, contact — is not yet scoped. The narrative flow of the full page needs definition.

CTA destination. "See it on your data →" requires a target. Whether that is a qualification form, a Calendly link, or a dedicated page affects the entire conversion path.

Accessibility. Focus states, color contrast ratios, and keyboard navigation have not been formally audited. This must be addressed before any public release.

------------------------------------------------------------

NEXT STEPS (RECOMMENDED)

1. Align on mobile strategy for PharoArchitecture — render or replace.
2. Commission or draft real copy for the hero and trust sections.
3. Define the section sequence for the full page.
4. Decide CTA destination and qualification flow.
5. Run a full accessibility audit against WCAG AA.
6. Lock the hero as baseline and begin visual regression testing in the QA pipeline.
7. Scope and build the next section (value propositions or how it works).

------------------------------------------------------------

FINAL NOTE

What has been built is a direction, not a deliverable. The decisions made here — the typeface, the palette, the atmosphere, the 3D diagram, the restraint — form a coherent argument for how Sapira should present itself.

The direction is strong. The execution is unfinished.

The next phase is copy, continuity, and completeness.

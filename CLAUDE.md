@AGENTS.md

# Sapira Website — Project Context (v2)

## What is Sapira
Sapira is an operational intelligence company.

Pharo is not software. It is infrastructure.
It sits on top of existing systems and replaces human coordination work.

Sapira captures how a business actually operates — and turns that into a system.

This is about:
- control
- memory
- coordination
- systemization of tacit knowledge

NOT about:
- dashboards
- features
- UI tools
- generic AI

------------------------------------------------------------

## What we're building

A world-class editorial website.

References:
- Structure: Studio X (editorial clarity)
- Tone: Palantir (authoritative, precise)
- Atmosphere: Nucleate (soft, living backgrounds)

This is NOT a SaaS landing.

It must feel like:
→ a system
→ a thesis
→ a controlled environment

------------------------------------------------------------

## Design System

### Typography

Single family only: DM Sans

Weights:
- 400 (primary)
- 500 (UI + emphasis)
- 700 (rare, controlled)

NO mixing fonts.
NO decorative typography.

Typography is the main design tool.

------------------------------------------------------------

### Type scale (DESKTOP)

- Display XL: 88px / 102% / -3.5% / 400
- Body Large: 20px / 145% / -1% / 400
- Eyebrow: 12px uppercase / 0.16em / 500
- Caption: 10px uppercase / 0.18em / 500
- CTA: 16px / 500
- Nav: 12px uppercase / 0.10em / 500

------------------------------------------------------------

### Type scale (MOBILE)

IMPORTANT:
- Keep hierarchy, not exact sizes
- Avoid awkward wrapping
- Never break lines artificially
- Never overflow container

------------------------------------------------------------

### Colors

- Primary text: #494848
- Accent red: #C64444
- Dark red: #562B2A
- Divider: #C1BDB6
- Background: #EFEBE6
- Secondary white: #F9F9F9

Rules:
- Red is rare and intentional
- No random color usage
- No gradients unless atmospheric

------------------------------------------------------------

### Spacing

Strict scale only:

4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160

Mobile:
→ ALWAYS 16px lateral padding

------------------------------------------------------------

## Layout

Desktop:
- max-width: 1440px
- side padding: 64px
- 12-column grid

Mobile:
- single column
- clean vertical flow
- no complex layering

------------------------------------------------------------

## Motion Principles (CRITICAL)

Motion must feel:
- slow
- subtle
- almost invisible

Rules:
- cycles: 30s–60s minimum
- movement: < 20px
- scale: < 5%

NO:
- bounce
- spring animations
- aggressive parallax
- fast transitions

If motion is noticeable → it's wrong.

------------------------------------------------------------

## Atmosphere (CRITICAL)

Backgrounds are NOT decoration.

They must feel:
- soft
- organic
- controlled
- slightly alive

Rules:
- max 4–5 layers
- no blur filters
- no noisy gradients
- use radial structures
- subtle movement only

Grain:
- white or warm
- subtle but perceptible
- never dirty

------------------------------------------------------------

## Mobile Rules (STRICT)

Mobile is a simplified system.

Remove:
- parallax
- blur-on-scroll
- complex layering

Ensure:
- no horizontal scroll EVER
- no overflow
- no text clipping
- correct wrapping
- clean spacing

------------------------------------------------------------

## Image Rules

Images must feel:
- grounded
- physical
- integrated

NO:
- borders
- rounded corners (unless intentional)
- fake shadows

Shadows:
- soft
- diffused
- directional

------------------------------------------------------------

## Design Principles

- Editorial, not SaaS
- Calm > flashy
- Precision > creativity
- System > decoration
- Hierarchy > effects

If something looks “cool” but not “controlled” → remove it.

------------------------------------------------------------

## Working Style

- NEVER modify outside task scope
- ALWAYS verify build
- ALWAYS check mobile
- ALWAYS check overflow
- NEVER introduce randomness

After each task:
→ list modified files
→ confirm constraints respected

------------------------------------------------------------

## Quality Bar

Every change must pass:

1. Alignment consistency
2. Typographic integrity
3. No overflow
4. No visual artifacts
5. No unnecessary motion
6. Works in mobile

If something feels "normal" → it's not enough.

It must feel intentional.
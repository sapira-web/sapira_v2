'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import {
  siApple, siAudi, siBmw,
  siFacebook, siWhatsapp, siRevolut,
  siGoogle, siMastercard,
} from 'simple-icons'
import { useReducedMotion } from 'framer-motion'

// ── Desktop constants ────────────────────────────────────────────────────────
const W       = 210
const H1      = 168
const H2      = 152
const PAD     = 28
const ROW_GAP = 48

// ── Mobile overrides ─────────────────────────────────────────────────────────
const H1_M    = 128
const PAD_M   = 20
const LOGO_M  = 0.85   // scale factor applied to all logo heights

type LogoEntry = {
  icon:         { path: string }
  h:            number
  logoScale:    number
  logoOpacity:  number
  cardOffsetY:  number
  gap:          number
  label:        string
}

// gaps: 24+28+20+26+22+28+24+20 = 192 → translateX(-50%) closes seamlessly
const logos: LogoEntry[] = [
  { icon: siApple,      h: 72, logoScale: 1.06, logoOpacity: 0.90, cardOffsetY:  0, gap: 24, label: 'Apple'      },
  { icon: siAudi,       h: 50, logoScale: 0.92, logoOpacity: 0.68, cardOffsetY:  4, gap: 28, label: 'Audi'        },
  { icon: siBmw,        h: 72, logoScale: 1.00, logoOpacity: 0.88, cardOffsetY: -3, gap: 20, label: 'BMW'         },
  { icon: siGoogle,     h: 50, logoScale: 0.92, logoOpacity: 0.90, cardOffsetY:  0, gap: 26, label: 'Google'      },
  { icon: siFacebook,   h: 66, logoScale: 1.00, logoOpacity: 0.68, cardOffsetY:  4, gap: 22, label: 'Facebook'    },
  { icon: siWhatsapp,   h: 62, logoScale: 1.06, logoOpacity: 0.88, cardOffsetY:  0, gap: 28, label: 'WhatsApp'    },
  { icon: siRevolut,    h: 56, logoScale: 0.92, logoOpacity: 0.68, cardOffsetY: -3, gap: 24, label: 'Revolut'     },
  { icon: siMastercard, h: 62, logoScale: 1.00, logoOpacity: 0.88, cardOffsetY:  0, gap: 20, label: 'Mastercard'  },
]

const logosRow2 = [...logos.slice(4), ...logos.slice(0, 4)]

const cardBase: React.CSSProperties = {
  width:                `${W}px`,
  boxSizing:            'border-box',
  flexShrink:           0,
  background:           'linear-gradient(160deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.26) 100%)',
  backdropFilter:       'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  borderRadius:         '28px',
  boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.20)',
  display:              'flex',
  alignItems:           'center',
  justifyContent:       'center',
}

function Strip({
  items,
  className,
  duration,
  cardHeight,
  cardPad,
  hFactor = 1,
  delay,
}: {
  items:       LogoEntry[]
  className:   string
  duration:    string
  cardHeight:  number
  cardPad:     number
  hFactor?:    number
  delay?:      string
}) {
  return (
    <div
      className={className}
      style={{
        display:           'flex',
        alignItems:        'center',
        width:             'max-content',
        animationDuration: duration,
        ...(delay ? { animationDelay: delay } : {}),
      }}
    >
      {items.map(({ icon, h, logoScale, logoOpacity, cardOffsetY, gap, label }, i) => (
        <div
          key={i}
          style={{
            ...cardBase,
            padding:     `${cardPad}px`,
            height:      `${cardHeight}px`,
            marginRight: `${gap}px`,
            transform:   cardOffsetY !== 0 ? `translateY(${cardOffsetY}px)` : undefined,
          }}
        >
          <svg
            role="img"
            aria-label={label}
            viewBox="0 0 24 24"
            style={{
              height:    `${h * hFactor}px`,
              width:     'auto',
              fill:      `rgba(30,28,26,${logoOpacity})`,
              transform: logoScale !== 1 ? `scale(${logoScale})` : undefined,
              display:   'block',
            }}
          >
            <path d={icon.path} />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function OperationalPresence() {
  const shouldReduceMotion = useReducedMotion()

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cardHeight = isMobile ? H1_M    : H1
  const cardPad    = isMobile ? PAD_M   : PAD
  const hFactor    = isMobile ? LOGO_M  : 1
  const duration   = isMobile ? '68s'   : '54s'
  const padding    = isMobile ? '40px 0' : 'clamp(48px, 6vw, 80px) 0'

  return (
    <section
      style={{
        position:        'relative',
        width:           '100%',
        padding,
        backgroundColor: 'transparent',
        overflow:        'hidden',
      }}
    >
      {/* Atmospheric radial — gives backdrop-filter something to blur */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        0,
          background:    'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(195,178,158,0.08) 0%, transparent 72%)',
        }}
      />

      {/* Grain */}
      <div className="nucleate-grain" style={{ zIndex: 1, opacity: 0.16 }} aria-hidden="true" />

      {/* Carousel content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {shouldReduceMotion ? (

          /* ── Reduced motion — static grid ── */
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '22px', padding: '0 48px' }}>
            {logos.map(({ icon, h, logoOpacity, label }, i) => (
              <div key={i} style={{ ...cardBase, padding: `${cardPad}px`, height: `${cardHeight}px` }}>
                <svg role="img" aria-label={label} viewBox="0 0 24 24"
                  style={{ height: `${h * hFactor}px`, width: 'auto', fill: `rgba(30,28,26,${logoOpacity})`, display: 'block' }}>
                  <path d={icon.path} />
                </svg>
              </div>
            ))}
          </div>

        ) : (

          <>
            {/* Row 1 — always rendered (desktop + mobile) */}
            <Strip
              items={[...logos, ...logos]}
              className="marquee-strip"
              duration={duration}
              cardHeight={cardHeight}
              cardPad={cardPad}
              hFactor={hFactor}
            />

            {/* Row 2 — desktop only, not rendered on mobile */}
            {!isMobile && (
              <>
                <div style={{ height: `${ROW_GAP}px` }} aria-hidden="true" />
                <div style={{ opacity: 0.58 }}>
                  <Strip
                    items={[...logosRow2, ...logosRow2]}
                    className="marquee-strip-reverse"
                    duration="52s"
                    cardHeight={H2}
                    cardPad={PAD}
                    delay="-6s"
                  />
                </div>
              </>
            )}
          </>

        )}
      </div>
    </section>
  )
}

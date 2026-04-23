'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const E = [0.22, 1, 0.36, 1] as const

const logos: Array<{
  name: string
  opacity: number
  marginRight: number
  translateY?: number
}> = [
  { name: 'Norvelt',  opacity: 0.34, marginRight: 72 },
  { name: 'Fenmark',  opacity: 0.18, marginRight: 64,  translateY:  2 },
  { name: 'Olmstedt', opacity: 0.34, marginRight: 80 },
  { name: 'Halcrest', opacity: 0.34, marginRight: 72 },
  { name: 'Rimfeld',  opacity: 0.18, marginRight: 68 },
  { name: 'Korvaan',  opacity: 0.34, marginRight: 76 },
  { name: 'Velder',   opacity: 0.34, marginRight: 72,  translateY: -1 },
  { name: 'Grohner',  opacity: 0.18, marginRight: 74 },
]

export default function TrustSignal() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const padV   = isMobile ? 'clamp(48px, 10vw, 72px)' : 'clamp(56px, 8vw, 96px)'
  const logoSz = isMobile ? '22px' : '20px'
  const strip  = shouldReduceMotion ? logos : [...logos, ...logos]

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#EFEBE6', position: 'relative', overflow: 'hidden' }}
    >
      <div className="nucleate-grain" style={{ zIndex: 1 }} aria-hidden="true" />

      {/* Label */}
      <div
        className="px-6 md:px-14 xl:px-20 2xl:px-28"
        style={{ paddingTop: padV, position: 'relative', zIndex: 2, marginBottom: '18px' }}
      >
        <motion.p
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(73,72,72,0.28)',
            margin: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: E }}
        >
          Operational Presence
        </motion.p>
      </div>

      {/* Carousel */}
      <motion.div
        style={{
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          paddingBottom: padV,
          position: 'relative',
          zIndex: 2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: E }}
      >
        <div
          className={shouldReduceMotion ? undefined : 'marquee-strip'}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            animationDuration: isMobile ? '35s' : '50s',
          }}
        >
          {strip.map((logo, i) => (
            <span
              key={i}
              style={{
                fontSize: logoSz,
                fontFamily: 'inherit',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#494848',
                opacity: logo.opacity,
                marginRight: `${logo.marginRight}px`,
                display: 'inline-block',
                transform: logo.translateY !== undefined
                  ? `translateY(${logo.translateY}px)`
                  : undefined,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

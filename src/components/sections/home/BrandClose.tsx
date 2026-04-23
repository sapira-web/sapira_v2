'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const E = [0.22, 1, 0.36, 1] as const

export default function BrandClose() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const anim = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 0.88 : 0 },
        transition: { duration: 0.4 },
      }
    : {
        initial: { opacity: 0, y: 20, filter: 'blur(5px)' },
        animate: isInView
          ? { opacity: 0.88, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 20, filter: 'blur(5px)' },
        transition: { duration: 1.3, ease: E },
      }

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#EFEBE6',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(32px, 4vw, 56px)',
        paddingBottom: 'clamp(48px, 6vw, 96px)',
      }}
    >
      {/* Atmospheric carry-over — oxide warmth at wordmark level, same language as hero */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        0,
          background:    'radial-gradient(ellipse 65% 85% at 18% 55%, rgba(158,82,60,0.04) 0%, transparent 65%)',
        }}
      />
      <div className="nucleate-grain" style={{ zIndex: 1, opacity: 0.09 }} aria-hidden="true" />
      <motion.p
        className="px-8 md:px-14 xl:px-20 2xl:px-28"
        style={{
          position: 'relative',
          zIndex: 2,
          margin: 0,
          fontSize: 'clamp(52px, 16.5vw, 220px)',
          fontWeight: 400,
          letterSpacing: '-0.045em',
          lineHeight: 0.92,
          color: '#EFEBE6',
          userSelect: 'none',
        }}
        {...anim}
      >
        sapira
      </motion.p>
    </section>
  )
}

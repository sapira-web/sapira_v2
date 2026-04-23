'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useReducedMotion, useMotionValue } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface Props {
  scrollYProgress?: MotionValue<number>
}

export default function AtmosphericBackground({ scrollYProgress }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const [dotPos, setDotPos] = useState({ x: 0, y: 0, ready: false })
  const containerRef = useRef<HTMLDivElement>(null)

  // Static fallback when no scrollYProgress is provided (e.g. Hero.v2)
  const staticProgress = useMotionValue(0)
  const progress = scrollYProgress ?? staticProgress

  // Per-orb parallax — each mass drifts at its own rate
  const leftOrbY  = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [0,  35])
  const rightOrbY = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -28])
  const redOrbY   = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [0,  10])

  useEffect(() => {
    const measure = () => {
      const dot = document.getElementById('headline-dot')
      const container = containerRef.current
      if (!dot || !container) return
      const dr = dot.getBoundingClientRect()
      const cr = container.getBoundingClientRect()
      setDotPos({ x: dr.left + dr.width / 2 - cr.left, y: dr.top + dr.height / 2 - cr.top, ready: true })
    }
    const timers = [100, 400, 900, 1800, 2800].map(d => setTimeout(measure, d))
    window.addEventListener('resize', measure)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >

      {/* ── 1. Base — cool neutral light, distinctly lighter than the warm masses */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F5F3EF' }} />

      {/* ── 2. LEFT PRIMARY MASS — reduced, left stays lighter */}
      <motion.div style={{ position: 'absolute', left: '-220px', top: '-80px', y: leftOrbY }}>
        <motion.div
          style={{
            position: 'relative',
            width: 'max(1060px, 55vw)',
            height: 'max(1060px, 55vw)',
            background: 'radial-gradient(circle, rgba(212,182,152,0.56) 0%, rgba(212,182,152,0.40) 20%, rgba(212,182,152,0.24) 40%, rgba(212,182,152,0.11) 58%, rgba(212,182,152,0.04) 72%, transparent 86%)',
            borderRadius: '50%',
            filter: 'blur(36px)',
          }}
          animate={{ x: [0, 16, -8, 0], y: [0, -10, 7, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </motion.div>

      {/* ── 3. UPPER-RIGHT LUMINOUS FORM — increased, right stays denser */}
      <motion.div style={{ position: 'absolute', right: '-140px', top: '-180px', y: rightOrbY }}>
        <motion.div
          style={{
            position: 'relative',
            width: 'max(920px, 48vw)',
            height: 'max(920px, 48vw)',
            background: 'radial-gradient(circle, rgba(242,237,228,0.92) 0%, rgba(242,237,228,0.70) 18%, rgba(242,237,228,0.42) 40%, rgba(242,237,228,0.18) 62%, transparent 80%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          animate={{ x: [0, -18, 12, 0], y: [0, 14, -9, 0] }}
          transition={{ duration: 52, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />
      </motion.div>

      {/* ── 4. CENTRAL WARM CORE — Sapira identity red, focal point */}
      <motion.div style={{ position: 'absolute', left: '26%', top: '10%', y: redOrbY }}>
        <motion.div
          style={{
            position: 'relative',
            width: 'max(700px, 36vw)',
            height: 'max(700px, 36vw)',
            background: 'radial-gradient(circle, rgba(172,86,66,0.28) 0%, rgba(172,86,66,0.16) 28%, rgba(172,86,66,0.07) 52%, rgba(172,86,66,0.02) 70%, transparent 84%)',
            borderRadius: '50%',
            filter: 'blur(62px)',
          }}
          animate={{ x: [0, 11, -7, 0], y: [0, -9, 5, 0] }}
          transition={{ duration: 29, repeat: Infinity, ease: 'easeInOut', delay: 13 }}
        />
      </motion.div>

      {/* ── 5. Text-zone illumination — brightens left without killing the atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(110deg, rgba(255,254,250,0.40) 0%, rgba(255,254,250,0.12) 28%, transparent 48%)',
        }}
      />

      {/* ── 6. Warm presence at headline dot — emerges 1.8s in, synced with "." reveal */}
      {dotPos.ready && (
        <motion.div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            left: dotPos.x - 350,
            top: dotPos.y - 350,
            background: 'radial-gradient(circle, rgba(185,88,70,0.17) 0%, rgba(185,88,70,0.06) 42%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* ── 7. Directional depth — adds weight to right-center, breaks symmetry */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 62% 38%, rgba(73,72,72,0.04) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── 8. Edge vignette — perimeter falloff */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 86% 76% at 50% 50%, transparent 36%, rgba(38,24,14,0.05) 70%, rgba(38,24,14,0.10) 100%)',
        }}
      />

      {/* ── 8. Grain */}
      <div className="nucleate-grain" />

    </div>
  )
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';

const E = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    id: '01',
    title: 'Coordination becomes infrastructure',
    body: 'Cross-department processes run end to end, automatically. People stop being the system and start making decisions.',
  },
  {
    id: '02',
    title: <>Operational memory<br />that stays</>,
    body: "When someone leaves, their knowledge doesn't. Pharo captures institutional context and makes it permanent.",
  },
  {
    id: '03',
    title: 'Processes that understand themselves',
    body: 'The system learns how your company actually operates. When conditions change, it adapts, because it understood in the first place.',
  },
];

const viewport = { once: true, amount: 0.18 } as const;

export default function ValuePropositions() {
  const shouldReduceMotion = useReducedMotion();

  function reveal(delay: number, opts: { y?: number; blur?: number; duration?: number } = {}) {
    const { y = 14, blur = 0, duration = 0.7 } = opts;
    if (shouldReduceMotion) {
      return { initial: { opacity: 0 }, whileInView: { opacity: 1 as const }, viewport, transition: { duration: 0.3 } };
    }
    return {
      initial: { opacity: 0, y, ...(blur ? { filter: `blur(${blur}px)` } : {}) },
      whileInView: { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) },
      viewport,
      transition: { duration, delay, ease: E },
    };
  }

  function element(
    colIndex: number,
    offset: number,
    opts: { y?: number; blur?: number; scale?: number; duration?: number } = {}
  ) {
    const { y = 18, blur = 2, duration = 0.9, scale } = opts;
    if (shouldReduceMotion) {
      return { initial: { opacity: 0 }, whileInView: { opacity: 1 as const }, viewport, transition: { duration: 0.3 } };
    }
    const initial: Record<string, number | string> = { opacity: 0, y, filter: `blur(${blur}px)` };
    const animate: Record<string, number | string> = { opacity: 1, y: 0, filter: 'blur(0px)' };
    if (scale !== undefined) { initial.scale = scale; animate.scale = 1; }
    return {
      initial,
      whileInView: animate,
      viewport,
      transition: { duration, delay: colIndex * 0.08 + offset, ease: E },
    };
  }

  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#EFEBE6' }}>
      <div className="nucleate-grain" style={{ zIndex: 1, opacity: 0.14 }} aria-hidden="true" />
      <div
        className="w-full px-8 md:px-14 xl:px-20 2xl:px-28"
        style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(48px, 7vw, 120px)', paddingBottom: 'clamp(80px, 9vw, 140px)' }}
      >

        {/* ── Eyebrow ──────────────────────────────────────────────── */}
        <motion.p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(73,72,72,0.38)',
            marginBottom: '24px',
          }}
          {...reveal(0, { y: 8, blur: 2, duration: 0.70 })}
        >
          Infrastructure
        </motion.p>

        {/* ── Title ────────────────────────────────────────────────── */}
        <motion.h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 76px)',
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: '-0.038em',
            color: 'rgba(30,28,26,0.86)',
            maxWidth: '820px',
            marginBottom: '0',
          }}
          {...reveal(0.10, { y: 16, blur: 4, duration: 1.05 })}
        >
          Three things become possible when <span style={{ color: '#C64444' }}>Pharo</span> runs your operations.
        </motion.h2>

        {/* ── Desktop grid ─────────────────────────────────────────── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: '96px',
          }}
        >
          {columns.map((col, i) => (
            <div
              key={col.id}
              style={{
                paddingTop:   '56px',
                paddingRight: i < 2 ? 'var(--vp-col-pad)' : '0',
                paddingLeft:  i > 0 ? 'var(--vp-col-pad)' : '0',
                borderTop:    '1px solid rgba(73,72,72,0.065)',
                borderLeft:   i > 0 ? '1px solid rgba(73,72,72,0.065)' : 'none',
              }}
            >
              {/* Number */}
              <motion.p
                style={{
                  fontSize:      'clamp(48px, 4.5vw, 86px)',
                  fontWeight:    400,
                  lineHeight:    1,
                  letterSpacing: '-0.06em',
                  color:         '#C64444',
                  opacity:       0.45,
                  marginBottom:  '32px',
                  transformOrigin: 'left center',
                }}
                {...element(i, 0, { y: 12, blur: 2, duration: 0.85 })}
              >
                {col.id}
              </motion.p>

              {/* Title */}
              <motion.h3
                style={{
                  fontSize:      'clamp(18px, 1.5vw, 28px)',
                  fontWeight:    400,
                  lineHeight:    1.24,
                  letterSpacing: '-0.026em',
                  color:         '#1F1C1A',
                  marginBottom:  '16px',
                }}
                {...element(i, 0.10, { y: 14, blur: 2, duration: 0.90 })}
              >
                {col.title}
              </motion.h3>

              {/* Body */}
              <motion.p
                style={{
                  fontSize:      '16px',
                  lineHeight:    1.72,
                  letterSpacing: '-0.012em',
                  color:         'rgba(73,72,72,0.60)',
                  maxWidth:      '340px',
                }}
                {...element(i, 0.20, { y: 12, blur: 0, duration: 0.85 })}
              >
                {col.body}
              </motion.p>
            </div>
          ))}
        </div>

        {/* ── Mobile ───────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-12" style={{ marginTop: '56px' }}>
          {columns.map((col, i) => (
            <div
              key={col.id}
              style={{ paddingTop: '56px', borderTop: '1px solid rgba(73,72,72,0.065)' }}
            >
              <motion.p
                style={{
                  fontSize: '48px', fontWeight: 400, lineHeight: 1,
                  letterSpacing: '-0.06em', color: '#C64444',
                  opacity: 0.45, marginBottom: '24px', transformOrigin: 'left center',
                }}
                {...element(i, 0, { y: 12, blur: 2, duration: 0.85 })}
              >
                {col.id}
              </motion.p>
              <motion.h3
                style={{
                  fontSize: '22px', fontWeight: 400, lineHeight: 1.24,
                  letterSpacing: '-0.026em', color: '#1F1C1A', marginBottom: '14px',
                }}
                {...element(i, 0.10, { y: 12, blur: 2, duration: 0.85 })}
              >
                {col.title}
              </motion.h3>
              <motion.p
                style={{ fontSize: '17px', lineHeight: 1.72, letterSpacing: '-0.012em', color: 'rgba(73,72,72,0.60)' }}
                {...element(i, 0.20, { y: 8, blur: 0, duration: 0.80 })}
              >
                {col.body}
              </motion.p>
            </div>
          ))}
        </div>

        {/* ── Closing rule ─────────────────────────────────────────── */}
        <motion.div
          style={{ height: '1px', backgroundColor: 'rgba(73,72,72,0.065)', marginTop: '96px' }}
          {...reveal(0, { y: 0, duration: 0.55 })}
        />

      </div>
    </section>
  );
}

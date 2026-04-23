'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// Single easing curve used everywhere — imperceptible start, ultra-smooth settle
const E = [0.18, 1, 0.32, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Disable all scroll choreography on mobile — image is below the fold
  // so the brief pre-hydration window is imperceptible
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const disableScroll = isMobile || !!shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Micro zoom-out — disabled on mobile
  const heroScale = useTransform(scrollYProgress, [0, 0.5], disableScroll ? [1, 1] : [1, 0.97]);

  // Scroll-driven dissolve — disabled on mobile
  const textOpacity = useTransform(scrollYProgress, [0.14, 0.30], disableScroll ? [1, 1] : [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textBlurNum = useTransform(
    scrollYProgress,
    [0.14, 0.21, 0.27, 0.32],
    disableScroll ? [0, 0, 0, 0] : [0, 1.5, 5, 14]
  );
  const textFilter = useMotionTemplate`blur(${textBlurNum}px)`;

  // Cinematic entry helper — GPU-only, no layout properties
  // Reduced motion: collapse to a simple short fade
  function enter(delay: number, duration: number, opts: {
    y?: number;
    blur?: number;
    scale?: number;
  } = {}) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25, delay: delay * 0.15 },
      };
    }
    const initial: Record<string, number | string> = { opacity: 0 };
    const animate: Record<string, number | string> = { opacity: 1 };
    if (opts.y)     { initial.y = opts.y;                        animate.y      = 0;           }
    if (opts.blur)  { initial.filter = `blur(${opts.blur}px)`;   animate.filter = 'blur(0px)'; }
    if (opts.scale) { initial.scale  = opts.scale;               animate.scale  = 1;           }
    return { initial, animate, transition: { duration, delay, ease: E } };
  }

  return (
    <section
      ref={heroRef}
      className="-mt-[64px] h-[100dvh] md:h-[150vh]"
    >
      <motion.div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', zIndex: 1, scale: heroScale, transformOrigin: 'center center' }}
      >
        {/* ── Background settle — breathes into place ──────────────────────── */}
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? { opacity: 0.96 } : { scale: 1.02, opacity: 0.96 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: E }}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="hero-bg absolute inset-0" aria-hidden="true" />
          <div className="hero-grain" style={{ opacity: 0.22 }} aria-hidden="true" />
        </motion.div>

        {/* ── Content — scroll-dissolves as image rises ───────────────────── */}
        <div className="relative z-10 h-full flex flex-col px-8 md:px-14 xl:px-20 2xl:px-28 pt-24 md:pt-[18vh]">
          <motion.div style={{ opacity: textOpacity, filter: textFilter }}>

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              style={{ willChange: 'transform, opacity' }}
              {...enter(0.30, 0.80, { y: 4 })}
            >
              <span className="inline-block w-8 h-[1px] bg-ignition shrink-0" />
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-foundation/60">
                Operational Intelligence
              </span>
            </motion.div>

            {/* Headline — hero-headline on each span so background-clip: text is
                scoped to the element being animated, not a cross-layer parent */}
            <h1
              className="shrink-0 font-normal leading-[1.04] text-balance"
              style={{ fontSize: 'clamp(40px, 6.1vw, 88px)', marginBottom: '20px', textShadow: '0 1px 0 rgba(255,255,255,0.30)' }}
            >
              {/* Group A — problem: softer, receding */}
              <motion.span
                className="block"
                style={{ color: 'rgba(73,72,72,0.48)', letterSpacing: '-0.03em', fontWeight: 400 }}
                {...enter(0.44, 0.70, { y: 12, blur: 6 })}
              >
                Your company runs on knowledge
              </motion.span>
              <motion.span
                className="block"
                style={{ color: 'rgba(73,72,72,0.48)', letterSpacing: '-0.03em', fontWeight: 400, marginBottom: '0.1em' }}
                {...enter(0.56, 0.70, { y: 12, blur: 6 })}
              >
                that lives in people&apos;s heads.
              </motion.span>

              {/* Group B — resolution: darker, denser, lands last */}
              <motion.span
                className="block"
                style={{ color: '#2E2A27', letterSpacing: '-0.038em', lineHeight: '1.00', fontWeight: 500 }}
                {...enter(0.66, 0.70, { y: 12, blur: 6 })}
              >
                We turn it into infrastructure<motion.span
                  id="headline-dot"
                  className="inline-block"
                  style={{ color: '#C64444' }}
                  {...enter(0.84, 0.55, { y: 3 })}
                >.</motion.span>
              </motion.span>
            </h1>

            {/* Body + CTAs */}
            <div className="shrink-0 flex flex-col gap-6 md:gap-8 mb-5 md:mb-10 md:max-w-[460px] xl:max-w-[520px] 2xl:max-w-[580px]">
              <motion.p
                style={{
                  fontSize: '16px', lineHeight: '1.62', letterSpacing: '-0.012em',
                  color: 'rgba(73,72,72,0.70)', willChange: 'transform, opacity',
                }}
                {...enter(0.82, 1.05, { y: 7, blur: 4 })}
              >
                Sapira deploys bespoke AI systems that capture how your business actually operates,
                for European enterprises that have outgrown what any software was built to handle.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6"
                style={{ willChange: 'transform, opacity' }}
                {...enter(0.98, 0.90, { y: 5, scale: 0.99 })}
              >
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  data-cursor-label="GO"
                  className="cta-primary justify-between w-full sm:w-auto"
                  style={{ padding: '14px 28px', fontSize: '12px', gap: '12px' }}
                >
                  <span>See it on your data</span>
                  <span className="cta-arrow">→</span>
                </a>
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  data-cursor-label="VIEW"
                  className="cta-secondary justify-between w-full sm:w-auto"
                  style={{ padding: '14px 28px', fontSize: '12px', gap: '12px' }}
                >
                  <span>Read how we work</span>
                  <span className="cta-arrow">→</span>
                </a>
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-10 left-4 md:left-14 xl:left-20 2xl:left-28 hidden md:block z-20"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="flex flex-col items-start gap-4"
            {...enter(1.35, 0.80)}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-foundation/70">
              Scroll
            </span>
            <div className="relative w-[1px] h-10 bg-foundation/35 overflow-hidden">
              <motion.div
                className="absolute left-0 w-full h-[14px] bg-ignition"
                style={{ opacity: 0.85 }}
                initial={{ y: -14 }}
                animate={{ y: [-14, 40] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}

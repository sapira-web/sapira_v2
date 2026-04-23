'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AtmosphericBackground from './AtmosphericBackground';
import FloatingMenu from '@/components/layout/FloatingMenu';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.7,
      delay: shouldReduceMotion ? 0 : delay / 1000,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Layer 0 — atmospheric gradient */}
      <AtmosphericBackground />

      {/* Layer 1 — logo top-left */}
      <motion.header
        className="absolute top-6 left-6 md:top-8 md:left-12 z-30"
        {...fadeUp(100)}
      >
        <a
          href="/"
          className="text-[20px] font-medium text-foundation tracking-[-0.025em] lowercase focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
        >
          sapira
        </a>
      </motion.header>

      {/* Layer 2 — headline + subheadline */}
      <div className="absolute top-[100px] md:top-[140px] left-6 md:left-12 right-6 md:right-12 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">

        {/* Headline */}
        <motion.div
          className="w-full md:flex-1 md:max-w-[760px]"
          {...fadeUp(300)}
        >
          <h1 className="text-[36px] md:text-[64px] leading-[110%] md:leading-[108%] tracking-[-0.03em] font-normal text-foundation">
            Your company runs on{' '}
            <span className="text-oxide">knowledge</span>
            {' '}that lives in people's heads. We turn it into{' '}
            <span className="text-oxide">infrastructure</span>
            <span className="text-ignition">.</span>
          </h1>
        </motion.div>

        {/* Subheadline — anchored to bottom of headline on desktop */}
        <motion.div
          className="w-full md:w-[320px] md:pt-[220px]"
          {...fadeUp(550)}
        >
          <p className="text-[14px] md:text-[15px] leading-[155%] tracking-[-0.005em] text-foundation/75">
            Sapira deploys bespoke AI systems that capture how your business actually operates — for European enterprises that have outgrown what any software was built to handle.
          </p>
        </motion.div>
      </div>

      {/* Layer 3 — video reveal, peeks from below viewport */}
      <motion.div
        className="absolute left-6 md:left-12 right-6 md:right-12 z-10"
        style={{ top: 'clamp(380px, 56vh, 560px)', height: 'clamp(280px, 40vh, 560px)' }}
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.9,
          delay: shouldReduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="w-full h-full relative overflow-hidden rounded-t-[8px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(193,189,182,0.35) 0%, rgba(86,43,42,0.15) 55%, rgba(198,68,68,0.08) 100%)',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            aria-label="Operational intelligence in motion — visual representation of Sapira's Pharo platform"
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Pulse dot */}
          <div
            className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-ignition rounded-full animate-pulse-slow z-10"
            aria-hidden="true"
          />

          {/* PHARO label */}
          <div
            className="absolute top-4 right-4 text-[9px] font-medium uppercase tracking-[0.22em] text-foundation/55"
            aria-hidden="true"
          >
            PHARO
          </div>
        </div>
      </motion.div>

      {/* Layer 4 — floating menu */}
      <FloatingMenu />
    </section>
  );
}

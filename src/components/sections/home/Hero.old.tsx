'use client';

import { useState, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Container from "@/components/ui/Container";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // --- Custom cursor ---
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const cursorXFinal = shouldReduceMotion ? cursorX : cursorXSpring;
  const cursorYFinal = shouldReduceMotion ? cursorY : cursorYSpring;

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // --- Animation variants ---
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const headlineVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const headlineClass =
    "text-[44px] leading-[106%] md:text-[88px] md:leading-[102%] tracking-[-0.035em] font-normal text-foundation";

  return (
    <section className="relative flex-1 flex items-center pb-16 md:pb-0">
      <Container>
        <div className="grid grid-cols-12 gap-6 mt-16 md:mt-0 md:py-32">

          {/* Left — text content: cols 1–7 */}
          <motion.div
            className="col-span-12 md:col-span-7 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.span
              className="text-eyebrow font-medium text-foundation/55 block mb-6 md:mb-8"
              variants={itemVariants}
            >
              (Sapira / 2026)
            </motion.span>

            {/* H1 — problem statement */}
            <motion.h1 className={headlineClass} variants={headlineVariants}>
              <motion.span className="block" variants={itemVariants}>Your company runs on knowledge</motion.span>
              <motion.span className="block" variants={itemVariants}>that lives in people's heads.</motion.span>
            </motion.h1>

            {/* Divider — Ignition Red, 64px, scaleX from left */}
            <motion.div
              className="w-16 h-px bg-ignition my-8 origin-left"
              variants={dividerVariants}
            />

            {/* H2 — solution statement */}
            <motion.h2
              className={`${headlineClass} mb-8 md:mb-12`}
              variants={headlineVariants}
            >
              <motion.span className="block" variants={itemVariants}>We turn it into</motion.span>
              <motion.span className="block" variants={itemVariants}>
                infrastructure<span className="text-ignition">.</span>
              </motion.span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-[17px] leading-[150%] md:text-[20px] md:leading-[145%] tracking-[-0.01em] font-normal text-foundation/75 max-w-none md:max-w-[480px] mb-8 md:mb-12"
              variants={itemVariants}
            >
              Sapira deploys bespoke AI systems that capture how your business actually operates — and run it at scale. For European companies that have outgrown what any software was built to handle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12 mb-16 md:mb-0"
              variants={itemVariants}
            >
              <a
                href="#"
                className="text-cta font-medium text-ignition underline underline-offset-4 decoration-1 hover:text-ignition/80 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
              >
                See it on your data<span className="ml-1.5" aria-hidden="true">→</span>
              </a>
              <a
                href="#"
                className="text-cta font-medium text-foundation/70 underline underline-offset-4 decoration-1 hover:text-ignition transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
              >
                Read how we work<span className="ml-1.5" aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — video: cols 8–12 */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
            <motion.div
              className={`video-placeholder-bg relative overflow-hidden w-full aspect-[16/9] md:aspect-[4/5] border border-structural/40 ${isDesktop ? "cursor-none" : ""}`}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.8,
                delay: shouldReduceMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => { if (isDesktop) setIsHoveringVideo(true); }}
              onMouseLeave={() => setIsHoveringVideo(false)}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover relative z-10"
                poster="/hero-video-poster.jpg"
                aria-label="Operational intelligence in motion — visual representation of Sapira's Pharo platform"
                style={{ filter: "saturate(0.9) brightness(0.97)" }}
              >
                <source src="/hero-video.webm" type="video/webm" />
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>

              {/* Placeholder — covered by video once src is set */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <span className="text-caption uppercase font-medium text-foundation/25">
                  Video
                </span>
              </div>

              {/* Ignition Red pulse dot */}
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-ignition animate-pulse-slow z-20" aria-hidden="true" />
            </motion.div>

            <motion.span
              className="text-caption font-medium text-foundation/55 block mt-3 md:mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.9,
              }}
            >
              (Pharo / Operational Intelligence in Motion)
            </motion.span>
          </div>

        </div>
      </Container>

      {/* Scroll indicator — desktop only, absolute to section */}
      <motion.div
        className="hidden md:flex absolute bottom-12 left-16 flex-col items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.6,
          delay: shouldReduceMotion ? 0 : 1.4,
        }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-foundation/45">
          Scroll
        </span>
        <div className="relative w-px h-10 bg-foundation/30">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-ignition rounded-full"
            animate={shouldReduceMotion ? {} : { y: [0, 36, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Custom cursor — desktop only */}
      {isDesktop && (
        <motion.div
          className="fixed pointer-events-none z-50 w-12 h-12 bg-ignition rounded-full mix-blend-difference flex items-center justify-center"
          style={{ x: cursorXFinal, y: cursorYFinal }}
          animate={{
            opacity: isHoveringVideo ? 1 : 0,
            scale: isHoveringVideo ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <span className="text-white text-[11px] font-medium uppercase tracking-[0.10em]">
            Pharo
          </span>
        </motion.div>
      )}
    </section>
  );
}

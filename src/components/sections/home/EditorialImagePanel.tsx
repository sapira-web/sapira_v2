'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, easeOut } from 'framer-motion';

const GRADIENT = 'linear-gradient(to top, #EFEBE6 0%, rgba(239,235,230,0.85) 10%, rgba(239,235,230,0.38) 22%, rgba(239,235,230,0.04) 36%, transparent 52%)';

export default function EditorialImagePanel() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const disable = shouldReduceMotion || isMobile;

  const imageY = useTransform(scrollY, [0, 1400], disable ? [0, 0] : [-160, -700]);
  const imageScale = useTransform(scrollY, [200, 1400], disable ? [1, 1] : [1.10, 1], { ease: easeOut });
  const imageBlurRaw = useTransform(scrollY, [200, 1400], disable ? [0, 0] : [1.2, 0], { ease: easeOut });
  const imageFilter = useTransform(imageBlurRaw, (v) => `blur(${v}px)`);
  const settleY = useTransform(scrollY, [200, 1100], disable ? [0, 0] : [-8, 0], { ease: easeOut });
  const auraOpacity = useTransform(scrollY, [200, 1000], disable ? [0, 0] : [0.62, 0.36]);
  const auraScale   = useTransform(scrollY, [200, 1000], disable ? [1, 1] : [1.05, 1.00]);

  // Mobile: static render — no scroll hooks, no GPU cost
  if (isMobile) {
    return (
      <section style={{ position: 'relative', width: '100%', zIndex: 15 }}>
        {/* overflow:hidden clips image only — gradient lives outside */}
        <div style={{ overflow: 'hidden', lineHeight: 0 }}>
          <Image
            src="/images/sapira_1.png"
            alt="Sapira operational intelligence platform"
            width={1702}
            height={924}
            style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top', filter: 'contrast(1.02)' }}
            priority
          />
        </div>

        {/* Gradient: sibling to overflow container, extends 8px below clip boundary */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '-8px',
            pointerEvents: 'none',
            background: GRADIENT,
          }}
        />

        <p
          style={{
            position: 'absolute',
            top: '24px',
            right: '32px',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,252,249,0.32)',
            margin: 0,
          }}
          aria-hidden="true"
        >
          01
        </p>
      </section>
    );
  }

  return (
    <motion.section
      className="relative w-full"
      style={{ zIndex: 15, marginBottom: imageY }}
    >
      <motion.div className="relative w-full" style={{ y: imageY }}>

        {/* Warm aura — desktop only */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-40px',
            zIndex: 0,
            background: 'radial-gradient(ellipse at center, rgba(86,43,42,0.14) 0%, rgba(86,43,42,0.06) 48%, transparent 72%)',
            filter: 'blur(48px)',
            pointerEvents: 'none',
            opacity: auraOpacity,
            scale: auraScale,
            transformOrigin: 'center center',
          }}
        />

        <motion.div className="relative w-full" style={{ y: settleY, zIndex: 1 }}>

          {/* overflow:hidden clips scaled image only — gradient is a sibling */}
          <div style={{ overflow: 'hidden', lineHeight: 0 }}>
            <motion.div
              style={{
                scale: imageScale,
                filter: imageFilter,
                transformOrigin: 'center center',
                willChange: 'transform, filter',
              }}
            >
              <Image
                src="/images/sapira_1.png"
                alt="Sapira operational intelligence platform"
                width={1702}
                height={924}
                style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top', filter: 'contrast(1.02)' }}
                priority
              />
            </motion.div>
          </div>

          {/* Gradient: outside overflow:hidden — not clipped at image boundary.
              bottom: -8px bridges any subpixel gap between clip edge and next section. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '-8px',
              pointerEvents: 'none',
              background: GRADIENT,
            }}
          />

          <p
            style={{
              position: 'absolute',
              top: '24px',
              right: '32px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,252,249,0.32)',
              margin: 0,
            }}
            aria-hidden="true"
          >
            01
          </p>

        </motion.div>
      </motion.div>
    </motion.section>
  );
}

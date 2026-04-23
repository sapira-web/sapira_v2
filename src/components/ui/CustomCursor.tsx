'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [label, setLabel] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleCTAEnter = (e: Event) => {
      setIsHoveringCTA(true);
      const target = e.currentTarget as HTMLElement;
      setLabel(target.getAttribute('data-cursor-label') || 'VIEW');
    };
    const handleCTALeave = () => setIsHoveringCTA(false);

    const hero = document.querySelector('[data-hero]');
    hero?.addEventListener('mouseenter', handleMouseEnter);
    hero?.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    const ctas = document.querySelectorAll('[data-cursor-label]');
    ctas.forEach(cta => {
      cta.addEventListener('mouseenter', handleCTAEnter);
      cta.addEventListener('mouseleave', handleCTALeave);
    });

    return () => {
      hero?.removeEventListener('mouseenter', handleMouseEnter);
      hero?.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      ctas.forEach(cta => {
        cta.removeEventListener('mouseenter', handleCTAEnter);
        cta.removeEventListener('mouseleave', handleCTALeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[100] hidden md:flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHoveringCTA ? 80 : 16,
        height: isHoveringCTA ? 80 : 16,
        backgroundColor: isHoveringCTA ? '#C64444' : 'rgba(198,68,68,0.0)',
        borderColor: isHoveringCTA ? 'transparent' : '#C64444',
        borderWidth: isHoveringCTA ? 0 : 1.5,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {isHoveringCTA && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-[10px] font-medium uppercase tracking-[0.18em] text-rational"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

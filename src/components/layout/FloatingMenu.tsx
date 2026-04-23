'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/content/site';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const panelVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.98 },
  };

  return (
    <>
      {/* Click-outside overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Menu container — centered desktop, full-width mobile */}
      <motion.div
        className="fixed z-40 bottom-6 left-4 right-4 flex flex-col items-stretch gap-3 md:bottom-8 md:left-1/2 md:right-auto md:-translate-x-1/2 md:min-w-[480px]"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.6,
          delay: shouldReduceMotion ? 0 : 1.0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Expanded panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-neutral-warm rounded-[24px] overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(73, 72, 72, 0.12)' }}
            >
              <nav
                role="navigation"
                aria-label="Main navigation"
                className="flex flex-col items-end px-8 pt-7 pb-6"
              >
                {siteConfig.navigation.map((item, i, arr) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block text-[28px] md:text-[28px] text-[22px] font-medium text-foundation tracking-[-0.02em] leading-[1.3] py-[14px] text-right hover:text-ignition transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2 ${i < arr.length - 1 ? 'border-b border-foundation/10' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill — always visible */}
        <div
          className="flex items-center rounded-full overflow-hidden"
          style={{
            background: 'rgba(73, 72, 72, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 6px 24px rgba(73, 72, 72, 0.18)',
            padding: '5px 24px 5px 5px',
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2 rounded-full py-2 px-5"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <motion.span
                className="absolute block w-4 bg-rational rounded-sm"
                style={{ height: '1.5px' }}
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -4 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute block w-4 bg-rational rounded-sm"
                style={{ height: '1.5px' }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.15 }}
              />
              <motion.span
                className="absolute block w-4 bg-rational rounded-sm"
                style={{ height: '1.5px' }}
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 4 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-[14px] font-medium text-rational tracking-[-0.005em]">
              Menu
            </span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

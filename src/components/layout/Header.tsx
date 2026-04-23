'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/content/site';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 flex items-center px-6 md:px-14 xl:px-20 2xl:px-28"
      style={{
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.40)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Wordmark */}
      <a
        href="#"
        onClick={e => e.preventDefault()}
        className="text-[20px] font-medium text-foundation tracking-[-0.025em] lowercase hover:text-foundation/75 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
      >
        sapira
      </a>

      {/* Nav — right aligned */}
      <nav className="hidden md:flex items-center gap-9 ml-auto">
        {siteConfig.navigation.map(item => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link text-[12px] uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

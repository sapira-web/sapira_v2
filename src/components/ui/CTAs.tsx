import React from 'react';

interface CTAProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function PrimaryCTA({ children, href, className = '' }: CTAProps) {
  return (
    <a href={href} className={`cta-primary ${className}`.trim()}>
      {children}
      <span className="cta-arrow" aria-hidden="true">→</span>
    </a>
  );
}

export function SecondaryCTA({ children, href, className = '' }: CTAProps) {
  return (
    <a href={href} className={`cta-secondary ${className}`.trim()}>
      {children}
      <span className="cta-arrow" aria-hidden="true">→</span>
    </a>
  );
}

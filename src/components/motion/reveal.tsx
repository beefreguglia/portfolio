'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { easeOutExpo } from './springs';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/** Surge de baixo, desfocado → nítido, ao entrar na viewport (uma vez). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {children}
    </Comp>
  );
}

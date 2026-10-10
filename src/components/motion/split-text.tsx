'use client';

import { motion, type Variants } from 'motion/react';
import { easeOutExpo } from './springs';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -60, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Revela um texto palavra por palavra, como runas acendendo. */
export function SplitText({
  text,
  className,
  wordClassName,
  as = 'span',
}: {
  text: string;
  className?: string;
  /** Aplicada a cada palavra (ex.: gradiente com background-clip, que não atravessa transforms). */
  wordClassName?: string;
  as?: 'span' | 'h1' | 'h2';
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text}
      style={{ perspective: 600 }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: palavras podem se repetir; a ordem é estável
          key={`${w}-${i}`}
          aria-hidden="true"
          variants={word}
          className="inline-block whitespace-pre"
        >
          {i > 0 && ' '}
          <span className={wordClassName}>{w}</span>
        </motion.span>
      ))}
    </Comp>
  );
}

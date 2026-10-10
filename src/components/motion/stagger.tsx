'use client';

import { type HTMLMotionProps, motion, type Variants } from 'motion/react';
import { easeOutExpo } from './springs';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Lista cujos filhos (StaggerItem) entram em cascata ao aparecer na tela. */
export function StaggerList({ ...props }: HTMLMotionProps<'ul'>) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      {...props}
    />
  );
}

export function StaggerItem({ ...props }: HTMLMotionProps<'li'>) {
  return <motion.li variants={item} {...props} />;
}

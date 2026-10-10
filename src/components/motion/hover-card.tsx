'use client';

import { type HTMLMotionProps, motion } from 'motion/react';
import { springs } from './springs';

/** Card que levanta com mola no hover e afunda levemente no clique/toque. */
export function HoverCard({
  lift = 6,
  ...props
}: HTMLMotionProps<'div'> & { lift?: number }) {
  return (
    <motion.div
      whileHover={{ y: -lift }}
      whileTap={{ scale: 0.99 }}
      transition={springs.soft}
      {...props}
    />
  );
}

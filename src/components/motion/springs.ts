import type { Transition } from 'motion/react';

/** Molas compartilhadas para o site ter um "peso" consistente. */
export const springs = {
  snappy: { type: 'spring', stiffness: 500, damping: 32 },
  soft: { type: 'spring', stiffness: 220, damping: 26 },
  bouncy: { type: 'spring', stiffness: 420, damping: 14 },
} satisfies Record<string, Transition>;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

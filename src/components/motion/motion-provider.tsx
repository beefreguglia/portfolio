'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/** Configuração global do Motion: respeita "reduzir movimento" do sistema e define a mola padrão. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      {children}
    </MotionConfig>
  );
}

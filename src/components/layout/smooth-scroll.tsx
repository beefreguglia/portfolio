'use client';

import Lenis from 'lenis';
import { type ReactNode, useEffect } from 'react';

/** Rolagem suave com Lenis; desligada para quem prefere menos movimento. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      anchors: { offset: -72 },
      lerp: 0.11,
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}

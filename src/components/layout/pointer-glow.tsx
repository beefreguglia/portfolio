'use client';

import { useEffect } from 'react';

/**
 * Atualiza --mx/--my no painel sob o cursor; o CSS de `.panel::after`
 * desenha um brilho verde-água que acompanha o mouse.
 */
export function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    function onMove(event: PointerEvent) {
      const panel = (event.target as Element | null)?.closest<HTMLElement>(
        '.panel'
      );
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      panel.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}

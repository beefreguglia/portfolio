'use client';

import { useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { OrbPoster } from './orb-poster';

const SanctuaryScene = dynamic(() => import('./scene'), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Orbe 3D do hero. Só monta o Canvas no cliente, com WebGL e sem reduced motion;
 * pausa o render quando sai da tela.
 */
export function HeroOrb({
  className,
  hover,
}: {
  className?: string;
  hover: React.RefObject<number>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEnabled(!reduceMotion && supportsWebGL());
    setCompact(window.matchMedia('(max-width: 768px)').matches);
  }, [reduceMotion]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(id);
  }, [enabled]);

  return (
    <div ref={container} className={cn('relative', className)}>
      <OrbPoster
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          enabled && ready ? 'opacity-0' : 'opacity-100'
        )}
      />
      {enabled && (
        <div
          className={cn(
            'mask-[radial-gradient(circle,black_58%,transparent_74%)] absolute inset-0 transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0'
          )}
        >
          <SanctuaryScene active={visible} hover={hover} compact={compact} />
        </div>
      )}
    </div>
  );
}

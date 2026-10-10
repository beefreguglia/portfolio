import type * as React from 'react';
import { cn } from '@/lib/utils';

type FrameTone = 'iron' | 'aqua' | 'gold';

const toneStroke: Record<FrameTone, string> = {
  iron: 'text-iron-bright',
  aqua: 'text-aqua-500',
  gold: 'text-gold-dim',
};

function Corner({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={cn(
        'pointer-events-none absolute size-8 md:size-10',
        className
      )}
      fill="none"
      stroke="currentColor"
    >
      <path d="M1.5 38.5V12C1.5 6.2 6.2 1.5 12 1.5h26.5" strokeWidth="1.5" />
      <path
        d="M7 38.5V15a8 8 0 0 1 8-8h23.5"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <path d="M12 12l4-4 4 4-4 4z" fill="currentColor" strokeWidth="0" />
      <circle cx="1.5" cy="38.5" r="1.5" fill="currentColor" strokeWidth="0" />
      <circle cx="38.5" cy="1.5" r="1.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

interface OrnateFrameProps extends React.ComponentProps<'div'> {
  tone?: FrameTone;
  /** Painel com fundo de pedra; desligue para usar a moldura sobre outra superfície. */
  surface?: boolean;
  /** Destaque (ex.: ato em foco): borda e cantos dourados com brilho. */
  active?: boolean;
}

/** Moldura com cantos ornamentados, a "borda de item" do Santuário. */
export function OrnateFrame({
  tone = 'iron',
  surface = true,
  active = false,
  className,
  children,
  ...props
}: OrnateFrameProps) {
  return (
    <div
      className={cn(
        'relative p-6 transition-[border-color,box-shadow] duration-500 md:p-8',
        surface && 'panel',
        active && 'border-gold-dim! shadow-glow-gold',
        !surface && 'rounded-xl border border-iron',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'transition-colors duration-500',
          active ? 'text-gold' : toneStroke[tone]
        )}
      >
        <Corner className="-top-px -left-px" />
        <Corner className="-top-px -right-px -scale-x-100" />
        <Corner className="-bottom-px -left-px -scale-y-100" />
        <Corner className="-right-px -bottom-px -scale-100" />
      </div>
      {children}
    </div>
  );
}

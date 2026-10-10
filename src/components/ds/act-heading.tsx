import type * as React from 'react';
import { Reveal } from '@/components/motion/reveal';
import { SplitText } from '@/components/motion/split-text';
import { cn } from '@/lib/utils';

interface ActHeadingProps {
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

/** Título de seção: "Ato III" em cima, nome gravado em pedra embaixo. */
export function ActHeading({
  kicker,
  title,
  description,
  align = 'center',
  className,
  id,
}: ActHeadingProps) {
  const centered = align === 'center';
  return (
    <header
      className={cn(
        'mb-12 flex flex-col gap-4 md:mb-16',
        centered ? 'items-center text-center' : 'items-start',
        className
      )}
    >
      <Reveal y={10}>
        <p className="flex items-center gap-3 font-heading text-aqua-400 text-xs uppercase tracking-[0.35em]">
          <span aria-hidden="true" className="h-px w-8 bg-aqua-600" />
          {kicker}
          <span aria-hidden="true" className="h-px w-8 bg-aqua-600" />
        </p>
      </Reveal>
      <h2
        id={id}
        className={cn(
          'font-display font-semibold text-4xl leading-[1.05] md:text-6xl',
          typeof title !== 'string' && 'text-engraved'
        )}
      >
        {typeof title === 'string' ? (
          <SplitText text={title} wordClassName="text-engraved" />
        ) : (
          title
        )}
      </h2>
      {description && (
        <Reveal delay={0.25} y={12}>
          <p
            className={cn(
              'max-w-2xl text-ash text-base leading-relaxed md:text-lg',
              centered && 'mx-auto'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}

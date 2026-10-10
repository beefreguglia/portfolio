'use client';

import { motion } from 'motion/react';
import { type ReactNode, useId } from 'react';
import { cn } from '@/lib/utils';
import { springs } from './springs';

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
  title?: string;
}

interface SegmentedProps<T extends string> {
  legend: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** "tabs": trilho com indicador deslizante · "pills": chips soltos com indicador */
  variant?: 'tabs' | 'pills';
  size?: 'sm' | 'md';
  className?: string;
  itemClassName?: string;
  /** Classe do indicador ativo (cor/brilho) */
  indicatorClassName?: string;
}

/** Grupo de opções com indicador que desliza entre elas (layoutId do Motion). */
export function Segmented<T extends string>({
  legend,
  options,
  value,
  onChange,
  variant = 'tabs',
  size = 'sm',
  className,
  itemClassName,
  indicatorClassName,
}: SegmentedProps<T>) {
  const id = useId();
  const tabs = variant === 'tabs';

  return (
    <fieldset
      className={cn(
        'flex flex-wrap',
        tabs
          ? 'w-fit rounded-lg border border-iron bg-abyss-deep p-1'
          : 'gap-2',
        className
      )}
    >
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <motion.button
            key={option.value}
            type="button"
            aria-pressed={active}
            disabled={option.disabled}
            title={option.title}
            onClick={() => onChange(option.value)}
            whileTap={{ scale: 0.94 }}
            className={cn(
              'relative flex cursor-pointer items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed disabled:opacity-30',
              size === 'sm'
                ? 'px-3 py-1.5 text-xs'
                : 'px-4 py-2 text-xs sm:px-6',
              tabs
                ? 'rounded-md'
                : 'rounded-full border border-iron hover:border-iron-bright',
              active ? 'text-aqua-100' : 'text-ash hover:text-bone',
              itemClassName
            )}
          >
            {active && (
              <motion.span
                layoutId={`segmented-${id}`}
                transition={springs.snappy}
                className={cn(
                  '-z-0 absolute inset-0',
                  tabs ? 'rounded-md' : 'rounded-full',
                  indicatorClassName ??
                    'border border-aqua-500/70 bg-aqua-900/60 shadow-glow-sm'
                )}
              />
            )}
            <span className="relative flex items-center gap-2">
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </fieldset>
  );
}

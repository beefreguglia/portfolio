'use client';

import { type HTMLMotionProps, motion } from 'motion/react';
import { springs } from '@/components/motion/springs';
import { cn } from '@/lib/utils';
import { type Rarity, rarityBg, rarityBorder, rarityGlow } from './rarity';

interface ItemSlotProps extends HTMLMotionProps<'button'> {
  rarity: Rarity;
  selected?: boolean;
  label: string;
  /** Agrupa a moldura de seleção: ela desliza entre slots com o mesmo id. */
  selectionId?: string;
}

/** Célula do inventário. Selecionável por clique, toque ou teclado. */
export function ItemSlot({
  rarity,
  selected,
  label,
  selectionId = 'inventory',
  className,
  children,
  ...props
}: ItemSlotProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { y: 0, scale: 1 },
        hover: { y: -4, scale: 1.04 },
        tap: { y: 0, scale: 0.94 },
      }}
      transition={springs.snappy}
      className={cn(
        'relative flex aspect-square cursor-pointer items-center justify-center rounded-lg border bg-abyss-deep bg-radial to-transparent',
        rarityBorder[rarity],
        rarityBg[rarity],
        selected && rarityGlow[rarity],
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 rounded-md border border-white/5"
      />
      {selected && (
        <motion.span
          aria-hidden="true"
          layoutId={`slot-selection-${selectionId}`}
          transition={springs.snappy}
          className="-inset-[3px] pointer-events-none absolute rounded-[10px] border-2 border-current opacity-80"
        />
      )}
      <motion.span
        className="relative flex"
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: { rotate: [0, -10, 8, -4, 0], scale: 1.12 },
          tap: { scale: 0.9 },
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

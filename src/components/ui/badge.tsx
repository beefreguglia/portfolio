import type * as React from 'react';
import { type Rarity, rarityBorder, rarityText } from '@/components/ds/rarity';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  rarity?: Rarity;
}

export function Badge({ rarity, className, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border bg-abyss-deep/60 px-2 py-0.5 font-mono text-[0.7rem] leading-5 transition-colors',
        rarity
          ? [rarityText[rarity], rarityBorder[rarity]]
          : 'border-iron text-ash hover:border-aqua-700 hover:text-aqua-200',
        className
      )}
      {...props}
    />
  );
}

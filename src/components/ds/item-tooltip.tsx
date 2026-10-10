import type * as React from 'react';
import { cn } from '@/lib/utils';
import { type Rarity, rarityBorder, rarityGlow, rarityText } from './rarity';

export interface ItemTooltipProps {
  name: string;
  rarity: Rarity;
  rarityLabel: string;
  kind: string;
  stats: string[];
  flavor?: string;
  requires?: string[];
  requiresLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Tooltip de item no estilo dos ARPGs: nome na cor da raridade, atributos e citação. */
export function ItemTooltip({
  name,
  rarity,
  rarityLabel,
  kind,
  stats,
  flavor,
  requires,
  requiresLabel,
  className,
  children,
}: ItemTooltipProps) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-xl border-2 bg-abyss-deep/95 backdrop-blur-sm',
        rarityBorder[rarity],
        rarityGlow[rarity],
        className
      )}
    >
      <header
        className={cn(
          'border-b bg-linear-to-b to-transparent px-5 pt-4 pb-3 text-center',
          rarityBorder[rarity],
          rarity === 'legendary' && 'from-rarity-legendary/15',
          rarity === 'set' && 'from-rarity-set/15',
          rarity === 'rare' && 'from-rarity-rare/10',
          rarity === 'magic' && 'from-rarity-magic/10'
        )}
      >
        <h3
          className={cn(
            'font-display font-semibold text-xl leading-tight',
            rarityText[rarity]
          )}
        >
          {name}
        </h3>
        <p className={cn('mt-1 text-xs opacity-80', rarityText[rarity])}>
          {rarityLabel} · {kind}
        </p>
      </header>

      <div className="space-y-4 px-5 py-4">
        <ul className="space-y-1.5 text-sm">
          {stats.map((stat) => (
            <li key={stat} className="flex gap-2 text-aqua-200">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-aqua-400"
              />
              <span>{stat}</span>
            </li>
          ))}
        </ul>

        {flavor && (
          <p className="font-heading text-gold-dim text-sm italic leading-relaxed">
            “{flavor}”
          </p>
        )}

        {requires && requires.length > 0 && (
          <p className="text-smoke text-xs leading-relaxed">
            {requiresLabel}:{' '}
            <span className="text-ash">{requires.join(' · ')}</span>
          </p>
        )}

        {children}
      </div>
    </article>
  );
}

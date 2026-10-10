export const rarities = [
  'common',
  'magic',
  'rare',
  'set',
  'legendary',
] as const;

export type Rarity = (typeof rarities)[number];

export const rarityText: Record<Rarity, string> = {
  common: 'text-rarity-common',
  magic: 'text-rarity-magic',
  rare: 'text-rarity-rare',
  set: 'text-rarity-set',
  legendary: 'text-rarity-legendary',
};

export const rarityBorder: Record<Rarity, string> = {
  common: 'border-rarity-common/30',
  magic: 'border-rarity-magic/50',
  rare: 'border-rarity-rare/50',
  set: 'border-rarity-set/60',
  legendary: 'border-rarity-legendary/70',
};

export const rarityGlow: Record<Rarity, string> = {
  common: '',
  magic: 'shadow-[0_0_18px_-6px_var(--rarity-magic)]',
  rare: 'shadow-[0_0_18px_-6px_var(--rarity-rare)]',
  set: 'shadow-[0_0_22px_-6px_var(--rarity-set)]',
  legendary: 'shadow-[0_0_26px_-4px_var(--rarity-legendary)]',
};

export const rarityBg: Record<Rarity, string> = {
  common: 'from-rarity-common/5',
  magic: 'from-rarity-magic/15',
  rare: 'from-rarity-rare/15',
  set: 'from-rarity-set/15',
  legendary: 'from-rarity-legendary/20',
};

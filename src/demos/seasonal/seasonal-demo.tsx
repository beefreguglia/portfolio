'use client';

import {
  Egg,
  Flower2,
  type LucideIcon,
  PartyPopper,
  Sparkles,
  TreePine,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type CSSProperties, useState } from 'react';
import { Segmented } from '@/components/motion/segmented';
import { springs } from '@/components/motion/springs';

type ThemeId = 'default' | 'christmas' | 'newYear' | 'easter';

/** Design tokens por tema: o "mini-site" do tenant só lê estas variáveis. */
const themes: Record<
  ThemeId,
  { icon: LucideIcon; tokens: Record<string, string> }
> = {
  default: {
    icon: Flower2,
    tokens: {
      '--t-bg': '#fbf6f3',
      '--t-surface': '#ffffff',
      '--t-fg': '#3b2a2f',
      '--t-muted': '#8b7378',
      '--t-accent': '#c26d84',
      '--t-accent-fg': '#ffffff',
    },
  },
  christmas: {
    icon: TreePine,
    tokens: {
      '--t-bg': '#0f2a1f',
      '--t-surface': '#163a2b',
      '--t-fg': '#f6efe2',
      '--t-muted': '#b9c9bd',
      '--t-accent': '#d4343f',
      '--t-accent-fg': '#fff7ea',
    },
  },
  newYear: {
    icon: PartyPopper,
    tokens: {
      '--t-bg': '#11121a',
      '--t-surface': '#1c1d2a',
      '--t-fg': '#f5f1e6',
      '--t-muted': '#a9a7b8',
      '--t-accent': '#e6c15a',
      '--t-accent-fg': '#1a1505',
    },
  },
  easter: {
    icon: Egg,
    tokens: {
      '--t-bg': '#fff8e7',
      '--t-surface': '#ffffff',
      '--t-fg': '#4a3b2a',
      '--t-muted': '#9a876d',
      '--t-accent': '#8a6fd1',
      '--t-accent-fg': '#ffffff',
    },
  },
};

const themeIds = Object.keys(themes) as ThemeId[];

export default function SeasonalDemo() {
  const t = useTranslations('demos.seasonal');
  const [theme, setTheme] = useState<ThemeId>('default');
  const { icon: Icon, tokens } = themes[theme];
  const clinics = t.raw('clinics') as string[];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
      <div>
        <Segmented
          variant="pills"
          legend={t('title')}
          value={theme}
          onChange={setTheme}
          className="mb-4"
          options={themeIds.map((id) => {
            const ThemeIcon = themes[id].icon;
            return {
              value: id,
              label: (
                <>
                  <ThemeIcon className="size-3.5" />
                  {t(`themes.${id}`)}
                </>
              ),
            };
          })}
        />

        {/* Mini-site do tenant: só consome os tokens */}
        <div
          style={tokens as CSSProperties}
          className="overflow-hidden rounded-xl border border-black/10 bg-(--t-bg) text-(--t-fg) shadow-2xl transition-colors duration-500"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <span className="flex items-center gap-2 font-semibold">
              <Sparkles className="size-4 text-(--t-accent)" />
              {t('tenant')}
            </span>
            <span className="text-(--t-muted) text-xs">{t('tagline')}</span>
          </div>
          <div className="relative px-5 py-10 text-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={theme}
                aria-hidden="true"
                initial={{ opacity: 0, rotate: -40, scale: 0.4 }}
                animate={{ opacity: 0.2, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.4 }}
                transition={springs.bouncy}
                className="absolute top-4 right-6 text-(--t-accent)"
              >
                <Icon className="size-16" />
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={theme}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.35 }}
                className="mx-auto max-w-sm font-serif text-2xl leading-snug"
              >
                {t(`banners.${theme}`)}
              </motion.p>
            </AnimatePresence>
            <span className="mt-5 inline-block rounded-full bg-(--t-accent) px-5 py-2 font-medium text-(--t-accent-fg) text-sm transition-colors duration-500">
              {t('cta')}
            </span>
          </div>
          <p className="px-5 pb-2 text-(--t-muted) text-[0.7rem] uppercase tracking-widest">
            {t('clinicsLabel')}
          </p>
          <ul className="grid grid-cols-1 gap-3 px-5 pb-6 sm:grid-cols-3">
            {clinics.map((clinic) => (
              <motion.li
                key={clinic}
                whileHover={{ y: -3 }}
                transition={springs.soft}
                className="flex items-center gap-3 rounded-lg bg-(--t-surface) p-3 text-xs shadow-sm transition-[background-color,box-shadow] duration-500 hover:shadow-md"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--t-accent) text-(--t-accent-fg) transition-colors duration-500">
                  <Icon className="size-4" />
                </span>
                <span className="font-medium">{clinic}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-iron bg-abyss-deep/60 p-4">
        <p className="mb-3 font-heading text-[0.7rem] text-gold-dim uppercase tracking-[0.2em]">
          {t('tokensTitle')}
        </p>
        <ul className="space-y-2 font-mono text-xs">
          {Object.entries(tokens).map(([name, value]) => (
            <li key={name} className="flex items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-md border border-white/20 transition-colors duration-500"
                style={{ background: value }}
              />
              <span className="text-ash">{name}</span>
              <span className="ml-auto text-smoke">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

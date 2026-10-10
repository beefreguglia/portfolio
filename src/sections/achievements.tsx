'use client';

import { Crown, Flame, GraduationCap, Medal, Star, Swords } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ActHeading } from '@/components/ds/act-heading';
import { springs } from '@/components/motion/springs';
import { StaggerItem, StaggerList } from '@/components/motion/stagger';

const achievements = [
  { id: 'degree', icon: GraduationCap },
  { id: 'veteran', icon: Swords },
  { id: 'nlwCopa', icon: Medal },
  { id: 'ignite', icon: Flame },
  { id: 'nlwJourney', icon: Star },
  { id: 'pioneer', icon: Crown },
] as const;

export function Achievements() {
  const t = useTranslations('achievements');
  return (
    <section
      id="conquistas"
      aria-labelledby="conquistas-title"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ActHeading
          id="conquistas-title"
          kicker={t('kicker')}
          title={t('title')}
        />
        <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map(({ id, icon: Icon }) => (
            <StaggerItem key={id}>
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                variants={{ rest: { y: 0 }, hover: { y: -6 } }}
                transition={springs.soft}
                className="panel flex h-full items-center gap-4 p-4 transition-colors hover:border-gold-dim"
              >
                <span className="relative flex size-14 shrink-0 items-center justify-center">
                  <motion.span
                    variants={{
                      rest: {
                        rotate: 45,
                        boxShadow: '0 0 0px 0px transparent',
                      },
                      hover: {
                        rotate: 225,
                        boxShadow: '0 0 28px -4px var(--gold)',
                      },
                    }}
                    transition={springs.bouncy}
                    className="absolute inset-0 rounded-md border-2 border-gold-dim bg-linear-to-br from-gold/20 to-transparent"
                  />
                  <motion.span
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.18 } }}
                    transition={springs.bouncy}
                    className="relative flex"
                  >
                    <Icon className="size-6 text-gold" strokeWidth={1.5} />
                  </motion.span>
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-bone">
                    {t(`list.${id}.title`)}
                  </p>
                  <p className="text-ash text-sm leading-snug">
                    {t(`list.${id}.description`)}
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] text-gold-dim uppercase tracking-widest">
                    ✦ {t('unlocked')}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

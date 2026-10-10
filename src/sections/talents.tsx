'use client';

import {
  BrainCircuit,
  Code2,
  Compass,
  Database,
  FlaskConical,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActHeading } from '@/components/ds/act-heading';
import { HoverCard } from '@/components/motion/hover-card';
import { Reveal } from '@/components/motion/reveal';
import { Segmented } from '@/components/motion/segmented';
import { springs } from '@/components/motion/springs';
import {
  type BranchId,
  branchIds,
  type SkillTier,
  type SourceId,
  sourceIds,
  talentTree,
} from '@/content/skills';
import { cn } from '@/lib/utils';

const branchIcons: Record<BranchId, typeof Code2> = {
  frontend: Code2,
  backend: Database,
  ai: BrainCircuit,
  testing: FlaskConical,
  devops: Wrench,
  craft: Compass,
};

const tierPips: Record<SkillTier, number> = {
  core: 3,
  proficient: 2,
  familiar: 1,
};

function Pips({ tier, lit }: { tier: SkillTier; lit: boolean }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {[1, 2, 3].map((n) => {
        const filled = n <= tierPips[tier];
        return (
          <motion.span
            key={n}
            animate={{
              scale: filled && lit ? 1 : 0.8,
              opacity: filled ? 1 : 0.5,
            }}
            transition={{ ...springs.bouncy, delay: lit ? n * 0.05 : 0 }}
            className={cn(
              'size-1.5 rotate-45 border transition-colors duration-300',
              filled
                ? lit
                  ? 'border-aqua-300 bg-aqua-300 shadow-glow-sm'
                  : 'border-aqua-800 bg-aqua-800'
                : 'border-iron'
            )}
          />
        );
      })}
    </span>
  );
}

export function Talents() {
  const t = useTranslations('talents');
  const [filter, setFilter] = useState<SourceId | 'all'>('all');

  return (
    <section
      id="talentos"
      aria-labelledby="talentos-title"
      className="relative bg-abyss-deep px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ActHeading
          id="talentos-title"
          kicker={t('kicker')}
          title={t('title')}
          description={t('description')}
        />

        <Reveal className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="font-heading text-[0.7rem] text-smoke uppercase tracking-[0.2em]"
          >
            {t('filterLabel')}
          </span>
          <Segmented
            variant="pills"
            legend={t('filterLabel')}
            value={filter}
            onChange={setFilter}
            className="justify-center"
            options={(['all', ...sourceIds] as const).map((s) => ({
              value: s,
              label: s === 'all' ? t('all') : t(`sources.${s}`),
            }))}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-1 text-smoke text-xs">
            {(['core', 'proficient', 'familiar'] as const).map((tier) => (
              <li key={tier} className="flex items-center gap-2">
                <Pips tier={tier} lit />
                <span className="text-ash">{t(`tiers.${tier}`)}</span>
                <span>· {t(`tierHint.${tier}`)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {branchIds.map((branch, i) => {
            const Icon = branchIcons[branch];
            const skills = talentTree[branch];
            const litCount = skills.filter(
              (s) => filter === 'all' || s.sources.includes(filter)
            ).length;
            let litIndex = 0;
            return (
              <Reveal key={branch} delay={i * 0.05}>
                <HoverCard className="panel group/branch h-full p-5 hover:border-iron-bright">
                  <header className="mb-4 flex items-center gap-3 border-iron border-b pb-4">
                    <motion.span
                      variants={{
                        rest: { rotate: 45 },
                        hover: { rotate: 135 },
                      }}
                      initial="rest"
                      whileHover="hover"
                      transition={springs.bouncy}
                      className="flex size-10 items-center justify-center rounded-md border border-aqua-700 bg-aqua-950/60 transition-colors group-hover/branch:border-aqua-400 group-hover/branch:shadow-glow-sm"
                    >
                      <motion.span
                        variants={{
                          rest: { rotate: -45 },
                          hover: { rotate: -135 },
                        }}
                        transition={springs.bouncy}
                        className="flex"
                      >
                        <Icon className="size-5 text-aqua-300" />
                      </motion.span>
                    </motion.span>
                    <h3 className="ml-1 flex-1 font-display text-bone tracking-wider">
                      {t(`branches.${branch}`)}
                    </h3>
                    <span className="flex font-mono text-smoke text-xs">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={litCount}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={springs.snappy}
                          className="inline-block text-aqua-300"
                        >
                          {litCount}
                        </motion.span>
                      </AnimatePresence>
                      /{skills.length}
                    </span>
                  </header>
                  <ul className="relative space-y-0.5">
                    <span
                      aria-hidden="true"
                      className="absolute top-3 bottom-3 left-[15px] w-px bg-iron"
                    />
                    {skills.map((skill) => {
                      const lit =
                        filter === 'all' || skill.sources.includes(filter);
                      // Acende em cascata: atraso cresce só entre os nós acesos
                      const delay = lit ? litIndex++ * 0.035 : 0;
                      const sources = skill.sources
                        .map((s) => t(`sources.${s}`))
                        .join(', ');
                      return (
                        <motion.li
                          key={skill.name}
                          title={sources}
                          animate={{ opacity: lit ? 1 : 0.3, x: lit ? 0 : -4 }}
                          whileHover={{ x: 4 }}
                          transition={{ ...springs.soft, delay }}
                          className="group/node -mx-2 relative flex items-center gap-3 rounded-md py-1.5 pr-2 pl-8 text-sm transition-colors hover:bg-white/[0.04]"
                        >
                          <motion.span
                            aria-hidden="true"
                            animate={{ scale: lit ? 1 : 0.75, rotate: 45 }}
                            whileHover={{ scale: 1.3 }}
                            transition={{ ...springs.bouncy, delay }}
                            className={cn(
                              'absolute left-2 size-[15px] rounded-[3px] border-2 transition-colors duration-300',
                              lit
                                ? 'border-aqua-400 bg-aqua-900 shadow-glow-sm'
                                : 'border-iron bg-abyss-deep'
                            )}
                          />
                          <span
                            className={cn(
                              'flex-1 transition-colors',
                              lit
                                ? 'text-bone group-hover/node:text-aqua-200'
                                : 'text-smoke'
                            )}
                          >
                            {skill.name}
                            <span className="sr-only">
                              {' '}
                              ({t(`tiers.${skill.tier}`)}: {sources})
                            </span>
                          </span>
                          <Pips tier={skill.tier} lit={lit} />
                        </motion.li>
                      );
                    })}
                  </ul>
                </HoverCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

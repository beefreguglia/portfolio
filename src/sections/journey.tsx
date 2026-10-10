'use client';

import { Check } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useFormatter, useTranslations } from 'next-intl';
import { type ReactNode, useRef } from 'react';
import { ActHeading } from '@/components/ds/act-heading';
import { OrnateFrame } from '@/components/ds/ornate-frame';
import { HoverCard } from '@/components/motion/hover-card';
import { Reveal } from '@/components/motion/reveal';
import { springs } from '@/components/motion/springs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Act, acts } from '@/content/acts';
import { cn } from '@/lib/utils';

function usePeriod() {
  const format = useFormatter();
  return (act: Act) => {
    const fmt = (value: string) => {
      if (value.length === 4) return value;
      const [y, m] = value.split('-').map(Number);
      return format.dateTime(new Date(y, m - 1, 1), {
        month: 'short',
        year: 'numeric',
      });
    };
    return act.end ? `${fmt(act.start)} – ${fmt(act.end)}` : fmt(act.start);
  };
}

function Waypoint({ numeral, active }: { numeral: string; active: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0.3 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40% 0px -40% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex size-14 items-center justify-center"
    >
      <span
        className={cn(
          'absolute inset-0 rotate-45 rounded-md border-2 bg-abyss-deep transition-all duration-500',
          active
            ? 'scale-110 border-gold shadow-glow-gold'
            : 'border-aqua-400 shadow-glow'
        )}
      />
      <span className="absolute inset-2 rotate-45 rounded-sm border border-aqua-700" />
      <span
        className={cn(
          'relative font-display font-semibold text-sm transition-colors duration-500',
          active ? 'text-gold' : 'text-aqua-200'
        )}
      >
        {numeral}
      </span>
    </motion.div>
  );
}

/** Um ato da jornada: surge acompanhando o scroll e fica dourado ao passar pelo centro da tela. */
function ActStep({
  numeral,
  left,
  children,
}: {
  numeral: string;
  left: boolean;
  children: (active: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const active = useInView(ref, { margin: '-42% 0px -42% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 60%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [left ? -56 : 56, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-16 last:pb-0 md:grid-cols-[1fr_3.5rem_1fr] md:gap-10"
    >
      <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
        <Waypoint numeral={numeral} active={active} />
      </div>
      <motion.div
        style={reduce ? undefined : { opacity, x, y, scale }}
        className={cn(
          'col-start-2 row-start-1',
          left ? 'md:col-start-1 md:text-right' : 'md:col-start-3'
        )}
      >
        {children(active)}
      </motion.div>
    </li>
  );
}

export function Journey() {
  const t = useTranslations('journey');
  const period = usePeriod();
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 70%', 'end 60%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  return (
    <section
      id="jornada"
      aria-labelledby="jornada-title"
      className="relative overflow-hidden bg-abyss-deep px-4 py-24 md:px-8 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(from_var(--aqua-900)_l_c_h/0.25),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <ActHeading
          id="jornada-title"
          kicker={t('kicker')}
          title={t('title')}
          description={t('description')}
        />

        <ol ref={track} className="relative">
          {/* Caminho: trilho apagado + trilho aceso pelo scroll */}
          <div
            aria-hidden="true"
            className="md:-translate-x-1/2 absolute top-0 bottom-0 left-7 w-0.5 bg-iron md:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="md:-translate-x-1/2 absolute top-0 bottom-0 left-7 w-0.5 origin-top bg-linear-to-b from-aqua-300 via-aqua-500 to-gold shadow-glow md:left-1/2"
          />

          {acts.map((act, index) => {
            const left = index % 2 === 0;
            const quests = t.raw(`acts.${act.id}.quests`) as string[];
            return (
              <ActStep key={act.id} numeral={act.numeral} left={left}>
                {(active) => (
                  <HoverCard>
                    <OrnateFrame
                      tone={act.id === 'tome' ? 'gold' : 'iron'}
                      active={active}
                      className="hover:border-iron-bright"
                    >
                      <p className="font-heading text-aqua-400 text-xs uppercase tracking-[0.3em]">
                        {t('actLabel')} {act.numeral} · {period(act)}
                      </p>
                      <h3 className="mt-2 font-display font-semibold text-2xl text-bone md:text-3xl">
                        {t(`acts.${act.id}.title`)}
                      </h3>
                      <p className="mt-1 text-gold text-sm">
                        {t(`acts.${act.id}.place`)}
                      </p>
                      <p className="text-sm text-smoke italic">
                        {t(`acts.${act.id}.role`)}
                      </p>
                      <p className="mt-4 text-ash leading-relaxed">
                        {t(`acts.${act.id}.summary`)}
                      </p>

                      <h4 className="mt-5 mb-2 font-heading text-[0.7rem] text-smoke uppercase tracking-[0.25em]">
                        {t('questsLabel')}
                      </h4>
                      <ul
                        className={cn(
                          'space-y-2 text-left text-sm',
                          left && 'md:ml-auto'
                        )}
                      >
                        {quests.map((q, qi) => (
                          <motion.li
                            key={q}
                            initial={{ opacity: 0, x: left ? 12 : -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-15% 0px' }}
                            transition={{ ...springs.soft, delay: qi * 0.08 }}
                            className="flex gap-2.5 text-aqua-100"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-aqua-400"
                            />
                            <span>{q}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div
                        className={cn(
                          'mt-5 flex flex-wrap gap-1.5',
                          left && 'md:justify-end'
                        )}
                      >
                        {act.techs.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </OrnateFrame>
                  </HoverCard>
                )}
              </ActStep>
            );
          })}
        </ol>

        <Reveal className="mt-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ rotate: 45 }}
            whileHover={{ rotate: 225, scale: 1.1 }}
            whileInView={{
              rotate: [45, 405],
              transition: { duration: 1.6, ease: 'easeInOut' },
            }}
            viewport={{ once: true }}
            transition={springs.bouncy}
            className="mb-4 flex size-14 items-center justify-center rounded-md border-2 border-gold-dim border-dashed transition-colors hover:border-gold hover:shadow-glow-gold"
          >
            <span className="-rotate-45 font-display text-gold">VI</span>
          </motion.div>
          <p className="font-display font-semibold text-2xl text-bone">
            {t('next.title')}
          </p>
          <p className="mt-2 text-ash">{t('next.description')}</p>
          <Button asChild className="mt-6" variant="secondary">
            <a href="#portal">{t('next.cta')}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

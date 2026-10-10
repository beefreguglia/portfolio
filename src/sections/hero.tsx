'use client';

import { ChevronDown, Download, ScrollText, Swords } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Counter } from '@/components/motion/counter';
import { Magnetic } from '@/components/motion/magnetic';
import { HeroOrb } from '@/components/three/hero-orb';
import { Button } from '@/components/ui/button';
import { characterLevel, profile } from '@/content/profile';
import { Link } from '@/i18n/navigation';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations('hero');
  const hover = useRef(0);

  const charge = {
    onPointerEnter: () => {
      hover.current = 1;
    },
    onPointerLeave: () => {
      hover.current = 0;
    },
    onFocus: () => {
      hover.current = 1;
    },
    onBlur: () => {
      hover.current = 0;
    },
  };

  // Sem blur nos títulos gravados: o filter inline anularia o drop-shadow do gradiente
  const enter = (delay: number, blur = true) => ({
    initial: { opacity: 0, y: 28, ...(blur && { filter: 'blur(8px)' }) },
    animate: { opacity: 1, y: 0, ...(blur && { filter: 'blur(0px)' }) },
    transition: { duration: 1, delay, ease },
  });

  const stats = [
    { value: 4, suffix: '+', label: t('stats.years') },
    { value: characterLevel(), suffix: '', label: t('stats.level') },
    { value: 3, suffix: '', label: t('stats.companies') },
  ];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-stone-texture pt-16"
    >
      {/* Colunas góticas ao fundo */}
      <div
        aria-hidden="true"
        className="-z-10 mask-[linear-gradient(to_bottom,black,transparent_85%)] pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(12.5%-1px),oklch(1_0_0/0.025)_calc(12.5%-1px),oklch(1_0_0/0.025)_12.5%)]"
      />
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-abyss"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-4 py-10 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <HeroOrb
          hover={hover}
          className="order-1 mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:order-2 lg:max-w-none"
        />

        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.p
            {...enter(0.1)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-aqua-700/60 bg-aqua-950/40 px-3 py-1 font-mono text-aqua-200 text-xs"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqua-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-aqua-300" />
            </span>
            {t('available')}
          </motion.p>

          <motion.p
            {...enter(0.2)}
            className="mb-3 font-heading text-gold-dim text-sm uppercase tracking-[0.4em]"
          >
            {t('kicker')}
          </motion.p>

          <motion.h1
            {...enter(0.3, false)}
            className="font-bold font-display text-5xl text-engraved leading-[0.95] sm:text-6xl xl:text-7xl"
          >
            Bernardo
            <br />
            Freguglia
          </motion.h1>

          <motion.p
            {...enter(0.45, false)}
            className="mt-4 font-display font-semibold text-engraved-aqua text-glow text-lg tracking-[0.06em] sm:text-2xl sm:tracking-[0.12em]"
          >
            {t('class')}
          </motion.p>

          <motion.p
            {...enter(0.55)}
            className="mt-6 max-w-xl text-ash text-base leading-relaxed sm:text-lg"
          >
            {t('summary')}
          </motion.p>

          <motion.div
            {...enter(0.7)}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Magnetic>
              <Button asChild size="lg" {...charge}>
                <a href="#jornada">
                  <Swords />
                  {t('cta.start')}
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary" {...charge}>
                <a href={profile.cvPdf} download>
                  <Download />
                  {t('cta.cv')}
                </a>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="ghost">
              <Link href="/cv">
                <ScrollText />
                {t('cta.recruiter')}
              </Link>
            </Button>
          </motion.div>

          <motion.dl
            {...enter(0.85)}
            className="mt-10 grid w-full max-w-md grid-cols-3 border-iron border-y py-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="group/stat flex flex-col items-center gap-1 border-iron not-last:border-r lg:items-start lg:px-4 lg:first:pl-0"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-semibold text-3xl text-bone transition-all duration-300 group-hover/stat:text-aqua-200 group-hover/stat:text-glow">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="text-[0.7rem] text-smoke uppercase leading-tight tracking-wider">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <a
        href="#ficha"
        aria-label={t('scroll')}
        className="-translate-x-1/2 absolute bottom-6 left-1/2 hidden text-aqua-500 transition-colors hover:text-aqua-300 md:block"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}

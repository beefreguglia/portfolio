'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';

/** Orbe de mana no canto: enche conforme a jornada avança. Clique para voltar ao topo. */
export function ScrollOrb() {
  const t = useTranslations('nav');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const fillY = useTransform(progress, [0, 1], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <motion.a
      href="#top"
      style={{ opacity }}
      aria-label={t('backToTop')}
      title={t('progress')}
      className="group fixed right-4 bottom-4 z-40 block size-14 md:right-6 md:bottom-6 md:size-16"
    >
      <span className="absolute inset-0 rounded-full border-2 border-iron-bright bg-abyss-deep shadow-[inset_0_0_12px_oklch(0_0_0/0.9)]" />
      <span className="absolute inset-[3px] overflow-hidden rounded-full">
        <motion.span
          style={{ y: fillY }}
          className="absolute inset-0 bg-linear-to-t from-aqua-800 via-aqua-500 to-aqua-300"
        >
          <span className="absolute inset-x-[-50%] top-0 h-3 animate-orb-swirl rounded-[40%] bg-aqua-200/40" />
        </motion.span>
        <span className="absolute inset-0 rounded-full bg-radial-[at_35%_30%] from-white/35 via-transparent to-transparent" />
      </span>
      <span className="-inset-1 absolute rounded-full border border-gold-dim/50 transition-colors group-hover:border-aqua-300" />
    </motion.a>
  );
}

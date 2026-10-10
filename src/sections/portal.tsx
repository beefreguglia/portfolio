'use client';

import { Check, Copy, Download, Mail, ScrollText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActHeading } from '@/components/ds/act-heading';
import { GithubIcon, LinkedinIcon } from '@/components/ds/brand-icons';
import { OrnateFrame } from '@/components/ds/ornate-frame';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal } from '@/components/motion/reveal';
import { springs } from '@/components/motion/springs';
import { Button } from '@/components/ui/button';
import { profile } from '@/content/profile';
import { Link } from '@/i18n/navigation';

export function Portal() {
  const t = useTranslations('portal');
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const socials = [
    {
      href: profile.linkedin,
      label: 'LinkedIn',
      handle: profile.linkedinHandle,
      icon: LinkedinIcon,
    },
    {
      href: profile.github,
      label: 'GitHub',
      handle: profile.githubHandle,
      icon: GithubIcon,
    },
  ];

  return (
    <section
      id="portal"
      aria-labelledby="portal-title"
      className="relative overflow-hidden bg-abyss-deep px-4 py-24 md:px-8 md:py-32"
    >
      {/* O portal: anéis de luz verde-água */}
      <div
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(900px,140vw)] rounded-full bg-[radial-gradient(circle,oklch(from_var(--aqua-500)_l_c_h/0.18)_0%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(620px,110vw)] animate-orb-swirl rounded-full border border-aqua-700/40 border-dashed [animation-duration:60s]"
      />

      <div className="relative mx-auto max-w-3xl">
        <ActHeading
          id="portal-title"
          kicker={t('kicker')}
          title={t('title')}
          description={t('description')}
        />

        <Reveal>
          <OrnateFrame tone="aqua" className="flex flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${profile.email}`}
                className="link-rune flex items-center gap-3 font-mono text-aqua-100 text-sm transition-colors hover:text-aqua-300 sm:text-base"
              >
                <Mail className="size-5 text-aqua-400" />
                {profile.email}
              </a>
              <Button variant="secondary" size="sm" onClick={copyEmail}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.8 }}
                    transition={springs.snappy}
                    className="flex items-center gap-2"
                    aria-live="polite"
                  >
                    {copied ? <Check className="text-aqua-300" /> : <Copy />}
                    {copied ? t('copied') : t('copy')}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springs.soft}
                  className="group flex items-center gap-4 rounded-lg border border-iron bg-abyss-deep/60 p-4 transition-all hover:border-aqua-500 hover:shadow-glow-sm"
                >
                  <s.icon className="size-6 text-ash transition-colors group-hover:text-aqua-300" />
                  <span>
                    <span className="block font-display text-bone">
                      {s.label}
                    </span>
                    <span className="block font-mono text-smoke text-xs">
                      /{s.handle}
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <a href={profile.cvPdf} download>
                    <Download />
                    {t('cv')}
                  </a>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="secondary">
                <Link href="/cv">
                  <ScrollText />
                  {t('recruiter')}
                </Link>
              </Button>
            </div>
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}

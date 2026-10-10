'use client';

import { Menu, ScrollText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { springs } from '@/components/motion/springs';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'ficha', key: 'sheet' },
  { id: 'jornada', key: 'journey' },
  { id: 'arsenal', key: 'arsenal' },
  { id: 'talentos', key: 'talents' },
  { id: 'portal', key: 'portal' },
] as const;

function Sigil() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="size-7 text-aqua-400"
    >
      <path
        d="M16 2l12 7v14l-12 7-12-7V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 8l6 8-6 8-6-8z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  return (
    <nav
      aria-label={t('language')}
      className={cn('flex items-center font-mono text-xs', className)}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-iron-bright">/</span>}
          <Link
            href={pathname}
            locale={l}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'px-1 uppercase transition-colors',
              l === locale ? 'text-aqua-300' : 'text-smoke hover:text-bone'
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // O Sheet (Radix) gera IDs que divergem entre SSR e cliente; monta só no cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-iron/80 border-b bg-abyss-deep/85 backdrop-blur-md'
          : 'border-transparent border-b bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <motion.a
          href="#top"
          className="flex items-center gap-2.5"
          whileHover="hover"
          initial="rest"
        >
          <motion.span
            variants={{ rest: { rotate: 0 }, hover: { rotate: 180 } }}
            transition={springs.bouncy}
            className="flex"
          >
            <Sigil />
          </motion.span>
          <span className="font-display font-semibold text-bone text-sm tracking-[0.2em]">
            B. FREGUGLIA
          </span>
        </motion.a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          onPointerLeave={() => setHovered(null)}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onPointerEnter={() => setHovered(s.id)}
              onFocus={() => setHovered(s.id)}
              onBlur={() => setHovered(null)}
              className="relative px-3.5 py-2 font-heading text-ash text-xs uppercase tracking-[0.2em] transition-colors hover:text-aqua-200"
            >
              <AnimatePresence>
                {hovered === s.id && (
                  <motion.span
                    layoutId="nav-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={springs.snappy}
                    className="absolute inset-0 rounded-md border border-aqua-800/70 bg-aqua-950/50"
                  />
                )}
              </AnimatePresence>
              <span className="relative">{t(s.key)}</span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="secondary" size="sm">
            <Link href="/cv">
              <ScrollText />
              {t('recruiter')}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          {!mounted ? (
            <Button variant="ghost" size="icon" aria-label={t('openMenu')}>
              <Menu className="size-6!" />
            </Button>
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('openMenu')}>
                  <Menu className="size-6!" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-iron bg-abyss-deep/95 text-bone"
              >
                <SheetHeader className="border-iron border-b">
                  <SheetTitle className="font-display text-aqua-300 tracking-[0.2em]">
                    {t('menu')}
                  </SheetTitle>
                </SheetHeader>
                <motion.nav
                  className="flex flex-col gap-1 px-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                    },
                  }}
                >
                  {sections.map((s) => (
                    <motion.a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      variants={{
                        hidden: { opacity: 0, x: 24 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileTap={{ scale: 0.97, x: 4 }}
                      className="border-iron/50 border-b py-4 font-heading text-ash text-lg tracking-widest transition-colors hover:text-aqua-300"
                    >
                      {t(s.key)}
                    </motion.a>
                  ))}
                </motion.nav>
                <div className="mt-auto p-4">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/cv">
                      <ScrollText />
                      {t('recruiter')}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}

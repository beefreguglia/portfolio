import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PointerGlow } from '@/components/layout/pointer-glow';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { MotionProvider } from '@/components/motion/motion-provider';
import { profile } from '@/content/profile';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0b1012',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(profile.siteUrl),
    title: { default: t('title'), template: `%s · ${profile.name}` },
    description: t('description'),
    authors: [{ name: profile.fullName, url: profile.siteUrl }],
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt', en: '/en', 'x-default': '/pt' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      title: t('title'),
      description: t('description'),
      siteName: profile.name,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      className={`${cinzel.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main"
          className="-translate-y-20 fixed top-3 left-3 z-100 bg-aqua-400 px-4 py-2 font-medium text-abyss-deep text-sm transition-transform focus:translate-y-0"
        >
          {t('skip')}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </MotionProvider>
          <PointerGlow />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ScrollOrb } from '@/components/layout/scroll-orb';
import { profile } from '@/content/profile';
import { Achievements } from '@/sections/achievements';
import { Arsenal } from '@/sections/arsenal';
import { CharacterSheet } from '@/sections/character-sheet';
import { Hero } from '@/sections/hero';
import { Journey } from '@/sections/journey';
import { Portal } from '@/sections/portal';
import { Talents } from '@/sections/talents';

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hero');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: t('class'),
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    image: profile.avatar,
    sameAs: [profile.github, profile.linkedin],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal de Ouro Preto',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'RAG',
      'LLMs',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático gerado a partir de dados próprios
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <CharacterSheet />
        <Journey />
        <Arsenal />
        <Talents />
        <Achievements />
        <Portal />
      </main>
      <Footer />
      <ScrollOrb />
    </>
  );
}

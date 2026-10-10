import { getTranslations } from 'next-intl/server';
import { OrbPoster } from '@/components/three/orb-poster';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center bg-stone-texture px-4 text-center"
    >
      <OrbPoster className="mb-8 aspect-square w-48 grayscale-[.6]" />
      <p className="font-heading text-gold-dim text-sm tracking-[0.4em]">404</p>
      <h1 className="mt-2 font-display font-semibold text-4xl text-engraved">
        {t('title')}
      </h1>
      <p className="mt-3 text-ash">{t('description')}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t('back')}</Link>
      </Button>
    </main>
  );
}

import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('portal');
  return (
    <footer className="border-iron border-t bg-abyss-deep px-4 py-8 text-center md:px-8">
      <p className="text-smoke text-xs">
        © {new Date().getFullYear()} · {t('footer')}
      </p>
      <p className="mt-1 text-[0.7rem] text-smoke/70">{t('disclaimer')}</p>
    </footer>
  );
}

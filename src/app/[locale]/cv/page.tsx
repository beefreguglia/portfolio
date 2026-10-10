import { ArrowLeft, Download } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { profile } from '@/content/profile';
import { branchIds, talentTree } from '@/content/skills';
import { Link } from '@/i18n/navigation';
import { PrintButton } from './print-button';

const jobs = [
  'centra',
  'djcomphany',
  'seazone',
  'seazoneIntern',
  'voluta',
] as const;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/cv'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return {
    title: t('metaTitle'),
    alternates: { canonical: `/${locale}/cv` },
  };
}

/** Modo recrutador: currículo limpo, imprimível e legível por ATS. */
export default async function CvPage({ params }: PageProps<'/[locale]/cv'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cv');
  const tTalents = await getTranslations('talents');
  const tHero = await getTranslations('hero');

  return (
    <div className="min-h-svh bg-neutral-100 text-neutral-900 print:bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-5 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-600 text-sm hover:text-neutral-900"
        >
          <ArrowLeft className="size-4" />
          {t('back')}
        </Link>
        <div className="flex gap-2">
          <a
            href={profile.cvPdf}
            download
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 font-medium text-sm transition-colors hover:bg-neutral-50"
          >
            <Download className="size-4" />
            {t('download')}
          </a>
          <PrintButton label={t('print')} />
        </div>
      </div>

      <main
        id="main"
        className="mx-auto max-w-3xl bg-white px-6 py-10 shadow-sm sm:px-12 print:max-w-none print:p-0 print:shadow-none"
      >
        <header className="border-neutral-200 border-b pb-6 text-center">
          <h1 className="font-bold text-3xl tracking-tight">
            {profile.fullName}
          </h1>
          <p className="mt-1 font-medium text-lg text-teal-700">
            {tHero('class')}
          </p>
          <p className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-neutral-600 text-sm">
            <a href={`mailto:${profile.email}`} className="hover:underline">
              {profile.email}
            </a>
            <span aria-hidden="true">·</span>
            <a href={profile.linkedin} className="hover:underline">
              linkedin.com/in/{profile.linkedinHandle}
            </a>
            <span aria-hidden="true">·</span>
            <a href={profile.github} className="hover:underline">
              github.com/{profile.githubHandle}
            </a>
            <span aria-hidden="true">·</span>
            <a href={profile.siteUrl} className="hover:underline">
              {profile.siteUrl.replace('https://', '')}
            </a>
          </p>
        </header>

        <section className="mt-6">
          <h2 className="mb-2 font-semibold text-neutral-500 text-sm uppercase tracking-widest">
            {t('summaryTitle')}
          </h2>
          <p className="text-neutral-800 leading-relaxed">{t('summary')}</p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-semibold text-neutral-500 text-sm uppercase tracking-widest">
            {t('experienceTitle')}
          </h2>
          <div className="space-y-5">
            {jobs.map((job) => (
              <article key={job} className="break-inside-avoid">
                <h3 className="font-semibold">
                  {t(`jobs.${job}.company`)}{' '}
                  <span className="font-normal text-neutral-500">·</span>{' '}
                  {t(`jobs.${job}.role`)}
                </h3>
                <p className="text-neutral-500 text-sm italic">
                  {t(`jobs.${job}.period`)}
                </p>
                <p className="mt-1 text-neutral-800 leading-relaxed">
                  {t(`jobs.${job}.description`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 break-inside-avoid">
          <h2 className="mb-4 font-semibold text-neutral-500 text-sm uppercase tracking-widest">
            {t('projectsTitle')}
          </h2>
          <ul className="space-y-3 text-neutral-800 leading-relaxed">
            <li>{t('projects.noshbyte')}</li>
            <li>{t('projects.saasRbac')}</li>
          </ul>
        </section>

        <section className="mt-8 break-inside-avoid">
          <h2 className="mb-4 font-semibold text-neutral-500 text-sm uppercase tracking-widest">
            {t('educationTitle')}
          </h2>
          <h3 className="font-semibold">{t('education.school')}</h3>
          <p className="text-neutral-800">{t('education.degree')}</p>
          <p className="text-neutral-500 text-sm italic">
            {t('education.period')}
          </p>
          <p className="mt-1 text-neutral-700 text-sm">
            {t('education.thesis')}
          </p>
        </section>

        <section className="mt-8 break-inside-avoid">
          <h2 className="mb-4 font-semibold text-neutral-500 text-sm uppercase tracking-widest">
            {t('skillsTitle')}
          </h2>
          <dl className="space-y-2 text-sm">
            {branchIds.map((branch) => (
              <div key={branch} className="sm:flex sm:gap-2">
                <dt className="shrink-0 font-semibold sm:w-44">
                  {tTalents(`branches.${branch}`)}
                </dt>
                <dd className="text-neutral-700">
                  {talentTree[branch].map((s) => s.name).join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <div className="h-10 print:hidden" />
    </div>
  );
}

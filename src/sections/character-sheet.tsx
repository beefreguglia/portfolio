import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ActHeading } from '@/components/ds/act-heading';
import { Divider } from '@/components/ds/divider';
import { OrnateFrame } from '@/components/ds/ornate-frame';
import { StatBar } from '@/components/ds/stat-bar';
import { HoverCard } from '@/components/motion/hover-card';
import { Reveal } from '@/components/motion/reveal';
import { StaggerItem, StaggerList } from '@/components/motion/stagger';
import { characterLevel, profile } from '@/content/profile';

/** Autoavaliação lúdica, ajuste à vontade. */
const attributes = [
  { key: 'frontend', value: 90 },
  { key: 'backend', value: 72 },
  { key: 'ai', value: 68 },
  { key: 'people', value: 82 },
] as const;

export async function CharacterSheet() {
  const t = await getTranslations('sheet');
  const bio = t.raw('bio') as string[];
  const traits = t.raw('traits') as string[];

  const facts = [
    { label: t('classLabel'), value: t('classValue') },
    { label: t('levelLabel'), value: String(characterLevel()) },
    { label: t('originLabel'), value: t('originValue') },
    { label: t('guildLabel'), value: t('guildValue') },
  ];

  return (
    <section
      id="ficha"
      aria-labelledby="ficha-title"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ActHeading id="ficha-title" kicker={t('kicker')} title={t('title')} />

        <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
          <Reveal>
            <OrnateFrame
              tone="gold"
              className="group/portrait flex flex-col items-center hover:shadow-glow-gold"
            >
              <div className="relative mb-6 aspect-[4/5] w-full max-w-64 overflow-hidden rounded-t-full border-2 border-gold-dim/60 shadow-glow-gold">
                <Image
                  src={profile.avatar}
                  alt={t('portraitAlt')}
                  fill
                  sizes="256px"
                  className="object-cover saturate-[.85] sepia-[.25] transition-all duration-700 group-hover/portrait:scale-105 group-hover/portrait:saturate-100 group-hover/portrait:sepia-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-abyss-deep/70 via-transparent to-transparent" />
              </div>
              <p className="font-display font-semibold text-2xl text-bone">
                {profile.name}
              </p>
              <p className="mt-1 font-heading text-aqua-300 text-sm tracking-[0.2em]">
                {t('classValue')}
              </p>
              <Divider className="my-6 w-full" />
              <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-4 text-sm">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-heading text-[0.7rem] text-smoke uppercase tracking-[0.2em]">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-bone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </OrnateFrame>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <OrnateFrame>
                <div className="space-y-4 text-ash leading-relaxed md:text-lg">
                  {bio.map((p, i) => (
                    <p
                      key={p.slice(0, 24)}
                      className={
                        i === 0
                          ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:text-aqua-300 first-letter:leading-[0.85]'
                          : undefined
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </OrnateFrame>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              <Reveal delay={0.15}>
                <HoverCard className="h-full">
                  <OrnateFrame className="h-full hover:border-iron-bright">
                    <h3 className="mb-5 font-display text-bone text-lg tracking-wider">
                      {t('attributesTitle')}
                    </h3>
                    <div className="space-y-4">
                      {attributes.map((a) => (
                        <StatBar
                          key={a.key}
                          label={t(`attributes.${a.key}`)}
                          value={a.value}
                        />
                      ))}
                    </div>
                  </OrnateFrame>
                </HoverCard>
              </Reveal>

              <Reveal delay={0.2}>
                <HoverCard className="h-full">
                  <OrnateFrame className="h-full hover:border-iron-bright">
                    <h3 className="mb-5 font-display text-bone text-lg tracking-wider">
                      {t('traitsTitle')}
                    </h3>
                    <StaggerList className="space-y-3 text-sm">
                      {traits.map((trait) => (
                        <StaggerItem
                          key={trait}
                          className="group/trait flex gap-3 text-aqua-100 transition-colors hover:text-bone"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold transition-transform duration-300 group-hover/trait:rotate-[225deg] group-hover/trait:scale-150"
                          />
                          {trait}
                        </StaggerItem>
                      ))}
                    </StaggerList>
                    <h3 className="mt-6 mb-2 font-display text-bone text-sm tracking-wider">
                      {t('interestsTitle')}
                    </h3>
                    <p className="text-ash text-sm leading-relaxed">
                      {t('interests')}
                    </p>
                  </OrnateFrame>
                </HoverCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

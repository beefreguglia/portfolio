'use client';

import { Code2, ExternalLink, Swords } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActHeading } from '@/components/ds/act-heading';
import { ItemIcon } from '@/components/ds/item-icon';
import { ItemSlot } from '@/components/ds/item-slot';
import { ItemTooltip } from '@/components/ds/item-tooltip';
import { rarityText } from '@/components/ds/rarity';
import { Reveal } from '@/components/motion/reveal';
import { Segmented } from '@/components/motion/segmented';
import { springs } from '@/components/motion/springs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { type Item, type ItemGroup, items, learningLog } from '@/content/items';
import { demos } from '@/demos/registry';
import { cn } from '@/lib/utils';

const groups: ItemGroup[] = ['professional', 'personal'];

export function Arsenal() {
  const t = useTranslations('arsenal');
  const [group, setGroup] = useState<ItemGroup>('professional');
  const list = items.filter((i) => i.group === group);
  const [selectedId, setSelectedId] = useState(list[0].id);
  const [demoOpen, setDemoOpen] = useState(false);

  const selected: Item = list.find((i) => i.id === selectedId) ?? list[0];
  const Demo = selected.demo ? demos[selected.demo] : null;
  const key = `items.${selected.id}` as const;
  const isProfessional = selected.group === 'professional';

  function changeGroup(next: ItemGroup) {
    setGroup(next);
    setSelectedId(items.find((i) => i.group === next)?.id ?? '');
  }

  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-title"
      className="relative bg-stone-texture px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ActHeading
          id="arsenal-title"
          kicker={t('kicker')}
          title={t('title')}
          description={t('description')}
        />

        <Segmented
          legend={t('inventory')}
          value={group}
          onChange={changeGroup}
          size="md"
          className="mx-auto mb-10"
          itemClassName="font-heading uppercase tracking-[0.18em]"
          options={groups.map((g) => ({ value: g, label: t(`tabs.${g}`) }))}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <Reveal>
            <div className="panel p-4 md:p-5">
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-bone tracking-widest">
                  {t('inventory')}
                </h3>
                <p className="text-smoke text-xs">{t('selectHint')}</p>
              </div>
              <motion.ul
                key={group}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
                className={cn(
                  'grid gap-2.5',
                  group === 'professional' ? 'grid-cols-3' : 'grid-cols-4'
                )}
              >
                {list.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.6, rotate: -8 },
                      visible: { opacity: 1, scale: 1, rotate: 0 },
                    }}
                    transition={springs.bouncy}
                  >
                    <ItemSlot
                      rarity={item.rarity}
                      selected={item.id === selected.id}
                      label={t(`items.${item.id}.name`)}
                      onClick={() => setSelectedId(item.id)}
                      onPointerMove={(e) => {
                        // Ignora eventos sintéticos disparados pela rolagem
                        const moved = e.movementX !== 0 || e.movementY !== 0;
                        if (e.pointerType === 'mouse' && moved) {
                          setSelectedId(item.id);
                        }
                      }}
                      selectionId={group}
                      className={cn('w-full', rarityText[item.rarity])}
                    >
                      <ItemIcon
                        name={item.icon}
                        className={cn(
                          'size-8 md:size-10',
                          rarityText[item.rarity]
                        )}
                      />
                    </ItemSlot>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{
                  opacity: 0,
                  x: 16,
                  scale: 0.98,
                  filter: 'blur(4px)',
                }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -16, scale: 0.98, filter: 'blur(4px)' }}
                transition={springs.snappy}
              >
                <ItemTooltip
                  name={t(`${key}.name`)}
                  rarity={selected.rarity}
                  rarityLabel={t(`rarity.${selected.rarity}`)}
                  kind={t(`${key}.kind`)}
                  stats={t.raw(`${key}.stats`) as string[]}
                  flavor={
                    t.has(`${key}.flavor`) ? t(`${key}.flavor`) : undefined
                  }
                  requires={selected.techs}
                  requiresLabel={t('requires')}
                >
                  {isProfessional && (
                    <dl className="grid gap-4 border-iron border-t pt-4 md:grid-cols-3">
                      {(['problem', 'solution', 'learned'] as const).map(
                        (part) => (
                          <div key={part}>
                            <dt className="mb-1 font-heading text-[0.7rem] text-gold-dim uppercase tracking-[0.2em]">
                              {t(`case.${part}`)}
                            </dt>
                            <dd className="text-ash text-sm leading-relaxed">
                              {t(`${key}.${part}`)}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    {Demo && (
                      <Button onClick={() => setDemoOpen(true)}>
                        <Swords />
                        {t('openDemo')}
                      </Button>
                    )}
                    {selected.live && (
                      <Button asChild variant="secondary">
                        <a
                          href={selected.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink />
                          {t('viewLive')}
                        </a>
                      </Button>
                    )}
                    {selected.repo && (
                      <Button asChild variant="secondary">
                        <a
                          href={selected.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Code2 />
                          {t('viewRepo')}
                        </a>
                      </Button>
                    )}
                  </div>
                </ItemTooltip>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {group === 'personal' && (
          <Reveal className="mt-12">
            <div className="panel p-5 md:p-6">
              <h3 className="font-display text-bone tracking-widest">
                {t('learning.title')}
              </h3>
              <p className="mt-1 text-sm text-smoke">
                {t('learning.description')}
              </p>
              <ol className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {learningLog.map((entry) => (
                  <li key={entry.label}>
                    <a
                      href={entry.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline gap-3 text-sm"
                    >
                      <span className="font-mono text-rarity-common/70 text-xs">
                        {entry.year}
                      </span>
                      <span className="text-ash transition-all group-hover:translate-x-1 group-hover:text-aqua-200">
                        {entry.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        )}
      </div>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent closeLabel={t('close')}>
          <div className="border-iron border-b px-5 py-4 pr-14">
            <DialogTitle className={rarityText[selected.rarity]}>
              {t(`${key}.name`)}
            </DialogTitle>
            <DialogDescription>
              {t(`${key}.kind`)} ·{' '}
              {selected.repo ? t('recreatedPublic') : t('recreated')}
            </DialogDescription>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
            {Demo && <Demo />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { Segmented } from '@/components/motion/segmented';
import { cn } from '@/lib/utils';
import { type Channel, generateProperties, type StayEvent } from './data';

const DAYS = 90;
const ROW = 44;
const COL = 48;
const HEADER = 52;
const LEFT = 112;

type Filter = 'all' | 'reservation' | 'block';

const channelStyle: Record<Channel, string> = {
  airbnb: 'border-rose-400/60 bg-rose-500/25 text-rose-100',
  booking: 'border-sky-400/60 bg-sky-500/25 text-sky-100',
  direct: 'border-aqua-400/60 bg-aqua-500/25 text-aqua-50',
};

const allProperties = generateProperties(120, DAYS);

export default function CalendarDemo() {
  const t = useTranslations('demos.calendar');
  const format = useFormatter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [ownerView, setOwnerView] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const properties = useMemo(
    () =>
      ownerView
        ? allProperties.filter((p) => p.ownerId === 'owner-1')
        : allProperties,
    [ownerView]
  );

  const rows = useVirtualizer({
    count: properties.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW,
    overscan: 6,
  });

  const cols = useVirtualizer({
    horizontal: true,
    count: DAYS,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => COL,
    overscan: 4,
  });

  const virtualCols = cols.getVirtualItems();
  const firstCol = virtualCols[0]?.index ?? 0;
  const lastCol = virtualCols.at(-1)?.index ?? 0;

  const visible = (e: StayEvent) =>
    (filter === 'all' || e.kind === filter) &&
    e.start <= lastCol &&
    e.start + e.nights > firstCol;

  const dayDate = (index: number) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);

  const label = (e: StayEvent) => {
    if (e.kind === 'block') return t(e.reason ?? 'block');
    return ownerView ? t('guestHidden') : e.guest;
  };

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'reservation', label: t('filterReservations') },
    { id: 'block', label: t('filterBlocks') },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          legend={t('title')}
          value={filter}
          onChange={setFilter}
          options={filters.map((f) => ({ value: f.id, label: f.label }))}
        />

        <label className="flex cursor-pointer items-center gap-2 text-ash text-sm">
          <input
            type="checkbox"
            checked={ownerView}
            onChange={(e) => setOwnerView(e.target.checked)}
            className="size-4 accent-aqua-400"
          />
          {t('ownerView')}
        </label>
      </div>

      <p className="text-smoke text-xs">
        {ownerView ? t('ownerNote') : t('hint')} ·{' '}
        {t('properties', { count: properties.length, days: DAYS })}
      </p>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="relative h-[26rem] overflow-auto rounded-lg border border-iron bg-abyss-deep"
      >
        <div
          className="relative"
          style={{
            width: LEFT + cols.getTotalSize(),
            height: HEADER + rows.getTotalSize(),
          }}
        >
          {/* Cabeçalho de datas (fixo no topo) */}
          <div
            className="sticky top-0 z-20 border-iron border-b bg-stone-1"
            style={{ height: HEADER, width: LEFT + cols.getTotalSize() }}
          >
            <div
              className="sticky left-0 z-10 flex h-full items-center border-iron border-r bg-stone-2 px-3 font-heading text-[0.65rem] text-smoke uppercase tracking-[0.2em]"
              style={{ width: LEFT }}
            >
              {t('property')}
            </div>
            {virtualCols.map((col) => {
              const date = dayDate(col.index);
              const weekend = date.getDay() === 0 || date.getDay() === 6;
              return (
                <div
                  key={col.key}
                  className={cn(
                    'absolute top-0 flex h-full flex-col items-center justify-center border-iron/50 border-r text-xs',
                    weekend ? 'bg-stone-2/60' : ''
                  )}
                  style={{ left: LEFT + col.start, width: col.size }}
                >
                  <span className="text-[0.6rem] text-smoke uppercase">
                    {format.dateTime(date, { weekday: 'short' }).slice(0, 3)}
                  </span>
                  <span
                    className={cn(
                      'font-mono',
                      col.index === 0 ? 'text-aqua-300' : 'text-ash'
                    )}
                  >
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {rows.getVirtualItems().map((row) => {
            const property = properties[row.index];
            return (
              <div
                key={property.id}
                className="absolute left-0 border-iron/40 border-b"
                style={{
                  top: HEADER + row.start,
                  height: row.size,
                  width: LEFT + cols.getTotalSize(),
                }}
              >
                {/* Coluna de imóveis (fixa à esquerda) */}
                <div
                  className="sticky left-0 z-10 flex h-full flex-col justify-center border-iron border-r bg-stone-1 px-3"
                  style={{ width: LEFT }}
                >
                  <span className="font-mono text-bone text-xs">
                    {property.code}
                  </span>
                </div>

                {property.events.filter(visible).map((e) => (
                  <div
                    key={e.id}
                    title={`${label(e)} · ${t('nights', { count: e.nights })}`}
                    className={cn(
                      'absolute top-1.5 bottom-1.5 flex items-center overflow-hidden border px-3 text-[0.7rem] transition-[filter,transform] hover:z-10 hover:scale-y-110 hover:brightness-125',
                      e.kind === 'block'
                        ? 'border-gold-dim/60 bg-[repeating-linear-gradient(45deg,oklch(from_var(--gold-dim)_l_c_h/0.25)_0_6px,transparent_6px_12px)] text-gold'
                        : channelStyle[e.channel ?? 'direct']
                    )}
                    style={{
                      left: LEFT + e.start * COL + COL / 2,
                      width: e.nights * COL - 4,
                      borderRadius: 9999,
                    }}
                  >
                    <span className="truncate">{label(e)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <ul className="flex flex-wrap gap-4 text-smoke text-xs">
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-rose-400/60 bg-rose-500/25" />
          Airbnb
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-sky-400/60 bg-sky-500/25" />
          Booking
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-aqua-400/60 bg-aqua-500/25" />
          Direct
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border border-gold-dim/60 bg-gold-dim/25" />
          {t('block')}
        </li>
      </ul>
    </div>
  );
}

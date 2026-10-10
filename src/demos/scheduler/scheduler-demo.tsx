'use client';

import { Check, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { springs } from '@/components/motion/springs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  type Appointment,
  findSlots,
  formatTime,
  type Weekday,
} from './availability';
import {
  clinicHours,
  initialAppointments,
  professionals,
  rooms,
  services,
} from './data';

const days: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export default function SchedulerDemo() {
  const t = useTranslations('demos.scheduler');
  const weekdayNames = t.raw('weekdays') as string[];
  const [serviceId, setServiceId] = useState(services[0].id);
  const [weekday, setWeekday] = useState<Weekday>(1);
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [lastBooked, setLastBooked] = useState<string | null>(null);

  const service = services.find((s) => s.id === serviceId) ?? services[0];

  const slots = useMemo(
    () =>
      findSlots({
        service,
        weekday,
        professionals,
        rooms,
        clinicHours,
        appointments,
      }),
    [service, weekday, appointments]
  );

  const byTime = useMemo(() => {
    const groups = new Map<number, typeof slots>();
    for (const slot of slots) {
      groups.set(slot.start, [...(groups.get(slot.start) ?? []), slot]);
    }
    return [...groups.entries()];
  }, [slots]);

  function book(slot: (typeof slots)[number]) {
    setAppointments((prev) => [...prev, { ...slot, weekday }]);
    setLastBooked(`${slot.start}-${slot.professionalId}`);
  }

  const proName = (id: string) =>
    professionals.find((p) => p.id === id)?.name ?? id;
  const roomName = (id: string) => rooms.find((r) => r.id === id)?.name ?? id;

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div className="space-y-6">
        <fieldset>
          <legend className="mb-2 font-heading text-[0.7rem] text-smoke uppercase tracking-[0.2em]">
            {t('service')}
          </legend>
          <div className="grid gap-2">
            {services.map((s) => (
              <motion.button
                key={s.id}
                type="button"
                aria-pressed={s.id === serviceId}
                onClick={() => setServiceId(s.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'relative flex cursor-pointer items-center justify-between rounded-lg border border-iron px-3 py-2 text-left text-sm transition-colors',
                  s.id === serviceId
                    ? 'text-aqua-100'
                    : 'text-ash hover:border-iron-bright'
                )}
              >
                {s.id === serviceId && (
                  <motion.span
                    layoutId="scheduler-service"
                    transition={springs.snappy}
                    className="-inset-px absolute rounded-lg border border-aqua-400 bg-aqua-950/60 shadow-glow-sm"
                  />
                )}
                <span className="relative">{t(`services.${s.id}`)}</span>
                <span className="relative font-mono text-smoke text-xs">
                  {t('minutes', { count: s.durationMin })}
                </span>
              </motion.button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-heading text-[0.7rem] text-smoke uppercase tracking-[0.2em]">
            {t('day')}
          </legend>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const closed = !clinicHours[d];
              return (
                <motion.button
                  key={d}
                  type="button"
                  disabled={closed}
                  aria-pressed={d === weekday}
                  title={closed ? t('closed') : undefined}
                  onClick={() => setWeekday(d)}
                  whileTap={closed ? undefined : { scale: 0.9 }}
                  className={cn(
                    'relative cursor-pointer rounded-lg border border-iron py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-30',
                    d === weekday
                      ? 'text-aqua-100'
                      : 'text-ash hover:border-iron-bright'
                  )}
                >
                  {d === weekday && (
                    <motion.span
                      layoutId="scheduler-day"
                      transition={springs.snappy}
                      className="-inset-px absolute rounded-lg border border-aqua-400 bg-aqua-950/60"
                    />
                  )}
                  <span className="relative">{weekdayNames[d]}</span>
                </motion.button>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-lg border border-iron bg-abyss-deep/60 p-4">
          <p className="mb-3 font-heading text-[0.7rem] text-gold-dim uppercase tracking-[0.2em]">
            {t('rules')}
          </p>
          <ul className="space-y-2 text-ash text-xs">
            {(['ruleSkill', 'ruleShift', 'ruleRoom', 'ruleBusy'] as const).map(
              (rule) => (
                <li key={rule} className="flex gap-2">
                  <Check className="size-3.5 shrink-0 text-aqua-400" />
                  {t(rule)}
                </li>
              )
            )}
          </ul>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setAppointments(initialAppointments);
            setLastBooked(null);
          }}
        >
          <RotateCcw />
          {t('reset')}
        </Button>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h4 className="font-display text-bone">{t('slots')}</h4>
          <motion.span
            key={slots.length}
            initial={{ scale: 1.4, color: 'var(--aqua-300)' }}
            animate={{ scale: 1, color: 'var(--smoke)' }}
            className="font-mono text-xs"
          >
            {slots.length}
          </motion.span>
        </div>
        <p aria-live="polite" className="mb-3 min-h-5 text-aqua-300 text-sm">
          <AnimatePresence mode="wait">
            {lastBooked && (
              <motion.span
                key={lastBooked}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-block"
              >
                ✦ {t('booked')}
              </motion.span>
            )}
          </AnimatePresence>
        </p>
        {byTime.length === 0 ? (
          <p className="rounded-lg border border-iron border-dashed p-8 text-center text-smoke">
            {t('noSlots')}
          </p>
        ) : (
          <motion.ul
            key={`${serviceId}-${weekday}`}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.025 } } }}
            className="grid max-h-[26rem] gap-2 overflow-y-auto pr-1 sm:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {byTime.map(([start, group]) => (
                <motion.li
                  key={start}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={springs.soft}
                  className="rounded-lg border border-iron bg-abyss-deep/60 p-3"
                >
                  <p className="mb-2 font-mono text-aqua-200">
                    {formatTime(start)}
                    <span className="text-smoke">
                      {' '}
                      – {formatTime(group[0].end)}
                    </span>
                  </p>
                  <ul className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {group.map((slot) => (
                        <motion.li
                          key={slot.professionalId}
                          layout
                          exit={{ opacity: 0, x: 24, height: 0 }}
                          transition={springs.soft}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="text-ash">
                            {t('with')}{' '}
                            <span className="text-bone">
                              {proName(slot.professionalId)}
                            </span>{' '}
                            ·{' '}
                            <span className="text-smoke">
                              {roomName(slot.roomId)}
                            </span>
                          </span>
                          <motion.button
                            type="button"
                            onClick={() => book(slot)}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-pointer rounded-lg border border-aqua-700 px-2 py-0.5 text-aqua-200 text-xs transition-colors hover:bg-aqua-900/60"
                          >
                            {t('book')}
                          </motion.button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}

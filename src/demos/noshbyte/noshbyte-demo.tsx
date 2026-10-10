'use client';

import { Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useFormatter, useTranslations } from 'next-intl';
import { Fragment, useEffect, useRef, useState } from 'react';
import { springs } from '@/components/motion/springs';
import { cn } from '@/lib/utils';
import { evaluation, type ModelResult } from './results';

// Cores validadas (dataviz validator, superfície escura): série e destaque.
const SERIES = '#1fa898';
const HIGHLIGHT = '#bd7f28';

const W = 640;
const H = 320;
const M = { top: 20, right: 24, bottom: 44, left: 48 };
const X_MAX = 8;
const Y_MIN = 3.4;
const Y_MAX = 4.6;

const x = (ms: number) => M.left + (ms / 1000 / X_MAX) * (W - M.left - M.right);
const y = (score: number) =>
  M.top + (1 - (score - Y_MIN) / (Y_MAX - Y_MIN)) * (H - M.top - M.bottom);

const best = evaluation.results.reduce((a, b) =>
  b.overall > a.overall ? b : a
);
const fastest = evaluation.results.reduce((a, b) =>
  b.latencyMs < a.latencyMs ? b : a
);

function Chart() {
  const t = useTranslations('demos.noshbyte');
  const format = useFormatter();
  const [hovered, setHovered] = useState<ModelResult | null>(null);
  const num = (v: number, digits = 2) =>
    format.number(v, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });

  return (
    <figure className="relative">
      <figcaption className="mb-3">
        <p className="font-display text-bone">{t('chartTitle')}</p>
        <p className="text-smoke text-xs leading-relaxed">
          {t('chartDescription')}
        </p>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={t('chartTitle')}
      >
        {/* Grade e eixos */}
        {[3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6].map((v) => (
          <g key={v}>
            <line
              x1={M.left}
              x2={W - M.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--stone-3)"
              strokeWidth={1}
            />
            <text
              x={M.left - 8}
              y={y(v)}
              dy="0.32em"
              textAnchor="end"
              className="fill-smoke text-[11px]"
            >
              {num(v, 1)}
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8].map((s) => (
          <text
            key={s}
            x={x(s * 1000)}
            y={H - M.bottom + 18}
            textAnchor="middle"
            className="fill-smoke text-[11px]"
          >
            {s}s
          </text>
        ))}
        <text
          x={(M.left + W - M.right) / 2}
          y={H - 6}
          textAnchor="middle"
          className="fill-ash text-[11px]"
        >
          {t('latency')}
        </text>
        <text
          transform={`translate(12 ${(M.top + H - M.bottom) / 2}) rotate(-90)`}
          textAnchor="middle"
          className="fill-ash text-[11px]"
        >
          {t('quality')}
        </text>

        {evaluation.results.map((r, index) => {
          const cx = x(r.latencyMs);
          const cy = y(r.overall);
          const isBest = r === best;
          return (
            // biome-ignore lint/a11y/useSemanticElements: <button> não é válido dentro de SVG; o ponto precisa de foco para o tooltip
            <g
              key={r.model}
              role="button"
              onPointerEnter={() => setHovered(r)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(r)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-label={`${r.model}: ${num(r.overall)} · ${num(r.latencyMs / 1000, 1)}s`}
              className="cursor-pointer outline-none"
            >
              <circle cx={cx} cy={cy} r={14} fill="transparent" />
              <motion.circle
                cx={cx}
                cy={cy}
                initial={{ r: 0 }}
                animate={{ r: hovered === r ? 7.5 : 5.5 }}
                transition={{
                  ...springs.bouncy,
                  delay: hovered ? 0 : 0.15 + index * 0.08,
                }}
                fill={isBest ? HIGHLIGHT : SERIES}
                stroke="var(--stone-1)"
                strokeWidth={2}
              />
              <text
                x={cx + r.label.dx}
                y={cy + r.label.dy}
                textAnchor={r.label.anchor}
                dy="0.32em"
                className={cn(
                  'text-[11px]',
                  hovered === r ? 'fill-bone' : 'fill-ash'
                )}
              >
                {r.model}
              </text>
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.model}
            // Só opacidade: o transform inline posiciona o tooltip
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 rounded-lg border border-iron bg-abyss-deep/95 px-3 py-2 text-xs shadow-panel"
            style={{
              left: `${(x(hovered.latencyMs) / W) * 100}%`,
              top: `calc(${(y(hovered.overall) / H) * 100}% + 2.5rem)`,
              transform:
                x(hovered.latencyMs) > W * 0.6
                  ? 'translate(calc(-100% - 12px), -50%)'
                  : 'translate(12px, -50%)',
            }}
          >
            <p className="font-mono text-bone">{hovered.model}</p>
            <p className="text-smoke">{hovered.provider}</p>
            <dl className="mt-1 grid grid-cols-[auto_auto] gap-x-3 text-ash">
              <dt>{t('quality')}</dt>
              <dd className="text-right font-mono text-bone">
                {num(hovered.overall)}
              </dd>
              <dt>{t('latency')}</dt>
              <dd className="text-right font-mono text-bone">
                {num(hovered.latencyMs / 1000, 1)}
              </dd>
              <dt>{t('tokens')}</dt>
              <dd className="text-right font-mono text-bone">
                {format.number(hovered.tokens)}
              </dd>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>

      <details className="mt-3 text-xs">
        <summary className="cursor-pointer text-smoke hover:text-ash">
          {t('table')}
        </summary>
        <table className="mt-2 w-full text-left">
          <thead className="text-smoke">
            <tr>
              <th className="py-1 font-normal">{t('model')}</th>
              <th className="py-1 text-right font-normal">{t('quality')}</th>
              <th className="py-1 text-right font-normal">{t('latency')}</th>
              <th className="py-1 text-right font-normal">{t('tokens')}</th>
            </tr>
          </thead>
          <tbody className="font-mono text-ash">
            {evaluation.results.map((r) => (
              <tr key={r.model} className="border-iron border-t">
                <td className="py-1">{r.model}</td>
                <td className="py-1 text-right">{num(r.overall)}</td>
                <td className="py-1 text-right">
                  {num(r.latencyMs / 1000, 1)}
                </td>
                <td className="py-1 text-right">{format.number(r.tokens)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

function renderBold(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={part} className="font-semibold text-aqua-200">
        {part}
      </strong>
    ) : (
      <Fragment key={part}>{part}</Fragment>
    )
  );
}

function ChatPreview() {
  const t = useTranslations('demos.noshbyte');
  const prompts = t.raw('prompts') as string[];
  const answers = t.raw('answers') as string[];
  const [active, setActive] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [thinking, setThinking] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => () => clearInterval(timer.current ?? undefined), []);

  function ask(index: number) {
    clearInterval(timer.current ?? undefined);
    setActive(index);
    setTyped('');
    setThinking(true);
    const answer = answers[index];
    setTimeout(() => {
      setThinking(false);
      let i = 0;
      // Simula o streaming de tokens do chat real
      timer.current = setInterval(() => {
        i += 3;
        setTyped(answer.slice(0, i));
        if (i >= answer.length) clearInterval(timer.current ?? undefined);
      }, 18);
    }, 700);
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-iron bg-abyss-deep/60">
      <div className="border-iron border-b px-4 py-3">
        <p className="font-display text-bone">{t('chatTitle')}</p>
        <p className="text-smoke text-xs">{t('chatNote')}</p>
      </div>
      <div
        className="flex min-h-56 flex-1 flex-col gap-3 p-4 text-sm"
        aria-live="polite"
      >
        {active !== null && (
          <>
            <motion.p
              key={`q-${active}`}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={springs.soft}
              className="ml-auto max-w-[85%] rounded-lg border border-aqua-800 bg-aqua-950/60 px-3 py-2 text-aqua-50"
            >
              {prompts[active]}
            </motion.p>
            <motion.div
              key={`a-${active}`}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ...springs.soft, delay: 0.15 }}
              className="max-w-[90%] rounded-lg border border-iron bg-stone-2 px-3 py-2 text-ash leading-relaxed"
            >
              {thinking ? (
                <span className="animate-pulse text-smoke italic">
                  {t('thinking')}
                </span>
              ) : (
                renderBold(typed)
              )}
            </motion.div>
          </>
        )}
      </div>
      <div className="grid gap-2 border-iron border-t p-3">
        {prompts.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => ask(i)}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-iron px-3 py-2 text-left text-ash text-xs transition-colors hover:border-aqua-600 hover:text-aqua-100"
          >
            {p}
            <Send className="size-3.5 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function NoshbyteDemo() {
  const t = useTranslations('demos.noshbyte');
  const format = useFormatter();

  const stats = [
    { value: String(evaluation.results.length), label: t('models') },
    { value: String(evaluation.scenarios), label: t('scenarios') },
    { value: String(evaluation.judges), label: t('judges') },
    {
      value: format.number(best.overall, { maximumFractionDigits: 2 }),
      label: `${t('best')} · ${best.model}`,
    },
    {
      value: `${format.number(fastest.latencyMs / 1000, { maximumFractionDigits: 1 })}s`,
      label: `${t('fastest')} · ${fastest.model}`,
    },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col-reverse rounded-lg border border-iron bg-abyss-deep/60 p-3"
          >
            <dt className="text-[0.7rem] text-smoke leading-tight">
              {s.label}
            </dt>
            <dd className="font-display text-2xl text-bone">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Chart />
        <ChatPreview />
      </div>
    </div>
  );
}

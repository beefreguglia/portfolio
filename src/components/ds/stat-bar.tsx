import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  tone?: 'aqua' | 'gold';
  className?: string;
}

export function StatBar({
  label,
  value,
  max = 100,
  tone = 'aqua',
  className,
}: StatBarProps) {
  const percent = Math.round((value / max) * 100);
  return (
    <div className={cn('group space-y-1.5', className)}>
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="text-ash uppercase tracking-wider">{label}</span>
        <span className={tone === 'aqua' ? 'text-aqua-300' : 'text-gold'}>
          {value}
        </span>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: <meter> nativo não aceita o visual de barra ornamentada */}
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 rounded-full border border-iron bg-abyss-deep p-px"
      >
        <div
          className={cn(
            'h-full rounded-full',
            tone === 'aqua'
              ? 'bg-linear-to-r from-aqua-700 to-aqua-300 shadow-glow-sm transition-shadow group-hover:shadow-glow'
              : 'bg-linear-to-r from-gold-dim to-gold'
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

/** Linha ornamental com uma runa central. */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex items-center gap-3 text-aqua-500', className)}
    >
      <span className="h-px flex-1 bg-linear-to-r from-transparent via-iron-bright to-aqua-700" />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
      >
        <path d="M12 2l4 10-4 10-4-10z" stroke="currentColor" />
        <path d="M12 7l2 5-2 5-2-5z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent via-iron-bright to-aqua-700" />
    </div>
  );
}

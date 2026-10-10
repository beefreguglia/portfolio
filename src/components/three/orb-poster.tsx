import { cn } from '@/lib/utils';

/** Orbe estático em CSS: placeholder enquanto o 3D carrega e fallback para quem prefere menos movimento. */
export function OrbPoster({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative flex items-center justify-center', className)}
    >
      <div className="relative aspect-square w-[58%] rounded-full bg-radial-[at_40%_35%] from-aqua-300 via-aqua-700 to-aqua-950 shadow-[0_0_80px_-10px_var(--aqua-400),inset_0_0_40px_var(--aqua-950)] ring-1 ring-aqua-200/30 ring-offset-4 ring-offset-transparent">
        <div className="absolute inset-0 animate-orb-swirl rounded-full bg-conic from-transparent via-aqua-200/25 to-transparent" />
        <div className="absolute top-[14%] left-[22%] h-[18%] w-[30%] rounded-full bg-white/25 blur-md" />
      </div>
    </div>
  );
}

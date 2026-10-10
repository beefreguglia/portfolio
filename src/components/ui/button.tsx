import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'group/button relative inline-flex rounded-md cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap font-heading font-semibold uppercase tracking-[0.14em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'border border-aqua-300/70 bg-linear-to-b from-aqua-500 to-aqua-700 text-abyss-deep shadow-glow-sm [text-shadow:0_1px_0_oklch(1_0_0/0.25)] before:pointer-events-none before:absolute before:inset-[3px] before:rounded-[calc(var(--radius-md)-3px)] before:border before:border-aqua-100/30 hover:from-aqua-400 hover:to-aqua-600 hover:shadow-glow',
        secondary:
          'border border-iron-bright bg-linear-to-b from-stone-3 to-stone-1 text-bone before:pointer-events-none before:absolute before:inset-[3px] before:rounded-[calc(var(--radius-md)-3px)] before:border before:border-white/5 hover:border-aqua-500/70 hover:text-aqua-100 hover:shadow-glow-sm',
        ghost:
          'text-ash hover:bg-white/5 hover:text-aqua-200 normal-case tracking-normal font-sans font-medium',
        link: 'h-auto p-0 font-sans font-medium normal-case tracking-normal text-aqua-300 underline-offset-4 hover:text-aqua-200 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-[0.7rem]',
        md: 'h-11 px-6 text-xs',
        lg: 'h-13 px-8 text-sm',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

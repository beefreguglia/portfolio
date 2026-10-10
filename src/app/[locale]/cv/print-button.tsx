'use client';

import { Printer } from 'lucide-react';

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-700"
    >
      <Printer className="size-4" />
      {label}
    </button>
  );
}

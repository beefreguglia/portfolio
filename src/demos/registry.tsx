'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { DemoId } from '@/content/items';

function Loading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <span className="size-10 animate-spin rounded-full border-2 border-aqua-800 border-t-aqua-300" />
    </div>
  );
}

/** Cada demo é carregada só quando o modal abre. */
export const demos: Record<DemoId, ComponentType> = {
  calendar: dynamic(() => import('./calendar/calendar-demo'), {
    loading: Loading,
  }),
  multistep: dynamic(() => import('./multistep/multistep-demo'), {
    loading: Loading,
  }),
  scheduler: dynamic(() => import('./scheduler/scheduler-demo'), {
    loading: Loading,
  }),
  seasonal: dynamic(() => import('./seasonal/seasonal-demo'), {
    loading: Loading,
  }),
  catalog: dynamic(() => import('./catalog/catalog-demo'), {
    loading: Loading,
  }),
  noshbyte: dynamic(() => import('./noshbyte/noshbyte-demo'), {
    loading: Loading,
  }),
};

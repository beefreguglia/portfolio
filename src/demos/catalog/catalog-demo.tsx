'use client';

import { Hammer, House, Package, Search, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useFormatter, useTranslations } from 'next-intl';
import { type CSSProperties, useMemo, useState } from 'react';
import { Segmented } from '@/components/motion/segmented';
import { springs } from '@/components/motion/springs';
import { cn } from '@/lib/utils';

type Category = 'structure' | 'finishing' | 'hydraulic';

interface Product {
  id: string;
  name: string;
  category: Category;
  unit: string;
  price: number;
}

interface Tenant {
  id: string;
  name: string;
  icon: typeof Hammer;
  tokens: Record<string, string>;
  products: Product[];
}

/** Dois lojistas, mesma plataforma: marca e catálogo vêm do tenant. */
const tenants: Tenant[] = [
  {
    id: 'construmax',
    name: 'Construmax',
    icon: Hammer,
    tokens: { '--c-accent': '#f28c28', '--c-accent-fg': '#1d1206' },
    products: [
      {
        id: 'c1',
        name: 'Cimento CP II 50kg',
        category: 'structure',
        unit: 'saco',
        price: 38.9,
      },
      {
        id: 'c2',
        name: 'Vergalhão CA-50 10mm',
        category: 'structure',
        unit: 'barra',
        price: 54.5,
      },
      {
        id: 'c3',
        name: 'Bloco cerâmico 14×19×29',
        category: 'structure',
        unit: 'milheiro',
        price: 1290,
      },
      {
        id: 'c4',
        name: 'Porcelanato 60×60 acetinado',
        category: 'finishing',
        unit: 'm²',
        price: 79.9,
      },
      {
        id: 'c5',
        name: 'Argamassa AC-III 20kg',
        category: 'finishing',
        unit: 'saco',
        price: 42,
      },
      {
        id: 'c6',
        name: 'Tubo PVC soldável 25mm',
        category: 'hydraulic',
        unit: 'barra 6m',
        price: 21.8,
      },
      {
        id: 'c7',
        name: 'Registro de gaveta 3/4"',
        category: 'hydraulic',
        unit: 'un',
        price: 64.9,
      },
    ],
  },
  {
    id: 'casaobra',
    name: 'Casa & Obra',
    icon: House,
    tokens: { '--c-accent': '#3d8bfd', '--c-accent-fg': '#04121f' },
    products: [
      {
        id: 'h1',
        name: 'Areia média lavada',
        category: 'structure',
        unit: 'm³',
        price: 145,
      },
      {
        id: 'h2',
        name: 'Brita 1',
        category: 'structure',
        unit: 'm³',
        price: 160,
      },
      {
        id: 'h3',
        name: 'Tinta acrílica fosca 18L',
        category: 'finishing',
        unit: 'lata',
        price: 389,
      },
      {
        id: 'h4',
        name: 'Rejunte flexível 1kg',
        category: 'finishing',
        unit: 'un',
        price: 18.5,
      },
      {
        id: 'h5',
        name: 'Caixa d’água 1000L',
        category: 'hydraulic',
        unit: 'un',
        price: 529,
      },
      {
        id: 'h6',
        name: 'Joelho 90° PVC 25mm',
        category: 'hydraulic',
        unit: 'un',
        price: 2.4,
      },
    ],
  },
];

const categories = ['all', 'structure', 'finishing', 'hydraulic'] as const;

export default function CatalogDemo() {
  const t = useTranslations('demos.catalog');
  const format = useFormatter();
  const [tenantId, setTenantId] = useState(tenants[0].id);
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const [query, setQuery] = useState('');
  const [quote, setQuote] = useState<Set<string>>(new Set());

  const tenant = tenants.find((tn) => tn.id === tenantId) ?? tenants[0];

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tenant.products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        p.name.toLowerCase().includes(q)
    );
  }, [tenant, category, query]);

  function toggle(id: string) {
    setQuote((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const quoteCount = tenant.products.filter((p) => quote.has(p.id)).length;

  return (
    <div style={tenant.tokens as CSSProperties} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          legend={t('tenantLabel')}
          value={tenantId}
          onChange={setTenantId}
          indicatorClassName="border border-(--c-accent)/60 bg-stone-3"
          options={tenants.map((tn) => ({
            value: tn.id,
            label: (
              <>
                <tn.icon className="size-3.5" />
                {tn.name}
              </>
            ),
          }))}
        />
        <span className="flex items-center gap-2 text-ash text-sm">
          <ShoppingCart className="size-4 text-(--c-accent)" />
          {t('quote')}
          <motion.span
            key={quoteCount}
            initial={{ scale: 1.6 }}
            animate={{ scale: 1 }}
            transition={springs.bouncy}
            className="min-w-6 rounded-full bg-(--c-accent) px-1.5 text-center font-mono text-(--c-accent-fg) text-xs"
          >
            {quoteCount}
          </motion.span>
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-iron bg-abyss-deep px-3 focus-within:border-(--c-accent)">
          <Search className="size-4 text-smoke" />
          <span className="sr-only">{t('search')}</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full min-w-40 bg-transparent py-2 text-bone text-sm outline-none placeholder:text-smoke/70"
          />
        </label>
        <Segmented
          variant="pills"
          legend={t('categories.all')}
          value={category}
          onChange={setCategory}
          indicatorClassName="border border-(--c-accent) bg-(--c-accent)/15"
          options={categories.map((c) => ({
            value: c,
            label: t(`categories.${c}`),
          }))}
        />
      </div>

      {products.length === 0 ? (
        <p className="rounded-lg border border-iron border-dashed p-8 text-center text-smoke">
          {t('empty')}
        </p>
      ) : (
        <motion.ul layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {products.map((p) => {
              const added = quote.has(p.id);
              return (
                <motion.li
                  key={`${tenant.id}-${p.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  transition={springs.soft}
                  className="flex flex-col rounded-lg border border-iron bg-abyss-deep/60 p-4 transition-colors hover:border-(--c-accent)/60"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-stone-2">
                    <Package className="size-5 text-(--c-accent)" />
                  </div>
                  <p className="text-bone text-sm">{p.name}</p>
                  <p className="mt-1 font-mono text-ash text-sm">
                    {format.number(p.price, {
                      style: 'currency',
                      currency: 'BRL',
                    })}{' '}
                    <span className="text-smoke text-xs">
                      {t('unit', { unit: p.unit })}
                    </span>
                  </p>
                  <motion.button
                    type="button"
                    aria-pressed={added}
                    onClick={() => toggle(p.id)}
                    whileTap={{ scale: 0.94 }}
                    className={cn(
                      'mt-4 cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors',
                      added
                        ? 'border-(--c-accent) bg-(--c-accent) text-(--c-accent-fg)'
                        : 'border-iron text-ash hover:border-(--c-accent) hover:text-bone'
                    )}
                  >
                    {added ? t('inQuote') : t('addToQuote')}
                  </motion.button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

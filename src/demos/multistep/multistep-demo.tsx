'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type FieldPath, useForm } from 'react-hook-form';
import { z } from 'zod';
import { springs } from '@/components/motion/springs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// As mensagens são chaves de tradução, resolvidas na hora de exibir.
const schema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^\S+\s+\S+/, 'name'),
  email: z.email('email'),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'phone'),
  code: z.string().regex(/^[A-Z]{3}\d{3}$/, 'code'),
  city: z.string().trim().min(2, 'city'),
  bedrooms: z.coerce
    .number<string>()
    .int()
    .min(1, 'bedrooms')
    .max(10, 'bedrooms'),
  type: z.enum(['apartment', 'house', 'studio']),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

const steps = [
  { id: 'host', fields: ['name', 'email', 'phone'] },
  { id: 'property', fields: ['code', 'city', 'bedrooms', 'type'] },
  { id: 'review', fields: [] },
] as const satisfies readonly {
  id: string;
  fields: readonly FieldPath<FormInput>[];
}[];

function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const split = d.length === 11 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, split)}-${d.slice(split)}`;
}

export default function MultistepDemo() {
  const t = useTranslations('demos.multistep');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<FormValues | null>(null);

  const form = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      code: '',
      city: '',
      bedrooms: '2',
      type: 'apartment',
    },
  });
  const { register, formState, trigger, getValues, setValue, handleSubmit } =
    form;

  async function next() {
    const valid = await trigger([...steps[step].fields]);
    if (valid) setStep((s) => s + 1);
  }

  function restart() {
    form.reset();
    setDone(null);
    setStep(0);
  }

  const fieldClass = (name: keyof FormInput) =>
    cn(
      'w-full border bg-abyss-deep px-3 py-2.5 text-bone text-sm outline-none transition-colors placeholder:text-smoke/60 focus:border-aqua-400',
      formState.errors[name] ? 'border-blood' : 'border-iron'
    );

  // Função comum (não componente) para não remontar os inputs a cada render
  function field(name: keyof FormInput, children: React.ReactNode) {
    const error = formState.errors[name]?.message;
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={`ms-${name}`}
          className="font-heading text-[0.7rem] text-smoke uppercase tracking-[0.2em]"
        >
          {t(`fields.${name}`)}
        </label>
        {children}
        <p
          id={`ms-${name}-error`}
          role="alert"
          className="min-h-4 text-blood text-xs"
        >
          {error ? t(`errors.${error}`) : ''}
        </p>
      </div>
    );
  }

  const aria = (name: keyof FormInput) => ({
    id: `ms-${name}`,
    'aria-invalid': Boolean(formState.errors[name]),
    'aria-describedby': `ms-${name}-error`,
  });

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-md flex-col items-center py-10 text-center"
      >
        <div className="mb-5 flex size-16 rotate-45 items-center justify-center border-2 border-aqua-400 shadow-glow">
          <Sparkles className="-rotate-45 size-7 text-aqua-300" />
        </div>
        <p className="font-display text-2xl text-bone">{t('success')}</p>
        <p className="mt-2 text-ash text-sm">{t('successDescription')}</p>
        <p className="mt-4 font-mono text-aqua-200 text-sm">
          {done.name} · {done.code}
        </p>
        <Button className="mt-6" variant="secondary" onClick={restart}>
          <RotateCcw />
          {t('restart')}
        </Button>
      </motion.div>
    );
  }

  const values = getValues();

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => setDone(data))}
      className="mx-auto max-w-xl"
    >
      <ol className="mb-8 flex items-center">
        {steps.map((s, i) => (
          <li key={s.id} className="flex flex-1 items-center last:flex-none">
            <motion.span
              animate={{ scale: i === step ? 1.15 : 1, rotate: 45 }}
              transition={springs.bouncy}
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-md border text-xs transition-colors',
                i < step && 'border-aqua-400 bg-aqua-800',
                i === step && 'border-aqua-300 shadow-glow-sm',
                i > step && 'border-iron'
              )}
            >
              <span className="-rotate-45 font-mono text-bone">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i < step ? 'done' : 'num'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={springs.bouncy}
                    className="flex"
                  >
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
            <span
              className={cn(
                'ml-3 hidden text-xs sm:inline',
                i === step ? 'text-aqua-200' : 'text-smoke'
              )}
            >
              {t(`steps.${s.id}`)}
            </span>
            {i < steps.length - 1 && (
              <span className="relative mx-3 h-px flex-1 bg-iron">
                <motion.span
                  initial={false}
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  transition={springs.soft}
                  className="absolute inset-0 origin-left bg-aqua-400 shadow-glow-sm"
                />
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mb-4 text-smoke text-xs">
        {t('stepOf', { current: step + 1, total: steps.length })}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          {step === 0 && (
            <>
              {field(
                'name',
                <input
                  {...register('name')}
                  {...aria('name')}
                  autoComplete="off"
                  placeholder="Marina Souza"
                  className={fieldClass('name')}
                />
              )}
              {field(
                'email',
                <input
                  {...register('email')}
                  {...aria('email')}
                  type="email"
                  autoComplete="off"
                  placeholder="marina@exemplo.com"
                  className={fieldClass('email')}
                />
              )}
              {field(
                'phone',
                <input
                  {...register('phone', {
                    onChange: (e) =>
                      setValue('phone', maskPhone(e.target.value)),
                  })}
                  {...aria('phone')}
                  inputMode="tel"
                  autoComplete="off"
                  placeholder="(48) 91234-5678"
                  className={fieldClass('phone')}
                />
              )}
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-x-4 sm:grid-cols-2">
                {field(
                  'code',
                  <input
                    {...register('code', {
                      onChange: (e) =>
                        setValue('code', e.target.value.toUpperCase()),
                    })}
                    {...aria('code')}
                    autoComplete="off"
                    placeholder="FLN012"
                    maxLength={6}
                    className={cn(fieldClass('code'), 'font-mono')}
                  />
                )}
                {field(
                  'city',
                  <input
                    {...register('city')}
                    {...aria('city')}
                    autoComplete="off"
                    placeholder="Florianópolis"
                    className={fieldClass('city')}
                  />
                )}
              </div>
              <div className="grid gap-x-4 sm:grid-cols-2">
                {field(
                  'bedrooms',
                  <input
                    {...register('bedrooms')}
                    {...aria('bedrooms')}
                    type="number"
                    min={1}
                    max={10}
                    className={fieldClass('bedrooms')}
                  />
                )}
                {field(
                  'type',
                  <select
                    {...register('type')}
                    {...aria('type')}
                    className={fieldClass('type')}
                  >
                    {(['apartment', 'house', 'studio'] as const).map((type) => (
                      <option key={type} value={type}>
                        {t(`types.${type}`)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <dl className="grid gap-x-6 gap-y-4 rounded-lg border border-iron bg-abyss-deep/60 p-5 sm:grid-cols-2">
              {(
                ['name', 'email', 'phone', 'code', 'city', 'bedrooms'] as const
              ).map((field) => (
                <div key={field}>
                  <dt className="font-heading text-[0.65rem] text-smoke uppercase tracking-[0.2em]">
                    {t(`fields.${field}`)}
                  </dt>
                  <dd className="mt-0.5 text-bone text-sm">
                    {String(values[field])}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-heading text-[0.65rem] text-smoke uppercase tracking-[0.2em]">
                  {t('fields.type')}
                </dt>
                <dd className="mt-0.5 text-bone text-sm">
                  {t(`types.${values.type}`)}
                </dd>
              </div>
            </dl>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          {t('back')}
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>
            {t('next')}
          </Button>
        ) : (
          <Button type="submit">
            <Sparkles />
            {t('submit')}
          </Button>
        )}
      </div>
    </form>
  );
}

'use client';

import { Code2, Database, MousePointer2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const techs = [
  { name: 'React.js', type: 'front', duration: 3.2, delay: 0 },
  { name: 'Next.js', type: 'front', duration: 4.5, delay: 0.5 },
  { name: 'TypeScript', type: 'front', duration: 3.8, delay: 1 },
  { name: 'Tailwind CSS', type: 'front', duration: 4.1, delay: 0.2 },
  { name: 'Styled Comp.', type: 'front', duration: 3.5, delay: 0.8 },
  { name: 'HTML & CSS', type: 'front', duration: 4.8, delay: 1.5 },
  { name: 'JavaScript', type: 'front', duration: 3.1, delay: 0.3 },
  { name: 'Node.js', type: 'back', duration: 4.2, delay: 0.7 },
  { name: 'NestJS', type: 'back', duration: 3.6, delay: 1.2 },
  { name: 'Express', type: 'back', duration: 4.9, delay: 0.4 },
  { name: 'Fastify', type: 'back', duration: 3.4, delay: 1.8 },
  { name: 'Prisma ORM', type: 'back', duration: 4.6, delay: 0.9 },
];

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative overflow-hidden border-white/5 border-t bg-[#020202] px-6 py-24"
    >
      <div className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-900/10 blur-[120px]" />
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-3/4 h-96 w-96 rounded-full bg-emerald-900/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="mb-20 font-bold text-3xl text-white md:text-5xl">
              Minha{' '}
              <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                Stack
              </span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-mono text-cyan-400 text-lg">Front-end</h3>
                  <p className="text-gray-500 text-sm">
                    Alta interatividade, SSR/SSG e design responsivo perfeito.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-mono text-emerald-400 text-lg">
                    Back-end
                  </h3>
                  <p className="text-gray-500 text-sm">
                    APIs RESTful, arquitetura modular e modelagem de dados
                    sólida.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div
              ref={containerRef}
              className="relative flex h-[500px] w-full flex-wrap content-center justify-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] p-8 shadow-2xl"
            >
              <div className="absolute top-6 left-0 flex w-full justify-center">
                <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 font-mono text-gray-500 text-xs tracking-wider">
                  <MousePointer2 className="h-3 w-3" /> Arraste os elementos
                </span>
              </div>

              {techs.map((tech) => {
                const isFront = tech.type === 'front';
                return (
                  <motion.div
                    key={tech.name}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.2}
                    whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      duration: tech.duration,
                      delay: tech.delay,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className={`relative cursor-grab select-none rounded-full border px-6 py-3 font-medium text-sm transition-colors hover:bg-opacity-20 ${
                      isFront
                        ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    }
                    `}
                  >
                    {tech.name}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

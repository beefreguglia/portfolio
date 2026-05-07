import { motion, type Variants } from 'motion/react';

export function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const codeContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.8,
      },
    },
  };

  const typeWriterVariants: Variants = {
    hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        clipPath: { duration: 0.6, ease: 'linear' },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <>
      <section
        id="sobre"
        className="relative overflow-hidden border-white/5 border-t bg-[#030303] px-6 py-20"
      >
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="mb-4 font-bold text-3xl text-white md:text-5xl">
              <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                Sobre
              </span>
            </h2>
            <p className="font-mono text-gray-500 text-sm">
              Minha trajetória como desenvolvedor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-gray-400 text-lg leading-relaxed"
            >
              <p>
                Olá! Sou um desenvolvedor de software movido pelo desafio de
                transformar problemas complexos em soluções elegantes. Minha
                paixão é criar experiências digitais completas, construindo
                desde interfaces fluídas no frontend até APIs robustas no
                backend.
              </p>
              <p>
                Minha jornada começou pela curiosidade de entender como os
                sistemas funcionam por baixo dos panos. Hoje, trabalho
                fortemente com o ecossistema moderno do JavaScript e TypeScript,
                focando sempre em entregar código limpo, performático e de fácil
                manutenção.
              </p>
              <p>
                Seja arquitetando banco de dados com Prisma ou refinando UI/UX
                com Next.js e Tailwind, meu objetivo é garantir escalabilidade
                aliada à melhor experiência para o usuário final.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative mx-auto w-full max-w-md lg:ml-auto"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080808] p-8 shadow-2xl"
              >
                <div className="mb-6 ml-auto flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>

                <motion.div
                  variants={codeContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 font-mono text-sm"
                >
                  <motion.div variants={typeWriterVariants}>
                    <p className="text-emerald-400">
                      const <span className="text-white">developer</span> ={' '}
                      {'{'}
                    </p>
                  </motion.div>

                  <motion.div variants={typeWriterVariants}>
                    <p className="pl-6 text-gray-400">
                      name:{' '}
                      <span className="text-cyan-300">
                        'Bernardo Freguglia'
                      </span>
                      ,
                    </p>
                  </motion.div>

                  <motion.div variants={typeWriterVariants}>
                    <p className="pl-6 text-gray-400">
                      role:{' '}
                      <span className="text-cyan-300">
                        'Fullstack Engineer'
                      </span>
                      ,
                    </p>
                  </motion.div>

                  <motion.div variants={typeWriterVariants}>
                    <p className="pl-6 text-gray-400">
                      coffee: <span className="text-cyan-300">true</span>,
                    </p>
                  </motion.div>

                  <motion.div variants={typeWriterVariants}>
                    <p className="pl-6 text-gray-400">
                      status: <span className="text-cyan-300">'Coding'</span>
                    </p>
                  </motion.div>

                  <motion.div variants={typeWriterVariants}>
                    <p className="text-emerald-400">{'}'};</p>
                  </motion.div>
                </motion.div>

                <div className="-right-20 -top-20 pointer-events-none absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto flex items-center gap-4 px-6 py-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent"
        />
        <span className="font-mono text-cyan-500 text-xs tracking-widest">
          {'///'}
        </span>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-px flex-1 bg-linear-to-l from-emerald-500/50 to-transparent"
        />
      </div>
    </>
  );
}

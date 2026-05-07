import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-dark-bg relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pt-20"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="z-10 order-2 flex flex-col items-start lg:order-1"
        >
          <Badge
            variant="secondary"
            className="mb-6 border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          >
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            SESSÃO INICIADA
          </Badge>

          <h1 className="mb-4 font-extrabold font-sans text-4xl text-white tracking-tight md:text-5xl">
            Bernardo Freguglia <br />
            <span className="glitch-text font-mono" data-text="Dev Fullstack.">
              Dev Fullstack.
            </span>
          </h1>

          <p className="mb-8 max-w-lg font-light font-sans text-gray-400 text-lg leading-relaxed md:text-xl">
            Forjando interfaces e sistemas escalaveis com base no café. Software
            Engineer com foco em desenvolvimento web.
          </p>

          <div className="flex gap-4">
            <Button>
              <a href="#quests">Explorar Projetos</a>
            </Button>
            <Button
              variant="outline"
              className="font-mono uppercase tracking-wider"
            >
              <a href="#status">Ver Stack</a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative z-10 order-1 flex items-center justify-center lg:order-2"
        >
          <div className="relative z-10 flex h-80 w-80 items-center justify-center">
            <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-65 w-65 animate-[spin_15s_linear_infinite] rounded-full border border-emerald-500/60 border-dashed shadow-[0_0_15px_rgba(16,185,129,0.2)] md:h-100 md:w-100" />
            <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 animate-[spin_20s_linear_infinite_reverse] rounded-full border-2 border-cyan-500/50 border-dotted shadow-[0_0_20px_rgba(6,182,212,0.1)] md:h-120 md:w-120" />
            <div className="group relative z-10 h-55 w-55 bg-linear-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform duration-500 [clip-path:polygon(50%_0%,_93%_25%,_93%_75%,_50%_100%,_7%_75%,_7%_25%)] hover:rotate-6 hover:scale-105 md:h-85 md:w-85">
              <div
                className="h-full w-full bg-[#050505] bg-center bg-cover transition-all duration-500 [clip-path:polygon(50%_0%,_93%_25%,_93%_75%,_50%_100%,_7%_75%,_7%_25%)] hover:contrast-125 hover:grayscale-20 group-hover:contrast-100 group-hover:grayscale-0"
                style={{
                  backgroundImage: "url('https://github.com/beefreguglia.png')",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

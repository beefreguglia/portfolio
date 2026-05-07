/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InfiniteMenu } from '@/components/infinite-menu';

const projectsData = [
  {
    title: 'Prompt Manager',
    description:
      'Um gerenciador de prompts, construído para aprender e treinar arquiteturas de software e testes no ecossistema React/Next.',
    link: 'https://github.com/beefreguglia/prompt-manager',
    image: '/prompt-manager.png',
  },
  {
    title: 'Board App',
    description:
      'Um painel interativo para acompanhamento de roadmap de um app. A aplicação permite a visualização, filtragem e interação com tarefas divididas em estágios, com foco em performance, SEO.',
    link: 'https://github.com/beefreguglia/app-boaard',
    image: '/app-board.png',
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-white/5 border-t bg-[#020202] pt-20"
    >
      <div className="relative z-20 mx-auto mb-12 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3 font-bold text-3xl text-emerald-500 tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] md:text-5xl">
            Projetos
          </h2>
          <p className="max-w-xl font-mono text-gray-500 text-sm leading-relaxed">
            Uma seleção dos meus trabalhos e experiências práticas mais
            recentes.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 hidden md:block">
        <InfiniteMenu items={projectsData} scale={1.2} />
      </div>

      <div className="relative z-10 mx-auto block max-w-6xl px-6 md:hidden">
        <div className="flex flex-col gap-6">
          {projectsData.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#080808] transition-all hover:border-emerald-500/30 active:scale-[0.98]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-white text-xl transition-colors group-hover:text-emerald-400">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-gray-500 transition-colors group-hover:text-emerald-400" />
                </div>
                <p className="font-mono text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

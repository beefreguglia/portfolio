const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#121212] bg-[radial-gradient(#ffffff20_1px,transparent_1px)] px-6 [background-size:20px_20px]">
      {/* Container Principal */}
      <motion.div
        className="z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Coluna da Esquerda: Textos e Call to Action */}
        <div className="flex flex-col gap-6 text-left">
          <motion.div
            variants={itemVariants}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
          >
            <Terminal size={16} className="text-[#00E5FF]" />
            <span className="font-mono text-gray-300 text-sm">
              Fullstack Developer
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-bold text-5xl text-white leading-tight tracking-tight lg:text-7xl"
          >
            Transformando <br />
            ideias em <span className="text-[#00E5FF]">código</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-gray-400 text-lg leading-relaxed"
          >
            Especialista em criar soluções digitais escaláveis e experiências de
            usuário de alto impacto. Foco em performance, design limpo e
            arquitetura moderna.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-wrap items-center gap-4"
          >
            {/* Botão Primário com Glow Ciano (Estilo Shadcn + Customização) */}
            <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-[#00E5FF] px-8 py-3 font-semibold text-[#121212] text-sm shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all hover:bg-[#00cce6] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)]">
              Ver Projetos
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Botões Sociais */}
            <button className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-3 text-gray-300 transition-colors hover:bg-white/10 hover:text-[#00E5FF]">
              <Github size={20} />
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-3 text-gray-300 transition-colors hover:bg-white/10 hover:text-[#00E5FF]">
              <Linkedin size={20} />
            </button>
          </motion.div>
        </div>

        {/* Coluna da Direita: Imagem/Elemento Visual */}
        <motion.div
          variants={itemVariants}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Efeito de Glow atrás da foto */}
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-72 w-72 animate-pulse rounded-full bg-[#00E5FF] opacity-20 blur-[120px]" />

          {/* Container da Imagem (Placeholder) */}
          <div className="relative z-10 h-72 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] grayscale transition-all duration-500 hover:grayscale-0 lg:h-96 lg:w-96">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Seu Retrato"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

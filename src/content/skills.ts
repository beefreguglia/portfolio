export const sourceIds = [
  'seazone',
  'anjosGuia',
  'centra',
  'noshbyte',
  'personal',
] as const;

export type SourceId = (typeof sourceIds)[number];

/** core = uso diário em produção · proficient = usado em projetos reais · familiar = estudado/projetos pessoais */
export type SkillTier = 'core' | 'proficient' | 'familiar';

export interface Skill {
  name: string;
  tier: SkillTier;
  sources: SourceId[];
}

export const branchIds = [
  'frontend',
  'backend',
  'ai',
  'testing',
  'devops',
  'craft',
] as const;

export type BranchId = (typeof branchIds)[number];

export const talentTree: Record<BranchId, Skill[]> = {
  frontend: [
    {
      name: 'React',
      tier: 'core',
      sources: ['seazone', 'anjosGuia', 'centra', 'noshbyte', 'personal'],
    },
    {
      name: 'TypeScript',
      tier: 'core',
      sources: ['seazone', 'anjosGuia', 'centra', 'noshbyte', 'personal'],
    },
    {
      name: 'Next.js',
      tier: 'core',
      sources: ['anjosGuia', 'centra', 'noshbyte', 'personal'],
    },
    {
      name: 'Tailwind CSS',
      tier: 'core',
      sources: ['centra', 'noshbyte', 'personal'],
    },
    { name: 'Styled Components', tier: 'core', sources: ['seazone'] },
    { name: 'Material UI', tier: 'proficient', sources: ['seazone'] },
    {
      name: 'shadcn/ui',
      tier: 'proficient',
      sources: ['centra', 'noshbyte', 'personal'],
    },
    {
      name: 'React Hook Form',
      tier: 'proficient',
      sources: ['noshbyte', 'personal'],
    },
    { name: 'Formik + Yup', tier: 'proficient', sources: ['seazone'] },
    { name: 'Zod', tier: 'proficient', sources: ['noshbyte', 'personal'] },
    { name: 'TanStack Query', tier: 'proficient', sources: ['personal'] },
    {
      name: 'Framer Motion',
      tier: 'proficient',
      sources: ['noshbyte', 'personal'],
    },
    { name: 'Storybook', tier: 'familiar', sources: ['personal'] },
  ],
  backend: [
    { name: 'Node.js', tier: 'proficient', sources: ['anjosGuia', 'personal'] },
    { name: 'NestJS', tier: 'proficient', sources: ['anjosGuia'] },
    {
      name: 'PostgreSQL',
      tier: 'proficient',
      sources: ['anjosGuia', 'noshbyte', 'personal'],
    },
    { name: 'ElysiaJS (Bun)', tier: 'proficient', sources: ['noshbyte'] },
    { name: 'Drizzle ORM', tier: 'proficient', sources: ['noshbyte'] },
    { name: 'Prisma', tier: 'proficient', sources: ['personal'] },
    { name: 'Fastify', tier: 'familiar', sources: ['personal'] },
    { name: 'pgvector', tier: 'familiar', sources: ['noshbyte'] },
    { name: 'Redis', tier: 'familiar', sources: ['personal'] },
    { name: 'Twilio', tier: 'familiar', sources: ['anjosGuia'] },
  ],
  ai: [
    { name: 'RAG', tier: 'proficient', sources: ['noshbyte'] },
    {
      name: 'Vercel AI SDK',
      tier: 'proficient',
      sources: ['noshbyte', 'personal'],
    },
    { name: 'LLMs multi-provider', tier: 'proficient', sources: ['noshbyte'] },
    { name: 'LLM-as-a-judge', tier: 'familiar', sources: ['noshbyte'] },
    { name: 'Embeddings', tier: 'familiar', sources: ['noshbyte'] },
    { name: 'Mastra (agentes)', tier: 'familiar', sources: ['personal'] },
  ],
  testing: [
    { name: 'Jest', tier: 'proficient', sources: ['personal'] },
    { name: 'Testing Library', tier: 'proficient', sources: ['personal'] },
    { name: 'Vitest', tier: 'proficient', sources: ['noshbyte', 'personal'] },
    { name: 'Cypress', tier: 'familiar', sources: ['personal'] },
    { name: 'Playwright', tier: 'familiar', sources: ['personal'] },
  ],
  devops: [
    {
      name: 'Git',
      tier: 'core',
      sources: ['seazone', 'anjosGuia', 'centra', 'noshbyte', 'personal'],
    },
    { name: 'Vercel', tier: 'proficient', sources: ['centra', 'personal'] },
    { name: 'Docker', tier: 'proficient', sources: ['noshbyte', 'personal'] },
    { name: 'GitHub Actions', tier: 'familiar', sources: ['personal'] },
    { name: 'Cron jobs', tier: 'familiar', sources: ['anjosGuia'] },
  ],
  craft: [
    {
      name: 'Clean Architecture',
      tier: 'proficient',
      sources: ['anjosGuia', 'noshbyte'],
    },
    { name: 'SOLID', tier: 'proficient', sources: ['anjosGuia', 'noshbyte'] },
    { name: 'DDD', tier: 'familiar', sources: ['noshbyte'] },
    {
      name: 'Multi-tenant',
      tier: 'proficient',
      sources: ['anjosGuia', 'centra', 'personal'],
    },
    {
      name: 'RBAC / permissões',
      tier: 'proficient',
      sources: ['seazone', 'personal'],
    },
    {
      name: 'Trabalho em equipe',
      tier: 'core',
      sources: ['seazone', 'anjosGuia', 'centra'],
    },
  ],
};

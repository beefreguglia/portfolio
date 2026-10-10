import type { Rarity } from '@/components/ds/rarity';

export type DemoId =
  | 'calendar'
  | 'multistep'
  | 'scheduler'
  | 'seasonal'
  | 'catalog'
  | 'noshbyte';

export type ItemGroup = 'professional' | 'personal';

export interface Item {
  id: string;
  group: ItemGroup;
  rarity: Rarity;
  icon: string;
  techs: string[];
  demo?: DemoId;
  repo?: string;
  live?: string;
}

const gh = (repo: string) => `https://github.com/beefreguglia/${repo}`;

/** Textos (nome, tipo, atributos, citação, case) ficam em messages/*.json → arsenal.items.<id>. */
export const items: Item[] = [
  {
    id: 'calendar',
    group: 'professional',
    rarity: 'legendary',
    icon: 'calendar',
    demo: 'calendar',
    techs: ['React', 'TypeScript', 'Styled Components'],
  },
  {
    id: 'scheduler',
    group: 'professional',
    rarity: 'legendary',
    icon: 'hourglass',
    demo: 'scheduler',
    techs: ['Next.js', 'NestJS', 'PostgreSQL', 'Clean Architecture'],
  },
  {
    id: 'noshbyte',
    group: 'professional',
    rarity: 'legendary',
    icon: 'book',
    demo: 'noshbyte',
    repo: gh('NoshByte'),
    techs: ['Next.js', 'ElysiaJS', 'Drizzle', 'pgvector', 'AI SDK'],
  },
  {
    id: 'multistep',
    group: 'professional',
    rarity: 'rare',
    icon: 'scroll',
    demo: 'multistep',
    techs: ['React', 'TypeScript', 'Formik', 'Yup'],
  },
  {
    id: 'seasonal',
    group: 'professional',
    rarity: 'rare',
    icon: 'masks',
    demo: 'seasonal',
    techs: ['Next.js', 'CSS Variables', 'Design tokens'],
  },
  {
    id: 'catalog',
    group: 'professional',
    rarity: 'set',
    icon: 'store',
    demo: 'catalog',
    techs: ['Next.js', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    id: 'saasRbac',
    group: 'personal',
    rarity: 'legendary',
    icon: 'shield',
    repo: gh('next-saas-rbac'),
    live: 'https://next-saas-rbac-bf.vercel.app',
    techs: ['Next.js', 'Fastify', 'Prisma', 'Zod', 'Turborepo'],
  },
  {
    id: 'blogAi',
    group: 'personal',
    rarity: 'rare',
    icon: 'feather',
    repo: gh('blog-ai'),
    techs: ['Node.js', 'PostgreSQL', 'Mastra', 'OpenAI', 'Docker'],
  },
  {
    id: 'sqlAgent',
    group: 'personal',
    rarity: 'rare',
    icon: 'database',
    repo: gh('sql-terminal-agent'),
    techs: ['Node.js', 'node:sqlite', 'AI SDK', 'Streams'],
  },
  {
    id: 'linkTree',
    group: 'personal',
    rarity: 'magic',
    icon: 'link',
    repo: gh('link-tree'),
    live: 'https://link-tree-eta-nine.vercel.app',
    techs: ['Next.js 16', 'Prismic', 'Tailwind CSS'],
  },
  {
    id: 'promptManager',
    group: 'personal',
    rarity: 'magic',
    icon: 'sparkles',
    repo: gh('prompt-manager'),
    live: 'https://beef-prompt-manager.vercel.app',
    techs: ['Next.js', 'React', 'Testes'],
  },
  {
    id: 'igniteCall',
    group: 'personal',
    rarity: 'magic',
    icon: 'bell',
    repo: gh('ignite-call'),
    live: 'https://ignite-call-rouge.vercel.app',
    techs: ['Next.js', 'Prisma', 'Google Calendar API'],
  },
  {
    id: 'petshop',
    group: 'personal',
    rarity: 'magic',
    icon: 'paw',
    repo: gh('petshop'),
    live: 'https://petshop-red-eight.vercel.app',
    techs: ['Next.js', 'TypeScript'],
  },
  {
    id: 'designSystem',
    group: 'personal',
    rarity: 'magic',
    icon: 'palette',
    repo: gh('ignite-ui-Design-System'),
    techs: ['React', 'Storybook', 'Turborepo'],
  },
  {
    id: 'geminiChat',
    group: 'personal',
    rarity: 'magic',
    icon: 'message',
    repo: gh('gemini-chat'),
    techs: ['Vue 3', 'TypeScript', 'AI SDK'],
  },
  {
    id: 'appBoard',
    group: 'personal',
    rarity: 'magic',
    icon: 'kanban',
    repo: gh('app-boaard'),
    techs: ['Next.js', 'SEO', 'Performance'],
  },
];

/** Linha do tempo de aprendizado (itens comuns): repositórios de cursos e desafios. */
export const learningLog = [
  { year: 2020, label: 'Launchbase · Foodfy, GymManager', repo: gh('Foodfy') },
  { year: 2021, label: 'Seazone Challenge', repo: gh('seazoneChallenge') },
  {
    year: 2021,
    label: 'Ignite ReactJS · ig.news, dashgo',
    repo: gh('ig.news'),
  },
  {
    year: 2022,
    label: 'Ignite ReactJS · desafios 01–09',
    repo: gh('ignite-challenge-09-reactjs'),
  },
  {
    year: 2023,
    label: 'Ignite · Design System, Ignite Call',
    repo: gh('ignite-ui-Design-System'),
  },
  { year: 2024, label: 'Ignite Node.js · Explorer', repo: gh('ignite-node') },
  {
    year: 2025,
    label: 'Helpdesk · Gallery Plus · Link Tree',
    repo: gh('link-tree'),
  },
  { year: 2026, label: 'Blog AI · SQL Terminal Agent', repo: gh('blog-ai') },
] as const;

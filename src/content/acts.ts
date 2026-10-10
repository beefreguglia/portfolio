export const actIds = [
  'origin',
  'guild',
  'seazone',
  'mercenary',
  'tome',
] as const;

export type ActId = (typeof actIds)[number];

export interface Act {
  id: ActId;
  numeral: string;
  start: string;
  end?: string;
  techs: string[];
}

/** Datas no formato AAAA-MM (fonte: currículo). Textos ficam em messages/*.json → journey.acts. */
export const acts: Act[] = [
  {
    id: 'origin',
    numeral: 'I',
    start: '2012',
    techs: ['Java', 'Bukkit'],
  },
  {
    id: 'guild',
    numeral: 'II',
    start: '2016-10',
    end: '2019-02',
    techs: ['OpenScholar', 'Banco de dados', 'Marketing', 'RH'],
  },
  {
    id: 'seazone',
    numeral: 'III',
    start: '2021-03',
    end: '2024-05',
    techs: [
      'React',
      'TypeScript',
      'Styled Components',
      'Material UI',
      'Formik',
      'Yup',
    ],
  },
  {
    id: 'mercenary',
    numeral: 'IV',
    start: '2024-11',
    end: '2026-01',
    techs: [
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'Twilio',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    id: 'tome',
    numeral: 'V',
    start: '2016-09',
    end: '2026-08',
    techs: ['LLMs', 'RAG', 'pgvector', 'ElysiaJS', 'Drizzle', 'DDD'],
  },
];

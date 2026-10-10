/** Fonte: NoshByte/api/evaluation_summary.csv (TCC). Nota geral = média combinada dos dois juízes LLM. */
export interface ModelResult {
  model: string;
  provider: string;
  overall: number;
  latencyMs: number;
  tokens: number;
  /** Posição do rótulo direto, ajustada à mão para não colidir no cluster. */
  label: { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' };
}

export const evaluation = {
  scenarios: 90,
  judges: 2,
  results: [
    {
      model: 'claude-sonnet-4-6',
      provider: 'Anthropic',
      overall: 4.439,
      latencyMs: 7679.1,
      tokens: 1349,
      label: { dx: -10, dy: -10, anchor: 'end' },
    },
    {
      model: 'claude-haiku-4-5',
      provider: 'Anthropic',
      overall: 4.324,
      latencyMs: 3444.3,
      tokens: 1302,
      label: { dx: 10, dy: 4, anchor: 'start' },
    },
    {
      model: 'gpt-4o-mini',
      provider: 'OpenAI',
      overall: 3.918,
      latencyMs: 2496.3,
      tokens: 927,
      label: { dx: 10, dy: -6, anchor: 'start' },
    },
    {
      model: 'llama-3.3-70b',
      provider: 'Groq',
      overall: 3.86,
      latencyMs: 1833.3,
      tokens: 1194,
      label: { dx: -10, dy: -8, anchor: 'end' },
    },
    {
      model: 'gpt-4o',
      provider: 'OpenAI',
      overall: 3.853,
      latencyMs: 2060.9,
      tokens: 882,
      label: { dx: 10, dy: 16, anchor: 'start' },
    },
    {
      model: 'llama-3.1-8b-instant',
      provider: 'Groq',
      overall: 3.57,
      latencyMs: 706.8,
      tokens: 1146,
      label: { dx: 10, dy: 4, anchor: 'start' },
    },
  ] satisfies ModelResult[],
};

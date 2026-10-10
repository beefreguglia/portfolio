<div align="center">

# ✦ Santuário ✦

**O portfolio de Bernardo Freguglia, contado como uma campanha de RPG dark fantasy.**

_Full-stack Engineer · React · Next.js · TypeScript · NestJS · IA aplicada_

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/React_Three_Fiber-3D-1fa898?logo=threedotjs)](https://r3f.docs.pmnd.rs)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-12-ffd400?logo=framer)](https://motion.dev)
[![i18n](https://img.shields.io/badge/i18n-PT%20%7C%20EN-bd7f28)](#-idiomas)

[Site](https://bfreguglia.vercel.app) · [Currículo](https://bfreguglia.vercel.app/pt/cv) · [LinkedIn](https://www.linkedin.com/in/bernardo-freguglia/) · [GitHub](https://github.com/beefreguglia)

</div>

---

## 📜 A lenda

Comecei a programar em 2012, escrevendo plugins de Minecraft. Desde então passei por empresa júnior, startup, freelas full-stack e um TCC sobre recomendação com LLMs. Este site conta essa história como um jogo inspirado em Diablo, com atos, itens lendários e árvore de talentos. A ideia é que ele seja divertido de explorar e, ao mesmo tempo, rápido de ler para quem está recrutando.

> **Recrutador com pressa?** O botão **Modo recrutador** leva a [`/cv`](https://bfreguglia.vercel.app/pt/cv): um currículo limpo, imprimível e amigável a ATS.

## 🗺️ O mapa

| Seção | Metáfora | O que mostra |
|---|---|---|
| **Hero** | Orbe da Alma (3D) | Quem sou, stats e chamadas para ação |
| **Ficha do Personagem** | Atributos de RPG | Bio, classe, nível (anos desde 2012) e traços |
| **Jornada** | Atos com waypoints | A carreira em capítulos que aparecem no scroll, com o ato atual destacado em ouro |
| **Arsenal** | Inventário de itens lendários | Cases profissionais e projetos, cada um com tooltip de atributos e **mini-demo jogável** |
| **Talentos** | Árvore de talentos | Stack por ramo e onde cada tecnologia foi usada |
| **Conquistas** | Achievements | Formações, certificados e diploma |
| **Portal** | Taverna / contato | E-mail para copiar, redes e download do CV |

## ⚔️ Itens lendários (mini-demos)

Os cases profissionais foram **recriados e anonimizados**: nenhum código ou dado real de empresa, só a ideia do problema resolvida de novo.

| Item | Origem | O que a demo faz |
|---|---|---|
| **Calendário multi-imóvel** | Seazone | Grade com virtualização 2D, cabeçalhos sticky e filtros de reservas e bloqueios |
| **Formulário multi-step** | Seazone | Validação por etapa com `react-hook-form` + `zod`, progresso e revisão final |
| **Agendador** | Anjos Guia | Cruza serviço → profissionais aptos → salas livres → expediente. O algoritmo é puro e testado |
| **Temas sazonais** | Anjos Guia | Troca a identidade visual da plataforma inteira (Natal, Ano Novo, Páscoa) via design tokens |
| **Catálogo multi-tenant** | Centra | Trocar o lojista muda a marca e o catálogo, com filtros e cotação |
| **NoshByte** | TCC (UFOP) | Resultados reais da avaliação de 6 LLMs (nota × latência) e um chat simulado |

## 🧪 Grimório técnico

- **Framework:** Next.js 16 (App Router, Turbopack, `proxy.ts`), React 19, TypeScript
- **Estilo:** Tailwind CSS v4 com tokens em OKLCH (abismo, pedra, osso, verde-água, ouro e cores de raridade), além de primitivos shadcn/Radix reestilizados
- **3D:** React Three Fiber, drei e postprocessing, com shaders GLSL próprios (orbe líquido com fbm, casca de vidro com fresnel e brasas instanciadas)
- **Animação:** [Motion](https://motion.dev) (indicadores com `layoutId`, springs, stagger, `AnimatePresence`, scroll-linked) e Lenis para smooth scroll
- **i18n:** next-intl com rotas `/pt` e `/en`
- **Formulários:** react-hook-form + zod
- **Qualidade:** Biome (lint e format) e Vitest

### Performance e acessibilidade

- Canvas 3D carregado só no cliente, com um poster estático como fallback, e render pausado fora da viewport
- `prefers-reduced-motion` respeitado globalmente (`MotionConfig reducedMotion="user"`)
- Navegação por teclado, skip link, `aria-*` nas demos e contraste validado nas cores dos gráficos
- SEO: metadata por idioma, Open Graph gerado dinamicamente, JSON-LD `Person`, sitemap e robots

## 🏰 Estrutura

```
messages/              # textos PT e EN
src/
├─ app/[locale]/       # home, /cv, 404, OG image
├─ sections/           # hero, ficha, jornada, arsenal, talentos, conquistas, portal
├─ demos/              # mini-demos jogáveis (+ testes do agendador)
├─ components/
│  ├─ ds/              # design system: molduras, slots, tooltips, raridade
│  ├─ motion/          # primitivas de animação reutilizáveis
│  ├─ three/           # cena 3D, orbe, brasas, shaders
│  ├─ layout/          # header, footer, orbe de scroll, smooth scroll
│  └─ ui/              # shadcn reestilizado
├─ content/            # perfil, atos, itens e skills (dados estruturados)
├─ i18n/               # roteamento de idiomas
└─ styles/globals.css  # tokens do design system
```

## 🔥 Rodando localmente

Requer **Node 20+** e **pnpm**.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Serve o build |
| `pnpm lint` | Lint e checagem de formatação (Biome) |
| `pnpm format` | Formata o código |
| `pnpm test` | Testes (Vitest) |

## 🌐 Idiomas

Todo o conteúdo existe em português e inglês, em `messages/pt.json` e `messages/en.json`. A troca fica no header e preserva a rota atual.

## ⚖️ Créditos

Inspirado na estética de Diablo, mas sem nenhum asset, logo ou fonte da Blizzard: tudo aqui é original. As fontes são Cinzel, Inter e JetBrains Mono (Google Fonts).

<div align="center">

---

_Próximo ato: sua equipe?_ ✦ [bfreguglia.dev@gmail.com](mailto:bfreguglia.dev@gmail.com)

</div>

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Fira_Code, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

export const metadata: Metadata = {
  title: 'Protfolio Bernardo Freguglia',
  description:
    'Olá! Sou um desenvolvedor de software movido pelo desafio de transformar problemas complexos em soluções elegantes. Minha paixão é criar experiências digitais completas, construindo desde interfaces fluídas no frontend até APIs robustas no backend. Minha jornada começou pela curiosidade de entender como os sistemas funcionam por baixo dos panos. Hoje, trabalho fortemente com o ecossistema moderno do JavaScript e TypeScript, focando sempre em entregar código limpo, performático e de fácil manutenção. Seja arquitetando banco de dados com Prisma ou refinando UI/UX com Next.js e Tailwind, meu objetivo é garantir escalabilidade aliada à melhor experiência para o usuário final.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

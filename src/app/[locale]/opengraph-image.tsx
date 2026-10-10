import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Bernardo Freguglia';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 90px',
        background:
          'radial-gradient(ellipse at 75% 50%, #0d3b37 0%, #0b1214 55%, #070b0c 100%)',
        color: '#ece6da',
        fontFamily: 'serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 8,
            color: '#b48a4a',
            textTransform: 'uppercase',
          }}
        >
          {t('kicker')}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1,
            marginTop: 18,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#5ff5e0',
            marginTop: 22,
            letterSpacing: 3,
          }}
        >
          {t('class')}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#a8a296',
            marginTop: 28,
          }}
        >
          {`React · Next.js · TypeScript · NestJS · ${locale === 'pt' ? 'IA aplicada' : 'Applied AI'}`}
        </div>
      </div>
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: 9999,
          display: 'flex',
          background:
            'radial-gradient(circle at 40% 35%, #a8fff0 0%, #1fa898 35%, #063632 75%)',
          boxShadow: '0 0 120px 20px rgba(79, 227, 207, 0.35)',
          border: '3px solid #9a7b45',
        }}
      />
    </div>,
    size
  );
}

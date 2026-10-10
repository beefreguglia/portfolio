import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/cv'];
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${profile.siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${profile.siteUrl}/${l}${path}`])
        ),
      },
    }))
  );
}

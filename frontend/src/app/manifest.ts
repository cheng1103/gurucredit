import { MetadataRoute } from 'next';
import { SEO } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.siteName,
    short_name: 'GURU',
    description: SEO.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e293b',
    orientation: 'portrait',
    scope: '/',
    lang: 'en-MY',
    categories: ['finance', 'business'],
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}

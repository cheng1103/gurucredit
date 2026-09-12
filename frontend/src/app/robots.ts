import { MetadataRoute } from 'next';
import { SEO } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Defensive: no route handlers are served from /api today (and no
      // /admin/ segment exists either), but excluding them costs nothing and
      // pre-empts any future API/admin surface from being crawled or indexed
      // by accident.
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${SEO.url}/sitemap.xml`,
  };
}

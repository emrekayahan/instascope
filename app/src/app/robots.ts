import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://instascope.com.tr';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/bio#'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

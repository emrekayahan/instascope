import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://instascope.com.tr';

  const routes = [
    '',
    '/blog',
    '/araclar/etkilesim-hesaplayici',
    '/araclar/hashtag-onerici',
    '/araclar/en-iyi-paylasim-saati',
    '/araclar/biyografi-link-olusturucu',
    '/nasil-calisir',
    '/iletisim',
    '/gizlilik-politikasi',
    '/cerez-politikasi',
    '/kullanim-sartlari',
    '/reklam-politikasi',
    '/kvkk',
  ];

  const blogSlugs = [
    'instagram-algoritmasi-nasil-calisir-2026',
    'organik-takipci-artirma-yontemleri',
    'instagram-etkilesim-orani-nedir-nasil-hesaplanir',
    '2026-en-iyi-instagram-hashtag-stratejileri',
    'instagram-reels-algoritmasini-anlamak',
    'takipci-takip-orani-neden-onemli',
    'instagramda-shadowban-nasil-anlasilir-ve-onlenir',
    'icerik-takvimi-nasil-olusturulur',
  ];

  const sitemapRecords: MetadataRoute.Sitemap = [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : route.startsWith('/araclar') ? 0.9 : 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return sitemapRecords;
}

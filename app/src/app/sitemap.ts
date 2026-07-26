import { MetadataRoute } from 'next';
import { dbLite } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://instascope.com.tr';

  // Statik sayfalar
  const routes = [
    '',
    '/blog',
    '/araclar/etkilesim-hesaplayici',
    '/araclar/hashtag-onerici',
    '/araclar/en-iyi-paylasim-saati',
    '/araclar/profil-sagligi',
    '/araclar/instagram-tipim',
    '/nasil-calisir',
    '/hakkimizda',
    '/iletisim',
    '/gizlilik-politikasi',
    '/cerez-politikasi',
    '/kullanim-sartlari',
    '/reklam-politikasi',
    '/kvkk',
  ];

  // Statik fallback blog slug'ları (Firestore'a ulaşılamazsa kullanılır)
  const staticBlogSlugs = [
    'sahte-takipci-analizi-nasil-yapilir',
    'instagram-etkilesim-orani-artirma-yontemleri',
    'instascope-teknik-altyapi-hikayesi',
    'instagram-algoritmasi-nasil-calisir-2026',
    'organik-takipci-artirma-yontemleri',
    'instagram-etkilesim-orani-nedir-nasil-hesaplanir',
    '2026-en-iyi-instagram-hashtag-stratejileri',
    'instagram-reels-algoritmasini-anlamak',
    'takipci-takip-orani-neden-onemli',
    'instagramda-shadowban-nasil-anlasilir-ve-onlenir',
    'icerik-takvimi-nasil-olusturulur',
    'instagram-biyografi-linki-nasil-optimize-edilir',
    'instagram-reels-izlenmesini-artirmanin-7-yolu',
    'bot-takipci-vs-organik-takipci',
    'instagram-story-etkilesimi-nasil-artirilir',
    'instagramda-kesfete-dusme-taktikleri',
    'mikro-influencer-nedir-markalar-neden-tercih-eder',
    'instagram-hesap-guvenligi-ve-iki-faktorlu-dogrulama',
    'instagram-insights-istatistikler-nasil-okunur',
  ];

  // Firestore'dan dinamik blog yazılarını çek
  let dynamicBlogSlugs: string[] = [];
  try {
    const q = query(
      collection(dbLite, 'published_content'),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);
    dynamicBlogSlugs = snapshot.docs
      .map((doc) => doc.data().slug as string)
      .filter(Boolean);
  } catch {
    // Firestore'a ulaşılamazsa sessizce devam et
  }

  // Tüm slug'ları birleştir (Firestore slug'ları önce, tekrar önle)
  const allBlogSlugs = [...new Set([...dynamicBlogSlugs, ...staticBlogSlugs])];

  const sitemapRecords: MetadataRoute.Sitemap = [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : route.startsWith('/araclar') ? 0.9 : 0.7,
    })),
    ...allBlogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return sitemapRecords;
}

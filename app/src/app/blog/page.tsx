import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, User, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { dbLite } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore/lite';

// Next.js caching sorununu önle — her request'te taze veri çek
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Instagram Büyüme & SEO Rehberi | Instascope Blog',
  description: 'Instagram algoritması, etkileşim oranları, Reels izlenmeleri, organik takipçi artırma ve sosyal medya büyüme stratejileri üzerine güncel rehberler.',
  alternates: {
    canonical: '/blog',
  },
};

interface FirestorePost {
  title: string;
  slug: string;
  description: string;
  date: string;
  readTime: string;
  published_at?: { seconds: number } | string | null;
  isFirestore?: boolean;
}

// Statik fallback — Firestore erişilemezse gösterilir
const STATIC_POSTS: FirestorePost[] = [
  {
    title: 'Instagram Sahte Takipçi Analizi Nasıl Yapılır? (Rehber)',
    slug: 'sahte-takipci-analizi-nasil-yapilir',
    description: 'Profilinizdeki bot ve pasif hesapları tespit etme yöntemleri. Sahte takipçilerin etkileşim oranına zararları ve temizleme adımları.',
    date: '18 Temmuz 2026',
    readTime: '7 dk okuma',
  },
  {
    title: 'Instagram Etkileşim Oranı Artırma Yöntemleri (2026)',
    slug: 'instagram-etkilesim-orani-artirma-yontemleri',
    description: 'Profilinizin etkileşimini organik olarak katlamanın yolları. Reels, Story ve Carousel formatlarında algoritmayı tetikleyen stratejiler.',
    date: '18 Temmuz 2026',
    readTime: '8 dk okuma',
  },
  {
    title: 'InstaScope Nasıl Çalışır? Teknik Altyapı Hikayemiz',
    slug: 'instascope-teknik-altyapi-hikayesi',
    description: 'InstaScope\'un arkasındaki modern teknoloji yığını, veri işleme hızımız, güvenlik standartlarımız ve Firestore Lite optimizasyonlarımız.',
    date: '18 Temmuz 2026',
    readTime: '6 dk okuma',
  },
  {
    title: 'Instagram Algoritması Nasıl Çalışır (2026 Güncel Rehber)',
    slug: 'instagram-algoritmasi-nasil-calisir-2026',
    description: 'Instagram reels, hikayeler ve ana sayfa algoritmasının arkasındaki detaylı mekanizmayı ve etkileşim artırma yöntemlerini inceleyin.',
    date: '15 Haziran 2026',
    readTime: '6 dk okuma',
  },
  {
    title: 'Organik Takipçi Artırma Yöntemleri ve Stratejiler',
    slug: 'organik-takipci-artirma-yontemleri',
    description: 'Bot hesaplar yerine tamamen organik, sadık ve aktif bir instagram takipçi kitlesi oluşturmanın 10 bilimsel adımı.',
    date: '12 Haziran 2026',
    readTime: '8 dk okuma',
  },
  {
    title: 'Instagram Etkileşim Oranı Nedir, Nasıl Hesaplanır?',
    slug: 'instagram-etkilesim-orani-nedir-nasil-hesaplanir',
    description: 'Etkileşim oranı (Engagement Rate) hesabınızın gücünü gösterir. En basit hesaplama formülleri ve sektörel etkileşim kıyaslamaları.',
    date: '9 Haziran 2026',
    readTime: '5 dk okuma',
  },
  {
    title: "2026'da En İyi Instagram Hashtag Stratejileri",
    slug: '2026-en-iyi-instagram-hashtag-stratejileri',
    description: 'Algoritmanın değişen hashtag politikalarını yakalayın. Gönderi türüne göre kaç adet ve hangi tür hashtag kullanmanız gerektiğini öğrenin.',
    date: '6 Haziran 2026',
    readTime: '7 dk okuma',
  },
  {
    title: 'Instagram Reels Algoritmasını Anlamak',
    slug: 'instagram-reels-algoritmasini-anlamak',
    description: 'Keşfet sayfasına düşmenin, izlenme sürelerini artırmanın ve viral Reels videoları hazırlamanın arkasındaki algoritma kuralları.',
    date: '3 Haziran 2026',
    readTime: '6 dk okuma',
  },
  {
    title: 'Takipçi/Takip Oranı Neden Önemli?',
    slug: 'takipci-takip-orani-neden-onemli',
    description: 'Hesabınızın spam veya bot gibi görünmemesi için takipçi / takip edilen oranını nasıl dengede tutmalısınız? İşte altın oran.',
    date: '31 Mayıs 2026',
    readTime: '4 dk okuma',
  },
  {
    title: "Instagram'da Shadowban Nasıl Anlaşılır ve Önlenir?",
    slug: 'instagramda-shadowban-nasil-anlasilir-ve-onlenir',
    description: 'Hesabınızın erişimleri aniden düştüyse shadowban riski altındasınız. Nedenleri, kontrol etme yöntemi ve ban kaldırma adımları.',
    date: '28 Mayıs 2026',
    readTime: '8 dk okuma',
  },
  {
    title: 'İçerik Takvimi Nasıl Oluşturulur?',
    slug: 'icerik-takvimi-nasil-olusturulur',
    description: 'Düzenli paylaşım yapmak başarının anahtarıdır. Aylık sosyal medya planlaması yapmanızı sağlayacak içerik takvimi hazırlama rehberi.',
    date: '25 Mayıs 2026',
    readTime: '5 dk okuma',
  },
  {
    title: 'Instagram Biyografi Linki Nasıl Optimize Edilir?',
    slug: 'instagram-biyografi-linki-nasil-optimize-edilir',
    description: 'Profilinizi ziyaret eden kullanıcıları takipçiye dönüştürmek için biyografi bağlantınızı nasıl tasarlamalısınız? En iyi taktikler.',
    date: '22 Mayıs 2026',
    readTime: '5 dk okuma',
  },
  {
    title: 'Instagram Reels İzlenmesini Artırmanın 7 Yolu',
    slug: 'instagram-reels-izlenmesini-artirmanin-7-yolu',
    description: 'Reels izlenme sayılarınızı katlamak için uygulayabileceğiniz 7 pratik strateji. Kanca kullanımı, müzik seçimi ve süre ayarı.',
    date: '19 Mayıs 2026',
    readTime: '6 dk okuma',
  },
  {
    title: 'Bot Takipçi vs Organik Takipçi: Hesabınıza Zararları',
    slug: 'bot-takipci-vs-organik-takipci',
    description: 'Bot takipçi satın almanın profilinizin erişimini nasıl sıfırladığını ve algoritmanın neden cezalandırdığını teknik verilerle inceleyin.',
    date: '16 Mayıs 2026',
    readTime: '6 dk okuma',
  },
  {
    title: 'Instagram Story Etkileşimi Nasıl Artırılır?',
    slug: 'instagram-story-etkilesimi-nasil-artirilir',
    description: 'Hikayelerinizin görüntüleme sayılarını artıracak çıkartma kullanımı, anketler, soru-cevaplar ve algoritma tetikleme yöntemleri.',
    date: '13 Mayıs 2026',
    readTime: '5 dk okuma',
  },
  {
    title: "Instagram'da Keşfet'e Düşme Taktikleri",
    slug: 'instagramda-kesfete-dusme-taktikleri',
    description: 'Gönderilerinizin Keşfet sayfasına çıkması ve takipçi olmayan kitleye ulaşması için yapılması gereken anahtar optimizasyonlar.',
    date: '10 Mayıs 2026',
    readTime: '7 dk okuma',
  },
  {
    title: 'Mikro Influencer Nedir, Markalar Neden Tercih Eder?',
    slug: 'mikro-influencer-nedir-markalar-neden-tercih-eder',
    description: '10k-50k takipçi aralığındaki hesapların yüksek etkileşim güçleri ve markaların reklam iş birliklerinde onları seçme nedenleri.',
    date: '7 Mayıs 2026',
    readTime: '5 dk okuma',
  },
  {
    title: 'Instagram Hesap Güvenliği ve İki Faktörlü Doğrulama',
    slug: 'instagram-hesap-guvenligi-ve-iki-faktorlu-dogrulama',
    description: 'Hesabınızın çalınmasını önleyecek güvenlik önlemleri, iki faktörlü doğrulama ayarları ve kimlik avı saldırılarından korunma.',
    date: '4 Mayıs 2026',
    readTime: '4 dk okuma',
  },
  {
    title: 'Instagram Insights (İstatistikler) Nasıl Okunur?',
    slug: 'instagram-insights-istatistikler-nasil-okunur',
    description: 'Profil istatistiklerinizdeki erişim, etkileşim, gösterim ve demografik verileri doğru okuyarak içerik stratejinizi geliştirin.',
    date: '1 Mayıs 2026',
    readTime: '6 dk okuma',
  },
];

function formatDate(publishedAt: { seconds: number } | string | null | undefined): string {
  if (!publishedAt) return '';
  try {
    let d: Date;
    if (typeof publishedAt === 'object' && 'seconds' in publishedAt) {
      d = new Date(publishedAt.seconds * 1000);
    } else {
      d = new Date(publishedAt as string);
    }
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

async function getFirestorePosts(): Promise<FirestorePost[]> {
  try {
    const q = query(
      collection(dbLite, 'published_content'),
      orderBy('published_at', 'desc'),
      limit(50)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title || 'Başlıksız',
        slug: data.slug || doc.id,
        description: data.description || data.summary || data.excerpt || '',
        date: formatDate(data.published_at),
        readTime: data.read_time || data.readTime || '5 dk okuma',
        published_at: data.published_at,
        isFirestore: true,
      };
    });
  } catch (err) {
    console.error('[Blog] Firestore fetch hatası:', err);
    return [];
  }
}

export default async function Blog() {
  const firestorePosts = await getFirestorePosts();

  // Firestore makaleleri önde; statik olanlar sadece Firestore'da olmayan slug'lar için fallback
  const firestoreSlugs = new Set(firestorePosts.map((p) => p.slug));
  const staticFallback = STATIC_POSTS.filter((p) => !firestoreSlugs.has(p.slug));
  const posts: FirestorePost[] = [...firestorePosts, ...staticFallback];

  const hasFirestoreContent = firestorePosts.length > 0;

  return (
    <div className="container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <BookOpen size={24} style={{ color: 'hsl(var(--accent-secondary))' }} />
          <h1 className="gradient-text" style={{ fontSize: '3rem', margin: 0 }}>Instagram Büyüme &amp; SEO Rehberi</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '1rem' }}>
          Sosyal medyada daha görünür olmak, erişim sayılarınızı katlamak ve dijital varlığınızı güçlendirmek için en yeni rehberlerimiz.
        </p>
        {hasFirestoreContent && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '1rem',
            padding: '0.3rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            fontSize: '0.78rem',
            color: 'hsl(var(--accent-secondary))',
            fontWeight: 600,
          }}>
            <Zap size={12} />
            {firestorePosts.length} yeni makale canlı veritabanından yüklendi
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
      }}>
        {posts.map((post, idx) => (
          <article
            key={post.slug || idx}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}
          >
            {post.isFirestore && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                background: 'rgba(124, 58, 237, 0.2)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                fontSize: '0.65rem',
                color: 'hsl(var(--accent-secondary))',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}>
                YENİ
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={12} /> {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} /> {post.readTime}
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', lineHeight: 1.3, color: 'white' }}>{post.title}</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>
              {post.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '1rem',
              marginTop: '0.5rem',
            }}>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={12} /> Emre Kayahan
              </span>
              <Link
                href={`/blog/${post.slug}`}
                style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                className="read-more-link"
              >
                Oku &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

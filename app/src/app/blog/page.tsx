import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Büyüme & SEO Rehberi | Instascope Blog',
  description: 'Instagram algoritması, etkileşim oranları, Reels izlenmeleri, organik takipçi artırma ve sosyal medya büyüme stratejileri üzerine güncel rehberler.',
  alternates: {
    canonical: '/blog',
  }
};

export default function Blog() {
  const posts = [
    {
      title: 'Instagram Algoritması Nasıl Çalışır (2026 Güncel Rehber)',
      slug: 'instagram-algoritmasi-nasil-calisir-2026',
      description: 'Instagram reels, hikayeler ve ana sayfa algoritmasının arkasındaki detaylı mekanizmayı ve etkileşim artırma yöntemlerini inceleyin.',
      date: '15 Haziran 2026',
      readTime: '6 dk okuma'
    },
    {
      title: 'Organik Takipçi Artırma Yöntemleri ve Stratejiler',
      slug: 'organik-takipci-artirma-yontemleri',
      description: 'Bot hesaplar yerine tamamen organik, sadık ve aktif bir instagram takipçi kitlesi oluşturmanın 10 bilimsel adımı.',
      date: '10 Haziran 2026',
      readTime: '8 dk okuma'
    },
    {
      title: 'Instagram Etkileşim Oranı Nedir, Nasıl Hesaplanır?',
      slug: 'instagram-etkilesim-orani-nedir-nasil-hesaplanir',
      description: 'Etkileşim oranı (Engagement Rate) hesabınızın gücünü gösterir. En basit hesaplama formülleri ve sektörel etkileşim kıyaslamaları.',
      date: '16 Haziran 2026',
      readTime: '5 dk okuma'
    },
    {
      title: "2026'da En İyi Instagram Hashtag Stratejileri",
      slug: '2026-en-iyi-instagram-hashtag-stratejileri',
      description: 'Algoritmanın değişen hashtag politikalarını yakalayın. Gönderi türüne göre kaç adet ve hangi tür hashtag kullanmanız gerektiğini öğrenin.',
      date: '16 Haziran 2026',
      readTime: '7 dk okuma'
    },
    {
      title: 'Instagram Reels Algoritmasını Anlamak',
      slug: 'instagram-reels-algoritmasini-anlamak',
      description: 'Keşfet sayfasına düşmenin, izlenme sürelerini artırmanın ve viral Reels videoları hazırlamanın arkasındaki algoritma kuralları.',
      date: '16 Haziran 2026',
      readTime: '6 dk okuma'
    },
    {
      title: 'Takipçi/Takip Oranı Neden Önemli?',
      slug: 'takipci-takip-orani-neden-onemli',
      description: 'Hesabınızın spam veya bot gibi görünmemesi için takipçi / takip edilen oranını nasıl dengede tutmalısınız? İşte altın oran.',
      date: '16 Haziran 2026',
      readTime: '4 dk okuma'
    },
    {
      title: "Instagram'da Shadowban Nasıl Anlaşılır ve Önlenir?",
      slug: 'instagramda-shadowban-nasil-anlasilir-ve-onlenir',
      description: 'Hesabınızın erişimleri aniden düştüyse shadowban riski altındasınız. Nedenleri, kontrol etme yöntemi ve ban kaldırma adımları.',
      date: '16 Haziran 2026',
      readTime: '8 dk okuma'
    },
    {
      title: 'İçerik Takvimi Nasıl Oluşturulur?',
      slug: 'icerik-takvimi-nasil-olusturulur',
      description: 'Düzenli paylaşım yapmak başarının anahtarıdır. Aylık sosyal medya planlaması yapmanızı sağlayacak içerik takvimi hazırlama rehberi.',
      date: '16 Haziran 2026',
      readTime: '5 dk okuma'
    },
    {
      title: 'Instagram Biyografi Linki Nasıl Optimize Edilir?',
      slug: 'instagram-biyografi-linki-nasil-optimize-edilir',
      description: 'Profilinizi ziyaret eden kullanıcıları takipçiye dönüştürmek için biyografi bağlantınızı nasıl tasarlamalısınız? En iyi taktikler.',
      date: '17 Haziran 2026',
      readTime: '5 dk okuma'
    },
    {
      title: 'Instagram Reels İzlenmesini Artırmanın 7 Yolu',
      slug: 'instagram-reels-izlenmesini-artirmanin-7-yolu',
      description: 'Reels izlenme sayılarınızı katlamak için uygulayabileceğiniz 7 pratik strateji. Kanca kullanımı, müzik seçimi ve süre ayarı.',
      date: '17 Haziran 2026',
      readTime: '6 dk okuma'
    },
    {
      title: 'Bot Takipçi vs Organik Takipçi: Hesabınıza Zararları',
      slug: 'bot-takipci-vs-organik-takipci',
      description: 'Bot takipçi satın almanın profilinizin erişimini nasıl sıfırladığını ve algoritmanın neden cezalandırdığını teknik verilerle inceleyin.',
      date: '17 Haziran 2026',
      readTime: '6 dk okuma'
    },
    {
      title: 'Instagram Story Etkileşimi Nasıl Artırılır?',
      slug: 'instagram-story-etkilesimi-nasil-artirilir',
      description: 'Hikayelerinizin görüntüleme sayılarını artıracak çıkartma kullanımı, anketler, soru-cevaplar ve algoritma tetikleme yöntemleri.',
      date: '17 Haziran 2026',
      readTime: '5 dk okuma'
    },
    {
      title: "Instagram'da Keşfet'e Düşme Taktikleri",
      slug: 'instagramda-kesfete-dusme-taktikleri',
      description: 'Gönderilerinizin Keşfet sayfasına çıkması ve takipçi olmayan kitleye ulaşması için yapılması gereken anahtar optimizasyonlar.',
      date: '17 Haziran 2026',
      readTime: '7 dk okuma'
    },
    {
      title: 'Mikro Influencer Nedir, Markalar Neden Tercih Eder?',
      slug: 'mikro-influencer-nedir-markalar-neden-tercih-eder',
      description: '10k-50k takipçi aralığındaki hesapların yüksek etkileşim güçleri ve markaların reklam iş birliklerinde onları seçme nedenleri.',
      date: '17 Haziran 2026',
      readTime: '5 dk okuma'
    },
    {
      title: 'Instagram Hesap Güvenliği ve İki Faktörlü Doğrulama',
      slug: 'instagram-hesap-guvenligi-ve-iki-faktorlu-dogrulama',
      description: 'Hesabınızın çalınmasını önleyecek güvenlik önlemleri, iki faktörlü doğrulama ayarları ve kimlik avı saldırılarından korunma.',
      date: '17 Haziran 2026',
      readTime: '4 dk okuma'
    },
    {
      title: 'Instagram Insights (İstatistikler) Nasıl Okunur?',
      slug: 'instagram-insights-istatistikler-nasil-okunur',
      description: 'Profil istatistiklerinizdeki erişim, etkileşim, gösterim ve demografik verileri doğru okuyarak içerik stratejinizi geliştirin.',
      date: '17 Haziran 2026',
      readTime: '6 dk okuma'
    }
  ];

  return (
    <div className="container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <BookOpen size={24} style={{ color: 'hsl(var(--accent-secondary))' }} />
          <h1 className="gradient-text" style={{ fontSize: '3rem', margin: 0 }}>Instagram Büyüme & SEO Rehberi</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '1rem' }}>
          Sosyal medyada daha görünür olmak, erişim sayılarınızı katlamak ve dijital varlığınızı güçlendirmek için en yeni rehberlerimiz.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem'
      }}>
        {posts.map((post, idx) => (
          <article key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={12} /> Emre Kayahan
              </span>
              <Link href={`/blog/${post.slug}`} style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} className="read-more-link">
                Oku &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

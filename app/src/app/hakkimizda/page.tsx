import React from 'react';
import type { Metadata } from 'next';
import { Sparkles, Shield, User, Heart, BarChart3, Award, BookOpen, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | Instascope — Instagram Analiz Platformu',
  description: 'Instascope, sosyal medya analiz araçlarını herkes için erişilebilir kılmak amacıyla 2024 yılında Emre Kayahan tarafından kurulmuş bağımsız bir Türk platformudur. Şifresiz, ücretsiz ve güvenilir.',
  alternates: {
    canonical: '/hakkimizda',
  }
};

export default function Hakkimizda() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://instascope.com.tr/hakkimizda",
    "name": "Hakkımızda | Instascope",
    "description": "Instascope hakkında bilgi edinin. Platformun kuruluş hikayesi, değerleri ve takımı.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Instascope",
      "url": "https://instascope.com.tr",
      "foundingDate": "2024",
      "foundingLocation": "Türkiye",
      "description": "Instagram analiz araçları sunan bağımsız Türk dijital platformu",
      "founder": {
        "@type": "Person",
        "name": "Emre Kayahan",
        "jobTitle": "Kurucu & Baş Geliştirici",
        "knowsAbout": ["Instagram Algoritması", "Sosyal Medya Pazarlaması", "Dijital Analitik", "Web Geliştirme"]
      }
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '860px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sparkles size={28} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Hakkımızda</h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, fontSize: '1.1rem' }}>
            Sosyal medya analiz süreçlerini herkes için erişilebilir, şeffaf ve güvenli kılmak amacıyla yola çıktık. Instascope, Türkiye'den dünyaya açılan bağımsız bir dijital analiz platformudur.
          </p>
        </div>

        {/* Story */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.85 }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={22} style={{ color: 'hsl(var(--accent-secondary))' }} /> Instascope Nedir ve Neden Kuruldu?
          </h2>
          <p>
            Instascope, sosyal medya analizi yaparken karmaşık hesaplamalardan, şifre talep eden güvensiz sistemlerden ve yüksek ücretli kurumsal araçlardan sıkılan bir sosyal medya uzmanının kişisel arayışı sonucunda doğmuştur.
          </p>
          <p>
            <strong>Emre Kayahan</strong> tarafından bireysel olarak tasarlanan, geliştirilen ve yönetilen bu platform, 2024 yılında yayına girmiştir. Instagram içerik üreticilerinin, markaların ve küçük işletmelerin hesap büyüme performanslarını en hızlı, en şeffaf ve en güvenli şekilde ölçmelerine olanak sağlamak temel hedefimizdir.
          </p>
          <p>
            Platformumuzda bulunan tüm araçlar; Etkileşim Hesaplayıcı, Hashtag Önerici, En İyi Paylaşım Saati, Profil Sağlık Skoru ve Biyografi Link Oluşturucu — kullanıcılarımızın hesap güvenliğini korumak amacıyla tamamen <strong>istemci-taraflı (client-side)</strong> çalışacak şekilde mimari edilmiştir. Hiçbir aracımız profil şifrenizi, API yetkilendirmenizi veya hassas kişisel bilgilerinizi talep etmez.
          </p>
        </section>

        {/* Methodology */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={22} style={{ color: 'hsl(var(--accent-secondary))' }} /> Metodoloji ve Güvenilirlik
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            Instascope'un sunduğu her analiz ve öneri, sosyal medya araştırmalarına, Instagram'ın resmi açıklamalarına ve sektör gözlemlerine dayanan kanıtlanmış metodolojilere dayanmaktadır.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingLeft: '0', listStyle: 'none' }}>
            {[
              { label: 'Etkileşim Oranı Formülü', desc: 'Sektörde yaygın kabul gören "Takipçi Başına Etkileşim" formülünü kullanıyoruz: (Beğeni + Yorum) / Takipçi × 100.' },
              { label: 'Hashtag Veri Seti', desc: 'Öneriler, içerik kategorilerine göre segmentlenmiş büyük-orta-küçük hacimli etiket havuzlarından derlenmektedir.' },
              { label: 'Paylaşım Saati Matrisi', desc: 'Sektör araştırmaları ve kullanıcı davranış verilerine dayalı, kategori bazlı zaman dilimi analizinden oluşur.' },
              { label: 'Profil Sağlık Skoru', desc: 'Etkileşim oranı, takipçi/takip dengesi ve hesap aktivitesini bütünleşik bir puanlama algoritmasıyla değerlendiririz.' },
            ].map((item) => (
              <li key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle size={18} style={{ color: 'hsl(var(--accent-secondary))', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <strong style={{ color: 'white' }}>{item.label}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Author */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={22} style={{ color: 'hsl(var(--accent-secondary))' }} /> Kurucu Hakkında
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.5rem',
              flexShrink: 0
            }}>
              EK
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>Emre Kayahan</span>
                <span style={{ fontSize: '0.72rem', color: 'hsl(var(--accent-secondary))', background: 'rgba(124, 58, 237, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>Kurucu & Geliştirici</span>
              </div>
              <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                Yazılım geliştirme ve sosyal medya analizi alanlarında deneyim sahibi olan Emre, Instagram büyüme metodolojilerini ve algoritma dinamiklerini incelemeye 2021 yılında başladı. 2024'te bu birikimi Instascope platformuna dönüştürdü. Platform; içerik üreticilerine, küçük işletmelere ve dijital pazarlama ajanslarına ücretsiz ve şeffaf analiz araçları sunmayı hedeflemektedir.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Instagram Algoritması', 'Sosyal Medya Analizi', 'Web Geliştirme', 'Dijital Strateji'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', color: 'hsl(var(--text-secondary))', border: '1px solid rgba(255,255,255,0.08)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
          {[
            { number: '6+', label: 'Ücretsiz Analiz Aracı' },
            { number: '2024', label: "Kuruluş Yılı" },
            { number: '%100', label: 'Şifresiz & Güvenli' },
            { number: '0₺', label: 'Tüm Araçlar Ücretsiz' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card" style={{ textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.number}</span>
              <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Önce Güvenlik</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Verileriniz hiçbir sunucuya kaydedilmez. Tüm analizler ve hesaplamalar kendi tarayıcınızda gerçekleşir. Şifrenizi asla talep etmiyoruz.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
              <User size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Bireysel & Bağımsız</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Kurumsal çıkarlara değil kullanıcı ihtiyaçlarına odaklanan, tamamen bağımsız bir bireysel geliştirici projesidir.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Eğitim Odaklı</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Araçların yanı sıra Instagram algoritması, hashtag stratejisi ve büyüme taktikleri üzerine Türkçe rehber içerikler sunuyoruz.
            </p>
          </div>
        </div>

        {/* Contact Note */}
        <div style={{
          background: 'rgba(124, 58, 237, 0.05)',
          border: '1px solid rgba(124, 58, 237, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          color: 'hsl(var(--text-secondary))',
          fontSize: '0.9rem'
        }}>
          Herhangi bir soru, öneri veya iş birliği için bize <a href="mailto:demadatr@gmail.com" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>demadatr@gmail.com</a> adresinden veya <a href="/iletisim" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>İletişim</a> sayfamızdan ulaşabilirsiniz. Geri dönüşlerinizi önemsiyoruz.
        </div>

      </div>
    </div>
  );
}

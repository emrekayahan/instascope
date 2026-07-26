import type { Metadata } from 'next';
import ProfilSagligiClient from './profil-sagligi-client';

export const metadata: Metadata = {
  title: 'Instagram Profil Sağlık Skoru Hesaplayıcı | Instascope',
  description: 'Hesabınızın etkileşim oranı, takipçi/takip dengesi ve genel profil sağlığını analiz edin, 100 üzerinden bir sağlık skoru elde edin.',
  alternates: {
    canonical: '/araclar/profil-sagligi',
  }
};

export default function ProfilSagligi() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram Profil Sağlık Skoru Hesaplayıcı",
    "url": "https://instascope.com.tr/araclar/profil-sagligi",
    "description": "Hesabınızın etkileşim oranı, takipçi/takip dengesi ve genel profil sağlığını analiz edin, 100 üzerinden bir sağlık skoru elde edin.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Profil Sağlık Skoru nasıl hesaplanır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profil Sağlık Skoru, üç temel metriği birleştirerek 0-100 arasında bir puan üretir: etkileşim oranı (en ağır ağırlık), takipçi/takip dengesi ve hesap aktivitesi. Her metrik ayrı ayrı değerlendirilir ve ağırlıklı ortalama alınarak nihai skor oluşturulur."
        }
      },
      {
        "@type": "Question",
        "name": "İyi bir Profil Sağlık Skoru kaç olmalı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "70 ve üzeri skor, hesabınızın sağlıklı bir etkileşim performansına sahip olduğunu gösterir. 50-70 arası ortalama; bazı alanlarda iyileştirme fırsatı var demektir. 50 altı düşük; etkileşim oranı veya takipçi dengesi üzerinde acilen çalışmanız gerekiyor."
        }
      },
      {
        "@type": "Question",
        "name": "Araç Instagram'a erişim gerektiriyor mu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır. Instascope Profil Sağlık Skoru aracı tamamen istemci-taraflı (client-side) çalışır. Herhangi bir Instagram hesabı bağlantısı, API erişimi veya şifre gerektirmez. Yalnızca takipçi sayısı, ortalama beğeni ve yorum gibi temel verileri girerek sonuç alırsınız."
        }
      },
      {
        "@type": "Question",
        "name": "Skorumu artırmak için ne yapabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Düşük skor genellikle düşük etkileşim oranı veya dengesiz takipçi/takip oranından kaynaklanır. Etkileşimi artırmak için doğru saatte paylaşım yapın, carousel formatı kullanın, yorumlara hızlı yanıt verin ve nişe özgü hashtag stratejisi uygulayın. Pasif veya bot takipçileri temizlemek de skoru iyileştirir."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProfilSagligiClient />

      {/* SEO İçerik Bölümü */}
      <div className="container" style={{ maxWidth: '800px', padding: '3rem 2rem 5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Araç Açıklaması */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Profil Sağlık Skoru Nedir?</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instagram Profil Sağlık Skoru, hesabınızın genel büyüme sağlığını tek bir sayıyla özetleyen bütünleşik bir analiz metriğidir. Etkileşim oranı, takipçi/takip dengesi ve hesap büyüme sinyallerini birleştirerek 0-100 arasında bir puan üretir.
          </p>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Araç; içerik üreticilerin, markaların ve küçük işletmelerin hesap performanslarını hızla değerlendirmelerine, iyileştirilmesi gereken alanları belirlemelerine ve zaman içindeki büyümeyi takip etmelerine yardımcı olmak için tasarlanmıştır. Herhangi bir Instagram hesap bağlantısı veya şifre gerektirmez.
          </p>
        </section>

        {/* Skor Bileşenleri */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Skor Nasıl Hesaplanır?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Etkileşim Oranı (%60)', desc: 'Ortalama beğeni ve yorum sayısının takipçi sayısına oranı. En ağır ağırlıklı bileşendir.' },
              { title: 'Takipçi/Takip Dengesi (%25)', desc: 'Takipçi sayısının, takip edilen hesap sayısına oranı. Hesabın güvenilirlik sinyalini etkiler.' },
              { title: 'Büyüme Aktivitesi (%15)', desc: 'Gönderi sıklığı ve hesabın genel aktivitesi temelinde değerlendirilen büyüme ivmesi.' },
            ].map((item) => (
              <div key={item.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'hsl(var(--accent-secondary))', margin: 0 }}>{item.title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skor Skalası */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Skor Skalaları ve Anlamları</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { range: '80 – 100', label: 'Mükemmel', desc: 'Hesabınız üst düzey etkileşim oranı ve sağlıklı takipçi dengesiyle yüksek performanslı bir profil sergiliyor.', color: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
              { range: '60 – 79', label: 'İyi', desc: 'Güçlü bir temel var. Belirli alanlarda yapılacak iyileştirmelerle mükemmel seviyeye ulaşılabilir.', color: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
              { range: '40 – 59', label: 'Ortalama', desc: 'Etkileşim oranı veya takipçi dengesi geliştirilmeye ihtiyaç duyuyor. Stratejik değişiklikler hızlı iyileşme sağlar.', color: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
              { range: '0 – 39', label: 'Düşük', desc: 'Hesap büyümesi ciddi engellerle karşı karşıya. İçerik stratejisi, etiket kullanımı ve paylaşım zamanlamasının gözden geçirilmesi gerekiyor.', color: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
            ].map((item) => (
              <div key={item.range} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.25rem', borderRadius: '12px', background: item.color, border: `1px solid ${item.border}` }}>
                <div style={{ minWidth: '70px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>{item.range}</span>
                  <div style={{ fontSize: '0.72rem', color: 'hsl(var(--text-muted))' }}>{item.label}</div>
                </div>
                <p style={{ margin: 0, color: 'hsl(var(--text-secondary))', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Sık Sorulan Sorular</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'Profil Sağlık Skoru nasıl hesaplanır?',
                a: 'Skor; etkileşim oranı (%60 ağırlık), takipçi/takip dengesi (%25) ve hesap aktivitesi (%15) bileşenleri ağırlıklı ortalama alınarak 0-100 arası bir değere dönüştürülür.'
              },
              {
                q: 'Araç Instagram şifremi veya API bilgilerimi istiyor mu?',
                a: 'Hayır. Araç tamamen istemci-taraflı çalışır. Yalnızca sizin gireceğiniz takipçi, takip edilen, ortalama beğeni ve yorum sayısını kullanır. Instagram hesabınıza hiçbir erişim talep edilmez.'
              },
              {
                q: 'Ne sıklıkla skoru kontrol etmeliyim?',
                a: 'Aylık bazda kontrol etmenizi öneririz. Yeni bir içerik stratejisi uyguladıktan, büyük bir kampanya yürüttükten veya aniden takipçi/etkileşim değişimi yaşadıktan sonra da kontrol yapmanız faydalı olacaktır.'
              },
              {
                q: 'Düşük skor aldım, ne yapmalıyım?',
                a: 'Düşük skor genellikle etkileşim oranı sorununa işaret eder. Araç, raporun alt kısmında iyileştirme önerileri sunar. Doğru paylaşım saati seçimi, hashtag stratejisi ve carousel içerik formatı ile skoru hızla artırabilirsiniz.'
              }
            ].map((faq, i) => (
              <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', margin: 0 }}>{faq.q}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

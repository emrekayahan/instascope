import type { Metadata } from 'next';
import EtkilesimClient from './etkilesim-client';

export const metadata: Metadata = {
  title: 'Instagram Etkileşim Oranı Hesaplayıcı | Instascope',
  description: 'Takipçi, beğeni ve yorum sayılarınızı girerek profilinizin gerçek etkileşim oranını anında ve şifresiz olarak hesaplayın.',
  alternates: {
    canonical: '/araclar/etkilesim-hesaplayici',
  }
};

export default function EtkilesimHesaplayici() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram Etkileşim Oranı Hesaplayıcı",
    "url": "https://instascope.com.tr/araclar/etkilesim-hesaplayici",
    "description": "Takipçi, beğeni ve yorum sayılarınızı girerek profilinizin gerçek etkileşim oranını anında ve şifresiz olarak hesaplayın.",
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
        "name": "İyi bir Instagram etkileşim oranı kaçtır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Genel kabul gören sektör referansları şöyledir: %0-1 zayıf, %1-3 ortalama, %3-6 iyi, %6-10 çok iyi, %10+ mükemmel. Ancak takipçi sayısı arttıkça etkileşim oranının doğal olarak düştüğünü unutmamak gerekir. 1 milyon takipçili bir hesabın %1 oranı, 5.000 takipçili bir hesabın %8 oranı kadar değerlidir."
        }
      },
      {
        "@type": "Question",
        "name": "Etkileşim oranı neden düşüyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Etkileşim oranı birkaç farklı nedenden dolayı düşebilir: bot veya pasif takipçilerin birikmesi, içerik kalitesinin veya tutarlılığının azalması, yanlış saatlerde paylaşım yapılması, hashtag stratejisinin güncellenmemesi veya Instagram'ın hesabı kısmen kısıtlaması (shadowban). Her birini sistematik olarak test ederek sorunun kaynağını bulabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Bu hesaplayıcı doğru sonuç veriyor mu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hesaplayıcı, sektörde yaygın kabul gören standart formülü kullanır: (Ortalama Beğeni + Ortalama Yorum) / Takipçi Sayısı × 100. Doğruluk, girilen verilerin gerçekliğine bağlıdır. Son 10-12 gönderinizin beğeni ve yorum ortalamasını hesaplayarak sonucu girerseniz en güvenilir sonucu elde edersiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Etkileşim oranını artırmak için ne yapabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Etkileşimi artırmanın kanıtlanmış yolları: Carousel (çoklu fotoğraf) formatı kullanmak, yorumlara ilk 30 dakika içinde yanıt vermek, eylem çağrısı (CTA) içeren caption'lar yazmak, hedef kitlenizin en aktif olduğu saatte paylaşmak ve nişe özgü hashtag stratejisi uygulamak."
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
      <EtkilesimClient />

      {/* SEO İçerik Bölümü */}
      <div className="container" style={{ maxWidth: '800px', padding: '3rem 2rem 5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Araç Açıklaması */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Etkileşim Oranı Nedir ve Neden Önemlidir?</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instagram etkileşim oranı (Engagement Rate), bir hesabın takipçi kitlesiyle kurduğu aktif bağın gücünü ölçen en temel sosyal medya metriğidir. Markalar, ajanslar ve influencer platformları iş birliği değerlemelerinde takipçi sayısından önce etkileşim oranına bakar; çünkü bu oran, gerçek kitle sağlığını yansıtır.
          </p>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instagram algoritması da etkileşim oranını, içeriklerin ne kadar geniş kitlelere dağıtılacağına karar verirken temel sinyal olarak kullanır. Yüksek etkileşim oranına sahip hesapların gönderileri, Keşfet sayfasına ve öneri akışlarına çok daha hızlı taşınır.
          </p>
        </section>

        {/* Formül Açıklaması */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Hesaplama Formülü</h2>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '1.05rem',
            color: 'white',
            letterSpacing: '0.01em'
          }}>
            ER (%) = [ (Ortalama Beğeni + Ortalama Yorum) ÷ Toplam Takipçi ] × 100
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, fontSize: '0.92rem' }}>
            Bu formül, sektörde "Follower-Based Engagement Rate" olarak bilinen standart yönteme dayanır ve en güvenilir karşılaştırma metriği olarak kabul görmektedir. Son 10-12 gönderinizin beğeni ve yorum ortalamasını hesaplayarak yukarıdaki araca girin; anlık ve doğru sonucu alın.
          </p>
        </section>

        {/* Sektör Ortalama Tablosu */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Sektör Ortalamaları ile Karşılaştırın</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { range: '%10+', label: 'Mükemmel', color: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', desc: 'Nano influencer\'lar için normal; büyük hesaplar için istisnai' },
              { range: '%6 – %10', label: 'Çok İyi', color: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', desc: 'Algoritmada güçlü görünürlük ve Keşfet adayı' },
              { range: '%3 – %6', label: 'İyi', color: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.3)', desc: 'Mikro influencer\'lar için hedeflenen standart aralık' },
              { range: '%1 – %3', label: 'Ortalama', color: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', desc: '100K+ takipçili hesaplar için kabul edilebilir' },
              { range: '%0 – %1', label: 'Zayıf', color: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', desc: 'Bot takipçi veya içerik stratejisi sorunu işareti' },
            ].map((item) => (
              <div key={item.range} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.85rem 1.25rem', borderRadius: '10px', background: item.color, border: `1px solid ${item.border}`, flexWrap: 'wrap' }}>
                <strong style={{ color: 'white', minWidth: '70px', fontSize: '0.95rem' }}>{item.range}</strong>
                <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.82rem', fontWeight: 600, minWidth: '80px' }}>{item.label}</span>
                <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.82rem', flex: 1 }}>{item.desc}</span>
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
                q: 'İyi bir etkileşim oranı kaçtır?',
                a: '%1-3 ortalama, %3-6 iyi, %6+ çok iyi kabul edilir. Takipçi sayısı arttıkça oranın doğal olarak düşeceğini göz önünde bulundurun. Küçük hesaplar için %10+ normal iken büyük hesaplar için %2-3 mükemmel sayılabilir.'
              },
              {
                q: 'Etkileşim oranı neden aniden düştü?',
                a: 'Olası sebepler: bot/pasif takipçi birikimi, içerik kalitesinin düşmesi, yanlış saatte paylaşım, hashtag stratejisinin eskimesi veya algoritma güncellemesi. Her faktörü sistematik olarak test ederek kaynağı belirleyin.'
              },
              {
                q: 'Hesaplama için kaç gönderinin verisini kullanmalıyım?',
                a: 'En güvenilir sonuç için son 10-15 gönderi ortalamasını kullanın. Tek bir gönderinin verisi, viral veya kötü performanslı içerik nedeniyle yanıltıcı olabilir. Ortalamanın hesaba katılması çok daha gerçekçi bir tablo sunar.'
              },
              {
                q: 'Bu araç ücretsiz mi?',
                a: 'Evet, Instascope\'un tüm araçları ücretsizdir. Kayıt, üyelik veya kişisel bilgi gerektirmez. Tüm hesaplamalar doğrudan tarayıcınızda yapılır.'
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

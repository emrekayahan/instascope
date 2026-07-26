import type { Metadata } from 'next';
import SaatClient from './saat-client';

export const metadata: Metadata = {
  title: 'Instagram En İyi Paylaşım Saati Hesaplayıcı | Instascope',
  description: 'Sektörünüze ve paylaşım gününüze göre kitlenizin en aktif olduğu ve en yüksek etkileşim alacağınız paylaşım saatlerini analiz edin.',
  alternates: {
    canonical: '/araclar/en-iyi-paylasim-saati',
  }
};

export default function PaylasimSaati() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram En İyi Paylaşım Saati Hesaplayıcı",
    "url": "https://instascope.com.tr/araclar/en-iyi-paylasim-saati",
    "description": "Sektörünüze ve paylaşım gününüze göre kitlenizin en aktif olduğu ve en yüksek etkileşim alacağınız paylaşım saatlerini analiz edin.",
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
        "name": "Instagram'da en iyi paylaşım saati ne zaman?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Genel olarak Salı-Cuma günleri sabah 08:00-10:00 ve akşam 18:00-21:00 saatleri en yüksek etkileşimi getiren zaman dilimleridir. Ancak bu, hedef kitlenizin yaş grubuna, coğrafyasına ve içerik sektörünüze göre önemli ölçüde farklılaşabilir. Örneğin e-ticaret hesapları için öğle saatleri ve maaş günlerinin akşamları; kişisel blog hesapları için ise gece geç saatler daha yüksek etkileşim üretebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Paylaşım saatinin etkileşim oranına etkisi nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Algoritma, yeni yüklenen içeriği önce küçük bir test grubuna gösterir. Bu gruptan gelen etkileşim yoğunluğuna göre içeriğin daha geniş kitlelere dağıtılıp dağıtılmayacağı kararlaştırılır. Test grubunun büyük çoğunluğu o saatte çevrimiçi değilse, etkileşim yavaş gelir ve içerik 'düşük ilgi' olarak işaretlenip erişimi kısıtlanabilir."
        }
      },
      {
        "@type": "Question",
        "name": "Her gün aynı saatte paylaşım yapmalı mıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tutarlılık önemlidir, ancak algoritmik açıdan aynı saatte paylaşım zorunluluğu yoktur. Kitle demografiniz ve içerik türüne göre farklı gün ve saatleri test ederek en iyi performansı yakalamak çok daha akıllıca bir yaklaşımdır. Haftanın farklı günleri için farklı sektör önerilerini aramıza girerek karşılaştırabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Bu araç nasıl çalışıyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Araç, farklı içerik sektörleri ve haftanın günlerine göre yapılandırılmış bir veri matrisi kullanır. Sektör araştırmaları ve kullanıcı davranış analizlerinden derlenen bu matris, seçtiğiniz kombinasyona göre en yüksek etkileşim elde edilmesi beklenen saat aralıklarını listeler."
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
      <SaatClient />

      {/* SEO İçerik Bölümü */}
      <div className="container" style={{ maxWidth: '800px', padding: '3rem 2rem 5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Araç Açıklaması */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Doğru Paylaşım Saati Neden Bu Kadar Önemlidir?</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instagram algoritması, yeni yüklenen bir gönderiyi veya Reels videosunu önce küçük bir test grubuna sunar. Bu grubun ilk tepkisi, içeriğin daha geniş kitlelere ulaşıp ulaşmayacağını belirler. Eğer test grubu o an aktif değilse, etkileşim yavaş gelir ve algoritma içeriği "düşük ilgi görüyor" olarak işaretler.
          </p>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Bu nedenle içeriğin kalitesi kadar, yükleme zamanlaması da büyüme üzerinde doğrudan etkiye sahiptir. Araştırmalar, doğru saatte yüklenen içeriklerin yanlış saatte yüklenenlerle karşılaştırıldığında %20-40 daha yüksek ilk etkileşim aldığını göstermektedir.
          </p>
        </section>

        {/* Sektöre Göre Zaman Dilimleri */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Sektöre Göre Genel Paylaşım Saati Rehberi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { sector: 'Moda & Yaşam Tarzı', times: 'Sabah 08-10, Akşam 18-21', note: 'Hafta sonu öğleden sonra da güçlü' },
              { sector: 'E-ticaret & Alışveriş', times: 'Öğle 12-14, Akşam 19-22', note: 'Cuma ve Cumartesi en yoğun' },
              { sector: 'Yemek & Gastronomi', times: 'Sabah 10-11, Öğle 11-13', note: 'Yemek saatleri öncesi en etkili' },
              { sector: 'Spor & Fitness', times: 'Sabah 06-08, Akşam 17-20', note: 'Antrenman saatleri öncesi/sonrası' },
              { sector: 'Eğitim & Kariyer', times: 'Hafta içi 08-10, 12-14', note: 'Öğrenci kitleleri için akşam saatleri' },
              { sector: 'Sanat & Yaratıcı İçerik', times: 'Akşam 19-23', note: 'Hafta sonu tüm gün etkilidir' },
            ].map((item) => (
              <div key={item.sector} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.1rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'white', margin: 0 }}>{item.sector}</h3>
                <p style={{ color: 'hsl(var(--accent-secondary))', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{item.times}</p>
                <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.78rem', margin: 0 }}>{item.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.82rem', lineHeight: 1.6, fontStyle: 'italic' }}>
            * Yukarıdaki saatler Türkiye (GMT+3) saat dilimine göredir ve genel istatistik ortalamalarını yansıtır. Kendi kitlenizin davranışı farklılık gösterebilir.
          </p>
        </section>

        {/* SSS */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Sık Sorulan Sorular</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'Instagram\'da en iyi paylaşım saati genel olarak ne zaman?',
                a: 'Genel olarak Salı-Cuma günleri sabah 08-10 ve akşam 18-21 arası en yüksek etkileşimi getirir. Ancak bu, hedef kitlenizin demografisine ve sektörünüze göre farklılaşabilir. Araç, sektörünüzü ve günü seçerek size özelleştirilmiş öneriler sunar.'
              },
              {
                q: 'Paylaşım saatini her hafta değiştirmeli miyim?',
                a: 'Sabit bir saat tutmak yerine haftanın farklı günleri için araç önerilerini inceleyin ve 2-3 haftalık test sürecinde hangi saatin en yüksek etkileşimi getirdiğini belirleyin. Kitle davranışları mevsimsel ve haftalık döngülere göre değişebilir.'
              },
              {
                q: 'Reels için paylaşım saati fotoğraflardan farklı mı?',
                a: 'Evet, çoğu durumda farklıdır. Reels, keşfet ve öneriler yüzeyi üzerinden dağıtıldığı için akşam saatlerinde daha geniş bir kitleye ulaşabilir. Carousel ve tek fotoğraf gönderileri ise takipçi akışına daha fazla bağımlıdır, bu nedenle takipçilerinizin en aktif olduğu saate daha duyarlıdır.'
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

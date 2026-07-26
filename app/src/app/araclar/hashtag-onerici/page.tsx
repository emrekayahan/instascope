import type { Metadata } from 'next';
import HashtagClient from './hashtag-client';

export const metadata: Metadata = {
  title: 'Instagram Hashtag Önerici & Analizi | Instascope',
  description: 'İçerik kategorinize göre en popüler, etkileşimi yüksek ve spam filtresine takılmayan hashtag kombinasyonlarını ücretsiz keşfedin.',
  alternates: {
    canonical: '/araclar/hashtag-onerici',
  }
};

export default function HashtagOnerici() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram Hashtag Önerici & Analizi",
    "url": "https://instascope.com.tr/araclar/hashtag-onerici",
    "description": "İçerik kategorinize göre en popüler, etkileşimi yüksek ve spam filtresine takılmayan hashtag kombinasyonlarını ücretsiz keşfedin.",
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
        "name": "Instagram'da kaç hashtag kullanmalıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instagram'ın resmi önerisi 3-5 adet odaklı hashtag yönündedir. Ancak bağımsız testler, gönderi türüne göre 5-12 adet arası dengeli hashtag kullanımının en yüksek erişimi sağladığını göstermektedir. Önemli olan rastgele çok sayıda etiket değil, içerikle alakalı ve farklı büyüklüklerde dengeli bir kombinasyondur."
        }
      },
      {
        "@type": "Question",
        "name": "Hashtag önerileri nasıl oluşturuluyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instascope Hashtag Önerici, seçtiğiniz içerik kategorisine göre büyük hacimli (1M+), orta hacimli (100K-1M) ve küçük/niş (10K-100K) etiketleri dengeli biçimde karıştırarak bir kombinasyon sunar. Her sorguda havuz karıştırılır, böylece taze ve tekrar etmeyen etiket setleri elde edilir."
        }
      },
      {
        "@type": "Question",
        "name": "Yasaklı hashtagleri nasıl anlarım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bir hashtagi Instagram arama çubuğunda aratın. Eğer 'Son Gönderiler' bölümü görünmüyor veya 'Bu etiket için içerik bulunamadı' mesajı çıkıyorsa, o etiket kısıtlanmış olabilir. Instascope'un önerdiği etiketler bu risk gözetilerek derlenmektedir."
        }
      },
      {
        "@type": "Question",
        "name": "Hashtag'leri caption'a mı, ilk yoruma mu eklemeliyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Her iki yöntem de algoritmik açıdan eşdeğer etki yaratır. Görsel açıdan temiz bir gönderi tercih ediyorsanız, hashtagleri yayınladıktan hemen sonra ilk yorum olarak ekleyebilirsiniz. Eğer akış düzeniniz yoksa caption'ın alt kısmına birkaç satır boşluk bırakarak da ekleyebilirsiniz."
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
      <HashtagClient />

      {/* SEO İçerik Bölümü */}
      <div className="container" style={{ maxWidth: '800px', padding: '3rem 2rem 5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Araç Açıklaması */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Hashtag Önerici Nasıl Çalışır?</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instascope Hashtag Önerici, içerik üreticilerine ve markalara Instagram gönderileri için optimize edilmiş hashtag kombinasyonları sunar. Araç, seçilen içerik kategorisine göre üç farklı büyüklük grubundan (büyük hacimli, orta hacimli ve niş) etiketleri dengeli biçimde karıştırır. Bu denge, hem geniş kitlelere ulaşma hem de spam filtrelerine takılmama açısından kritik öneme sahiptir.
          </p>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Instagram'ın anlamsal analiz (semantic analysis) algoritmaları artık yalnızca etiket sayısını değil, etiketin içerikle ne kadar alakalı olduğunu da değerlendirmektedir. Bu nedenle nişinize uygun, doğru büyüklükte ve çeşitli etiketler kullanmak; milyonlarca gönderi arasında boğulacak popüler etiketler kullanmaktan çok daha etkilidir.
          </p>
        </section>

        {/* Hashtag Stratejisi */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Etkili Hashtag Stratejisi Nasıl Oluşturulur?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Büyük Hacimli Etiket (1-2 adet)', desc: 'Milyonlarca gönderide geçen genel etiketler. Hızla akışa gömülür; yalnızca markalama için kullanın.' },
              { title: 'Orta Hacimli Etiket (3-5 adet)', desc: '100K-1M arası gönderi içeren etiketler. En dengeli erişim ve niş kitle kesişimi burada sağlanır.' },
              { title: 'Niş Etiket (4-6 adet)', desc: '10K-100K gönderi. Hedeflenmiş kitleye ulaşmanın en değerli kategorisi. Her sorguda mutlaka bulunmalı.' },
            ].map((item) => (
              <div key={item.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'hsl(var(--accent-secondary))', margin: 0 }}>{item.title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
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
                q: 'Instagram\'da kaç hashtag kullanmalıyım?',
                a: 'Instagram\'ın resmi önerisi 3-5 adet odaklı hashtag yönündedir. Bağımsız testler 5-12 adet arası dengeli kullanımın en yüksek erişimi sağladığını göstermektedir. Reels için 5-10, carousel için 8-12, tek fotoğraf için 5-8 etiket önerilir.'
              },
              {
                q: 'Aynı hashtagleri her gönderide kullanabilir miyim?',
                a: 'Hayır. Aynı etiket setini mekanik olarak tekrar etmek, Instagram\'ın spam algılama sistemini tetikleyebilir ve hesabınızın görünürlüğünü olumsuz etkileyebilir. Her gönderide farklı kombinasyonlar kullanmanız önerilir; bu nedenle aracımız her sorguda havuzu karıştırarak taze setler sunar.'
              },
              {
                q: 'Hashtag\'leri caption\'a mı, ilk yoruma mu eklemeliyim?',
                a: 'Her iki yöntem algoritmik açıdan eşdeğer etki yaratır. Görsel temizlik için yayınladıktan hemen sonra ilk yorum olarak ekleyebilirsiniz. Önemli olan ekleme hızıdır; etiketleri yayınlandıktan en fazla 5-10 dakika içinde eklemek gerekir.'
              },
              {
                q: 'Bu araç ücretsiz mi?',
                a: 'Evet, Instascope\'un tüm araçları tamamen ücretsizdir. Herhangi bir üyelik, şifre veya ödeme bilgisi gerektirmez.'
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

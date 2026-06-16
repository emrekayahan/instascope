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
  const jsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaatClient />
    </>
  );
}

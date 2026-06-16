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
  const jsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EtkilesimClient />
    </>
  );
}

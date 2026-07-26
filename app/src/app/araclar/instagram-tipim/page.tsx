import type { Metadata } from 'next';
import InstagramTipimClient from './instagram-tipim-client';

export const metadata: Metadata = {
  title: 'Instagram Hesabınız Hangi Tipte? (Quiz) | Instascope',
  description: '5 soruluk eğlenceli ve interaktif quizi tamamlayarak Instagram kişilik tipinizi (Mikro Influencer, Marka Hesabı vb.) hemen öğrenin.',
  alternates: {
    canonical: '/araclar/instagram-tipim',
  }
};

export default function InstagramTipim() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram Tipim Quiz",
    "url": "https://instascope.com.tr/araclar/instagram-tipim",
    "description": "5 soruluk eğlenceli ve interaktif quizi tamamlayarak Instagram kişilik tipinizi hemen öğrenin.",
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
      <InstagramTipimClient />
    </>
  );
}

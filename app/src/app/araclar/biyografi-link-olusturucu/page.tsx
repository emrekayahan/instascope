import type { Metadata } from 'next';
import LinkClient from './link-client';

export const metadata: Metadata = {
  title: 'Instagram Biyografi Link Oluşturucu | Instascope',
  description: 'Instagram profiliniz için şık, mobil uyumlu, çoklu bağlantı (Link-in-Bio) sayfası tasarlayın ve HTML kodunu ücretsiz indirin.',
  alternates: {
    canonical: '/araclar/biyografi-link-olusturucu',
  }
};

export default function BiyografiLinkOlusturucu() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Instagram Biyografi Link Oluşturucu",
    "url": "https://instascope.com.tr/araclar/biyografi-link-olusturucu",
    "description": "Instagram profiliniz için şık, mobil uyumlu, çoklu bağlantı (Link-in-Bio) sayfası tasarlayın ve HTML kodunu ücretsiz indirin.",
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
      <LinkClient />
    </>
  );
}

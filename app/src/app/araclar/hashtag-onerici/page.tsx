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
  const jsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HashtagClient />
    </>
  );
}

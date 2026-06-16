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
  return <LinkClient />;
}

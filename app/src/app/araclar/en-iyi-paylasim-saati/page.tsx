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
  return <SaatClient />;
}

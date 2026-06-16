import type { Metadata } from 'next';
import IletisimClient from './iletisim-client';

export const metadata: Metadata = {
  title: 'İletişim | Instascope',
  description: 'Instascope ile ilgili görüş, öneri, iş birlikleri ve destek talepleriniz için bizimle iletişime geçin. Mesajlarınız en kısa sürede yanıtlanacaktır.',
  alternates: {
    canonical: '/iletisim',
  }
};

export default function Iletisim() {
  return <IletisimClient />;
}

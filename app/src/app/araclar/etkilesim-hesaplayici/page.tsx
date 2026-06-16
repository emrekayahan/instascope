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
  return <EtkilesimClient />;
}

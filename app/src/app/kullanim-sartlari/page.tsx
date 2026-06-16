import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Instascope',
  description: 'Instascope web sitesinde sunulan ücretsiz analiz araçlarının kullanım koşullarını, yasal hak ve sorumlulukları bu sayfadan okuyabilirsiniz.',
  alternates: {
    canonical: '/kullanim-sartlari',
  }
};

export default function KullanimSartlari() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Kullanım Şartları</h1>
        <p>Son güncelleme: 15 Haziran 2026</p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Hizmet Koşulları</h3>
        <p>
          Instascope internet sitesinde yer alan hesaplayıcılar ve araçlar, sosyal medya analiz ve büyüme planlamalarınızda fikir verme amaçlıdır. Verilerin kesin doğruluğu garanti edilmemektedir.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. Instagram Entegrasyonu Hakkında</h3>
        <p>
          Bu internet sitesinin Instagram (Meta Inc.) ile herhangi bir resmi/gayriresmi bağı bulunmamaktadır. Sitemizde sunulan araçlar Instagram API\'larını izinsiz taramaz (scraping yapmaz), şifre veya oturum çerezi gibi kritik bilgileri asla talep etmez.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>3. Fikri Mülkiyet</h3>
        <p>
          Sitede yer alan özel tasarım öğeleri, şablonlar, logolar ve yazılımlar Instascope\'a ait olup izinsiz kopyalanamaz veya dağıtılamaz.
        </p>
      </div>
    </div>
  );
}

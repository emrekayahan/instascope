import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reklam Politikası | Instascope',
  description: 'Instascope üzerinde sunulan reklam yerleşimleri, kullanıcı deneyimi standartlarımız ve üçüncü taraf reklam ağlarına ilişkin politikalarımız.',
  alternates: {
    canonical: '/reklam-politikasi',
  }
};

export default function ReklamPolitikasi() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Reklam Politikası</h1>
        <p>Son güncelleme: 15 Haziran 2026</p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Reklam Servisleri</h3>
        <p>
          Instascope, gelir elde etmek amacıyla üçüncü taraf reklam ağlarını (Google AdSense, Ezoic vb.) kullanmaktadır. Bu reklam servisleri, ilgi alanlarınıza yönelik reklamlar gösterebilmek için kişisel olmayan çerezleri kullanabilir.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. Kullanıcı Deneyimi Standardı</h3>
        <p>
          Kullanıcılarımızı aldatmaya yönelik, zorla tıklama yaptıran veya sahte kapatma tuşları içeren hiçbir reklam formatına sitemizde izin verilmez. Reklam alanları, araçlarımızın kullanım konforunu ve sonuç ekranlarını engellemeyecek şekilde entegre edilmiştir.
        </p>
      </div>
    </div>
  );
}

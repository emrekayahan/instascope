import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Instascope',
  description: 'Instascope üzerinde kullanılan çerezlerin (cookies) türleri, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi edinin.',
  alternates: {
    canonical: '/cerez-politikasi',
  }
};

export default function CerezPolitikasi() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Çerez Politikası</h1>
        <p>Son güncelleme: 15 Haziran 2026</p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Çerez (Cookie) Nedir?</h3>
        <p>
          Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin daha verimli çalışması ve size özel reklamlar gösterilmesi amacıyla kullanılırlar.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. Hangi Çerezleri Kullanıyoruz?</h3>
        <p>
          Sitemizde temel işlevsellik çerezleri, Google Analytics istatistik çerezleri ve Google AdSense hedefleme/reklam çerezleri kullanılmaktadır.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>3. Çerez Ayarlarını Nasıl Değiştiririm?</h3>
        <p>
          Tarayıcınızın ayarlar sekmesinden çerezlerin tamamını engelleyebilir, silebilir veya yalnızca belirli siteler için izin verebilirsiniz. Çerezlerin engellenmesi durumunda sitemizdeki bazı dinamik özellikler kısmen etkilenebilir.
        </p>
      </div>
    </div>
  );
}

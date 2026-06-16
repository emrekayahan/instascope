import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Instascope',
  description: 'Instascope web sitesinde işlenen kişisel verilerinize ilişkin KVKK aydınlatma metnini ve yasal haklarınızı bu sayfadan öğrenebilirsiniz.',
  alternates: {
    canonical: '/kvkk',
  }
};

export default function Kvkk() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>KVKK Aydınlatma Metni</h1>
        <p>Son güncelleme: 16 Haziran 2026</p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Veri Sorumlusu</h3>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Instascope web platformu adına veri sorumlusu sıfatıyla Emre Kayahan, kullanıcılarımızın kişisel verilerinin güvenliğine ve gizliliğine son derece önem vermektedir.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. İşlenen Kişisel Veriler ve İşleme Amaçları</h3>
        <p>
          Sitemiz üzerinden toplanan kişisel verileriniz şunlardır:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>E-Posta Adresi:</strong> Bültene kayıt olmanız durumunda, haftalık sosyal medya gelişim rehberlerinin gönderilmesi amacıyla, açık rızanıza dayanarak işlenir.</li>
          <li><strong>Google Hesap Bilgileri:</strong> Google Giriş özelliğini kullanmanız halinde, kimliğinizin doğrulanması ve kullanıcı profilinizin oluşturulabilmesi amacıyla alınır. Analiz geçmişiniz sunucularımızda saklanmayıp tamamen tarayıcınızın yerel belleğinde (localStorage) saklanır.</li>
          <li><strong>İletişim Formu Verileri:</strong> Ad-soyad, e-posta adresi ve mesaj içeriği, bize ilettiğiniz taleplere yanıt verebilmek amacıyla işlenir.</li>
        </ul>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>3. Verilerin Saklanması ve Aktarımı</h3>
        <p>
          Analiz verileriniz sunucularımıza gönderilmez, tamamen tarayıcınızda işlenir. E-posta kayıtları ve iletişim verileri ise üçüncü şahıslara veya yurt dışına aktarılmaksızın güvenli ortamlarda saklanır.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>4. Haklarınız</h3>
        <p>
          KVKK Madde 11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme ve silinmesini isteme haklarına sahipsiniz. Başvurularınızı <Link href="/iletisim" style={{ color: 'hsl(var(--accent-secondary))' }}>İletişim</Link> sayfamızda belirtilen e-posta adresine yazılı olarak iletebilirsiniz.
        </p>
      </div>
    </div>
  );
}

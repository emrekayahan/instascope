import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Instascope',
  description: 'Instascope kullanıcılarının kişisel verilerinin korunması ve gizlilik haklarına ilişkin politikalarımızı bu sayfada inceleyebilirsiniz.',
  alternates: {
    canonical: '/gizlilik-politikasi',
  }
};

export default function GizlilikPolitikasi() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Gizlilik Politikası</h1>
        <p>Son güncelleme: 16 Haziran 2026</p>
        
        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>1. Veri Sorumlusu</h3>
        <p>
          Instascope, Emre Kayahan tarafından bireysel olarak işletilen bağımsız bir web sitesidir. KVKK kapsamında veri sorumlusu sıfatıyla Emre Kayahan, bu Gizlilik Politikası'nı kullanıcılarımızın kişisel verilerinin korunması amacıyla hazırlamıştır.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>2. Toplanan Veriler ve Amacı</h3>
        <p>
          <strong>A. Analiz Araçları:</strong> Sitemiz bünyesinde sunulan instagram analiz araçları (etkileşim hesaplayıcı, hashtag önerici, paylaşım saati bulucu, biyografi link oluşturucu) temel olarak <strong>istemci-taraflı (client-side)</strong> çalışmaktadır. Bu araçlara girdiğiniz sayısal veriler ve bağlantılar sunucularımıza aktarılmaz veya kaydedilmez.
        </p>
        <p>
          <strong>B. Google ile Giriş (Google Auth):</strong> Giriş yapmayı tercih etmeniz halinde, Google Identity Services aracılığıyla e-posta adresiniz, adınız, soyadınız ve profil resminiz gibi temel hesap bilgileri kimlik doğrulaması amacıyla alınır. Giriş yapan kullanıcıların geçmiş analiz kayıtları, tamamen kendi tarayıcılarının <code>localStorage</code> (yerel bellek) alanında saklanır ve sunucularımıza kaydedilmez.
        </p>
        <p>
          <strong>C. Bülten Kayıt Formu:</strong> Haftalık Instagram büyüme ipuçları bültenimize kaydolmanız halinde, e-posta adresiniz listemize kaydedilmektedir. Bu veri, sadece bilgilendirme bültenleri gönderimi amacıyla saklanır ve üçüncü şahıslarla asla paylaşılmaz.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>3. Çerezler ve Reklam Servisleri</h3>
        <p>
          Sitemizde kullanıcı deneyimini iyileştirmek, trafik analizi yapmak ve Google AdSense gibi üçüncü taraf reklam ağları üzerinden reklam sunumu gerçekleştirmek amacıyla çerezler (cookies) kullanılmaktadır. Reklam ortaklarımız, ilgi alanlarınıza göre reklam göstermek amacıyla çerez yerleştirebilirler.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>4. Haklarınız</h3>
        <p>
          Kullanıcılar tarayıcı ayarlarından çerezleri diledikleri zaman kapatabilirler. Kayıtlı e-posta adresinizin listemizden silinmesini talep etmek için <Link href="/iletisim" style={{ color: 'hsl(var(--accent-secondary))' }}>İletişim</Link> sayfamız üzerinden bizimle iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  );
}

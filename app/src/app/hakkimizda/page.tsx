import React from 'react';
import type { Metadata } from 'next';
import { Sparkles, Shield, User, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | Instascope',
  description: 'Instascope\'un hikayesi: Sosyal medya analiz süreçlerini kolaylaştırmak ve şifresiz, ücretsiz araçlar sunmak amacıyla Emre Kayahan tarafından kurulan bağımsız bir platform.',
  alternates: {
    canonical: '/hakkimizda',
  }
};

export default function Hakkimizda() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sparkles size={28} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Hakkımızda</h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, fontSize: '1.1rem' }}>
            Sosyal medya analiz süreçlerini kolaylaştırmak ve herkes için erişilebilir kılmak amacıyla yola çıktık.
          </p>
        </div>

        {/* Story */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>
          <h2 style={{ fontSize: '1.75rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={22} style={{ color: 'hsl(var(--accent-secondary))' }} /> Instascope Nedir ve Neden Kuruldu?
          </h2>
          <p>
            Instascope, sosyal medya analizi yaparken karmaşık hesaplamalardan, şifre talep eden güvensiz sistemlerden ve yüksek ücretli araçlardan sıkılan bir sosyal medya uzmanının kişisel arayışı sonucunda doğmuştur.
          </p>
          <p>
            <strong>Emre Kayahan</strong> tarafından bireysel olarak geliştirilen ve yönetilen bu platform, Instagram içerik üreticilerinin, markaların ve ajansların hesap büyüme performanslarını en hızlı ve şeffaf şekilde ölçmelerini sağlar.
          </p>
          <p>
            Platformumuzda bulunan tüm araçlar (Etkileşim Hesaplayıcı, Hashtag Önerici, En İyi Paylaşım Saati ve Biyografi Link Oluşturucu) kullanıcılarımızın hesap güvenliğini korumak amacıyla tamamen <strong>istemci-taraflı (client-side)</strong> çalışacak şekilde mimari edilmiş olup hiçbir şekilde profil şifrenizi, API yetkilendirmenizi veya hassas bilgilerinizi talep etmez.
          </p>
        </section>

        {/* Values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Önce Güvenlik</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Verileriniz hiçbir sunucuya kaydedilmez. Tüm analizler kendi tarayıcınızda gerçekleşir.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
              <User size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Bireysel ve Bağımsız</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Şirketleşmemiş, tamamen bağımsız ve topluluk odaklı bir bireysel geliştirici projesidir.
            </p>
          </div>
        </div>

        {/* Contact Note */}
        <div style={{
          background: 'rgba(124, 58, 237, 0.05)',
          border: '1px solid rgba(124, 58, 237, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          color: 'hsl(var(--text-secondary))',
          fontSize: '0.9rem'
        }}>
          Herhangi bir soru, öneri veya iş birliği için bize <a href="mailto:demadatr@gmail.com" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>demadatr@gmail.com</a> adresinden veya <a href="/iletisim" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>İletişim</a> sayfamızdan ulaşabilirsiniz.
        </div>

      </div>
    </div>
  );
}

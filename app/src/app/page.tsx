import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Rocket, 
  Clock, 
  Link2, 
  Shield, 
  Zap, 
  TrendingUp, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function Home() {
  return (
    <div style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      
      {/* Hero Section */}
      <section className="container" style={{ textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.25rem',
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'hsl(var(--accent-secondary))',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} /> 2026 SOSYAL MEDYA ANALİZ STANDARDI
        </div>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', lineHeight: 1.15, fontWeight: 800 }}>
          Instagram Analizini <br />Mercek Altına Alın
        </h1>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.25rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Instascope ile etkileşim oranlarınızı hesaplayın, en iyi paylaşım saatlerinizi öğrenin ve büyüme stratejinizi verilerle belirleyin.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#tools" className="btn-primary">Araçları Keşfet</a>
          <Link href="/nasil-calisir" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={16} /> Nasıl Çalışır?
          </Link>
        </div>
      </section>

      {/* Tools Showcase */}
      <section id="tools" className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Popüler Analiz Araçları</h2>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>Profilinizi profesyonel bir şekilde analiz edin. Şifre veya oturum gerektirmez.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {/* Card 1 */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              borderRadius: '16px', 
              background: 'rgba(219, 39, 119, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'hsl(var(--accent-secondary))'
            }}>
              <BarChart3 size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Etkileşim Oranı</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>
              Takipçi, beğeni ve yorum sayılarınıza göre en doğru etkileşim oranını saniyeler içinde hesaplayın.
            </p>
            <Link href="/araclar/etkilesim-hesaplayici" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
              Hemen Hesapla
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              borderRadius: '16px', 
              background: 'rgba(124, 58, 237, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'hsl(var(--accent-primary))'
            }}>
              <Rocket size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Hashtag Önerici</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>
              İçeriğinizin erişimini artıracak en doğru ve popüler hashtag kombinasyonlarını keşfedin.
            </p>
            <Link href="/araclar/hashtag-onerici" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
              Hashtag Bul
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              borderRadius: '16px', 
              background: 'rgba(124, 58, 237, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'hsl(var(--accent-primary))'
            }}>
              <Clock size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Paylaşım Saati</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>
              Sektörünüze ve kitlenize en uygun en iyi etkileşim alacak paylaşım zamanlarını keşfedin.
            </p>
            <Link href="/araclar/en-iyi-paylasim-saati" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
              Saati Öğren
            </Link>
          </div>

          {/* Card 4 - New Bio Link Creator */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              borderRadius: '16px', 
              background: 'rgba(219, 39, 119, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'hsl(var(--accent-secondary))'
            }}>
              <Link2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Biyografi Linki</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>
              Instagram profiliniz için mobil uyumlu, şık ve paylaşılabilir tek sayfalık bağlantı ağacınızı tasarlayın.
            </p>
            <Link href="/araclar/biyografi-link-olusturucu" className="btn-primary" style={{ textAlign: 'center', width: '100%' }}>
              Link Tasarla
            </Link>
          </div>
        </div>
      </section>

      {/* Why Instascope Section */}
      <section id="about" style={{ background: 'hsl(var(--bg-secondary))', padding: '6rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.02)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Neden Instascope?</h2>
            <p style={{ color: 'hsl(var(--text-secondary))' }}>Sosyal medya büyümenizde veriye dayalı kararlar almanız için tasarlanan meşru araçlar.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
                <Shield size={28} />
              </div>
              <h4 style={{ fontSize: '1.25rem' }}>%100 Güvenli & Gizli</h4>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.5 }}>Hesap şifreniz ya da cookie bilgilerinizi asla talep etmiyoruz. Tüm hesaplamalar tarayıcınızda yapılır.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
                <Zap size={28} />
              </div>
              <h4 style={{ fontSize: '1.25rem' }}>Hızlı İstemci Tarafı</h4>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.5 }}>Tüm formlar ve hesaplayıcılar tarayıcı performansı odaklı çalışır. Sunucu bekleme süresi yoktur.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--accent-secondary))' }}>
                <TrendingUp size={28} />
              </div>
              <h4 style={{ fontSize: '1.25rem' }}>SEO Uyumlu Altyapı</h4>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.5 }}>Sayfa açılış hızları ve SEO optimizasyonları sayesinde organik aramalarda hızla yükselir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div style={{
          background: 'linear-gradient(135deg, hsl(var(--bg-tertiary)), hsl(var(--bg-secondary)))',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '32px',
          padding: '4rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <h2 style={{ fontSize: '2.5rem' }}>Profilinizi Büyütmeye Hazır Mısınız?</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.5 }}>
            Etkileşim hesaplayıcıyı kullanarak profilinizin mevcut gücünü ölçün ve hemen optimize etmeye başlayın.
          </p>
          <Link href="/araclar/etkilesim-hesaplayici" className="btn-primary" style={{ marginTop: '1rem' }}>
            Hemen Başlayın
          </Link>
        </div>
      </section>

    </div>
  );
}
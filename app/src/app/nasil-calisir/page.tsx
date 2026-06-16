import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HelpCircle, BarChart3, Rocket, Clock, Info } from 'lucide-react';

export default function NasilCalisir() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <HelpCircle size={28} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Nasıl Çalışır?</h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            Instascope, Instagram büyüme süreçlerinizi veriye dayalı kararlarla yönetmeniz için tasarlanmış bağımsız bir analiz platformudur. Sistemlerimizin çalışma mekanizmasını ve hesaplama formüllerimizi tüm şeffaflığıyla aşağıda inceleyebilirsiniz.
          </p>
        </div>

        {/* Section 1: Engagement Rate */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart3 size={24} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h2 style={{ fontSize: '1.6rem', color: 'white' }}>Etkileşim Oranı Nasıl Hesaplanır?</h2>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            Etkileşim oranı (Engagement Rate), hesabınızın takipçi kitlesi ile kurduğu etkileşimin kalitesini ölçer. Instascope, sektör standartlarında kabul gören <strong>"Takipçi Başına Etkileşim"</strong> formülünü kullanır:
          </p>
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            fontFamily: 'monospace',
            textAlign: 'center',
            fontSize: '1.05rem',
            color: 'white',
            margin: '0.5rem 0'
          }}>
            ER (%) = [ (Ortalama Beğeni + Ortalama Yorum) / Toplam Takipçi ] x 100
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            Örneğin; 10.000 takipçisi olan bir hesabın gönderileri ortalama 280 beğeni ve 20 yorum alıyorsa; etkileşim oranı <code>((280 + 20) / 10.000) x 100 = %3.00</code> olarak hesaplanır.
          </p>
          <div>
            <Link href="/araclar/etkilesim-hesaplayici" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
              Etkileşim Hesapla &rarr;
            </Link>
          </div>
        </section>

        {/* Section 2: Hashtag Generator */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Rocket size={24} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h2 style={{ fontSize: '1.6rem', color: 'white' }}>Hashtag Öneri Mantığı</h2>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            Instagram algoritması, gönderilerinizdeki etiketleri içeriğin konusunu anlamak için kullanır. Hashtag öneri aracımız:
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: 'hsl(var(--text-secondary))', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.7 }}>
            <li>Seçtiğiniz niş/sektör altındaki popüler ve yüksek erişim getiren etiket havuzunu tarar.</li>
            <li>Havuz içinden hem geniş kitlelere hitap eden (büyük hacimli) hem de hedeflenmiş (orta/küçük hacimli) etiketleri karıştırarak spam filtresine takılmayacak **8 adet dengeli etiket kombinasyonu** sunar.</li>
            <li>Aynı kategoriyi her sorguladığınızda havuz karıştırıldığı için her seferinde farklı ve taze kombinasyonlar alırsınız.</li>
          </ul>
          <div>
            <Link href="/araclar/hashtag-onerici" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
              Hashtag Bul &rarr;
            </Link>
          </div>
        </section>

        {/* Section 3: Best Time */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={24} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h2 style={{ fontSize: '1.6rem', color: 'white' }}>Paylaşım Saati Önerileri Nasıl Belirlenir?</h2>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
            En iyi paylaşım saati modülü, milyonlarca gönderinin etkileşim verileri ve kullanıcı davranış analizleri temel alınarak yapılandırılmış bir veri matrisini kullanır. Öneriler belirlenirken:
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: 'hsl(var(--text-secondary))', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.7 }}>
            <li><strong>Sektörel Farklılıklar:</strong> Kişisel bloglar ile e-ticaret sitelerinin hedef kitlelerinin online olma ve satın alma eğilimi gösterdiği saatler farklıdır (örn: e-ticaret için öğle yemeği ve akşam maaş günleri/saatleri yoğundur).</li>
            <li><strong>Haftalık Döngü:</strong> Pazartesi sabahı işe gidiş saatleri, Cuma akşamüstü hafta sonu rehaveti ve Pazar akşamı dinlenme zamanlarındaki kullanıcı yoğunluk dalgalanmaları hesaba katılır.</li>
          </ul>
          <div>
            <Link href="/araclar/en-iyi-paylasim-saati" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
              Paylaşım Saatini Gör &rarr;
            </Link>
          </div>
        </section>

        {/* Privacy Note */}
        <div style={{
          background: 'rgba(124, 58, 237, 0.05)',
          border: '1px solid rgba(124, 58, 237, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <ShieldCheck size={24} style={{ color: 'hsl(var(--accent-secondary))', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.6 }}>
            <strong>Güvenlik Taahhüdü:</strong> Instascope hiçbir aracında sizden hesap şifrenizi, Instagram API yetkilendirmenizi veya tarayıcı cookie bilgilerinizi istemez. Tüm girdiler tarayıcınızda işlenir ve gizliliğiniz %100 oranında korunur.
          </div>
        </div>

      </div>
    </div>
  );
}

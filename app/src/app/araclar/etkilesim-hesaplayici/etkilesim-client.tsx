'use client';

import React, { useState } from 'react';
import { BarChart3, Share2, Copy, Check } from 'lucide-react';
import { auth } from '../../../../src/lib/firebase';

export default function EtkilesimClient() {
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [industry, setIndustry] = useState('genel');
  const [result, setResult] = useState<number | null>(null);
  const [statusText, setStatusText] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [benchmarkResult, setBenchmarkResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const benchmarks: { [key: string]: { name: string, rate: number } } = {
    genel: { name: 'Genel', rate: 2.0 },
    eticaret: { name: 'E-Ticaret / Marka', rate: 1.5 },
    moda: { name: 'Moda / Güzellik', rate: 3.0 },
    yemek: { name: 'Yemek / Gastronomi', rate: 4.5 },
    spor: { name: 'Spor / Sağlıklı Yaşam', rate: 3.5 }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const f = parseInt(followers);
    const l = parseInt(likes);
    const c = parseInt(comments);

    if (isNaN(f) || isNaN(l) || isNaN(c) || f <= 0) {
      alert('Lütfen geçerli sayılar giriniz. Takipçi sayısı 0\'dan büyük olmalıdır.');
      return;
    }

    // Engagement Rate = ((Likes + Comments) / Followers) * 100
    const er = parseFloat((((l + c) / f) * 100).toFixed(2));
    setResult(er);

    let calculatedStatusText = '';
    let calculatedStatusColor = '';

    if (er < 1) {
      calculatedStatusText = 'Düşük Etkileşim: Gönderi saatlerini ve hashtag stratejinizi optimize etmeniz önerilir.';
      calculatedStatusColor = '#ef4444';
    } else if (er >= 1 && er < 3) {
      calculatedStatusText = 'Ortalama Etkileşim: Sağlıklı bir oran. Paylaşımlara düzenli devam ederek etkileşimi artırabilirsiniz.';
      calculatedStatusColor = '#eab308';
    } else if (er >= 3 && er < 6) {
      calculatedStatusText = 'İyi Etkileşim: Kitleniz paylaşımlarınıza ilgi duyuyor. Harika iş!';
      calculatedStatusColor = '#22c55e';
    } else {
      calculatedStatusText = 'Mükemmel Etkileşim: Sektör ortalamasının çok üzerindesiniz. Kitlenizle bağınız son derece güçlü!';
      calculatedStatusColor = '#a855f7';
    }

    setStatusText(calculatedStatusText);
    setStatusColor(calculatedStatusColor);

    // Calculate industry comparison
    const selectedBenchmark = benchmarks[industry] || benchmarks.genel;
    const diff = er - selectedBenchmark.rate;
    let benchmarkText = '';
    if (diff > 0) {
      benchmarkText = `Tebrikler! Etkileşim oranınız, ${selectedBenchmark.name} sektörü ortalamasının (%${selectedBenchmark.rate}) %${diff.toFixed(2)} üzerindedir.`;
    } else if (diff < 0) {
      benchmarkText = `Etkileşim oranınız, ${selectedBenchmark.name} sektörü ortalamasının (%${selectedBenchmark.rate}) %${Math.abs(diff).toFixed(2)} altındadır. Gönderi kalitenizi veya etkileşim saatlerinizi gözden geçirmelisiniz.`;
    } else {
      benchmarkText = `Etkileşim oranınız, ${selectedBenchmark.name} sektörü ortalaması (%${selectedBenchmark.rate}) ile tam olarak aynıdır.`;
    }
    setBenchmarkResult(benchmarkText);

    // Save to history if logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const historyKey = `instascope_history_${user.uid}`;
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const newItem = {
          id: Math.random().toString(36).substring(2, 9),
          type: 'etkilesim',
          date: new Date().toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          inputs: { followers: f, likes: l, comments: c, industry },
          result: { er, statusText: calculatedStatusText, benchmarkText }
        };
        localStorage.setItem(historyKey, JSON.stringify([newItem, ...existingHistory]));
      } catch (err) {
        console.error('Error saving history:', err);
      }
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage('Bültene başarıyla kaydoldunuz! Teşekkür ederiz.');
        setNewsletterEmail('');
      } else {
        const data = await response.json();
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      setNewsletterStatus('error');
      setNewsletterMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  const shareText = `Instagram etkileşim oranımı Instascope ile hesapladım: %${result}! Siz de profilinizi analiz edin: https://instascope.com.tr/araclar/etkilesim-hesaplayici`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <BarChart3 size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 style={{ fontSize: '2.25rem', margin: 0 }} className="gradient-text">
              Instagram Etkileşim Oranı Hesaplayıcı
            </h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            Takipçi, beğeni ve yorum sayılarınızı girerek profilinizin etkileşim yüzdesini saniyeler içinde öğrenin. Verileriniz sunucuya gönderilmez, tamamen tarayıcınızda işlenir.
          </p>
        </div>

        <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Sektörünüz</label>
            <select
              className="form-input"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              style={{ background: 'rgba(0, 0, 0, 0.3)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.75rem 1rem', width: '100%', outline: 'none' }}
            >
              <option value="genel" style={{ background: '#0a0a0a' }}>Genel (Ortalama: %2.0)</option>
              <option value="eticaret" style={{ background: '#0a0a0a' }}>E-Ticaret / Marka (Ortalama: %1.5)</option>
              <option value="moda" style={{ background: '#0a0a0a' }}>Moda / Güzellik (Ortalama: %3.0)</option>
              <option value="yemek" style={{ background: '#0a0a0a' }}>Yemek / Gastronomi (Ortalama: %4.5)</option>
              <option value="spor" style={{ background: '#0a0a0a' }}>Spor / Sağlıklı Yaşam (Ortalama: %3.5)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Toplam Takipçi Sayısı</label>
            <input
              type="number"
              className="form-input"
              placeholder="Örn: 10000"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gönderi Başına Ortalama Beğeni</label>
            <input
              type="number"
              className="form-input"
              placeholder="Örn: 350"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gönderi Başına Ortalama Yorum</label>
            <input
              type="number"
              className="form-input"
              placeholder="Örn: 15"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Hesapla
          </button>
        </form>

        {result !== null && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginTop: '1rem',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: 'hsl(var(--text-secondary))', margin: 0 }}>Etkileşim Oranınız</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: statusColor, lineHeight: 1 }}>
              %{result}
            </div>
            <p style={{ fontWeight: 600, color: 'white', margin: 0 }}>{statusText}</p>

            {/* Sektörel Karşılaştırma Grafiği */}
            <div style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'white', fontWeight: 600, marginTop: 0 }}>Sektörel Karşılaştırma</h4>
              <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {benchmarkResult}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Kullanıcının Barı */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'white', fontWeight: 600 }}>Sizin Oranınız</span>
                    <span style={{ color: statusColor, fontWeight: 700 }}>%{result}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${Math.min((result / 10) * 100, 100)}%`, 
                      height: '100%', 
                      background: statusColor, 
                      borderRadius: '9999px',
                      transition: 'width 1s ease-out'
                    }} />
                  </div>
                </div>

                {/* Sektör Barı */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'hsl(var(--text-secondary))' }}>{benchmarks[industry]?.name || 'Genel'} Ortalaması</span>
                    <span style={{ color: 'hsl(var(--text-muted))', fontWeight: 600 }}>%{benchmarks[industry]?.rate || 2.0}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${Math.min(((benchmarks[industry]?.rate || 2.0) / 10) * 100, 100)}%`, 
                      height: '100%', 
                      background: 'rgba(255, 255, 255, 0.25)', 
                      borderRadius: '9999px',
                      transition: 'width 1s ease-out'
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bağlamsal E-Posta Bülteni Teklifi */}
            <div style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              borderRadius: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700, margin: 0 }}>
                  Instagram Büyüme Rehberini Ücretsiz Alın!
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.5rem', lineHeight: 1.4, margin: '0.5rem 0 0 0' }}>
                  Haftalık algoritma analizleri, en iyi paylaşım saatleri güncellemeleri ve gizli büyüme taktikleri doğrudan e-postanıza gelsin.
                </p>
              </div>

              {newsletterStatus !== 'success' ? (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <input
                    type="email"
                    required
                    placeholder="E-posta adresiniz"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: '1 1 250px',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit" 
                    disabled={newsletterStatus === 'loading'}
                    className="btn-primary" 
                    style={{ 
                      padding: '0.75rem 1.5rem', 
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {newsletterStatus === 'loading' ? 'Kaydediliyor...' : 'Kaydol'}
                  </button>
                </form>
              ) : (
                <div style={{ color: '#22c55e', fontSize: '0.95rem', fontWeight: 600 }}>
                  {newsletterMessage}
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 500 }}>
                  {newsletterMessage}
                </div>
              )}
            </div>
            
            {/* Share Result Button */}
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                type="button"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', gap: '0.5rem', display: 'inline-flex', alignItems: 'center' }}
              >
                <Share2 size={16} /> Sonucu Paylaş
              </button>

              {showShareOptions && (
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.85rem', 
                      gap: '0.5rem', 
                      display: 'inline-flex', 
                      alignItems: 'center',
                      background: 'rgba(37, 211, 102, 0.15)',
                      borderColor: 'rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.386 5.396.003 12.008.003c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.617-5.397 11.999-12.009 11.999-2.001 0-3.969-.5-5.713-1.45L0 24zm6.59-2.735c1.606.953 3.005 1.402 4.685 1.403 5.485 0 9.948-4.461 9.951-9.944.002-2.656-1.03-5.153-2.906-7.03C16.447 3.818 13.953 2.786 11.3 2.786c-5.487 0-9.95 4.461-9.953 9.944 0 1.767.472 3.109 1.442 4.708l-.99 3.61 3.731-.977-.433-.256zm12.39-7.108c-.307-.154-1.817-.897-2.097-1-.28-.103-.483-.154-.686.154-.203.308-.787.974-.965 1.18-.178.205-.355.23-.662.077-1.043-.521-1.748-.962-2.453-2.169-.195-.333-.195-.548.014-.754.188-.186.307-.359.41-.539.103-.18.052-.333-.026-.487-.077-.154-.686-1.654-.939-2.27-.247-.592-.497-.512-.686-.522-.178-.009-.38-.01-.584-.01-.203 0-.534.077-.813.383-.28.308-1.068 1.046-1.068 2.552 0 1.506 1.093 2.961 1.246 3.166.153.205 2.152 3.284 5.213 4.6.728.314 1.297.502 1.741.643.732.233 1.398.2 1.925.122.587-.087 1.817-.743 2.072-1.46.254-.718.254-1.333.178-1.46-.077-.127-.28-.205-.587-.36z" />
                    </svg>
                    WhatsApp
                  </a>

                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.85rem', 
                      gap: '0.5rem', 
                      display: 'inline-flex', 
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Paylaş
                  </a>

                  <button 
                    onClick={copyToClipboard}
                    className="btn-secondary"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.85rem', 
                      gap: '0.5rem', 
                      display: 'inline-flex', 
                      alignItems: 'center',
                    }}
                  >
                    {copied ? <Check size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} />}
                    {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
                  </button>
                </div>
              )}
            </div>

            {/* Reklam Alanı */}
            {showAds && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: 'hsl(var(--text-muted))',
                fontSize: '0.8rem',
                background: 'rgba(0, 0, 0, 0.2)'
              }}>
                [REKLAM ALANI - Google AdSense / Ezoic]
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

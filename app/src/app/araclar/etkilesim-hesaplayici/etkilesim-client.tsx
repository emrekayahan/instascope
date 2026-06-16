'use client';

import React, { useState } from 'react';
import { BarChart3, Share2, Copy, Check } from 'lucide-react';
import { auth } from '../../../../src/lib/firebase';

export default function EtkilesimClient() {
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [statusText, setStatusText] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

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
          inputs: { followers: f, likes: l, comments: c },
          result: { er, statusText: calculatedStatusText }
        };
        localStorage.setItem(historyKey, JSON.stringify([newItem, ...existingHistory]));
      } catch (err) {
        console.error('Error saving history:', err);
      }
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
            <h3 style={{ fontSize: '1.25rem', color: 'hsl(var(--text-secondary))' }}>Etkileşim Oranınız</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: statusColor }}>
              %{result}
            </div>
            <p style={{ fontWeight: 600, color: 'white' }}>{statusText}</p>
            
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

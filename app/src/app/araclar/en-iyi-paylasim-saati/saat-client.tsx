'use client';

import React, { useState } from 'react';
import { Clock, Share2, Copy, Check } from 'lucide-react';
import { auth } from '../../../../src/lib/firebase';

export default function SaatClient() {
  const [day, setDay] = useState('pazartesi');
  const [niche, setNiche] = useState('genel');
  const [result, setResult] = useState<{ bestTimes: string[]; note: string } | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const data: { [key: string]: { [key: string]: { bestTimes: string[]; note: string } } } = {
      genel: {
        pazartesi: { bestTimes: ['09:00', '12:00', '19:00'], note: 'Haftanın ilk günü iş çıkışı saatleri oldukça verimlidir.' },
        sali: { bestTimes: ['08:00', '11:00', '20:00'], note: 'Salı günleri öğleden sonra etkileşim oranlarında genel bir yükseliş gözlemlenir.' },
        carsamba: { bestTimes: ['11:00', '13:00', '18:00'], note: 'Hafta ortası etkileşimin zirve yaptığı günlerden biridir.' },
        persembe: { bestTimes: ['09:00', '12:00', '19:00'], note: 'Perşembe akşamları kullanıcı aktivitesi son derece yüksektir.' },
        cuma: { bestTimes: ['10:00', '13:00', '17:00'], note: 'Hafta sonu rehaveti başlamadan hemen önceki iş çıkış saatleri etkilidir.' },
        cumartesi: { bestTimes: ['11:00', '15:00', '21:00'], note: 'Cumartesi günleri kullanıcılar gün boyu ve geç saatlerde aktiftir.' },
        pazar: { bestTimes: ['09:00', '14:00', '20:00'], note: 'Pazar akşamları dinlenme saatleri yüksek etkileşim getirir.' },
      },
      'e-ticaret': {
        pazartesi: { bestTimes: ['12:00', '18:00'], note: 'Alışveriş eğilimi öğle arası ve akşam saatlerinde artar.' },
        sali: { bestTimes: ['11:00', '19:00'], note: 'Öğle öncesi hatırlatmaları dönüşümü destekler.' },
        carsamba: { bestTimes: ['12:00', '20:00'], note: 'Hafta ortası kampanyaları için akşam saatleri idealdir.' },
        persembe: { bestTimes: ['12:00', '19:00'], note: 'Hafta sonu kargo planlamaları için perşembe günü kritiktir.' },
        cuma: { bestTimes: ['09:00', '15:00', '21:00'], note: 'Cuma indirim duyuruları için gün boyu paylaşım yapılabilir.' },
        cumartesi: { bestTimes: ['10:00', '18:00'], note: 'Kullanıcıların alışverişe zaman ayırdığı saatlerdir.' },
        pazar: { bestTimes: ['15:00', '21:00'], note: 'Pazar gecesi online alışveriş trafiği yoğundur.' },
      }
    };

    const targetNiche = data[niche] ? niche : 'genel';
    const res = data[targetNiche][day];
    setResult(res);

    // Save to history if logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const historyKey = `instascope_history_${user.uid}`;
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const newItem = {
          id: Math.random().toString(36).substring(2, 9),
          type: 'saat',
          date: new Date().toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          inputs: { day, niche },
          result: { bestTimes: res.bestTimes, note: res.note }
        };
        localStorage.setItem(historyKey, JSON.stringify([newItem, ...existingHistory]));
      } catch (err) {
        console.error('Error saving history:', err);
      }
    }
  };

  const shareText = `Instagram için en iyi paylaşım saatlerimi Instascope ile buldum: ${result?.bestTimes.join(', ')}! Siz de hesaplayıcıyı deneyin: https://instascope.com.tr/araclar/en-iyi-paylasim-saati`;

  const copyShareText = () => {
    navigator.clipboard.writeText(shareText);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Clock size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 style={{ fontSize: '2.25rem', margin: 0 }} className="gradient-text">
              Instagram En İyi Paylaşım Saati Hesaplayıcı
            </h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            Paylaşım yapmayı planladığınız günü ve hesabınızın kategorisini seçerek etkileşimi en üst seviyeye çıkaracak saatleri analiz edin.
          </p>
        </div>

        <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Paylaşım Günü</label>
            <select
              className="form-input"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={{ color: 'white', background: '#0a0d14' }}
            >
              <option value="pazartesi">Pazartesi</option>
              <option value="sali">Salı</option>
              <option value="carsamba">Çarşamba</option>
              <option value="persembe">Perşembe</option>
              <option value="cuma">Cuma</option>
              <option value="cumartesi">Cumartesi</option>
              <option value="pazar">Pazar</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sektör / Niş</label>
            <select
              className="form-input"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              style={{ color: 'white', background: '#0a0d14' }}
            >
              <option value="genel">Kişisel Blog / Genel</option>
              <option value="e-ticaret">E-Ticaret / Marka</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Saatleri Analiz Et
          </button>
        </form>

        {result !== null && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: 'hsl(var(--text-secondary))' }}>En İyi Paylaşım Saatleri</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {result.bestTimes.map((time, idx) => (
                <div key={idx} style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                }}>
                  {time}
                </div>
              ))}
            </div>

            <p style={{ fontStyle: 'italic', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
              💡 <strong>Analiz Notu:</strong> {result.note}
            </p>

            {/* Share Result Button */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
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
                    onClick={copyShareText}
                    className="btn-secondary"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.85rem', 
                      gap: '0.5rem', 
                      display: 'inline-flex', 
                      alignItems: 'center',
                    }}
                  >
                    {shareCopied ? <Check size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} />}
                    {shareCopied ? 'Kopyalandı!' : 'Paylaşım Linkini Kopyala'}
                  </button>
                </div>
              )}
            </div>

            {/* Reklam Alanı */}
            {showAds && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: 'hsl(var(--text-muted))',
                fontSize: '0.8rem',
                background: 'rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
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

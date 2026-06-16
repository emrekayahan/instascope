'use client';

import React, { useState } from 'react';
import { Rocket, Share2, Copy, Check, MessageSquare } from 'lucide-react';
import { auth } from '../../../../src/lib/firebase';

const HASHTAGS_DB: { [key: string]: string[] } = {
  genel: ['#instagram', '#instagood', '#photooftheday', '#photography', '#picoftheday', '#love', '#like', '#follow', '#trend', '#kesfet'],
  moda: ['#style', '#fashion', '#ootd', '#instafashion', '#moda', '#giyim', '#kombin', '#tasarim', '#shopping', '#elbise'],
  seyahat: ['#travel', '#nature', '#travelgram', '#wanderlust', '#gezgin', '#tatil', '#manzara', '#gezi', '#travelphotography', '#doga'],
  yemek: ['#food', '#foodporn', '#instafood', '#delicious', '#yemektarifleri', '#lezzet', '#sunum', '#mutfak', '#gurme', '#tatli'],
  teknoloji: ['#technology', '#tech', '#gadget', '#software', '#yazilim', '#yapayzeka', '#bilim', '#kodlama', '#tasarim', '#inovasyon'],
  spor: ['#fitness', '#gym', '#workout', '#motivation', '#spor', '#egzersiz', '#saglikliyasam', '#diyet', '#training', '#fit'],
  girisimcilik: ['#business', '#marketing', '#startup', '#girisimcilik', '#motivasyon', '#basari', '#para', '#liderlik', '#kariyer', '#egitim'],
};

export default function HashtagOnerici() {
  const [niche, setNiche] = useState('genel');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = HASHTAGS_DB[niche] || HASHTAGS_DB.genel;
    // Shuffle and pick 8 tags
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    const resultTags = shuffled.slice(0, 8);
    setSelectedTags(resultTags);

    // Save to history if logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const historyKey = `instascope_history_${user.uid}`;
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const newItem = {
          id: Math.random().toString(36).substring(2, 9),
          type: 'hashtag',
          date: new Date().toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          inputs: { niche },
          result: { tags: resultTags }
        };
        localStorage.setItem(historyKey, JSON.stringify([newItem, ...existingHistory]));
      } catch (err) {
        console.error('Error saving history:', err);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedTags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Instagram paylaşımlarım için en iyi hashtag önerilerini Instascope ile buldum! Siz de hashtag öneri robotunu deneyin: https://instascope.com.tr/araclar/hashtag-onerici`;

  const copyShareText = () => {
    navigator.clipboard.writeText(shareText);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Instagram Hashtag Önerici & Analizi",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "TRY"
            }
          })
        }}
      />
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Rocket size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 style={{ fontSize: '2.25rem', margin: 0 }} className="gradient-text">
              Instagram Hashtag Önerici & Analizi
            </h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            İçeriğinizin hitap ettiği kategoriyi seçin ve Instagram algoritmasında erişiminizi artıracak en ideal hashtag kombinasyonlarını anında oluşturun.
          </p>
        </div>

        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">İçerik Kategorisi</label>
            <select
              className="form-input"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              style={{ color: 'white', background: '#0a0d14' }}
            >
              <option value="genel">Genel Popüler Etiketler</option>
              <option value="moda">Moda & Tasarım</option>
              <option value="seyahat">Seyahat & Doğa</option>
              <option value="yemek">Yemek & Gastronomi</option>
              <option value="teknoloji">Teknoloji & Yazılım</option>
              <option value="spor">Spor & Sağlıklı Yaşam</option>
              <option value="girisimcilik">Girişimcilik & Motivasyon</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Önerileri Oluştur
          </button>
        </form>

        {selectedTags.length > 0 && (
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
            <h3 style={{ fontSize: '1.25rem', color: 'hsl(var(--text-secondary))' }}>Önerilen Etiketler</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {selectedTags.map((tag, idx) => (
                <span key={idx} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(124, 58, 237, 0.1)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: '9999px',
                  color: 'hsl(var(--accent-secondary))',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={copyToClipboard} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Kopyalandı!' : 'Tümünü Kopyala'}
              </button>
              
              <button 
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="btn-secondary" 
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Share2 size={16} /> Sonucu Paylaş
              </button>
            </div>

            {showShareOptions && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out',
                marginTop: '0.5rem',
                flexWrap: 'wrap'
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


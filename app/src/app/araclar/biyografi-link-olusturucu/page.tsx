'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link2, Plus, Trash2, Download, Copy, Check, Eye, Smartphone, Sparkles, Share2 } from 'lucide-react';

interface BioLink {
  title: string;
  url: string;
}

const THEMES = [
  { id: 'dark', name: 'Elegant Dark', bg: 'linear-gradient(135deg, #090d16, #0e1726)', buttonBg: 'rgba(255, 255, 255, 0.05)', buttonBorder: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', accent: 'hsl(262.1 83.3% 57.8%)' },
  { id: 'violet', name: 'Royal Violet', bg: 'linear-gradient(135deg, #1e1b4b, #311042)', buttonBg: 'rgba(168, 85, 247, 0.1)', buttonBorder: 'rgba(168, 85, 247, 0.2)', text: '#ffffff', accent: '#a855f7' },
  { id: 'crimson', name: 'Velvet Crimson', bg: 'linear-gradient(135deg, #1f0813, #3b071e)', buttonBg: 'rgba(219, 39, 119, 0.1)', buttonBorder: 'rgba(219, 39, 119, 0.2)', text: '#ffffff', accent: '#db2777' },
  { id: 'emerald', name: 'Emerald Garden', bg: 'linear-gradient(135deg, #022c22, #064e3b)', buttonBg: 'rgba(16, 185, 129, 0.1)', buttonBorder: 'rgba(16, 185, 129, 0.2)', text: '#ffffff', accent: '#10b981' }
];

export default function BiyografiLinkOlusturucu() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('✨');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [links, setLinks] = useState<BioLink[]>([
    { title: 'Instagram Profilim', url: 'https://instagram.com/' },
    { title: 'Kişisel Web Sitem', url: 'https://' }
  ]);

  const [shareableUrl, setShareableUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Generate shareable link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = { name, bio, avatar, theme: selectedTheme, links };
      try {
        const jsonStr = JSON.stringify(data);
        const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        setShareableUrl(`${baseUrl}/bio#data=${b64}`);
      } catch (e) {
        console.error('Encoding error:', e);
      }
    }
  }, [name, bio, avatar, selectedTheme, links]);

  const activeTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  const handleAddLink = () => {
    setLinks([...links, { title: 'Yeni Link', url: 'https://' }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const getStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || 'Biyografi Linki'} - Instascope</title>
  <style>
    :root {
      --bg: ${activeTheme.bg};
      --btn-bg: ${activeTheme.buttonBg};
      --btn-border: ${activeTheme.buttonBorder};
      --text: ${activeTheme.text};
      --accent: ${activeTheme.accent};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: var(--bg);
      background-attachment: fixed;
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem 1.5rem;
    }
    .container {
      width: 100%;
      max-width: 580px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .avatar {
      font-size: 3rem;
      width: 5rem;
      height: 5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--btn-border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    .profile-info h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .profile-info p {
      color: rgba(255,255,255,0.7);
      font-size: 0.95rem;
      max-width: 400px;
      line-height: 1.5;
    }
    .links-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .link-item {
      display: block;
      width: 100%;
      padding: 1rem 1.5rem;
      background: var(--btn-bg);
      border: 1px solid var(--btn-border);
      border-radius: 12px;
      color: var(--text);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.25s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center;
    }
    .link-item:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
      box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
      background: rgba(255, 255, 255, 0.08);
    }
    .footer {
      margin-top: auto;
      padding-top: 3rem;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.4);
    }
    .footer a {
      color: var(--accent);
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div className="container">
    <div className="avatar">${avatar}</div>
    <div className="profile-info">
      <h1>${name || '@kullanıcı'}</h1>
      <p>${bio || 'Biyografi açıklaması henüz girilmedi.'}</p>
    </div>
    <div className="links-list">
      ${links
        .filter(link => link.title && link.url)
        .map(
          link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" className="link-item">
        ${link.title}
      </a>`
        )
        .join('')}
    </div>
    <div className="footer">
      <a href="https://instascope.com.tr" target="_blank" rel="noopener noreferrer">Instascope</a> ile Oluşturuldu
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownloadHtml = () => {
    const htmlContent = getStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name ? name.toLowerCase().replace(/\s+/g, '-') : 'biyografi'}-link.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(getStandaloneHtml());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '1200px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Biyografi Link Oluşturucu",
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Link2 size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Biyografi Link Oluşturucu</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: '3rem',
        alignItems: 'start'
      }} className="bio-creator-grid">
        
        {/* Editor Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2.5rem' }}>
          
          {/* Profile Fields */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>1. Profil Detayları</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'center' }}>
              <div className="form-group">
                <label className="form-label">Avatar</label>
                <input
                  type="text"
                  className="form-input"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  style={{ textAlign: 'center', fontSize: '1.5rem', padding: '0.75rem' }}
                  maxLength={4}
                  title="Emoji girin"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kullanıcı Adı / Başlık</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Örn: @ahmet_yilmaz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Biyografi Açıklaması</label>
              <textarea
                className="form-input"
                placeholder="Örn: Dijital içerik üreticisi. Günlük ipuçları ve trend analizleri için takipte kalın!"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ resize: 'none', height: '80px' }}
                maxLength={160}
              />
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>2. Tema Seçimi</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  style={{
                    background: t.bg,
                    border: selectedTheme === t.id ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    color: t.text,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transform: selectedTheme === t.id ? 'scale(1.03)' : 'none',
                    transition: 'all 0.2s',
                    boxShadow: selectedTheme === t.id ? '0 0 12px rgba(124, 58, 237, 0.4)' : 'none'
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Links Configuration */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>3. Linkler</h3>
              <button
                type="button"
                onClick={handleAddLink}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={14} /> Ekle
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map((link, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative'
                }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '1rem',
                      background: 'none',
                      border: 'none',
                      color: 'hsl(var(--text-muted))',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    className="delete-link-btn"
                    title="Bağlantıyı Sil"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div style={{ marginRight: '2rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Link Başlığı"
                      value={link.title}
                      onChange={(e) => handleLinkChange(idx, 'title', e.target.value)}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem', width: '100%' }}
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="URL (https://...)"
                      value={link.url}
                      onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem', width: '100%', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action / Sharing Buttons */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>4. Kaydet ve Paylaş</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button
                onClick={handleCopyLink}
                className="btn-primary"
                style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {copiedLink ? <Check size={18} /> : <Share2 size={18} />}
                {copiedLink ? 'Link Kopyalandı!' : 'Paylaşılabilir Link Oluştur'}
              </button>

              <button
                onClick={handleDownloadHtml}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Download size={18} /> Standalone HTML İndir
              </button>

              <button
                onClick={handleCopyHtml}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {copiedHtml ? <Check size={18} style={{ color: '#22c55e' }} /> : <Copy size={18} />}
                {copiedHtml ? 'HTML Kopyalandı!' : 'HTML Kodu Kopyala'}
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Container (Sticky Phone view) */}
        <div style={{
          position: 'sticky',
          top: '6.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }} className="phone-preview-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.85rem', fontWeight: 600 }}>
            <Smartphone size={16} /> Canlı Mobil Önizleme
          </div>
          
          {/* Simulated Mobile Device Frame */}
          <div style={{
            width: '100%',
            height: '560px',
            borderRadius: '40px',
            border: '8px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            background: activeTheme.bg,
            backgroundAttachment: 'scroll',
            color: activeTheme.text,
            overflowY: 'auto',
            padding: '2rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }} className="mobile-preview-frame">
            
            {/* Top Speaker Notch */}
            <div style={{
              width: '120px',
              height: '18px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '0 0 16px 16px',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10
            }} />

            {/* Avatar Emoji */}
            <div style={{
              fontSize: '2.5rem',
              width: '4rem',
              height: '4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${activeTheme.buttonBorder}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1rem',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}>
              {avatar || '✨'}
            </div>

            {/* Profile Info */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem', width: '100%' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: activeTheme.text }}>
                {name || '@kullanıcı'}
              </h4>
              <p style={{ 
                fontSize: '0.85rem', 
                color: 'rgba(255, 255, 255, 0.7)', 
                marginTop: '0.5rem',
                lineHeight: 1.4,
                wordBreak: 'break-word'
              }}>
                {bio || 'Biyografi açıklaması henüz girilmedi.'}
              </p>
            </div>

            {/* Links List */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
              {links.filter(l => l.title).map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: activeTheme.buttonBg,
                    border: `1px solid ${activeTheme.buttonBorder}`,
                    borderRadius: '10px',
                    color: activeTheme.text,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    wordBreak: 'break-all'
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Footer logo */}
            <div style={{ marginTop: 'auto', paddingTop: '2.5rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              Instascope ile oluşturulmuştur
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS responsive queries specific to this layout */}
      <style jsx global>{`
        @media (max-width: 968px) {
          .bio-creator-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .phone-preview-sidebar {
            position: static !important;
            order: -1; /* Mobile preview goes on top on small screens */
            max-width: 360px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

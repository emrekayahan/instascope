'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BioData {
  name: string;
  bio: string;
  avatar: string;
  theme: string;
  links: { title: string; url: string }[];
}

const THEMES: { [key: string]: { bg: string; buttonBg: string; buttonBorder: string; text: string; accent: string } } = {
  dark: { bg: 'linear-gradient(135deg, #090d16, #0e1726)', buttonBg: 'rgba(255, 255, 255, 0.05)', buttonBorder: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', accent: 'hsl(262.1 83.3% 57.8%)' },
  violet: { bg: 'linear-gradient(135deg, #1e1b4b, #311042)', buttonBg: 'rgba(168, 85, 247, 0.1)', buttonBorder: 'rgba(168, 85, 247, 0.2)', text: '#ffffff', accent: '#a855f7' },
  crimson: { bg: 'linear-gradient(135deg, #1f0813, #3b071e)', buttonBg: 'rgba(219, 39, 119, 0.1)', buttonBorder: 'rgba(219, 39, 119, 0.2)', text: '#ffffff', accent: '#db2777' },
  emerald: { bg: 'linear-gradient(135deg, #022c22, #064e3b)', buttonBg: 'rgba(16, 185, 129, 0.1)', buttonBorder: 'rgba(16, 185, 129, 0.2)', text: '#ffffff', accent: '#10b981' }
};

export default function BioViewer() {
  const [data, setData] = useState<BioData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadData = () => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#data=')) {
          const b64 = hash.replace('#data=', '');
          try {
            const decodedStr = decodeURIComponent(escape(atob(b64)));
            const parsed = JSON.parse(decodedStr);
            if (parsed && typeof parsed === 'object') {
              setData(parsed);
              setError(false);
            } else {
              setError(true);
            }
          } catch (e) {
            console.error('Decoding failed:', e);
            setError(true);
          }
        } else {
          setError(true);
        }
        setLoading(false);
      };

      loadData();

      // Listen for hash changes (if URL changes while on page)
      window.addEventListener('hashchange', loadData);
      return () => window.removeEventListener('hashchange', loadData);
    }
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#090d16',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#090d16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        gap: '1.5rem'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#ef4444' }}>Bağlantı Bulunamadı</h1>
        <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '400px' }}>
          Geçersiz veya süresi dolmuş bir biyografi linki kullandınız. Lütfen linki kontrol edin veya kendi biyografi sayfanızı oluşturun.
        </p>
        <Link href="/araclar/biyografi-link-olusturucu" className="btn-primary">
          Kendi Linkimi Oluştur
        </Link>
      </div>
    );
  }

  const themeConfig = THEMES[data.theme] || THEMES.dark;

  return (
    <div style={{
      minHeight: '100vh',
      background: themeConfig.bg,
      color: themeConfig.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '580px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {/* Avatar */}
        <div style={{
          fontSize: '3rem',
          width: '5.5rem',
          height: '5.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${themeConfig.buttonBorder}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {data.avatar || '✨'}
        </div>

        {/* Profile Info */}
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: themeConfig.text }}>
            {data.name || '@kullanıcı'}
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: 'rgba(255, 255, 255, 0.75)', 
            maxWidth: '420px', 
            margin: '0 auto',
            lineHeight: 1.5,
            wordBreak: 'break-word'
          }}>
            {data.bio}
          </p>
        </div>

        {/* Links List */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {data.links.filter(l => l.title && l.url).map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '1.15rem 1.5rem',
                background: themeConfig.buttonBg,
                border: `1px solid ${themeConfig.buttonBorder}`,
                borderRadius: '16px',
                color: themeConfig.text,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.2s ease-out',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = themeConfig.accent;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = themeConfig.buttonBorder;
                e.currentTarget.style.background = themeConfig.buttonBg;
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '4rem',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.4)'
        }}>
          <a 
            href="https://instascope.com.tr" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: themeConfig.accent, textDecoration: 'none', fontWeight: 600 }}
          >
            Instascope
          </a>{' '}
          ile oluşturulmuştur
        </div>
      </div>
    </div>
  );
}

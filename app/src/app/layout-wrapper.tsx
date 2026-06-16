'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Instagram, 
  Twitter, 
  Mail, 
  LogOut, 
  History, 
  User as UserIcon, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsDropdownOpen(false);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      alert('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkChecked) {
      alert('Devam etmek için lütfen KVKK Aydınlatma Metni\'ni kabul edin.');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage('Bültene başarıyla kaydoldunuz! Teşekkür ederiz.');
        setEmail('');
        setKvkkChecked(false);
      } else {
        throw new Error('Bir hata oluştu.');
      }
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link href="/" className="logo">
            <Sparkles size={20} className="text-primary-color" style={{ color: 'hsl(var(--accent-secondary))' }} /> Instascope
          </Link>
          
          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="nav-link">
                  Araçlar
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`nav-link ${pathname?.startsWith('/blog') ? 'active' : ''}`}>
                  Blog & SEO
                </Link>
              </li>
              <li>
                <Link href="/nasil-calisir" className={`nav-link ${pathname === '/nasil-calisir' ? 'active' : ''}`}>
                  Nasıl Çalışır?
                </Link>
              </li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* User Profile / Login */}
            {!loading && (
              user ? (
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '9999px',
                      padding: '0.35rem 1rem 0.35rem 0.35rem',
                      cursor: 'pointer',
                      color: 'white',
                      transition: 'all 0.2s'
                    }}
                    className="user-profile-btn"
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'Profil'} 
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                      />
                    ) : (
                      <div style={{ 
                        width: '30px', 
                        height: '30px', 
                        borderRadius: '50%', 
                        background: 'hsl(var(--accent-primary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <UserIcon size={16} />
                      </div>
                    )}
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }} className="desktop-only">
                      {user.displayName?.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 0.5rem)',
                      background: 'hsl(var(--bg-tertiary))',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      boxShadow: 'var(--shadow-lg)',
                      width: '200px',
                      padding: '0.5rem',
                      zIndex: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}>
                      <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '0.25rem' }}>
                        Merhaba, {user.displayName}
                      </div>
                      <Link 
                        href="/gecmis-analizlerim"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          color: 'hsl(var(--text-primary))',
                          transition: 'background 0.2s'
                        }}
                        className="dropdown-item"
                      >
                        <History size={16} />
                        Geçmiş Analizlerim
                      </Link>
                      <button 
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.2s'
                        }}
                        className="dropdown-item"
                      >
                        <LogOut size={16} />
                        Çıkış Yap
                      </button>
                    </div>
                  ) }
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '9999px' }}
                >
                  Giriş Yap
                </button>
              )
            )}
          </div>
        </div>
      </header>

      <div className="layout-with-ads">
        {showAds && (
          <div className="side-ad-container side-ad-left">
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📢</div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Sponsor Reklamı</div>
              <div style={{ fontSize: '0.7rem' }}>Google AdSense / Ezoic dikey reklam alanı (160x600)</div>
            </div>
          </div>
        )}

        <div className="main-content-area">
          {children}
        </div>

        {showAds && (
          <div className="side-ad-container side-ad-right">
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📢</div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Sponsor Reklamı</div>
              <div style={{ fontSize: '0.7rem' }}>Google AdSense / Ezoic dikey reklam alanı (160x600)</div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="logo"><Sparkles size={20} style={{ color: 'hsl(var(--accent-secondary))' }} /> Instascope</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>
                Instagram hesabınızı analiz etmeniz, büyüme istatistiklerinizi takip etmeniz ve en iyi etkileşim stratejilerini geliştirmeniz için premium araçlar sunar.
              </p>
              
              {/* Social Media Links */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="https://instagram.com/instascope_tr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--text-secondary))' }} className="social-link" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://x.com/instascope_tr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--text-secondary))' }} className="social-link" title="X (Twitter)">
                  <Twitter size={20} />
                </a>
                <a href="https://tiktok.com/@instascope_tr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--text-secondary))' }} className="social-link" title="TikTok">
                  {/* Custom TikTok SVG path since Lucide might not have it in older versions */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Hızlı Linkler</h4>
              <ul className="footer-links">
                <li><Link href="/" className="footer-link">Ana Sayfa</Link></li>
                <li><Link href="/#tools" className="footer-link">Araçlar</Link></li>
                <li><Link href="/blog" className="footer-link">Blog & Rehberler</Link></li>
                <li><Link href="/nasil-calisir" className="footer-link">Nasıl Çalışır?</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Yasal Sayfalar</h4>
              <ul className="footer-links">
                <li><Link href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</Link></li>
                <li><Link href="/cerez-politikasi" className="footer-link">Çerez Politikası</Link></li>
                <li><Link href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</Link></li>
                <li><Link href="/reklam-politikasi" className="footer-link">Reklam Politikası</Link></li>
              </ul>
            </div>
            
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 className="footer-title">Bültene Kaydolun</h4>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>
                Haftalık Instagram büyüme ipuçları ve algoritma güncellemelerini e-postanıza alın.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="email" 
                    placeholder="E-posta adresiniz" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: 'white',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                    className="footer-input"
                  />
                  <button 
                    type="submit" 
                    disabled={newsletterStatus === 'loading'}
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0 1rem',
                      cursor: 'pointer',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
                  <input 
                    type="checkbox" 
                    checked={kvkkChecked}
                    onChange={(e) => setKvkkChecked(e.target.checked)}
                    style={{ marginTop: '0.25rem' }} 
                  />
                  <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))', lineHeight: '1.3' }}>
                    <Link href="/kvkk" style={{ color: 'hsl(var(--accent-secondary))', textDecoration: 'underline' }}>KVKK Aydınlatma Metni</Link>'ni okudum ve e-posta gönderimini kabul ediyorum.
                  </span>
                </label>
              </form>

              {newsletterStatus === 'success' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontSize: '0.8rem', fontWeight: 600 }}>
                  <CheckCircle size={14} /> {newsletterMessage}
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                  {newsletterMessage}
                </div>
              )}
            </div>
          </div>
          
          <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              © {new Date().getFullYear()} Instascope.com.tr - Tüm hakları saklıdır. Verileriniz tamamen cihazınızda (client-side) işlenir, sunucuya aktarılmaz.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.8rem', color: 'hsl(var(--text-muted))', flexWrap: 'wrap' }}>
              <span>Mersis No: 0123-4567-8901-2345 (Placeholder)</span>
              <span>Ticaret Sicil No: 987654 (Placeholder)</span>
              <span>Adres: İstanbul, Türkiye</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


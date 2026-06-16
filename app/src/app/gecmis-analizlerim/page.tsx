'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  History, 
  Trash2, 
  BarChart3, 
  Rocket, 
  Clock, 
  Calendar, 
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Lock
} from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';

interface HistoryItem {
  id: string;
  type: 'etkilesim' | 'hashtag' | 'saat';
  date: string;
  inputs: any;
  result: any;
}

export default function GecmisAnalizlerim() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load history from localStorage
        const historyKey = `instascope_history_${currentUser.uid}`;
        try {
          const list = JSON.parse(localStorage.getItem(historyKey) || '[]');
          setHistoryList(list);
        } catch (e) {
          console.error('Failed to parse history:', e);
        }
      } else {
        setHistoryList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Giriş yapılırken bir hata oluştu.');
    }
  };

  const handleClearHistory = () => {
    if (!user) return;
    if (confirm('Tüm analiz geçmişinizi silmek istediğinize emin misiniz?')) {
      const historyKey = `instascope_history_${user.uid}`;
      localStorage.removeItem(historyKey);
      setHistoryList([]);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', maxWidth: '600px' }}>
        <div className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'hsl(var(--accent-secondary))'
          }}>
            <Lock size={32} />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Geçmiş Analizlerim</h1>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.6 }}>
            Analiz geçmişinizi kaydetmek ve dilediğiniz zaman tekrar görüntülemek için Google hesabınızla giriş yapın.
          </p>
          <button onClick={handleLogin} className="btn-primary" style={{ marginTop: '1rem' }}>
            Google ile Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <History size={28} style={{ color: 'hsl(var(--accent-secondary))' }} />
          <h1 className="gradient-text" style={{ fontSize: '2.25rem', margin: 0 }}>Geçmiş Analizlerim</h1>
        </div>
        {historyList.length > 0 && (
          <button 
            onClick={handleClearHistory}
            className="btn-secondary"
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.85rem', 
              color: '#ef4444', 
              borderColor: 'rgba(239, 68, 68, 0.2)',
              background: 'rgba(239, 68, 68, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Trash2 size={14} /> Geçmişi Temizle
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <History size={48} style={{ color: 'hsl(var(--text-muted))' }} />
          <h3 style={{ fontSize: '1.5rem' }}>Henüz Bir Analiz Bulunmuyor</h3>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Hesaplama araçlarımızı giriş yapmış durumdayken kullandığınızda sonuçlarınız otomatik olarak burada saklanır.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/araclar/etkilesim-hesaplayici" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
              Etkileşim Hesapla
            </Link>
            <Link href="/araclar/hashtag-onerici" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
              Hashtag Bul
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {historyList.map((item) => (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{ 
                padding: '1.75rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '10px',
                    background: 'rgba(124, 58, 237, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'hsl(var(--accent-secondary))'
                  }}>
                    {item.type === 'etkilesim' && <BarChart3 size={18} />}
                    {item.type === 'hashtag' && <Rocket size={18} />}
                    {item.type === 'saat' && <Clock size={18} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem' }}>
                      {item.type === 'etkilesim' && 'Etkileşim Oranı Analizi'}
                      {item.type === 'hashtag' && 'Hashtag Öneri Analizi'}
                      {item.type === 'saat' && 'En İyi Paylaşım Saati'}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginTop: '0.2rem' }}>
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={
                    item.type === 'etkilesim' ? '/araclar/etkilesim-hesaplayici' :
                    item.type === 'hashtag' ? '/araclar/hashtag-onerici' :
                    '/araclar/en-iyi-paylasim-saati'
                  }
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', borderRadius: '8px' }}
                >
                  Aracı Aç <ChevronRight size={12} />
                </Link>
              </div>

              <div style={{ 
                background: 'rgba(0, 0, 0, 0.15)', 
                borderRadius: '12px', 
                padding: '1.25rem',
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.02)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                <div>
                  <h4 style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Girdiler</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {item.type === 'etkilesim' && (
                      <>
                        <li>Takipçi: <strong style={{ color: 'white' }}>{item.inputs.followers?.toLocaleString()}</strong></li>
                        <li>Ort. Beğeni: <strong style={{ color: 'white' }}>{item.inputs.likes?.toLocaleString()}</strong></li>
                        <li>Ort. Yorum: <strong style={{ color: 'white' }}>{item.inputs.comments?.toLocaleString()}</strong></li>
                      </>
                    )}
                    {item.type === 'hashtag' && (
                      <li>Kategori: <strong style={{ color: 'white' }}>{item.inputs.niche}</strong></li>
                    )}
                    {item.type === 'saat' && (
                      <>
                        <li>Gün: <strong style={{ color: 'white' }}>{item.inputs.day}</strong></li>
                        <li>Kategori: <strong style={{ color: 'white' }}>{item.inputs.niche}</strong></li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Sonuçlar</h4>
                  {item.type === 'etkilesim' && (
                    <div>
                      Etkileşim Oranı: <strong style={{ color: 'hsl(var(--accent-secondary))', fontSize: '1.1rem' }}>%{item.result.er}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>{item.result.statusText}</p>
                    </div>
                  )}
                  {item.type === 'hashtag' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                      {item.result.tags?.map((t: string, idx: number) => (
                        <span key={idx} style={{ fontSize: '0.8rem', color: 'hsl(var(--accent-secondary))', background: 'rgba(124, 58, 237, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(124, 58, 237, 0.15)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.type === 'saat' && (
                    <div>
                      Saatler: <strong style={{ color: 'white' }}>{item.result.bestTimes?.join(', ')}</strong>
                      <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>{item.result.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  Lock,
  Heart
} from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';

interface HistoryItem {
  id: string;
  type: 'etkilesim' | 'hashtag' | 'saat' | 'saglik';
  date: string;
  inputs: any;
  result: any;
}

function TrendChart({ items }: { items: HistoryItem[] }) {
  // Filter for 'etkilesim' items
  const etkilesimItems = [...items]
    .filter(item => item.type === 'etkilesim' && item.result?.er !== undefined)
    .reverse(); // oldest to newest for chronological plot

  if (etkilesimItems.length < 2) return null;

  const data = etkilesimItems.map((item) => ({
    label: item.date.split(' ')[0] + ' ' + item.date.split(' ')[1].substring(0, 3), // e.g. '15 Haz'
    value: typeof item.result.er === 'string' ? parseFloat(item.result.er) : item.result.er,
    fullDate: item.date
  }));

  const width = 600;
  const height = 200;
  const paddingX = 45;
  const paddingY = 30;

  const values = data.map(d => d.value);
  const maxVal = Math.max(...values) * 1.1; // 10% headroom
  const minVal = Math.max(0, Math.min(...values) * 0.9); // 10% floor, min 0
  const valRange = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minVal) / valRange) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // For the gradient area underneath the line
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  return (
    <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'hsl(var(--accent-secondary))' }} /> Etkileşim Oranı Değişim Trendi
        </h3>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          Son {etkilesimItems.length} etkileşim hesaplamanızın zaman içindeki değişim grafiği.
        </p>
      </div>

      <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', minWidth: '500px', height: 'auto', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent-secondary))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(var(--accent-secondary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingY + ratio * (height - paddingY * 2);
            const val = maxVal - ratio * valRange;
            return (
              <g key={idx}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <text x={paddingX - 10} y={y + 4} fill="hsl(var(--text-muted))" fontSize="10" textAnchor="end">
                  %{val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Gradient Area */}
          {areaD && <path d={areaD} fill="url(#chartGradient)" />}

          {/* Line Path */}
          {pathD && (
            <path 
              d={pathD} 
              fill="none" 
              stroke="hsl(var(--accent-secondary))"
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          )}

          {/* Data Points & Labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="hsl(var(--accent-secondary))" stroke="white" strokeWidth="2" />
              {/* Value label above dot */}
              <text x={p.x} y={p.y - 10} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                %{p.value.toFixed(2)}
              </text>
              {/* Date label below axis */}
              <text x={p.x} y={height - 10} fill="hsl(var(--text-muted))" fontSize="10" textAnchor="middle">
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
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
          <TrendChart items={historyList} />
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
                    {item.type === 'saglik' && <Heart size={18} style={{ color: 'hsl(var(--accent-secondary))' }} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem' }}>
                      {item.type === 'etkilesim' && 'Etkileşim Oranı Analizi'}
                      {item.type === 'hashtag' && 'Hashtag Öneri Analizi'}
                      {item.type === 'saat' && 'En İyi Paylaşım Saati'}
                      {item.type === 'saglik' && 'Profil Sağlık Skoru'}
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
                    item.type === 'saglik' ? '/araclar/profil-sagligi' :
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
                    {item.type === 'saglik' && (
                      <>
                        <li>Takipçi: <strong style={{ color: 'white' }}>{item.inputs.followers?.toLocaleString()}</strong></li>
                        <li>Takip Edilen: <strong style={{ color: 'white' }}>{item.inputs.following?.toLocaleString()}</strong></li>
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
                  {item.type === 'saglik' && (
                    <div>
                      Sağlık Skoru: <strong style={{ color: item.result.statusColor || 'hsl(var(--accent-secondary))', fontSize: '1.1rem' }}>{item.result.healthScore}/100</strong>
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

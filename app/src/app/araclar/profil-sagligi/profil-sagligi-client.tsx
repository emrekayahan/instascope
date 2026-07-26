'use client';

import React, { useState } from 'react';
import { Heart, Share2, Copy, Check, ShieldCheck, HelpCircle, Users, BarChart3, AlertCircle, Sparkles } from 'lucide-react';
import { auth } from '../../../lib/firebase';
import Link from 'next/link';

export default function ProfilSagligiClient() {
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [industry, setIndustry] = useState('genel');
  
  const [result, setResult] = useState<{
    healthScore: number;
    er: number;
    ffr: number;
    es: number;
    ffs: number;
    statusText: string;
    statusColor: string;
    adviceList: string[];
    blogLinks: { title: string; slug: string }[];
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

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
    const fl = parseInt(following);
    const l = parseInt(likes);
    const c = parseInt(comments);

    if (isNaN(f) || isNaN(fl) || isNaN(l) || isNaN(c) || f <= 0 || fl <= 0) {
      alert('Lütfen geçerli sayılar giriniz. Takipçi ve takip edilen sayıları 0\'dan büyük olmalıdır.');
      return;
    }

    // 1. Calculate Engagement Rate (ER)
    const er = parseFloat((((l + c) / f) * 100).toFixed(2));

    // 2. Calculate Follower/Following Ratio (FFR)
    const ffr = parseFloat((f / fl).toFixed(2));

    // 3. Calculate Engagement Score (ES) - 60% weight
    const selectedBenchmark = benchmarks[industry] || benchmarks.genel;
    let es = 100;
    if (er < selectedBenchmark.rate) {
      es = Math.min(100, Math.round((er / selectedBenchmark.rate) * 100));
    }

    // 4. Calculate Follower/Following Score (FFS) - 40% weight
    let ffs = 100;
    if (ffr >= 5) {
      ffs = 100;
    } else if (ffr >= 1) {
      ffs = Math.round(50 + (ffr - 1) * 12.5); // at 1: 50, at 5: 100
    } else {
      ffs = Math.round(ffr * 50); // below 1
    }

    // 5. Overall Health Score
    const healthScore = Math.round(es * 0.6 + ffs * 0.4);

    let statusText = '';
    let statusColor = '';
    let adviceList: string[] = [];
    let blogLinks: { title: string; slug: string }[] = [];

    if (healthScore >= 80) {
      statusText = 'Mükemmel Profil Sağlığı! Hesabınız son derece dengeli ve aktif.';
      statusColor = '#a855f7'; // Purple
      adviceList.push('Mevcut etkileşim düzeninizi bozmadan düzenli içerik üretmeye devam edin.');
      adviceList.push('İçeriklerinizi Reels formatında zenginleştirerek keşfet erişimlerinizi artırabilirsiniz.');
      blogLinks.push({ title: 'Instagram Reels Algoritmasını Anlamak', slug: 'instagram-reels-algoritmasini-anlamak' });
      blogLinks.push({ title: "Instagram'da Keşfet'e Düşme Taktikleri", slug: 'instagramda-kesfete-dusme-taktikleri' });
    } else if (healthScore >= 50 && healthScore < 80) {
      statusText = 'Ortalama Profil Sağlığı. Bazı alanlarda iyileştirme yapılabilir.';
      statusColor = '#eab308'; // Yellow
      
      if (er < selectedBenchmark.rate) {
        adviceList.push(`Etkileşim oranınız (%${er}) sektör ortalamasının (%${selectedBenchmark.rate}) altındadır. Gönderi saatlerini ve içerik kalitenizi optimize edin.`);
        blogLinks.push({ title: 'Instagram Etkileşim Oranı Nedir, Nasıl Hesaplanır?', slug: 'instagram-etkilesim-orani-nedir-nasil-hesaplanir' });
      }
      if (ffr < 3) {
        adviceList.push(`Takipçi/Takip oranınız (${ffr}) biraz düşük. Spam benzeri görünmemek için takip ettiğiniz hesap sayısını düzenleyin.`);
        blogLinks.push({ title: 'Takipçi/Takip Oranı Neden Önemli?', slug: 'takipci-takip-orani-neden-onemli' });
      }
      adviceList.push('İlgi çekici hashtag kombinasyonları kullanarak organik erişiminizi destekleyin.');
    } else {
      statusText = 'Düşük Profil Sağlığı. Acil optimizasyon gerekiyor!';
      statusColor = '#ef4444'; // Red

      if (er < selectedBenchmark.rate) {
        adviceList.push(`Kritik düşük etkileşim! Bot takipçi veya pasif kitle temizliği yapmayı ve içerik stratejinizi tamamen değiştirmeyi düşünün.`);
        blogLinks.push({ title: 'Bot Takipçi vs Organik Takipçi: Hesabınıza Zararları', slug: 'bot-takipci-vs-organik-takipci' });
        blogLinks.push({ title: 'Organik Takipçi Artırma Yöntemleri', slug: 'organik-takipci-artirma-yontemleri' });
      }
      if (ffr < 1.5) {
        adviceList.push(`Hesabınız çok fazla kişiyi takip ediyor (${ffr} oranı). Bu durum algoritmada güven skorunuzu düşürür. Takip ettiklerinizi azaltın.`);
        blogLinks.push({ title: 'Takipçi/Takip Oranı Neden Önemli?', slug: 'takipci-takip-orani-neden-onemli' });
      }
      adviceList.push('Hashtag stratejisi geliştirin ve en aktif olduğunuz saatleri tespit edip o saatlerde paylaşım yapın.');
    }

    setResult({
      healthScore,
      er,
      ffr,
      es,
      ffs,
      statusText,
      statusColor,
      adviceList,
      blogLinks
    });

    // Save to history if logged in
    const user = auth.currentUser;
    if (user) {
      try {
        const historyKey = `instascope_history_${user.uid}`;
        const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const newItem = {
          id: Math.random().toString(36).substring(2, 9),
          type: 'saglik',
          date: new Date().toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          inputs: { followers: f, following: fl, likes: l, comments: c, industry },
          result: { healthScore, er, ffr, statusText, statusColor }
        };
        localStorage.setItem(historyKey, JSON.stringify([newItem, ...existingHistory]));
      } catch (err) {
        console.error('Error saving history:', err);
      }
    }
  };

  const shareText = `Instagram Profil Sağlık Skorum Instascope ile 100 üzerinden ${result?.healthScore} çıktı! Siz de profilinizi hemen analiz edin: https://instascope.com.tr/araclar/profil-sagligi`;

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
            <Heart size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 style={{ fontSize: '2.25rem', margin: 0 }} className="gradient-text">
              Instagram Profil Sağlık Skoru
            </h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            Profilinizin etkileşim oranı, takipçi/takip dengesi ve genel durumunu tek seferde analiz edin. 100 üzerinden bir sağlık puanı ve size özel iyileştirme adımları alın.
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Toplam Takipçi</label>
              <input
                type="number"
                className="form-input"
                placeholder="Örn: 12500"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Takip Edilen</label>
              <input
                type="number"
                className="form-input"
                placeholder="Örn: 450"
                value={following}
                onChange={(e) => setFollowing(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Ortalama Beğeni (Gönderi Başı)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Örn: 380"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ortalama Yorum (Gönderi Başı)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Örn: 18"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Profili Analiz Et
          </button>
        </form>

        {result !== null && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '1.5rem',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {/* Score Ring Display */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'hsl(var(--text-secondary))', margin: 0 }}>Profil Sağlık Skoru</h3>
              <div style={{
                position: 'relative',
                width: '150px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: `radial-gradient(closest-side, hsl(var(--bg-tertiary)) 79%, transparent 80% 100%), conic-gradient(${result.statusColor} ${result.healthScore}%, rgba(255, 255, 255, 0.05) 0)`,
                boxShadow: 'var(--shadow-md)'
              }}>
                <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'white' }}>
                  {result.healthScore}
                </span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: result.statusColor, margin: '0.5rem 0 0 0' }}>
                {result.statusText}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {/* Metric 1: Engagement */}
              <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
                    <BarChart3 size={16} /> Etkileşim Oranı
                  </span>
                  <span style={{ fontWeight: 700, color: 'white' }}>%{result.er}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ width: `${result.es}%`, height: '100%', background: 'linear-gradient(90deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))', borderRadius: '9999px' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                  {industry === 'genel' ? 'Genel' : benchmarks[industry]?.name} ortalaması: %{benchmarks[industry]?.rate}
                </div>
              </div>

              {/* Metric 2: Follower/Following ratio */}
              <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
                    <Users size={16} /> T/T Oranı
                  </span>
                  <span style={{ fontWeight: 700, color: 'white' }}>{result.ffr}x</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ width: `${result.ffs}%`, height: '100%', background: 'linear-gradient(90deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))', borderRadius: '9999px' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                  Sağlıklı hedef oran: 5.0x ve üzeri
                </div>
              </div>
            </div>

            {/* Actionable Advice List */}
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.02)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, marginBottom: '1rem' }}>
                <Sparkles size={18} style={{ color: 'hsl(var(--accent-secondary))' }} /> Önerilen İyileştirme Adımları
              </h4>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: 0 }}>
                {result.adviceList.map((advice, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.4 }}>
                    <span style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 'bold' }}>•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contextual Blog Links */}
            {result.blogLinks.length > 0 && (
              <div>
                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600, marginBottom: '0.75rem', marginTop: 0 }}>
                  Okumanız Önerilen Blog Yazıları
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.blogLinks.map((blog, idx) => (
                    <Link
                      key={idx}
                      href={`/blog/${blog.slug}`}
                      style={{
                        padding: '1rem 1.25rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'white',
                        transition: 'all 0.2s'
                      }}
                      className="dropdown-item"
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{blog.title}</span>
                      <span style={{ color: 'hsl(var(--accent-secondary))', fontSize: '0.85rem', fontWeight: 600 }}>Oku &rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Dijital Ürün Satış CTA (Priority 3.1) */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <strong style={{ color: 'white', fontSize: '1rem' }}>Instagram Büyüme Planınızı Hızlandırın!</strong>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
                Sektörünüze özel en popüler paylaşım saatleri şablonları, 500+ premium hashtag ve 90 günlük hazır Instagram içerik takvimi şablonunu hemen indirin.
              </p>
              <a 
                href="https://gumroad.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', marginTop: '0.5rem', alignSelf: 'center', background: 'linear-gradient(135deg, #a855f7, #db2777)', boxShadow: 'none' }}
              >
                90 Günlük İçerik Takvimini İndir
              </a>
            </div>

            {/* Navigation CTA to other tools */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600, marginBottom: '0.75rem', marginTop: 0 }}>
                Diğer Araçlarımızı Keşfedin
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <Link href="/araclar/hashtag-onerici" className="btn-secondary" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                  Hashtag Önerici
                </Link>
                <Link href="/araclar/en-iyi-paylasim-saati" className="btn-secondary" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                  Paylaşım Saati Bulucu
                </Link>
              </div>
            </div>

            {/* Share Result & Copy Options */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="btn-primary"
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

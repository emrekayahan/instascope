'use client';

import React, { useState } from 'react';
import { HelpCircle, Share2, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scoreType: 'influencer' | 'marka' | 'hobi' | 'topluluk';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Instagram'da ne sıklıkla paylaşım yapıyorsunuz?",
    options: [
      { text: "Günde en az 1 Reels veya gönderi", scoreType: "influencer" },
      { text: "Haftada 2-3 defa, planlı şekilde", scoreType: "marka" },
      { text: "Hobi amaçlı, canım ne zaman isterse", scoreType: "hobi" },
      { text: "Sadece hikayeler (Stories) paylaşıyorum", scoreType: "topluluk" }
    ]
  },
  {
    id: 2,
    text: "Sayfanızda en çok hangi tür içerikler yer alıyor?",
    options: [
      { text: "Kendi yüzümün/sesimin olduğu vloglar veya deneyimler", scoreType: "influencer" },
      { text: "Ürün görselleri, indirimler veya marka tanıtımları", scoreType: "marka" },
      { text: "Manzaralar, estetik fotoğraflar veya sanatsal kareler", scoreType: "hobi" },
      { text: "Bilgi verici grafikler, alıntılar veya tematik slaytlar", scoreType: "topluluk" }
    ]
  },
  {
    id: 3,
    text: "Takipçilerinizle iletişiminiz nasıl?",
    options: [
      { text: "DM ve yorumların hepsini samimiyetle yanıtlarım", scoreType: "influencer" },
      { text: "Müşteri sorularına profesyonelce cevap veririm", scoreType: "marka" },
      { text: "Yorumları okurum ama nadiren yanıtlarım", scoreType: "hobi" },
      { text: "Niş topluluğumla konu odaklı tartışmalar yürütürüm", scoreType: "topluluk" }
    ]
  },
  {
    id: 4,
    text: "Instagram'daki birincil büyüme amacınız nedir?",
    options: [
      { text: "Kişisel markamı büyüterek sponsorluk ve reklam almak", scoreType: "influencer" },
      { text: "Ürün/hizmet satışlarımı ve müşteri portföyümü artırmak", scoreType: "marka" },
      { text: "Kendi portfolyomu sergilemek veya keyifli zaman geçirmek", scoreType: "hobi" },
      { text: "Bilgi paylaşmak veya ortak ilgi alanına sahip topluluk kurmak", scoreType: "topluluk" }
    ]
  },
  {
    id: 5,
    text: "Profilinizin görsel düzeni hangisine daha yakın?",
    options: [
      { text: "Kendi fotoğraflarım ve samimi anlarımdan oluşan dinamik bir akış", scoreType: "influencer" },
      { text: "Renk paleti uyumlu, ürünlerin ve katalog düzeninin öne çıktığı grid", scoreType: "marka" },
      { text: "Spontane, filtresiz ve sadece estetik odaklı galeri", scoreType: "hobi" },
      { text: "Yazıların ve kapak şablonlarının ön planda olduğu düzenli şema", scoreType: "topluluk" }
    ]
  }
];

const RESULTS = {
  influencer: {
    title: "Mikro / Nano Influencer",
    description: "Sıcak, samimi ve kitleyle birebir bağ kurabilen bir profile sahipsiniz! İnsanlar sizin tavsiyelerinize ve samimiyetinize güveniyor. Markaların sosyal medyada en çok iş birliği yapmak istediği yükselen yıldız kategorisindesiniz.",
    advice: "Etkileşim oranınızı (Engagement Rate) yüksek tutmak için hikaye çıkartmalarını aktif kullanmaya devam edin ve reels kancalarını geliştirin.",
    badgeColor: "#a855f7",
    blogSlug: "mikro-influencer-nedir-markalar-neden-tercih-eder"
  },
  marka: {
    title: "Girişimci / Marka Hesabı",
    description: "Instagram'ı tam anlamıyla dijital bir mağaza ve vitrin gibi kullanıyorsunuz! Odak noktanız estetik sunum, güvenilirlik ve satış dönüşümleridir. Kitleniz sizden fayda, indirim ve net bilgi bekliyor.",
    advice: "Biyografi bağlantınızı optimize ederek müşterilerinizi tek tıkla web sitenize veya WhatsApp hattınıza yönlendirin.",
    badgeColor: "#ec4899",
    blogSlug: "instagram-biyografi-linki-nasil-optimize-edilir"
  },
  hobi: {
    title: "Hobi ve Estetik Tasarımcısı",
    description: "Algoritma baskısını hissetmeden, tamamen kendinizi ifade etmek ve estetik anları paylaşmak için buradasınız! Gönderilerinizde filtresiz ve sanatsal bir yaklaşım hakim. Erişim kaygınız düşük, keyif oranınız yüksek.",
    advice: "Büyümek isterseniz trend müziklerden faydalanabilir veya Reels formatında hikaye anlatımınızı (storytelling) güçlendirebilirsiniz.",
    badgeColor: "#3b82f6",
    blogSlug: "instagram-reels-izlenmesini-artirmanin-7-yolu"
  },
  topluluk: {
    title: "Tematik Bilgi / Topluluk Sayfası",
    description: "Arka planda kalmayı tercih ederek tamamen faydalı bilgi, mizah veya niş bir konu etrafında içerik üretiyorsunuz! İnsanlar sayfanızı kaydetmek ve arkadaşlarıyla paylaşmak için takip ediyor.",
    advice: "Erişimlerinizi katlamak için kaydetme oranını tetikleyecek bilgi kartları hazırlayın ve hashtag kombinasyonlarından yararlanın.",
    badgeColor: "#10b981",
    blogSlug: "2026-en-iyi-instagram-hashtag-stratejileri"
  }
};

export default function InstagramTipimClient() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    influencer: 0,
    marka: 0,
    hobi: 0,
    topluluk: 0
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleAnswerSelect = (scoreType: 'influencer' | 'marka' | 'hobi' | 'topluluk') => {
    setScores(prev => ({
      ...prev,
      [scoreType]: prev[scoreType] + 1
    }));

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getWinnerResult = () => {
    let maxScore = -1;
    let winner: keyof typeof RESULTS = 'influencer';

    Object.entries(scores).forEach(([type, val]) => {
      if (val > maxScore) {
        maxScore = val;
        winner = type as keyof typeof RESULTS;
      }
    });

    return RESULTS[winner];
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setScores({
      influencer: 0,
      marka: 0,
      hobi: 0,
      topluluk: 0
    });
    setQuizFinished(false);
    setShowShareOptions(false);
  };

  const resultObj = getWinnerResult();
  const shareText = `Instagram Hesap Tipim Instascope testi ile "${resultObj.title}" çıktı! Sen de hesabının tipini öğren: https://instascope.com.tr/araclar/instagram-tipim`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '700px' }}>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <HelpCircle size={32} style={{ color: 'hsl(var(--accent-secondary))' }} />
            <h1 style={{ fontSize: '2.25rem', margin: 0 }} className="gradient-text">
              Instagram Kişiliğiniz Ne?
            </h1>
          </div>
          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.5rem' }}>
            5 pratik soruyla Instagram'daki kimliğinizi analiz edin. Hesabınızın güçlü yönlerini ve hangi stratejiyi uygulamanız gerektiğini öğrenin.
          </p>
        </div>

        {/* Progress Bar (Visible during quiz) */}
        {!quizFinished && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'hsl(var(--text-muted))', marginBottom: '0.5rem' }}>
              <span>Soru {currentQuestionIdx + 1} / {QUESTIONS.length}</span>
              <span>%{( (currentQuestionIdx / QUESTIONS.length) * 100 ).toFixed(0)} Tamamlandı</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{
                width: `${((currentQuestionIdx) / QUESTIONS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
                borderRadius: '9999px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Quiz Body */}
        {!quizFinished ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'white', fontWeight: 700, lineHeight: 1.4 }}>
              {QUESTIONS[currentQuestionIdx].text}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {QUESTIONS[currentQuestionIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(opt.scoreType)}
                  style={{
                    padding: '1.15rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    textAlign: 'left',
                    color: 'hsl(var(--text-secondary))',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  className="dropdown-item"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Card */
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                padding: '0.4rem 1.25rem',
                borderRadius: '9999px',
                background: `${resultObj.badgeColor}20`,
                border: `1px solid ${resultObj.badgeColor}40`,
                color: resultObj.badgeColor,
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Hesap Tipiniz
              </span>
              <h2 style={{ fontSize: '2.25rem', color: 'white', fontWeight: 800, margin: 0 }}>
                {resultObj.title}
              </h2>
            </div>

            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
              {resultObj.description}
            </p>

            {/* Personalized Advice */}
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.02)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'hsl(var(--accent-secondary))' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Tavsiyemiz</span>
              </div>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                {resultObj.advice}
              </p>
            </div>

            {/* Related Blog Post */}
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'white', fontWeight: 600, marginBottom: '0.5rem', marginTop: 0 }}>
                Sizin İçin Seçtiğimiz Rehber
              </h4>
              <Link
                href={`/blog/${resultObj.blogSlug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  color: 'white',
                  transition: 'all 0.2s'
                }}
                className="dropdown-item"
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  {resultObj.title === "Mikro / Nano Influencer" && "Mikro Influencer Nedir, Markalar Neden Tercih Eder?"}
                  {resultObj.title === "Girişimci / Marka Hesabı" && "Instagram Biyografi Linki Nasıl Optimize Edilir?"}
                  {resultObj.title === "Hobi ve Estetik Tasarımcısı" && "Instagram Reels İzlenmesini Artırmanın 7 Yolu"}
                  {resultObj.title === "Tematik Bilgi / Topluluk Sayfası" && "2026'da En İyi Instagram Hashtag Stratejileri"}
                </span>
                <span style={{ color: 'hsl(var(--accent-secondary))', fontSize: '0.85rem', fontWeight: 600 }}>Rehberi Oku &rarr;</span>
              </Link>
            </div>

            {/* Actions: Restart, Share */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                onClick={resetQuiz}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', gap: '0.5rem', display: 'inline-flex', alignItems: 'center' }}
              >
                <RefreshCw size={16} /> Yeniden Test Et
              </button>

              <button
                type="button"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', gap: '0.5rem', display: 'inline-flex', alignItems: 'center' }}
              >
                <Share2 size={16} /> Sonucu Paylaş
              </button>
            </div>

            {/* Share details */}
            {showShareOptions && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
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
                    fontSize: '0.85rem'
                  }}
                >
                  X (Twitter)
                </a>
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem'
                  }}
                >
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
            )}

            {/* Tools navigation CTA */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600, marginBottom: '0.75rem', marginTop: 0 }}>
                Hesabınızı Profesyonelce Analiz Edin
              </h4>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/araclar/etkilesim-hesaplayici" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Etkileşim Hesapla
                </Link>
                <Link href="/araclar/profil-sagligi" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Sağlık Skoru Ölç
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

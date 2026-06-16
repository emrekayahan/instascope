'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, AlertCircle, Send, MapPin, Shield } from 'lucide-react';

export default function Iletisim() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkChecked) {
      alert('Lütfen devam etmek için KVKK Aydınlatma Metni\'ni onaylayın.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setKvkkChecked(false);
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '6rem 2rem', maxWidth: '900px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start'
      }} className="contact-grid">
        
        {/* Contact info column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>İletişim</h1>
            <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>
              Instascope projesiyle ilgili görüş, öneri, reklam anlaşmaları veya geri bildirimleriniz için yan taraftaki formu doldurabilir veya doğrudan e-posta adresimiz üzerinden bize ulaşabilirsiniz.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '12px',
                background: 'rgba(124, 58, 237, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--accent-secondary))',
                flexShrink: 0
              }}>
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>E-Posta</h4>
                <a href="mailto:demadatr@gmail.com" style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                  demadatr@gmail.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '12px',
                background: 'rgba(124, 58, 237, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--accent-secondary))',
                flexShrink: 0
              }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Adres</h4>
                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  İstanbul, Türkiye
                </span>
              </div>
            </div>
          </div>

          {/* Corporate Details */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontSize: '0.85rem',
            color: 'hsl(var(--text-secondary))'
          }}>
            <h4 style={{ color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} style={{ color: 'hsl(var(--accent-secondary))' }} /> Kurumsal Bilgiler
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
              <span><strong>Ünvan:</strong> Instascope Dijital Hizmetler Ltd. Şti. (Placeholder)</span>
              <span><strong>Mersis No:</strong> 0123-4567-8901-2345 (Placeholder)</span>
              <span><strong>Ticaret Sicil No:</strong> 987654 (Placeholder)</span>
              <span><strong>Oda Kaydı:</strong> İstanbul Ticaret Odası (İTO)</span>
            </div>
          </div>
        </div>

        {/* Contact form column */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Mesaj Gönderin</h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Adınız Soyadınız</label>
              <input
                type="text"
                className="form-input"
                placeholder="Örn: Ahmet Yılmaz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-Posta Adresiniz</label>
              <input
                type="email"
                className="form-input"
                placeholder="Örn: ahmet@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mesajınız</label>
              <textarea
                className="form-input"
                placeholder="İletmek istediğiniz mesaj..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'loading'}
                style={{ height: '120px', resize: 'none' }}
              />
            </div>

            {/* KVKK Consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={kvkkChecked}
                onChange={(e) => setKvkkChecked(e.target.checked)}
                style={{ marginTop: '0.25rem' }}
                disabled={status === 'loading'}
              />
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
                İletişim formuna yazdığım verilerin <Link href="/kvkk" style={{ color: 'hsl(var(--accent-secondary))', textDecoration: 'underline' }}>KVKK Aydınlatma Metni</Link> kapsamında işlenmesine onay veriyorum.
              </span>
            </label>

            <button
              type="submit"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', alignSelf: 'flex-start', marginTop: '0.5rem' }}
              disabled={status === 'loading'}
            >
              <Send size={16} /> {status === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>

          {status === 'success' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#22c55e',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.15)',
              borderRadius: '12px',
              padding: '1rem',
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <CheckCircle size={18} /> Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}

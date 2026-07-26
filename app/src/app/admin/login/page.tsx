'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const { signIn, error: authError, user, isAdmin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in as admin, redirect
  if (user && isAdmin) {
    router.replace('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch {
      // Error is handled by auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, hsl(var(--bg-primary)) 0%, hsl(var(--bg-secondary)) 100%)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.5rem',
          }}>
            🔐
          </div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'white',
            margin: '0 0 0.5rem',
          }}>
            Admin Panel
          </h1>
          <p style={{
            color: 'hsl(var(--text-muted))',
            fontSize: '0.9rem',
          }}>
            Instascope Yönetim Paneli
          </p>
        </div>

        {/* Error Message */}
        {authError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            color: '#ef4444',
            fontSize: '0.85rem',
          }}>
            <AlertCircle size={16} />
            {authError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{
              display: 'block',
              color: 'hsl(var(--text-secondary))',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}>
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'hsl(var(--text-secondary))',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}>
              Şifre
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'hsl(var(--text-muted))',
                  cursor: 'pointer',
                  padding: '0.25rem',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.875rem',
              background: loading
                ? 'rgba(168, 85, 247, 0.4)'
                : 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
              marginTop: '0.5rem',
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Giriş yapılıyor...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Giriş Yap
              </>
            )}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: 'hsl(var(--text-muted))',
          fontSize: '0.75rem',
          marginTop: '2rem',
        }}>
          Sadece yetkili yöneticiler giriş yapabilir.
        </p>
      </div>
    </div>
  );
}

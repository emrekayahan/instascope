'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/lib/auth';
import AuthGuard from '@/components/admin/AuthGuard';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  LogOut, 
  Home,
  ChevronRight 
} from 'lucide-react';

function AdminNav() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/posts', label: 'Yazılar', icon: FileText },
    { href: '/admin/posts/new', label: 'Yeni Yazı', icon: PlusCircle },
  ];

  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '250px',
      background: 'rgba(15, 15, 25, 0.95)',
      borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      zIndex: 50,
      backdropFilter: 'blur(20px)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '0 1.5rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <Link href="/admin" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.15rem',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
          }}>
            📊
          </span>
          Instascope Admin
        </Link>
      </div>

      {/* Nav Items */}
      <div style={{ padding: '1rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'hsl(var(--text-secondary))',
                background: isActive ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              <Icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div style={{
        padding: '1rem 0.75rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          textDecoration: 'none',
          color: 'hsl(var(--text-muted))',
          fontSize: '0.85rem',
          transition: 'color 0.2s',
        }}>
          <Home size={16} />
          Siteye Dön
        </Link>
        <button
          onClick={signOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            background: 'none',
            border: 'none',
            color: 'hsl(var(--text-muted))',
            fontSize: '0.85rem',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            transition: 'color 0.2s',
          }}
        >
          <LogOut size={16} />
          Çıkış ({user?.email?.split('@')[0]})
        </button>
      </div>
    </nav>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login sayfasında sidebar gösterme
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminNav />
        <main style={{
          flex: 1,
          marginLeft: '250px',
          padding: '2rem 3rem',
          minHeight: '100vh',
          background: 'hsl(var(--bg-primary))',
        }}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}

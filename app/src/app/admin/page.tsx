'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FileText, PlusCircle, Eye, Clock, BarChart3 } from 'lucide-react';

interface PostSummary {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  publishedAt?: { seconds: number };
  viewCount?: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'published_content'), orderBy('publishedAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostSummary[];
        setPosts(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        // Try without ordering (might not have publishedAt index)
        try {
          const snapshot = await getDocs(collection(db, 'published_content'));
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as PostSummary[];
          setPosts(data);
        } catch (err2) {
          console.error('Dashboard fallback fetch error:', err2);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;
  const totalViews = posts.reduce((sum, p) => sum + (p.viewCount || 0), 0);

  const statCards = [
    { label: 'Toplam Yazı', value: posts.length, icon: FileText, color: '#a855f7' },
    { label: 'Yayında', value: publishedCount, icon: Eye, color: '#22c55e' },
    { label: 'Taslak', value: draftCount, icon: Clock, color: '#f59e0b' },
    { label: 'Toplam Görüntülenme', value: totalViews, icon: BarChart3, color: '#3b82f6' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Instascope Blog Yönetim Paneli
          </p>
        </div>
        <Link href="/admin/posts/new" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', borderRadius: '10px',
          background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
          color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}>
          <PlusCircle size={18} /> Yeni Yazı
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        {statCards.map((stat) => (
          <div key={stat.label} style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <stat.icon size={18} style={{ color: stat.color }} />
              <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
              {loading ? '—' : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'white', margin: 0 }}>Son Yazılar</h2>
          <Link href="/admin/posts" style={{ color: 'hsl(var(--accent-secondary))', fontSize: '0.85rem', textDecoration: 'none' }}>
            Tümünü Gör →
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'hsl(var(--text-muted))' }}>Yükleniyor...</div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem',
            background: 'rgba(255, 255, 255, 0.02)', borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <FileText size={40} style={{ color: 'hsl(var(--text-muted))', margin: '0 auto 1rem' }} />
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1rem' }}>Henüz yazı yok.</p>
            <Link href="/admin/posts/new" style={{
              color: 'hsl(var(--accent-secondary))', textDecoration: 'none', fontWeight: 600,
            }}>
              İlk yazınızı oluşturun →
            </Link>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            overflow: 'hidden',
          }}>
            {posts.slice(0, 5).map((post, idx) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1rem 1.5rem', textDecoration: 'none',
                  borderBottom: idx < Math.min(posts.length, 5) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'background 0.15s',
                }}
              >
                <div>
                  <div style={{ color: 'white', fontWeight: 500, fontSize: '0.95rem' }}>{post.title}</div>
                  <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    /blog/{post.slug}
                  </div>
                </div>
                <span style={{
                  padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600,
                  background: post.status === 'published' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: post.status === 'published' ? '#22c55e' : '#f59e0b',
                  border: `1px solid ${post.status === 'published' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                }}>
                  {post.status === 'published' ? 'Yayında' : 'Taslak'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

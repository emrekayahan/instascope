'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { PlusCircle, Trash2, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  category?: string;
  publishedAt?: { seconds: number };
  updatedAt?: { seconds: number };
}

export default function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'published_content'), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Post)));
    } catch {
      try {
        const snapshot = await getDocs(collection(db, 'published_content'));
        setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Post)));
      } catch (err) {
        console.error('Posts fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (post: Post) => {
    if (!confirm(`"${post.title}" yazısını silmek istediğinize emin misiniz?`)) return;
    setDeleting(post.id);
    try {
      await deleteDoc(doc(db, 'published_content', post.id));
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      alert('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setDeleting(null);
    }
  };

  const toggleStatus = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'published_content', post.id), { status: newStatus });
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert('Durum değiştirme başarısız: ' + (err instanceof Error ? err.message : ''));
    }
  };

  const formatDate = (ts?: { seconds: number }) => {
    if (!ts) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', margin: 0 }}>
          Yazılar ({posts.length})
        </h1>
        <Link href="/admin/posts/new" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.65rem 1.25rem', borderRadius: '10px',
          background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
          color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}>
          <PlusCircle size={16} /> Yeni Yazı
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'hsl(var(--text-muted))' }}>Yükleniyor...</div>
      ) : posts.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem',
          background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1rem' }}>Henüz yazı bulunmuyor.</p>
          <Link href="/admin/posts/new" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600, textDecoration: 'none' }}>
            İlk yazınızı oluşturun →
          </Link>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 120px',
            padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            <span>Başlık</span>
            <span>Kategori</span>
            <span>Durum</span>
            <span>Tarih</span>
            <span style={{ textAlign: 'right' }}>İşlemler</span>
          </div>

          {posts.map((post) => (
            <div key={post.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 120px',
              padding: '1rem 1.5rem', alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              transition: 'background 0.15s',
            }}>
              <div>
                <Link href={`/admin/posts/${post.id}/edit`} style={{
                  color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem',
                }}>
                  {post.title}
                </Link>
                <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                  /blog/{post.slug}
                </div>
              </div>
              <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                {post.category || '—'}
              </span>
              <span style={{
                padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, width: 'fit-content',
                background: post.status === 'published' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                color: post.status === 'published' ? '#22c55e' : '#f59e0b',
              }}>
                {post.status === 'published' ? 'Yayında' : 'Taslak'}
              </span>
              <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem' }}>
                {formatDate(post.publishedAt)}
              </span>
              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                <button onClick={() => toggleStatus(post)} title={post.status === 'published' ? 'Taslağa çevir' : 'Yayınla'} style={{
                  padding: '0.4rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.05)', color: 'hsl(var(--text-secondary))', cursor: 'pointer',
                }}>
                  {post.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                {post.status === 'published' && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" title="Sitede görüntüle" style={{
                    padding: '0.4rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.05)', color: 'hsl(var(--text-secondary))', display: 'flex',
                  }}>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button onClick={() => handleDelete(post)} disabled={deleting === post.id} title="Sil" style={{
                  padding: '0.4rem', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.2)',
                  background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer',
                }}>
                  {deleting === post.id ? <Loader2 size={14} /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/lib/auth';
import PostForm, { PostFormData } from '@/components/admin/PostForm';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { user } = useAuth();
  const [initialData, setInitialData] = useState<Partial<PostFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'published_content', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setInitialData({
            title: data.title || '',
            slug: data.slug || postId,
            excerpt: data.excerpt || data.description || '',
            content: data.content || '',
            coverImageUrl: data.coverImageUrl || '',
            category: data.category || 'genel',
            tags: data.tags || [],
            status: data.status || 'draft',
            seoTitle: data.seoTitle || '',
            seoDescription: data.seoDescription || '',
          });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Post fetch error:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  const handleSubmit = async (data: PostFormData) => {
    if (!user) throw new Error('Oturum açmanız gerekiyor.');

    const wordCount = data.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;

    const updateData = {
      title: data.title,
      slug: data.slug,
      description: data.excerpt,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || '',
      category: data.category,
      tags: data.tags,
      status: data.status,
      updatedAt: Timestamp.now(),
      readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
      readTime: `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`,
      read_time: `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.excerpt,
    };

    await updateDoc(doc(db, 'published_content', postId), updateData);

    // Revalidate blog pages
    try {
      await fetch(`/api/revalidate?path=/blog/${data.slug}`, { method: 'POST' });
      await fetch(`/api/revalidate?path=/blog`, { method: 'POST' });
    } catch {
      // Non-critical
    }

    router.push('/admin/posts');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'hsl(var(--text-muted))' }}>
        Yazı yükleniyor...
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Yazı bulunamadı.</p>
        <a href="/admin/posts" style={{ color: 'hsl(var(--accent-secondary))' }}>Yazılara dön</a>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '2rem' }}>
        ✏️ Yazıyı Düzenle
      </h1>
      <PostForm initialData={initialData!} onSubmit={handleSubmit} isEdit />
    </div>
  );
}

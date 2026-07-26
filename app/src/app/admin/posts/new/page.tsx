'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/lib/auth';
import PostForm, { PostFormData } from '@/components/admin/PostForm';

export default function NewPostPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (data: PostFormData) => {
    if (!user) throw new Error('Oturum açmanız gerekiyor.');

    const now = Timestamp.now();
    const wordCount = data.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;

    const postData = {
      title: data.title,
      slug: data.slug,
      description: data.excerpt, // blog list compatibility
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || '',
      category: data.category,
      tags: data.tags,
      status: data.status,
      authorName: 'Emre Kayahan',
      authorId: user.uid,
      publishedAt: now,
      published_at: now, // blog list compatibility (uses published_at)
      updatedAt: now,
      readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
      readTime: `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`,
      read_time: `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.excerpt,
      viewCount: 0,
    };

    // Use slug as document ID for easy lookup
    await setDoc(doc(db, 'published_content', data.slug), postData);

    // Revalidate blog pages
    try {
      await fetch(`/api/revalidate?path=/blog/${data.slug}`, { method: 'POST' });
      await fetch(`/api/revalidate?path=/blog`, { method: 'POST' });
    } catch {
      // Revalidation failure is non-critical
    }

    router.push('/admin/posts');
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '2rem' }}>
        ✍️ Yeni Yazı Oluştur
      </h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}

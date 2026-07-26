'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Save, Send, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic import to avoid SSR issues with Tiptap
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '400px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />,
});

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  seoTitle: string;
  seoDescription: string;
}

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isEdit?: boolean;
}

const CATEGORIES = [
  'algoritma',
  'büyüme',
  'güvenlik',
  'araçlar',
  'strateji',
  'reels',
  'hashtag',
  'analiz',
  'genel',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'hsl(var(--text-secondary))',
  fontSize: '0.85rem',
  fontWeight: 500,
  marginBottom: '0.5rem',
};

export default function PostForm({ initialData, onSubmit, isEdit }: PostFormProps) {
  const [form, setForm] = useState<PostFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImageUrl: initialData?.coverImageUrl || '',
    category: initialData?.category || 'genel',
    tags: initialData?.tags || [],
    status: initialData?.status || 'draft',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount = countWords(form.content);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || !prev.slug ? slugify(title) : prev.slug,
      seoTitle: prev.seoTitle || title,
    }));
  };

  const handleContentChange = useCallback((html: string) => {
    setForm((prev) => ({ ...prev, content: html }));
  }, []);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tagToRemove) }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    setError(null);

    if (!form.title.trim()) {
      setError('Başlık boş bırakılamaz.');
      return;
    }
    if (!form.content.trim() || form.content === '<p></p>') {
      setError('İçerik boş bırakılamaz.');
      return;
    }
    if (!form.slug.trim()) {
      setError('URL slug boş bırakılamaz.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({ ...form, status });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kaydetme başarısız oldu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <Link href="/admin/posts" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: 'hsl(var(--text-secondary))', textDecoration: 'none', fontSize: '0.9rem',
        }}>
          <ArrowLeft size={16} /> Yazılara Dön
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.25rem', borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white', fontSize: '0.9rem', fontWeight: 500, cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Taslak Kaydet
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.25rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, hsl(var(--accent-primary)), hsl(var(--accent-secondary)))',
              border: 'none', color: 'white', fontSize: '0.9rem', fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Yayınla
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '0.875rem 1rem', marginBottom: '1.5rem',
          background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px', color: '#ef4444', fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Title */}
        <div>
          <label style={labelStyle}>Başlık *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Instagram Algoritması 2026: Keşfet'te Görünmenin 7 Kuralı"
            style={{ ...inputStyle, fontSize: '1.25rem', fontWeight: 600 }}
          />
        </div>

        {/* Slug */}
        <div>
          <label style={labelStyle}>URL Slug</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
              placeholder="instagram-algoritmasi-2026"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Özet / Meta Description ({form.excerpt.length}/160 karakter)</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value, seoDescription: prev.seoDescription || e.target.value }))}
            placeholder="Bu yazıda Instagram algoritmasının 2026'daki güncel kurallarını ve Keşfet sayfasına düşme stratejilerini inceliyoruz."
            maxLength={300}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label style={labelStyle}>Kapak Görseli URL (opsiyonel)</label>
          <input
            type="url"
            value={form.coverImageUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, coverImageUrl: e.target.value }))}
            placeholder="https://images.unsplash.com/..."
            style={inputStyle}
          />
          {form.coverImageUrl && (
            <div style={{ marginTop: '0.75rem', borderRadius: '10px', overflow: 'hidden', maxHeight: '200px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.coverImageUrl} alt="Kapak önizleme" style={{ width: '100%', objectFit: 'cover', maxHeight: '200px' }} />
            </div>
          )}
        </div>

        {/* Category & Tags */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              style={{ ...inputStyle, appearance: 'auto' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} style={{ background: '#1a1a2e', color: 'white' }}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Etiketler</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Etiket ekle..."
                style={{ ...inputStyle, flex: 1 }}
              />
              <button type="button" onClick={addTag} style={{
                padding: '0.5rem 1rem', borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.3)',
                color: 'white', cursor: 'pointer', fontSize: '0.85rem',
              }}>+</button>
            </div>
            {form.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                {form.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem',
                    background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)',
                    color: 'hsl(var(--accent-secondary))', cursor: 'pointer',
                  }} onClick={() => removeTag(tag)}>
                    {tag} ×
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ ...labelStyle, margin: 0 }}>İçerik *</label>
            <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.8rem' }}>
              {wordCount} kelime · ~{readingTime} dk okuma
            </span>
          </div>
          <RichTextEditor content={form.content} onChange={handleContentChange} />
        </div>

        {/* SEO Section */}
        <details style={{
          padding: '1.25rem', borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <summary style={{ color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>
            🔍 SEO Ayarları (opsiyonel)
          </summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={labelStyle}>SEO Başlığı</label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                placeholder={form.title || 'Boş bırakılırsa yazı başlığı kullanılır'}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>SEO Açıklaması</label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                placeholder={form.excerpt || 'Boş bırakılırsa özet kullanılır'}
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

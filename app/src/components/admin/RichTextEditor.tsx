'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Minus, Image as ImageIcon,
  Link as LinkIcon, Heading1, Heading2, Heading3, Undo, Redo, Code,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const btnStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.4rem',
  background: isActive ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.05)',
  border: isActive ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '6px',
  color: isActive ? 'white' : 'hsl(var(--text-secondary))',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s',
});

const separatorStyle: React.CSSProperties = {
  width: '1px',
  height: '24px',
  background: 'rgba(255, 255, 255, 0.08)',
  margin: '0 0.25rem',
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder || 'Yazınızı buraya yazın...' }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'min-height: 400px; outline: none; padding: 1.5rem; color: white; font-size: 1rem; line-height: 1.8;',
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Görsel URL\'si girin:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Bağlantı URL\'si girin:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.02)',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        padding: '0.75rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={btnStyle(editor.isActive('heading', { level: 1 }))} title="Başlık 1"><Heading1 size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btnStyle(editor.isActive('heading', { level: 2 }))} title="Başlık 2"><Heading2 size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={btnStyle(editor.isActive('heading', { level: 3 }))} title="Başlık 3"><Heading3 size={16} /></button>
        
        <div style={separatorStyle} />
        
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive('bold'))} title="Kalın"><Bold size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive('italic'))} title="İtalik"><Italic size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive('underline'))} title="Altı çizili"><UnderlineIcon size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={btnStyle(editor.isActive('strike'))} title="Üstü çizili"><Strikethrough size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} style={btnStyle(editor.isActive('code'))} title="Kod"><Code size={16} /></button>
        
        <div style={separatorStyle} />
        
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive('bulletList'))} title="Madde listesi"><List size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive('orderedList'))} title="Numaralı liste"><ListOrdered size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive('blockquote'))} title="Alıntı"><Quote size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} style={btnStyle(false)} title="Yatay çizgi"><Minus size={16} /></button>
        
        <div style={separatorStyle} />
        
        <button type="button" onClick={addLink} style={btnStyle(editor.isActive('link'))} title="Bağlantı"><LinkIcon size={16} /></button>
        <button type="button" onClick={addImage} style={btnStyle(false)} title="Görsel"><ImageIcon size={16} /></button>
        
        <div style={separatorStyle} />
        
        <button type="button" onClick={() => editor.chain().focus().undo().run()} style={btnStyle(false)} title="Geri al"><Undo size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} style={btnStyle(false)} title="Yinele"><Redo size={16} /></button>
      </div>

      {/* Editor Content */}
      <div className="tiptap-editor-wrapper">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .tiptap-editor-wrapper .ProseMirror {
          min-height: 400px;
          outline: none;
          padding: 1.5rem;
          color: white;
          font-size: 1rem;
          line-height: 1.8;
        }
        .tiptap-editor-wrapper .ProseMirror h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: white; }
        .tiptap-editor-wrapper .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: white; }
        .tiptap-editor-wrapper .ProseMirror h3 { font-size: 1.2rem; font-weight: 600; margin: 1rem 0 0.5rem; color: white; }
        .tiptap-editor-wrapper .ProseMirror p { margin: 0.75rem 0; color: rgba(255,255,255,0.85); }
        .tiptap-editor-wrapper .ProseMirror ul, .tiptap-editor-wrapper .ProseMirror ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap-editor-wrapper .ProseMirror li { margin: 0.25rem 0; }
        .tiptap-editor-wrapper .ProseMirror blockquote { border-left: 3px solid rgba(168, 85, 247, 0.5); padding-left: 1rem; margin: 1rem 0; font-style: italic; color: rgba(255,255,255,0.7); }
        .tiptap-editor-wrapper .ProseMirror a { color: hsl(var(--accent-secondary)); text-decoration: underline; }
        .tiptap-editor-wrapper .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
        .tiptap-editor-wrapper .ProseMirror code { background: rgba(168, 85, 247, 0.15); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
        .tiptap-editor-wrapper .ProseMirror hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1.5rem 0; }
        .tiptap-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}

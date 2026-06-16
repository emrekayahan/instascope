import type { Metadata } from 'next';
import HashtagClient from './hashtag-client';

export const metadata: Metadata = {
  title: 'Instagram Hashtag Önerici & Analizi | Instascope',
  description: 'İçerik kategorinize göre en popüler, etkileşimi yüksek ve spam filtresine takılmayan hashtag kombinasyonlarını ücretsiz keşfedin.',
  alternates: {
    canonical: '/araclar/hashtag-onerici',
  }
};

export default function HashtagOnerici() {
  return <HashtagClient />;
}

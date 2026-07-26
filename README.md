# 🚀 Instascope Web Application

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?style=for-the-badge&logo=nginx)](https://nginx.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Tunnel-F38020?style=for-the-badge&logo=cloudflare)](https://www.cloudflare.com/)

**Instascope** ([https://instascope.com.tr](https://instascope.com.tr)), Instagram içerik üreticileri, dijital pazarlamacılar ve bireysel kullanıcılar için geliştirilmiş yüksek performanslı, SEO odaklı ve modern bir sosyal medya analiz & büyüme platformudur.

Bu depo (repository), uygulamanın Next.js frontend kaynak kodlarını, Firebase Firestore entegrasyonunu, Nginx ters vekil (reverse proxy) yapılandırmalarını ve Docker Compose / Cloudflare Tunnel üretim ortamı dağıtım mimarisini içerir.

---

## 📌 İçindekiler
- [✨ Öne Çıkan Özellikler ve Ücretsiz Araçlar](#-öne-çıkan-özellikler-ve-ücretsiz-araçlar)
- [🏗️ Sistem Mimarisi](#️-sistem-mimarisi)
- [🛠️ Teknoloji Yığını](#️-teknoloji-yığını)
- [📁 Proje Dizin Yapısı](#-proje-dizin-yapısı)
- [🔑 Ortam Değişkenleri ve Gizli Veri Güvenliği](#-ortam-değişkenleri-ve-gizli-veri-güvenliği)
- [🚀 Kurulum ve Dağıtım Rehberi](#-kurulum-ve-dağıtım-rehberi)
- [🛡️ Güvenlik, Nginx ve SSL Yapılandırması](#️-güvenlik-nginx-ve-ssl-yapılandırması)
- [📈 SEO, Google AdSense & Performance İyileştirmeleri](#-seo-google-adsense--performance-iyileştirmeleri)
- [🔒 Veri Koruma ve Gizlilik İlkesi](#-veri-koruma-ve-gizlilik-ilkesi)

---

## ✨ Öne Çıkan Özellikler ve Ücretsiz Araçlar

Instascope, kullanıcılarına üyelik gerektirmeden hızlı ve hassas analiz imkanı sunan ücretsiz araçlar ve zengin bir rehber kütüphanesi sağlar:

1. **📊 Instagram Etkileşim Oranı Hesaplayıcı (`/araclar/etkilesim-hesaplayici`)**
   - Takipçi, ortalama beğeni ve yorum verilerine dayalı etkileşim oranı (Engagement Rate) analizi.
   - Sektörel kıyaslama göstergeleri ve hesap sağlık skoru değerlendirmesi.

2. **⏰ En İyi Paylaşım Saati Önerici (`/araclar/en-iyi-paylasim-saati`)**
   - Hedef kitle davranışına ve sektör kategorisine göre gün bazında en yüksek etkileşim getiren saat aralıkları önerisi.

3. **🏷️ Instagram Hashtag Önerici (`/araclar/hashtag-onerici`)**
   - İçerik nişine göre Keşfet algoritmasını hedefleyen yüksek etkileşimli ve dengeli hashtag kombinasyonları üretimi.

4. **🏥 Profil Sağlık Skoru (`/araclar/profil-sagligi`)**
   - Profil biyografisi, görsel estetik, paylaşım sıklığı ve etkileşim dengesini değerlendiren bütünleşik profil analizi.

5. **🎭 Instagram Kişilik Testi / Tipim (`/araclar/instagram-tipim`)**
   - Kullanıcıların içerik üretme ve platform kullanım alışkanlıklarını tespit eden eğlenceli ve paylaşılabilir quiz deneyimi.

6. **📜 Geçmiş Analizlerim (`/gecmis-analizlerim`)**
   - Kullanıcının tarayıcı yerel hafızasında (`LocalStorage`) gizliliğe uygun saklanan geçmiş analiz raporları.

7. **📚 Blog ve Rehber Kütüphanesi (`/blog`, `/blog/[slug]`)**
   - Firebase Firestore (`instascope` veritabanı) ile entegre, sürekli güncellenen Instagram büyüme, algoritma ve güvenlik makaleleri.

---

## 🏗️ Sistem Mimarisi

Uygulama, sunucuda dışa açık direkt port bırakmadan (Zero-Trust Model) Cloudflare Tunnel ve Nginx reverse proxy arkasında Docker konteynerleri olarak çalışır:

```mermaid
graph TD
    User([🌍 Web İstemcileri / Kullanıcılar]) -->|HTTPS (TLS 1.3)| CF[Cloudflare Edge Network]
    CF -->|Güvenli Tünel (Outbound Only)| CFT[Cloudflare Tunnel Container]
    CFT -->|HTTP Network Bridge| Nginx[Nginx Reverse Proxy Container]
    Nginx -->|HTTP:3000| NextApp[Next.js App Container]
    NextApp -->|REST Firestore Lite| FB[(Firebase Firestore 'instascope' DB)]
```

### Konteyner Rolleri:
- **`app`**: Next.js 15 App Router tabanlı üretim derlemesi (Node.js Alpine ortamı).
- **`nginx`**: Statik varlık önbellekleme (Asset Caching), `ads.txt` yönlendirmesi ve CSP / HSTS güvenlik başlıkları yönetimi.
- **`cloudflared`**: Güvenlik duvarına port açma zorunluluğunu ortadan kaldıran dışa doğru (outbound) güvenli Cloudflare tüneli.

---

## 🛠️ Teknoloji Yığını

- **Frontend & SSR Framework**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Stil & Tasarım**: [Tailwind CSS 3.4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Veritabanı & Backend**: [Firebase Firestore Lite](https://firebase.google.com/docs/firestore/lite) (`instascope` özel veritabanı id)
- **Ters Vekil Sunucu**: [Nginx (Alpine)](https://nginx.org/)
- **Ağ & Tünel**: [Cloudflare Tunnel / Zero Trust](https://www.cloudflare.com/products/tunnel/)
- **Konteynerleştirme**: Docker & Docker Compose
- **Analiz & SEO**: Google Analytics 4 (GA4), Google Tag Manager (GTM), Schema.org JSON-LD

---

## 📁 Proje Dizin Yapısı

```text
instascope/
├── app/                                  # Next.js Uygulama Kaynak Kodları
│   ├── src/
│   │   ├── app/                          # App Router Sayfa ve Route Tanımları
│   │   │   ├── araclar/                  # Analiz Araçları (Etkileşim, Saat, Hashtag, Profil vb.)
│   │   │   ├── blog/                     # Blog Akışı ve Dinamik Detay Sayfaları
│   │   │   ├── gecmis-analizlerim/       # Kullanıcı Geçmiş Analiz Raporları
│   │   │   ├── layout.tsx                # Kök Layout, Meta Etiketleri ve Fontlar
│   │   │   └── page.tsx                  # Ana Sayfa Component'i
│   │   ├── lib/                          # Firebase SDK ve Yardımcı Kütüphaneler
│   │   │   └── firebase.ts               # Firestore Lite Entegrasyonu
│   │   └── types/                        # TypeScript Tip Tanımlamaları
│   ├── public/                           # Statik Varlıklar (Görseller, Favicon, ads.txt)
│   ├── Dockerfile                        # Multi-stage Üretim Derleme Dosyası
│   ├── package.json                      # Bağımlılıklar ve Komutlar
│   └── tsconfig.json                     # TypeScript Yapılandırması
├── nginx/
│   └── nginx.conf                        # Nginx Reverse Proxy, Önbellek ve CSP Başlıkları
├── cloudflared/                          # Cloudflare Tünel Yapılandırması
├── docker-compose.yml                    # Konteyner Orkestrasyonu
├── firestore.rules                       # Firestore Veritabanı Güvenlik Kuralları
├── firebase.json                         # Firebase Proje Yapılandırması
├── .env.example                          # Root Ortam Değişkenleri Şablonu
├── .gitignore                            # Git Tarafından Yoksayılacak Gizli Dosya/Dizin Listesi
└── README.md                             # Proje Dokümantasyonu
```

---

## 🔑 Ortam Değişkenleri ve Gizli Veri Güvenliği

> [!CAUTION]
> **GİZLİ VERİ UYARISI:** Gerçek API anahtarları, Cloudflare tünel token'ları ve Firebase gizli anahtarları **KESİNLİKLE** Git deposuna eklenmemelidir. Bu veriler `.gitignore` ile korunmaktadır.

### 1. Kök Ortam Değişkenleri (`.env`)
Sunucu kök dizininde `.env` dosyası oluşturun (`.env.example` dosyasını referans alın):

```env
# Uygulama Modu
NODE_ENV=production

# Alan Adı URL
NEXT_PUBLIC_APP_URL=https://instascope.com.tr

# Cloudflare Tunnel Kimlik Doğrulama Token'ı
CLOUDFLARE_TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
```

### 2. Uygulama Ortam Değişkenleri (`docker-compose.yml` / `.env`)
Next.js tarafında kullanılan istemci tarafı yapılandırmaları (`NEXT_PUBLIC_` önekiyle) `docker-compose.yml` içinde tanımlanır:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_APP_URL=https://instascope.com.tr
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID=instascope-aba22
  - NEXT_PUBLIC_SHOW_ADS=false
  - NEXT_PUBLIC_GA_ID=G-D8MPJ29K22
```

---

## 🚀 Kurulum ve Dağıtım Rehberi

### Ön Gereksinimler
- Sunucuda **Docker** (v20.10+) ve **Docker Compose** (v2.0+) yüklü olmalıdır.
- Git kurulu ve konfigüre edilmiş olmalıdır.

### 1. Depoyu Klonlama ve Hazırlık
```bash
git clone https://github.com/emrekayahan/instascope.git
cd instascope
```

### 2. Ortam Dosyasını Yapılandırma
```bash
cp .env.example .env
# .env dosyasını düzenleyerek CLOUDFLARE_TUNNEL_TOKEN değerinizi girin
nano .env
```

### 3. Docker Servislerini Başlatma
Konteynerleri arka planda derleyip çalıştırmak için:

```bash
docker compose up -d --build
```

### 4. Konteyner Durumunu Kontrol Etme
```bash
docker compose ps
```

Logları canlı olarak izlemek için:
```bash
docker compose logs -f
```

---

## 🛡️ Güvenlik, Nginx ve SSL Yapılandırması

Instascope, uçtan uca güvenlik ilkeleri dikkate alınarak tasarlanmıştır:

1. **Port İzolasyonu**: Sunucuda `80` veya `443` portları dış internete açılmaz. Gelen trafik tamamen Cloudflare Tüneli üzerinden Nginx'e yönlendirilir.
2. **HTTP Güvenlik Başlıkları (Nginx)**:
   - `Content-Security-Policy` (CSP): Komut dosyası ve kaynak yüklemelerini güvenli alan adlarıyla sınırlar.
   - `X-Frame-Options: SAMEORIGIN`: Clickjacking saldırılarına karşı koruma sağlar.
   - `X-Content-Type-Options: nosniff`: MIME türü karıştırma saldırılarını engeller.
   - `Referrer-Policy: no-referrer-when-downgrade`
3. **Firestore Güvenlik Kuralları (`firestore.rules`)**:
   - `published_content` koleksiyonu halka açık okunabilir (`allow read: if true`).
   - Veritabanına yazma işlemleri sadece yetkili kullanıcı oturumlarıyla kısıtlıdır.

---

## 📈 SEO, Google AdSense & Performance İyileştirmeleri

- **PageSpeed Performansı (90+)**: Görseller ve fontlar `swap` stratejisi ve preconnect bağlantıları ile yüklenir.
- **Dynamic GTM / GA4**: Sayfa yükleme hızını olumsuz etkilemeyen asenkron analitik takibi.
- **Google AdSense Entegrasyonu**: Nginx katmanında dinamik `/ads.txt` yönlendirmesi ve reklam alanları için hazırlanan esnek altyapı.
- **Zengin Yapısal Veri (Schema.org)**: Tüm araçlar ve blog sayfaları için `WebApplication` ve `Article` JSON-LD şemaları.

---

## 🔒 Veri Koruma ve Gizlilik İlkesi

- Kod tabanına hiçbir özel anahtar (private key), SSH anahtarı, veritabanı şifresi veya sunucu token'ı eklenmez.
- Git commit geçmişi düzenli olarak güvenlik taramasından geçirilir.
- `.env`, `node_modules`, `.next` ve log dosyaları Git takibinden muaf tutulur.

---

## 👨‍💻 Yazar & Lisans

- **Geliştirici / Sahip**: Emre Kayahan
- **Canlı Web Sitesi**: [https://instascope.com.tr](https://instascope.com.tr)
- **GitHub Deposu**: [https://github.com/emrekayahan/instascope](https://github.com/emrekayahan/instascope)

© 2026 Instascope. Tüm hakları saklıdır.

# Instascope.com.tr — AdSense Onayı, Admin Panel ve Trafik/Tasarım Geliştirme Planı

> Bu doküman, agentic bir kodlama aracına (ör. Antigravity IDE) doğrudan verilip adım adım uygulatılmak üzere hazırlanmıştır. Proje: Next.js 15 (App Router), React 19, Tailwind CSS 3.4, Firebase Firestore Lite, Docker + Nginx + Cloudflare Tunnel. Repo: `github.com/emrekayahan/instascope`.

**Hedef:** (1) AdSense'in verdiği "Düşük değere sahip içerik" reddini kalıcı olarak gidermek, (2) IDE'ye gerek kalmadan yazı/blog içeriği eklenip anında canlıya yansıyan bir admin panel kurmak, (3) organik trafik ve gelir potansiyelini artıracak tasarım/SEO iyileştirmelerini uygulamak.

Görevleri aşağıdaki sırayla uygula. Her fazın sonunda `docker compose up -d --build` ile deploy edilebilir olmalı; hiçbir adım production'ı bozmamalı.

---

## 0. Kök Neden Analizi — Neden "Low Value Content" Aldınız

Google'ın "Düşük değere sahip içerik" reddinin tipik sebepleri ve bu proje için geçerli olanlar:

1. **Yetersiz özgün metin içeriği.** Site ağırlıklı olarak hesaplayıcı/quiz gibi *araçlardan* (`/araclar/*`) oluşuyor. Bu araçlar kullanışlı olsa da Google bunları "yardımcı program" olarak görür, editoryal/özgün metin saymaz. Blog bölümü (`/blog`) reddi gidermek için kritik ama muhtemelen yazı sayısı/uzunluğu yetersiz.
2. **Zorunlu sayfaların eksikliği veya zayıflığı:** Hakkımızda, İletişim, Gizlilik Politikası / KVKK, Kullanım Şartları sayfaları AdSense incelemesinde aranır. Bunlar yoksa ya da şablon/otomatik görünüyorsa ret nedeni olur.
3. **Az sayıda/kısa blog yazısı.** Google'ın resmi bir "minimum yazı sayısı" kuralı yok ama pratikte 20-30 altı, 600-800 kelimenin altında yazılarla dolu siteler "thin content" sayılır.
4. **Tekilleştirilmemiş / şablona benzer içerik.** Firestore'dan çekilen yazılar hepsi aynı kalıpta, kısa, AI'ya has genel geçer cümlelerle yazılmışsa bu da düşük değer sinyali verir.
5. **Site erişilebilirlik/performans sorunları.** Not: Bu doküman hazırlanırken `instascope.com.tr` **530 (Cloudflare Tunnel hata)** döndürdü. Google botu inceleme sırasında siteye ulaşamazsa da "low value / crawl edilemiyor" görüntüsü verebilir. Bu, en acil ve ücretsiz çözülebilecek sorun — cloudflared container'ının ayakta ve sağlıklı olduğunu doğrulayın.
6. **`NEXT_PUBLIC_SHOW_ADS=false` olarak ayarlı.** Reklam gösterimi kapalıysa sorun değil (başvuru öncesi normaldir) ama onay sonrası bunu `true` yapmayı unutmayın.

**Sonuç:** Ret nedeni tek bir teknik hatadan değil, *içerik hacmi + editoryal derinlik + zorunlu sayfalar* eksikliğinden kaynaklanıyor. Aşağıdaki fazlar bunu kalıcı çözer.

---

## 1. FAZ 1 — Admin Panel (Kod Yazmadan Yazı Ekleme)

### 1.1 Mimari Kararı
- Blog içeriği zaten Firebase Firestore Lite (`instascope` DB, `published_content` koleksiyonu) üzerinden çekiliyor → bu doğru temel, değiştirmeye gerek yok.
- Admin panel **aynı Next.js uygulaması içinde** `/admin` route grubu olarak eklenecek (ayrı bir servis/CMS kurmaya gerek yok, altyapı karmaşıklığını artırmasın).
- Kimlik doğrulama: **Firebase Authentication (Email/Password)**, sadece önceden tanımlı admin e-postasına izin verilecek.
- Yazı yayınlama = Firestore'a doğrudan yazma. Next.js tarafında blog sayfaları zaten Firestore'dan okuduğu için **yeni deploy gerekmeden anında siteye yansır** (istenen davranış budur).
- emrekayahan@gmail.com adresini admin kullanıcı olarak tanımla
### 1.2 Yapılacak Dosya/Dizin Değişiklikleri

```
app/src/app/admin/
  layout.tsx              # Auth guard + admin nav
  page.tsx                # Dashboard (yazı listesi, istatistik)
  login/page.tsx          # Firebase Auth login formu
  posts/page.tsx          # Yazı listesi (yayınla/taslak/sil)
  posts/new/page.tsx      # Yeni yazı formu
  posts/[id]/edit/page.tsx# Yazı düzenleme formu

app/src/components/admin/
  RichTextEditor.tsx       # Tiptap tabanlı zengin metin editörü
  ImageUploader.tsx        # Firebase Storage'a görsel yükleme
  PostForm.tsx              # Ortak form (başlık, slug, özet, içerik, kapak görseli, kategori, etiketler, SEO meta)
  AuthGuard.tsx              # Oturum kontrolü + redirect

app/src/lib/
  firebaseAdmin.ts          # (opsiyonel) Firebase Admin SDK - server-side güvenli yazma için
  auth.ts                   # Auth helper fonksiyonları

app/src/app/api/admin/posts/route.ts        # POST: yeni yazı oluştur (server-side, Admin SDK ile)
app/src/app/api/admin/posts/[id]/route.ts   # PUT/DELETE: güncelle/sil
```

### 1.3 Firestore Şeması (`published_content`)

```ts
interface BlogPost {
  id: string;                 // slug ile aynı olabilir
  slug: string;                // URL için, örn: "instagram-etkilesim-artirma-2026"
  title: string;
  excerpt: string;             // 120-160 karakter, meta description olarak da kullanılır
  content: string;             // HTML (Tiptap çıktısı)
  coverImageUrl: string;
  category: string;            // "algoritma", "büyüme", "güvenlik", "araçlar" vb.
  tags: string[];
  status: "draft" | "published";
  authorName: string;
  authorId: string;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  readingTimeMinutes: number;  // otomatik hesaplanır (kelime sayısı / 200)
  seoTitle?: string;
  seoDescription?: string;
  viewCount: number;           // opsiyonel, popüler yazılar için
}
```

### 1.4 Güvenlik — `firestore.rules` Güncellemesi

Şu an kural muhtemelen herkese okuma izni veriyor ama yazma "yetkili kullanıcı" ile sınırlı. Bunu netleştir:

```
match /published_content/{postId} {
  allow read: if resource.data.status == "published" || request.auth != null;
  allow write: if request.auth != null && request.auth.token.email == "ADMIN_EMAIL_BURAYA";
}
```

> **Önemli:** İstemci tarafından (browser) doğrudan Firestore'a admin yazması yerine, yukarıdaki `/api/admin/posts` route'larını **Firebase Admin SDK** ile server-side yazacak şekilde kur. Böylece Firestore güvenlik kuralları daha sıkı tutulabilir ve admin şifresi/servis anahtarı istemciye hiç gitmez. Admin SDK servis hesabı anahtarını `.env` içine `FIREBASE_SERVICE_ACCOUNT_KEY` olarak ekle, **asla** repoya commit etme (zaten `.gitignore` bunu kapsıyor, koru).

### 1.5 Editör Deneyimi
- Tiptap (veya react-quill) ile: başlık/alt başlık, kalın/italik, liste, link, görsel ekleme, alıntı bloğu.
- Otomatik slug üretimi (Türkçe karakter dönüşümlü: ş→s, ğ→g, ı→i, ç→c, ö→o, ü→u).
- "Taslak olarak kaydet" ve "Yayınla" iki ayrı buton.
- Kapak görseli: Firebase Storage'a yükleme, otomatik WebP'ye çevirme (Next.js `<Image>` zaten optimize eder, yine de kaynak formatı WebP/AVIF tercih et).
- Yayınla butonuna basınca: Firestore'a yaz + Next.js **ISR revalidate** tetikle (`/api/revalidate?path=/blog/[slug]` gibi bir route ile `revalidatePath()` çağır) → önbellek varsa anında güncel içerik görünsün.

### 1.6 Giriş Sayfası Basit Kalsın
Kayıt (sign-up) formu **olmasın** — sadece login. Admin kullanıcı Firebase Console'dan elle oluşturulur (tek kişilik kullanım için yeterli ve güvenli).

---

## 2. FAZ 2 — İçerik Stratejisi (AdSense'in Asıl İstediği Şey)

Admin panel hazır olur olmaz aşağıdaki içerik üretim planını uygula. Bu faz, reddi giderecek **en kritik** faz.

### 2.1 Minimum İçerik Hedefi
- **En az 25-30 blog yazısı**, her biri **en az 1000-1500 kelime**, tamamen özgün (kopya/spin değil).
- Her yazı: giriş, en az 3-4 alt başlık (H2/H3), örnekler, sonuç bölümü, ilgili araca (`/araclar/...`) doğal iç link.
- Görsel: her yazıda en az 1 özgün/telifsiz kapak görseli (Unsplash/Pexels lisanslı veya kendi üretiminiz).

### 2.2 Örnek Konu Başlıkları (Instagram/sosyal medya niş)
- "Instagram Algoritması 2026: Keşfet'te Görünmenin 7 Kuralı"
- "Etkileşim Oranı Nedir, Nasıl Hesaplanır? (Örneklerle)"
- "Instagram Shadowban Nedir, Nasıl Anlaşılır ve Çözülür?"
- "Reels vs Gönderi: Hangisi Daha Fazla Erişim Sağlıyor?"
- "Küçük İşletmeler için Instagram Büyüme Rehberi"
- "Hashtag Stratejisi: Kaç Hashtag Kullanmalısınız?"
- "Instagram Bio Nasıl Yazılır? 15 Örnek"
- "Sahte Takipçi Tespiti: Profilinizi Nasıl Analiz Edersiniz"
- Her `/araclar/*` sayfası için o aracı derinlemesine anlatan destekleyici bir "nasıl kullanılır + strateji" yazısı.

### 2.3 Editoryal Kalite Kontrol Listesi (her yazı için)
- [ ] Başlık merak uyandırıcı ama tıklama tuzağı değil
- [ ] Meta description (excerpt) 120-160 karakter
- [ ] En az 1 iç link (başka blog yazısına veya araca)
- [ ] Yazar adı ve yayın tarihi görünür
- [ ] Okuma süresi gösterimi
- [ ] Mobilde okunabilir paragraf uzunluğu (3-4 cümle/paragraf)

### 2.4 Zorunlu Statik Sayfalar (yoksa MUTLAKA eklenmeli)
```
app/src/app/hakkimizda/page.tsx    # Site kimliği, misyon, ekip/kişi bilgisi
app/src/app/iletisim/page.tsx      # İletişim formu + e-posta
app/src/app/gizlilik-politikasi/page.tsx   # KVKK + çerez politikası, AdSense/GA veri kullanımı açıklaması
app/src/app/kullanim-sartlari/page.tsx
```
Bu sayfalar AdSense inceleme sürecinde manuel olarak kontrol edilir; eksikse veya "Lorem ipsum" düzeyinde zayıfsa tek başına reddin sebebi olabilir. Gizlilik Politikası'nda Google AdSense ve üçüncü taraf çerez kullanımından **açıkça** bahsedilmeli (Google'ın örnek politikasına uygun).

---

## 3. FAZ 3 — Trafik ve Tasarım İyileştirmeleri

### 3.1 SEO Teknik İyileştirmeler
- `app/src/app/sitemap.ts` — Next.js 15 native sitemap generator ile dinamik sitemap (tüm blog yazıları + araçlar + statik sayfalar dahil), Firestore'dan `getServerSideProps` yerine `generateSitemaps`/`sitemap()` fonksiyonu kullan.
- `app/src/app/robots.ts` — `/admin` dizinini **disallow** et (arama motorları admin paneli indexlemesin).
- Her blog yazısı için `Article` JSON-LD şeması (README'de zaten planlanmış, eksikse tamamla) + `BreadcrumbList` şeması.
- `next/image` ile tüm görsellerde `alt` metni zorunlu kıl (SEO + erişilebilirlik).
- Canonical URL etiketleri her sayfada.

### 3.2 Navigasyon ve Kullanıcı Deneyimi
- Blog listesinde **kategori filtresi** ve **arama kutusu** ekle.
- Her yazının altına "İlgili Yazılar" (aynı kategori, son 3 yazı) bloğu — dwell time ve sayfa/oturum oranını artırır (AdSense için de olumlu sinyal).
- "Popüler Yazılar" widget'ı ana sayfada.
- Breadcrumb navigasyonu (Ana Sayfa > Blog > Yazı Başlığı).
- Newsletter/e-posta bülteni kayıt formu (Firestore'a e-posta kaydı, basit) — tekrar eden ziyaretçi tabanı oluşturur.
- Sosyal paylaşım butonları (WhatsApp, X, LinkedIn) blog yazılarında — Türkiye trafiğinde WhatsApp paylaşımı özellikle etkili.

### 3.3 Performans (Core Web Vitals — hem SEO hem AdSense onay sürecinde bakılır)
- `next/font` ile font `swap` stratejisi (README'de var, koru).
- Görselleri `next/image` ile `priority` sadece above-the-fold görsellerde kullan.
- Firestore sorgularını sayfa başına limitli çek (`limit(10)` + "Daha Fazla Yükle" butonu / pagination) — tüm blog koleksiyonunu tek seferde çekme.
- Nginx katmanında statik varlıklar için `Cache-Control` başlıklarını doğrula (README'de mevcut, kontrol et).

### 3.4 Marka Güveni Sinyalleri
- Yazar profili sayfası (kısa bio + varsa sosyal medya linkleri) — E-E-A-T (deneyim/uzmanlık/otorite/güven) sinyali için önemli, Google'ın kalite değerlendirmesinde dikkate alınır.
- Ana sayfada kısa bir "Instascope Nedir" tanıtım bloğu + kaç kullanıcıya hizmet verildiği gibi somut/güncellenebilir istatistikler (varsa gerçek veriyle).

---

## 4. FAZ 4 — Site Erişilebilirliği (Acil, Ücretsiz)

Bu adımı en önce kontrol et:
1. `docker compose ps` ile `cloudflared`, `nginx`, `app` konteynerlerinin hepsinin `Up` durumda olduğunu doğrula.
2. `docker compose logs -f cloudflared` ile tünelin sağlıklı bağlandığını kontrol et (530 hatası genelde tünel origin'e ulaşamadığında görülür).
3. Google Search Console'a siteyi ekleyip **"URL Denetimi"** aracıyla Googlebot'un siteyi gerçekten çekebildiğini doğrula.
4. Search Console'da bir XML sitemap gönder ve indexleme durumunu izle.

---

## 5. FAZ 5 — AdSense'e Yeniden Başvuru Öncesi Kontrol Listesi

- [ ] Site 7/24 erişilebilir, 530/5xx hatası vermiyor
- [ ] En az 25-30 adet, ortalama 1000+ kelimelik özgün blog yazısı yayında
- [ ] Hakkımızda, İletişim, Gizlilik Politikası, Kullanım Şartları sayfaları eksiksiz
- [ ] Gizlilik Politikası'nda çerez/reklam/analitik veri kullanımı açıkça belirtilmiş
- [ ] `ads.txt` doğru ve erişilebilir (`instascope.com.tr/ads.txt`)
- [ ] Site Google Search Console'a eklenmiş, sitemap gönderilmiş, index hatası yok
- [ ] Mobil uyumluluk ve PageSpeed skoru 80+ (README'de 90+ hedefi var, koru)
- [ ] Site en az 2-4 hafta boyunca düzenli yeni içerik yayınlıyor (Google "yeni siteler" için genelde bir olgunlaşma süresi bekler)
- [ ] Reklam yerleşimi için içerik/reklam oranı dengeli planlanmış (henüz reklam aktif değilse sorun değil)

> Not: AdSense onayı garantili değildir ve Google süreci elle + otomatik sistemlerle değerlendirir; yukarıdaki adımlar reddin belirtilen teknik/editoryal sebeplerini tam olarak karşılar ancak nihai kararı Google verir.

---

## 6. Uygulama Sırası Özeti (Antigravity IDE için Görev Listesi)

1. Cloudflare Tunnel / Nginx / erişilebilirlik sorununu doğrula ve düzelt (Faz 4).
2. Firebase Authentication kurulumu + admin kullanıcı oluşturma.
3. `/admin` route grubu, `AuthGuard`, login sayfası.
4. `PostForm`, `RichTextEditor`, `ImageUploader` bileşenleri.
5. `/api/admin/posts` server route'ları (Admin SDK ile Firestore yazma) + `firestore.rules` güncellemesi.
6. ISR revalidate entegrasyonu (yayınla → anında güncel içerik).
7. Zorunlu statik sayfalar: Hakkımızda, İletişim, Gizlilik Politikası, Kullanım Şartları.
8. `sitemap.ts`, `robots.ts`, JSON-LD şema kontrolü/tamamlanması.
9. Blog listesi UX: kategori filtre, arama, ilgili yazılar, breadcrumb, paylaşım butonları.
10. Admin panel üzerinden 25-30 özgün blog yazısının kademeli olarak girilmesi (bu kısım içerik üretimidir, otomasyonla değil editoryal emekle yapılmalı).
11. Google Search Console kurulumu, sitemap gönderimi, indexleme takibi.
12. 2-4 haftalık düzenli yayın sonrası AdSense'e yeniden başvuru.
13. Onay sonrası `NEXT_PUBLIC_SHOW_ADS=true` yapıp reklam birimlerini yerleştir.

---

*Bu doküman, mevcut repo yapısı (README.md üzerinden incelenen mimari) baz alınarak hazırlanmıştır. Antigravity IDE bu dosyayı okuyup görevleri sırayla, her adımdan sonra build/test doğrulaması yaparak uygulamalıdır.*

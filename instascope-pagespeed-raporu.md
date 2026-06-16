# Instascope.com.tr — PageSpeed Insights Analiz Raporu ve Düzeltme Görevleri

**Kaynak:** Google PageSpeed Insights (Lighthouse 13.4.0), 17 Haziran 2026, 00:55 GMT+3
**Test edilen URL:** https://instascope.com.tr/
**Hazırlayan:** Claude (Anthropic)
**İletişim:** demadatr@gmail.com

Bu doküman, PageSpeed Insights'tan alınan gerçek mobil ve masaüstü raporlarının birleştirilmiş analizidir. Her görev **Sorun → Kanıt (rapordan) → Neden önemli → Yapılacak iş → Kabul kriteri** formatındadır.

---

## Genel Skor Özeti

| Kategori | Mobil | Masaüstü |
|---|---|---|
| Performans | **63** | **99** |
| Erişilebilirlik | 89 | 89 |
| En İyi Uygulamalar | 100 | 100 |
| SEO | 100 | 100 |
| Ajan Tabanlı Tarama | 1/2 | 1/2 |

**Önemli not:** Masaüstünde performans neredeyse mükemmel (99) ama mobilde 63'e düşüyor. Bu büyük fark, sitenin kendi kodundan değil, **mobil/yavaş ağda Google Fonts ve render-blocking kaynakların orantısız büyümesinden** kaynaklanıyor (mobilde LCP 6,3 sn / masaüstünde 0,7 sn). Yani aşağıdaki Görev 1 ve 2 tek başına mobil skoru büyük ölçüde düzeltecektir.

AdSense bağlamında: Erişilebilirlik (89) ve Performans (mobil 63) iyileştirilebilir alanlar, ancak En İyi Uygulamalar ve SEO'nun 100 olması güçlü bir sinyal — bu ikisi zaten önceki görevlerde (meta-description, schema.org, sahte kurumsal bilgi temizliği) yapılan düzeltmelerin karşılığı.

---

## ÖNCELİK 0 — Mobil Performansı Doğrudan Etkileyen Kritik Sorunlar

### 0.1 Google Fonts'u `next/font` ile değiştir (render-blocking + LCP gecikmesi)

**Kanıt (rapordan):**
- Mobil "Oluşturma engelleme istekleri" (render-blocking): `fonts.googleapis.com/css2?family=...` → **780 ms gecikme**, tahmini tasarruf **1.050 ms**.
- Masaüstünde aynı kaynak 200 ms gecikme yaratıyor, tahmini tasarruf 500 ms.
- "Ağ bağımlılık ağacı" zincirinde görülüyor: CSS dosyası → Google Fonts CSS → 4 ayrı `.woff2` dosyası (`fonts.gstatic.com`) sırayla indiriliyor, mobilde her biri ~900 ms'de tamamlanıyor; bu zincir LCP'nin **2.401 ms** gecikmesinin büyük kısmını oluşturuyor.
- CLS dökümünde de bu 4 font dosyası "Web yazı tipi" olarak düzen kaymasına katkıda gösteriliyor.

**Neden önemli:** `globals.css` içindeki `@import url('https://fonts.googleapis.com/...')` yöntemi, tarayıcının önce ana CSS'i indirmesini, sonra Google'a yeni bir bağlantı açıp font CSS'ini indirmesini, sonra oradan da gerçek `.woff2` dosyalarını indirmesini gerektiren 3 adımlı bir zincir oluşturuyor. Bu, mobildeki LCP'nin (6,3 sn) ve FCP'nin (5,7 sn) en büyük sebebi.

**Yapılacak iş:**
1. `globals.css` içindeki `@import url('https://fonts.googleapis.com/css2?family=Outfit:...&family=Plus+Jakarta+Sans:...')` satırını tamamen kaldır.
2. Next.js'in yerleşik `next/font/google` modülünü kullan:
   ```tsx
   // src/app/layout.tsx içine
   import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

   const outfit = Outfit({
     subsets: ['latin'],
     weight: ['300','400','500','600','700','800'],
     variable: '--font-outfit',
     display: 'swap',
   });

   const plusJakarta = Plus_Jakarta_Sans({
     subsets: ['latin'],
     weight: ['300','400','500','600','700'],
     variable: '--font-plus-jakarta',
     display: 'swap',
   });
   ```
3. `<html>` veya `<body>` etiketine `className={`${outfit.variable} ${plusJakarta.variable}`}` ekle.
4. `globals.css` içindeki font-family tanımlarını CSS değişkenlerine (`var(--font-outfit)`, `var(--font-plus-jakarta)`) göre güncelle.
5. Bu değişiklik fontları build sırasında kendi sunucundan servis eder; harici `fonts.googleapis.com` ve `fonts.gstatic.com` isteklerini tamamen ortadan kaldırır.

**Kabul kriteri:** PageSpeed raporunda "Oluşturma engelleme istekleri" bölümünde Google Fonts kaynağı görünmüyor; mobil LCP süresi belirgin şekilde düşüyor (hedef: 6,3 sn → 3 sn altı).

---

### 0.2 Önemli kaynaklara `preconnect` ekle

**Kanıt (rapordan):** Her iki raporda da "Önceden bağlanmış kaynaklar: hiçbir kaynak önceden bağlanmadı" uyarısı var. "Önceden bağlanma adayları" listesinde:
- `https://instascope-aba22.firebaseapp.com` → tahmini LCP tasarrufu **310 ms**
- `https://www.googleapis.com` → tahmini LCP tasarrufu **300 ms**

**Neden önemli:** Tarayıcı bu harici domainlere ilk isteği yapana kadar DNS çözümleme + TCP + TLS el sıkışması için zaman harcıyor. `preconnect` ipucu bu süreci sayfa yüklenirken paralel başlatır.

**Yapılacak iş:**
1. `src/app/layout.tsx` içindeki `<head>` bölümüne ekle (Next.js'te `<link>` etiketleri doğrudan JSX içinde veya `metadata` üzerinden tanımlanabilir):
   ```tsx
   <link rel="preconnect" href="https://instascope-aba22.firebaseapp.com" />
   <link rel="preconnect" href="https://www.googleapis.com" />
   ```
2. Görev 0.1 uygulandıktan sonra Google Fonts kaynakları zaten kalkacağı için onlara preconnect eklemeye gerek kalmıyor.
3. Toplamda 4'ten az preconnect ipucu kullan (rapor da bunu özellikle belirtiyor — fazlası faydadan çok yük getirir).

**Kabul kriteri:** Rapor yeniden çalıştırıldığında "Önceden bağlanmış kaynaklar" bölümünde en az bu 2 domain listeleniyor.

---

### 0.3 Google Tag Manager'ı geciktir (defer/lazy-load)

**Kanıt (rapordan):**
- "Kullanılmayan JavaScript'i azaltın" → Google Tag Manager (`gtag/js?id=G-D8MPJ29K22`) **142,3 KiB** indiriyor, bunun **62,0-62,7 KiB'ı kullanılmıyor**.
- "3. taraflar" bölümünde GTM, mobilde 143 KiB / 64 ms ana iş parçacığı süresi, masaüstünde 143 KiB / 100 ms ana iş parçacığı süresi ile en ağır üçüncü taraf kaynak.
- "Uzun ana ileti dizisi görevlerinden kaçının" (masaüstü) listesinde GTM 788 ms'de başlayıp 60 ms sürüyor.

**Neden önemli:** GTM, sayfanın ilk render'ı için gerekli değil ama şu an kritik yolda yükleniyor ve ana iş parçacığını (main thread) bloke ediyor. Bu, hem LCP'ye hem TBT'ye olumsuz katkı yapıyor.

**Yapılacak iş:**
1. GTM script'ini Next.js'in `next/script` bileşeniyle `strategy="lazyOnload"` veya `strategy="afterInteractive"` ile yükle (şu an muhtemelen `beforeInteractive` veya doğrudan `<script>` ile senkron yükleniyor):
   ```tsx
   import Script from 'next/script';

   <Script
     src="https://www.googletagmanager.com/gtag/js?id=G-D8MPJ29K22"
     strategy="afterInteractive"
   />
   ```
2. Eğer mevcut kurulum zaten `next/script` kullanıyorsa, stratejiyi `lazyOnload` olarak değiştirmeyi dene — analytics için bu kabul edilebilir bir gecikmedir, kullanıcı deneyimini etkilemez.
3. Google Analytics (`google-analytics.com/g/collect`) zaten çok küçük (1 KiB), bu kaynak sorun değil.

**Kabul kriteri:** "Kullanılmayan JavaScript'i azaltın" bölümünde GTM kaynaklı tasarruf miktarı belirgin şekilde düşüyor; "Uzun ana ileti dizisi görevleri" listesinden GTM kalkıyor veya süresi kısalıyor.

---

### 0.4 Firebase Auth iframe'ini geciktir

**Kanıt (rapordan):**
- "Ağ bağımlılık ağacı" zincirinde `…auth/iframe.js(instascope-aba22.firebaseapp.com)` mobilde **2.087 ms**'de yükleniyor ve **90,49 KiB** boyutunda — bu zincirdeki en büyük tek kaynak.
- "Verimli önbellek sürelerini kullanın" bölümünde bu dosya 90 KiB ile listeleniyor (30 gün önbellek süresi zaten var, bu iyi, ama dosyanın kendisi hâlâ büyük).
- "3. taraflar" bölümünde firebaseapp.com toplamda 91 KiB / 29 ms ana iş parçacığı süresi tüketiyor.

**Neden önemli:** Bu iframe, "Google ile Giriş" özelliği için gerekli ama sayfa ilk yüklendiğinde kullanıcı henüz giriş butonuna tıklamamışken bile indiriliyor. Bu, LCP'ye gereksiz yük bindiriyor.

**Yapılacak iş:**
1. Firebase Auth SDK'sının başlatılmasını (`initializeApp`, `getAuth` çağrıları) sayfa yüklenir yüklenmez değil, kullanıcı "Giriş Yap" butonuna tıkladığı anda (lazy/dynamic import ile) tetikleyecek şekilde yeniden düzenle:
   ```tsx
   const handleLoginClick = async () => {
     const { getAuth, GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
     // ... giriş mantığı
   };
   ```
2. `src/lib/firebase.ts` içindeki başlatma kodunun sayfa yüklenirken otomatik çalışıp çalışmadığını kontrol et; eğer öyleyse bunu yukarıdaki gibi tetiklemeli (lazy) hale getir.
3. Zaten giriş yapmış kullanıcılar için oturum durumu kontrolü (`onAuthStateChanged`) gerekiyorsa, bu da `requestIdleCallback` veya sayfa yüklendikten sonra (`useEffect` ile, ilk render'ı bloklamadan) çalıştırılabilir.

**Kabul kriteri:** Sayfa ilk yüklendiğinde (kullanıcı giriş butonuna tıklamadan) `firebaseapp.com/__/auth/iframe.js` isteği ağ sekmesinde görünmüyor; bu istek yalnızca giriş denemesi başlatıldığında tetikleniyor.

---

### 0.5 Eski JavaScript polyfill'lerini kaldır

**Kanıt (rapordan):** "Eski JavaScript" bölümü, her iki raporda da `chunks/255-98a0bdaa30757bda.js` dosyasında **12 KiB boşa harcanan bayt** gösteriyor. Gereksiz polyfill'ler: `Array.prototype.at`, `Array.prototype.flat`, `Array.prototype.flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimEnd`, `String.prototype.trimStart`.

**Neden önemli:** Bu özellikler tüm modern tarayıcılarda (Baseline) zaten yerleşik olarak destekleniyor; polyfill'leri indirmek gereksiz boyut ekliyor.

**Yapılacak iş:**
1. `package.json` içindeki `browserslist` ayarını kontrol et; varsa eski tarayıcı hedeflerini (`IE 11`, çok eski Safari/Android sürümleri gibi) kaldır.
2. `next.config.mjs` içinde varsa `babel` transpile ayarlarını gözden geçir; Next.js 15+ varsayılan olarak modern derleme yapıyor olmalı, eğer eski bir `.babelrc` veya manuel transpile hedefi varsa kaldır.
3. Bağımlılıkları (`package-lock.json`) güncel tutmak da bu tür gereksiz polyfill içeren eski paket sürümlerini elemeye yardımcı olur.

**Kabul kriteri:** "Eski JavaScript" bölümündeki tasarruf miktarı 0 KiB'a yaklaşıyor veya tamamen kalkıyor.

---

## ÖNCELİK 1 — Erişilebilirlik (89/100, her iki cihazda aynı 3 sorun)

### 1.1 Bülten formu butonuna erişilebilir isim ekle

**Kanıt (rapordan):** "Düğmelerin erişilebilir adları yok" hatası, her iki raporda da aynı öğeyi işaret ediyor:
```html
div.footer-col > form > div > button
<button type="submit" style="background: linear-gradient(...)...">
```
Bu, footer'daki e-posta bülteni formunun gönder butonu — içinde görünür metin yok (büyük olasılıkla sadece bir ikon).

**Neden önemli:** Ekran okuyucu kullanan kişiler bu butonu sadece "düğme" olarak duyar, ne işe yaradığını bilemez. Bu aynı zamanda "Ajan Tabanlı Tarama" kategorisindeki tek hatanın da kaynağı (yapay zeka ajanlarının siteyi anlaması için de aynı sorun geçerli).

**Yapılacak iş:** `layout-wrapper.tsx` içindeki bülten formu butonuna `aria-label` ekle:
```tsx
<button type="submit" aria-label="Bültene kaydol" style={{...}}>
  <Icon />
</button>
```
Eğer buton içinde zaten bir ikon varsa, ikonun yanına görünmez (sr-only) bir metin de eklenebilir, ama `aria-label` tek başına yeterli.

**Kabul kriteri:** Bu buton artık "Düğmelerin erişilebilir adları yok" listesinde görünmüyor; hem Erişilebilirlik hem Ajan Tabanlı Tarama kategorisindeki ilgili hatalar düzeliyor.

---

### 1.2 Header navigasyon linklerinin renk kontrastını düzelt

**Kanıt (rapordan):** "Arka plan ve ön plan renkleri yeterli kontrast oranına sahip değil" hatası şu öğeleri işaret ediyor:
- `<a class="nav-link" href="/#tools">` — "Araçlar" linki
- `<a class="nav-link " href="/blog">` — "Blog & SEO" linki
- (Masaüstü raporunda ayrıca) "Nasıl Çalışır?" ve "Hakkımızda" linkleri
- Ayrıca üst banner'daki "2026 SOSYAL MEDYA ANALİZ STANDARDI" metni

**Neden önemli:** Düşük kontrastlı metin, görme zorluğu olan kullanıcılar için okunması zor veya imkansız hale geliyor. Bu, WCAG erişilebilirlik standardının temel gerekliliklerinden biri.

**Yapılacak iş:**
1. `globals.css` içinde `.nav-link` class'ının `color` değerini kontrol et — büyük olasılıkla `text-secondary` veya `text-muted` gibi soluk bir HSL tonu kullanılıyor.
2. WCAG AA standardına göre normal metin için arka plana karşı en az **4.5:1** kontrast oranı sağlanmalı. Header'ın arka plan rengine göre (`--bg-primary` veya `--bg-secondary`, koyu tonlar) nav-link rengini daha açık/parlak bir tona çek.
3. Aynı kontrolü "2026 SOSYAL MEDYA ANALİZ STANDARDI" banner metnine de uygula.
4. Düzeltme sonrası https://webaim.org/resources/contrastchecker/ ile manuel doğrulama yapılabilir.

**Kabul kriteri:** Bu öğeler "Kontrast" hata listesinden çıkıyor; Erişilebilirlik skoru yükseliyor.

---

### 1.3 Başlık (heading) hiyerarşisini düzelt

**Kanıt (rapordan):** "Başlık öğeleri sırayla azalan düzende sıralı değil" hatası şu öğeyi işaret ediyor:
```html
%100 Güvenli & Gizli
<h4 style="font-size:1.25rem">
```

**Neden önemli:** Sayfanın başlık yapısı (h1 → h2 → h3 → h4 sırasıyla azalmalı) bozuk; muhtemelen bir h2 veya h3 atlanıp doğrudan h4'e geçilmiş. Bu, ekran okuyucu kullanıcılarının sayfa yapısını anlamasını zorlaştırıyor.

**Yapılacak iş:**
1. Ana sayfadaki "Neden Instascope?" bölümünü incele (bu, "%100 Güvenli & Gizli" kartının bulunduğu bölüm).
2. Bu bölümün üst başlığının (örn. "Neden Instascope?") hangi seviyede olduğunu kontrol et; eğer h2 ise, kart başlıkları h3 olmalı, h4 değil. Hiyerarşiyi bir seviye düzelt (h4 → h3).
3. Sitedeki diğer bölümlerde de aynı kontrolü yap (Popüler Analiz Araçları, Profilinizi Büyütmeye Hazır Mısınız vb.) — sadece bu bölümde rastlanmış olabilir ama tüm sayfa taranmalı.

**Kabul kriteri:** Sayfadaki tüm başlıklar mantıksal sırayla (h1 → h2 → h3, atlama olmadan) iniyor; bu hata raporda görünmüyor.

---

## ÖNCELİK 2 — Düşük Öncelikli / Bilgilendirme Amaçlı

### 2.1 Önbellek süresi olmayan kaynaklar (düşük etki)

**Kanıt (rapordan):** Mobil raporda "Verimli önbellek sürelerini kullanın" altında `email-decode.min.js` (Cloudflare e-posta koruma scripti) sadece 1 gün 23 saat önbellekleniyor, 1 KiB — bu ihmal edilebilir düzeyde, müdahale gerektirmiyor.

**Not:** Bu madde aksiyon gerektirmiyor, sadece bilgi amaçlı not edildi.

---

### 2.2 "Ajan Tabanlı Tarama" kategorisi (deneysel, düşük öncelik)

**Kanıt (rapordan):** Skor 1/2. Tek hata, Görev 1.1'de ele alınan bülten butonu erişilebilir adı sorunuyla aynı. Bu kategori Google tarafından "hâlâ geliştirme aşamasında" olarak işaretlenmiş; AdSense onayı veya arama sıralaması için doğrudan bir etkisi olduğu doğrulanmamış.

**Yapılacak iş:** Görev 1.1 uygulandığında bu kategori de otomatik olarak düzelecek, ekstra bir iş gerekmiyor.

---

## Özet Kontrol Listesi (Antigravity için hızlı referans)

- [ ] 0.1 — Google Fonts'u kaldır, `next/font/google` ile değiştir (en yüksek etkili düzeltme — mobil LCP'yi doğrudan iyileştirir)
- [ ] 0.2 — `firebaseapp.com` ve `googleapis.com` için `preconnect` ekle
- [ ] 0.3 — Google Tag Manager script'ini `next/script` ile `lazyOnload`/`afterInteractive` stratejisine al
- [ ] 0.4 — Firebase Auth iframe'inin yüklenmesini "Giriş Yap" tıklamasına kadar geciktir (lazy import)
- [ ] 0.5 — Gereksiz eski JS polyfill'lerini kaldır (browserslist/babel ayarlarını gözden geçir)
- [ ] 1.1 — Footer bülten formu butonuna `aria-label` ekle
- [ ] 1.2 — Header nav-link ve banner metinlerinin renk kontrastını WCAG AA'ya çıkar
- [ ] 1.3 — "%100 Güvenli & Gizli" kartı ve benzer bölümlerdeki başlık hiyerarşisini düzelt (h4 → h3)

**Beklenen sonuç:** Görev 0.1-0.4 tamamlandığında mobil Performans skorunun 63'ten 90+ aralığına çıkması beklenir (masaüstü zaten 99 olduğu için kodun kendisi değil, ağ/kaynak yükleme stratejisi sorunluydu). Görev 1.1-1.3 tamamlandığında Erişilebilirlik skorunun 89'dan 95-100 aralığına çıkması beklenir.

**Not:** Bu görevler önceki "instascope-duzeltme-raporu.md" dosyasındaki AdSense/içerik odaklı görevlerden bağımsız ve tamamen tekniktir; ikisi birbirini tamamlar. AdSense incelemesi sayfa hızını da değerlendirdiği için bu düzeltmeler dolaylı olarak onay sürecine de katkı sağlar.

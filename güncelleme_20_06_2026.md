# Instascope.com.tr — Güncelleme ve Büyüme Stratejisi Planı

**Hazırlayan:** Claude (Anthropic)
**Tarih:** 20 Haziran 2026
**Kaynaklar:** Canlı site taraması, GitHub reposu (`emrekayahan/instascope`, son commit: `92752fe`), kullanıcı tarafından paylaşılan mobil ekran görüntüsü
**İletişim:** demadatr@gmail.com

Bu doküman üç ana hedefi kapsar: **(1)** kritik bir mobil görsel hatasının acil düzeltilmesi, **(2)** kullanıcının sitede daha uzun kalmasını sağlayacak somut özellik/UX değişiklikleri, **(3)** reklam gelirini ve genel "satılabilirlik" (proje değeri) artıracak stratejik fikirler. Önce mevcut durumun olumlu özeti, sonra önceliklendirilmiş görev listesi var.

---

## Mevcut Durum Özeti (İyi Haberler)

Önceki iki rapordaki (`instascope-duzeltme-raporu.md` ve `instascope-pagespeed-raporu.md`) görevlerin büyük kısmı uygulanmış durumda: sahte kurumsal bilgiler kaldırılmış, gerçek kimlik (Emre Kayahan) tutarlı şekilde kullanılıyor, blog 16 yazıya çıkmış, paylaşma butonları 4 araca da eklenmiş, PageSpeed font/script optimizasyonları yapılmış, `ads.txt` dosyasında gerçek bir AdSense yayıncı ID'si tanımlı. Bu sağlam bir temel — aşağıdaki plan bunun üzerine inşa ediliyor.

---

## ÖNCELİK 0 — Acil: Mobil Header Tamamen Bozuk (Kritik UX Hatası)

### 0.1 Mobil navigasyon menüsü çöküyor

**Kanıt (ekran görüntüsünden):** Paylaştığınız ekran görüntüsünde header'daki "Ana Sayfa", "Araçlar", "Blog & SEO" gibi menü öğeleri yan yana sığmadığı için her biri kendi satırına düşüyor, logo ile üst üste biniyor ve header devasa bir alan kaplayıp sayfanın ana içeriğini aşağı itiyor. Site mobilde pratik olarak kullanılamaz durumda.

**Kanıt (kodda):** `layout-wrapper.tsx` içinde `{/* Desktop Nav */}` yorumuyla işaretlenmiş **tek bir** `<nav className="desktop-nav">` bileşeni var; bunun dışında ayrı bir mobil menü (hamburger/drawer) bileşeni hiç yok. `globals.css` içinde `.header-container` (`display: flex; justify-content: space-between`) ve `.nav-links` (`display: flex; gap: 2rem`) için **hiçbir medya sorgusu (`@media`) tanımlanmamış**. Yani 5 menü linki + logo, ekran genişliği ne olursa olsun aynı yatay flex düzeninde kalmaya zorlanıyor; dar ekranda flex öğeleri sıkışıp satır satır kırılıyor.

**Neden önemli:** Bu sadece estetik değil, fonksiyonel bir hata — kullanıcı mobilde siteye girdiği ilk 2 saniyede menüye tıklayamıyor, hatta ana içeriği görmek için aşırı kaydırma yapması gerekiyor. Trafiğin büyük kısmı mobilden geleceği için (Instagram araçları tipik olarak mobil ağırlıklı kullanılır), bu tek hata muhtemelen şu anki en yüksek "hemen çıkma oranı" (bounce rate) kaynağı. Ayrıca Google'ın mobil kullanılabilirlik sinyali de bundan olumsuz etkilenir.

**Yapılacak iş (Antigravity için adım adım):**

1. **Hamburger menü state'i ekle** — `layout-wrapper.tsx` içine:
   ```tsx
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   ```

2. **Header JSX'ini güncelle** — mevcut `<nav className="desktop-nav">` bloğunu olduğu gibi bırak, hemen yanına bir hamburger buton ve mobil menü ekle:
   ```tsx
   <button
     className="mobile-menu-toggle"
     aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
   >
     {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
   </button>

   {mobileMenuOpen && (
     <nav className="mobile-nav">
       <ul className="mobile-nav-links">
         <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Ana Sayfa</Link></li>
         <li><Link href="/#tools" onClick={() => setMobileMenuOpen(false)}>Araçlar</Link></li>
         <li><Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog & SEO</Link></li>
         <li><Link href="/nasil-calisir" onClick={() => setMobileMenuOpen(false)}>Nasıl Çalışır?</Link></li>
         <li><Link href="/hakkimizda" onClick={() => setMobileMenuOpen(false)}>Hakkımızda</Link></li>
       </ul>
     </nav>
   )}
   ```
   `Menu` ve `X` ikonlarını `lucide-react`'tan import et (zaten proje genelinde kullanılıyor).

3. **CSS'e medya sorgusu ekle** — `globals.css` içine:
   ```css
   .mobile-menu-toggle {
     display: none;
     background: none;
     border: none;
     color: hsl(var(--text-primary));
     cursor: pointer;
   }

   .mobile-nav {
     position: absolute;
     top: 100%;
     left: 0;
     right: 0;
     background: hsl(var(--bg-secondary));
     border-bottom: 1px solid rgba(255,255,255,0.1);
     padding: 1rem 0;
   }

   .mobile-nav-links {
     display: flex;
     flex-direction: column;
     gap: 0;
     list-style: none;
   }

   .mobile-nav-links li a {
     display: block;
     padding: 0.875rem 1.25rem;
     color: hsl(215 25% 85%);
     font-size: 1rem;
   }

   .mobile-nav-links li a:hover,
   .mobile-nav-links li a:active {
     background: rgba(255,255,255,0.05);
     color: hsl(var(--text-primary));
   }

   @media (max-width: 768px) {
     .desktop-nav {
       display: none;
     }
     .mobile-menu-toggle {
       display: flex;
       align-items: center;
       justify-content: center;
     }
     .header-container {
       position: relative;
     }
   }

   @media (min-width: 769px) {
     .mobile-menu-toggle,
     .mobile-nav {
       display: none;
     }
   }
   ```

4. **Logo metnini de kontrol et** — ekran görüntüsünde "Instascope" yazısı büyük ve logo ikonu ile birlikte geniş yer kaplıyor; mobilde `.logo` font-size'ını biraz küçültmek (`1.5rem` → `1.15rem` gibi, sadece `@media (max-width: 768px)` içinde) header'ın daha kompakt durmasına yardımcı olur.

5. **Test:** Chrome DevTools mobil emülasyonunda (375px, 390px, 414px genişlikler) header'ın tek satırda kalıp kalmadığını, hamburger menünün açılıp kapandığını ve linklerin tıklanabilir olduğunu doğrula.

**Kabul kriteri:** Mobil ekranda header tek satırda kalıyor (logo solda, hamburger ikon sağda); menüye dokunulduğunda linkler temiz bir dropdown/drawer içinde açılıyor; hiçbir metin kırılıp üst üste binmiyor.

---

## ÖNCELİK 1 — Kullanıcıyı Sitede Daha Uzun Tutmak (Engagement / Retention)

Amacınız net: kullanıcı bir araç kullanıp hemen çıkmasın, siteye tekrar gelsin, daha fazla sayfa gezsin. Aşağıdaki fikirler bunu doğrudan hedefler.

### 1.1 "Profil Sağlık Skoru" — çoklu araç sonuçlarını birleştiren özet panel

**Fikir:** Kullanıcı tek tek araç kullanmak yerine, tüm verilerini (takipçi, takip, beğeni, yorum, paylaşım sıklığı) bir kerede girip 0-100 arası tek bir "Instagram Sağlık Skoru" alsın — etkileşim oranı, takipçi/takip dengesi ve paylaşım düzenliliğinin birleşimi. Sonuç ekranında "Etkileşim: 8/10, Takipçi Dengesi: 6/10, Paylaşım Sıklığı: 4/10" gibi alt kırılımlar gösterilsin.

**Neden işe yarar:** Bu, mevcut 4 ayrı aracı tek bir "hub" deneyiminde birleştirir, kullanıcı tek seferde 4 aracı da dolaylı kullanmış olur ve sonuç ekranında doğal olarak "şu alanı geliştirmek için Hashtag Önerici'yi dene" gibi iç linkler (internal linking) verilebilir — bu hem oturum süresini hem sayfa/oturum oranını artırır.

**Yapılacak iş:** Yeni bir `/araclar/profil-sagligi` sayfası oluştur. Mevcut hesaplama mantıklarını (etkileşim oranı formülü zaten `etkilesim-client.tsx`'te var) yeniden kullanarak birleşik bir skor algoritması yaz. Sonuç ekranına diğer 3 araca yönlendiren "Bunu da dene" kartları ekle.

---

### 1.2 Günlük/Haftalık "Instagram İpucu" widget'ı (geri gelme nedeni yaratma)

**Fikir:** Ana sayfaya veya ayrı bir köşeye, her gün/hafta değişen kısa bir ipucu kartı ekle ("Bu haftanın ipucu: Reels'lerde ilk 3 saniye izlenme oranını %20 artırır"). Bu, kullanıcıya "yeni bir şey görmek için tekrar gel" nedeni verir — sosyal medya araçlarında en etkili geri gelme tetikleyicilerinden biridir.

**Yapılacak iş:** Basit bir statik dizi (örn. 30 ipucu) hazırlanıp, o günün tarihine göre (`new Date().getDate() % ipuclari.length`) bir tanesi gösterilebilir — sunucu taraflı veri gerekmez, mevcut client-side felsefeye uygun. İleride bu, blog yazılarına da link verecek şekilde genişletilebilir.

---

### 1.3 "Geçmiş Analizlerim" sayfasına trend grafiği ekle

**Mevcut durum:** `/gecmis-analizlerim` sayfası zaten var ve localStorage'dan geçmiş kayıtları listeliyor — bu iyi bir temel.

**Eksik olan:** Sadece liste var, görsel bir trend/grafik yok.

**Yapılacak iş:** `recharts` kütüphanesi (zaten Next.js/React projelerinde yaygın, hafif) ile basit bir çizgi grafik ekle: "Son 10 ölçümünüze göre etkileşim oranınız artıyor/azalıyor" gibi. Bu, giriş yapan kullanıcılar için somut, tekrar gelmeye değer bir fayda yaratır — "bugün tekrar ölç, trendini gör" davranışını teşvik eder.

---

### 1.4 Araç sonuçlarına "İlgili Blog Yazıları" önerisi ekle

**Fikir:** Etkileşim oranı hesaplandıktan sonra, sonucun altına "Etkileşim oranınızı artırmak için: [İlgili blog yazısı linki]" gibi 2-3 bağlamsal blog önerisi ekle (örn. düşük skor çıkanlara "Organik Takipçi Artırma Yöntemleri" yazısını öner).

**Neden işe yarar:** Bu, en klasik ve kanıtlanmış "internal linking" stratejisidir — hem oturum süresini hem sayfa/oturum sayısını ciddi şekilde artırır, hem de blog yazılarının SEO değerini araç sayfalarından gelen iç linklerle güçlendirir.

**Yapılacak iş:** Her araç `-client.tsx` dosyasında, sonuç skoruna göre (düşük/orta/yüksek) ilgili blog yazısı slug'larını eşleştiren basit bir mapping objesi oluştur, sonuç ekranına 2-3 kart olarak ekle.

---

### 1.5 Mini "Quiz" veya "Hesabım Hangi Tipte?" interaktif içeriği

**Fikir:** "Instagram Kişiliğiniz Ne?" tarzı 5-6 soruluk hafif bir quiz (örn. paylaşım sıklığı, içerik türü, hedef kitle gibi sorularla "Mikro Influencer", "Marka Hesabı", "Hobi Hesabı" gibi sonuçlar). Bu tür içerikler sosyal medyada organik olarak paylaşılma potansiyeli en yüksek formatlardan biridir.

**Yapılacak iş:** Yeni bir `/araclar/instagram-tipim` sayfası — basit state tabanlı bir soru-cevap akışı, sonuç ekranında zaten var olan paylaşma mekanizması (Share2/WhatsApp) tekrar kullanılabilir.

---

## ÖNCELİK 2 — Reklam Gelirini Artırma

### 2.1 AdSense onayı sonrası reklam yerleşimini optimize et

**Mevcut durum:** `showAds` env değişkeniyle kontrol edilen reklam alanları zaten kodda hazır (sidebar + içerik arası), şu an `false` ile kapalı. `ads.txt`'te gerçek yayıncı ID'si tanımlı — bu, AdSense süreci ilerlediğinde hızlıca açılabileceği anlamına geliyor.

**Yapılacak iş (onay geldiğinde):**
1. `NEXT_PUBLIC_SHOW_ADS=true` yap ve gerçek AdSense ad unit kodlarını yerleştir (şu anki placeholder div'lerin yerine).
2. **Araç sonuç ekranının hemen altına** bir "in-content" reklam birimi ekle — kullanıcı sonucu gördükten sonra, hâlâ sayfada en meşgul olduğu an, bu pozisyon tıklama oranı (CTR) açısından genelde en güçlü yerlerden biridir.
3. Blog yazılarının **ortasına** (yaklaşık %40-50 noktasına) bir "in-article" reklam birimi ekle — AdSense politikalarına uygun şekilde, en az 2-3 paragraf içerikten sonra.
4. Mobilde "sticky" (yapışkan) alt banner reklamı değerlendirilebilir, ama bu UX'i bozmamak için dikkatli test edilmeli — gezinmeyi engellememeli.

### 2.2 Reklam dışı / tamamlayıcı gelir fikirleri

**a) "Premium" / bağış modeli (reklamsız deneyim):**
Kullanıcılar isterlerse küçük bir aylık/tek seferlik bağış ile reklamsız bir deneyim ve "Geçmiş Analizlerim"de sınırsız kayıt gibi ek özellikler alabilir. Bu, tek başına AdSense'e bağımlı kalmamayı sağlar ve bireysel/bağımsız proje kimliğiyle de tutarlıdır (kullanıcılar genellikle bağımsız geliştiricileri desteklemeye sıcak bakar — "Buy Me a Coffee" tarzı bir model düşünülebilir).

**b) Affiliate (iştirakçi) bağlantılar:**
Blog yazılarında bahsedilen araçlar/kitaplar/kurslar için (eğer ileride sosyal medya yönetim araçları, içerik takvimi şablonları gibi ürünler önerilirse) affiliate linkler eklenebilir. Bu, mevcut SEO trafiğini ek bir gelir kanalına çevirir.

**c) Kendi dijital ürününüzü satmak (bkz. Öncelik 3 — "satılabilir fikir"):**
Aşağıdaki bölümde detaylandırılan içerik takvimi şablonu / mini e-kitap gibi düşük maliyetli dijital ürünler, reklam gelirinden bağımsız ek bir gelir akışı oluşturabilir.

---

## ÖNCELİK 3 — Yeni Fikir: Online Satılabilir Bir Ürün

İsteğiniz üzerine, mevcut altyapı ve içerik temasına en uygun, düşük geliştirme maliyetiyle hayata geçirilebilecek bir fikir:

### 3.1 "Instagram İçerik Takvimi + Hashtag Kütüphanesi" — dijital indirilebilir ürün

**Fikir özeti:** Sitenin zaten ürettiği veriye dayalı yaklaşımı (hashtag havuzu, paylaşım saati önerileri, içerik takvimi konseptli blog yazısı zaten var) bir adım ileri taşıyıp, **30/90 günlük hazır içerik takvimi şablonu + sektöre göre kategorize edilmiş 500+ hashtag listesi** içeren indirilebilir bir dijital ürün (PDF/Notion şablonu/Google Sheets) haline getirmek.

**Neden bu fikir mantıklı:**
- Sitenin mevcut kullanıcı kitlesi (Instagram büyütmeye çalışan bireyler/küçük işletmeler) zaten bu tür bir ürünü arıyor.
- Geliştirme maliyeti düşük — mevcut hashtag havuzu ve "Paylaşım Saati" verisi zaten kodda var, bunları statik bir şablona dönüştürmek yeterli.
- Ücretsiz araçlar zaten kullanıcıyı "ücretsiz değer" ile ikna ediyor; bu ürün doğal bir "upsell" (üst satış) noktası oluşturur — "ücretsiz hesapladın, şimdi 3 aylık hazır planını al" mesajıyla sunulabilir.
- Tek seferlik ürün (abonelik değil) olduğu için bireysel bir proje için yönetimi kolay; Gumroad, Payhip veya Lemon Squeezy gibi platformlarla şirket kurmadan (şahıs olarak) satılabilir.

**Yapılacak iş (ilk adım):**
1. Mevcut hashtag havuzunu ve paylaşım saati verisini sektörlere göre (moda, yemek, fitness, e-ticaret vb.) gruplandırıp bir PDF/Notion şablonuna dönüştür.
2. Gumroad veya benzeri bir platformda ürün sayfası aç (şirket gerektirmez, bireysel satıcı olarak kayıt mümkün).
3. Ana sayfada ve araç sonuç ekranlarında (özellikle Hashtag Önerici ve Paylaşım Saati araçlarında) "Daha fazlasını ister misin? 90 günlük hazır içerik takvimini indir" şeklinde doğal bir CTA ekle.
4. İlk fiyatlandırma için düşük bir giriş noktası (örn. 49-99 TL aralığı) denenebilir, talebe göre artırılabilir.

**Not:** Bu, AdSense onay sürecini hiçbir şekilde olumsuz etkilemez — aksine sitenin "gerçek değer üreten, sürdürülebilir bir proje" olduğu izlenimini güçlendirir.

---

## Özet Kontrol Listesi (Antigravity için hızlı referans)

- [ ] **0.1 (ACİL)** — Mobil hamburger menü ekle, `.desktop-nav` için `@media (max-width: 768px)` ile gizleme kuralı yaz, header'ın mobilde tek satırda kalmasını sağla
- [ ] 1.1 — "Profil Sağlık Skoru" birleşik araç sayfası
- [ ] 1.2 — Günlük/haftalık dönen "Instagram İpucu" widget'ı
- [ ] 1.3 — Geçmiş Analizlerim sayfasına `recharts` ile trend grafiği ekle
- [ ] 1.4 — Araç sonuçlarına bağlamsal blog yazısı önerileri (internal linking)
- [ ] 1.5 — "Instagram Kişiliğiniz Ne?" tarzı paylaşılabilir mini quiz
- [ ] 2.1 — AdSense onayı sonrası reklam birimlerini sonuç ekranı altı + blog içi konumlara yerleştir
- [ ] 2.2 — Bağış/destek modeli ve/veya affiliate link stratejisi değerlendir
- [ ] 3.1 — "İçerik Takvimi + Hashtag Kütüphanesi" dijital ürününü Gumroad/Payhip üzerinde MVP olarak yayınla

**Önerilen uygulama sırası:** Önce 0.1 (mobil hata, kullanıcı kaybını doğrudan durdurur), sonra 1.3 ve 1.4 (mevcut altyapıya hızlı eklenebilir, düşük efor/yüksek etki), ardından 2.1 (AdSense onayı geldiğinde), son olarak 1.1/1.5 ve 3.1 (daha büyük efor gerektiren, orta-uzun vadeli büyüme adımları).
# Instascope.com.tr — Site Analizi ve Düzeltme Görev Listesi

**Hazırlayan:** Claude (Anthropic) — site analizi talebi üzerine
**Site sahibi:** Bireysel içerik üreticisi (şirket yok, şahıs sitesi)
**İletişim:** demadatr@gmail.com
**Tarih:** 17 Haziran 2026
**Bağlam:** Site Google Search Console'a kayıtlı, AdSense başvuru/onay sürecinde.

Bu doküman, Antigravity'nin (geliştirici/uygulayıcı) sırayla uygulayabileceği şekilde önceliklendirilmiştir. Her görev: **Sorun → Neden önemli → Yapılacak iş → Kabul kriteri** formatında yazılmıştır.

---

## ÖNCELİK 0 — Acil / AdSense Başvurusundan Önce Şart (Bloklayıcı)

### 0.1 Sahte kurumsal bilgileri kaldır (Mersis, Ticaret Sicil, Ünvan)

**Sorun:** Footer ve `/iletisim` sayfasında şu bilgiler "(Placeholder)" etiketiyle birlikte canlıda yayında:
- Ünvan: "Instascope Dijital Hizmetler Ltd. Şti. (Placeholder)"
- Mersis No: "0123-4567-8901-2345 (Placeholder)"
- Ticaret Sicil No: "987654 (Placeholder)"
- Oda Kaydı: "İstanbul Ticaret Odası (İTO)"

Site sahibi bir şirket değil, bireysel içerik üreticisi. Bu nedenle bu alanlar baştan yanlış/sahte.

**Neden önemli:**
- Var olmayan bir şirketi, var olmayan resmi sicil numaralarıyla yayınlamak hem yanıltıcı hem (varsa) yasal risk taşır.
- AdSense incelemesi bu metni okursa "yanıltıcı/sahte kurumsal bilgi" olarak değerlendirebilir; bu, basit "düşük içerik" reddinden daha ağır bir politika ihlali kategorisidir.
- Şahıs siteleri AdSense'te onay alabiliyor — sorun şirket olmamak değil, **sahte şirket gibi görünmeye çalışmak**.

**Yapılacak iş:**
1. Footer'daki ve `/iletisim` sayfasındaki "Kurumsal Bilgiler" bloğunu tamamen kaldır (Ünvan, Mersis No, Ticaret Sicil No, Oda Kaydı satırları).
2. Yerine dürüst ve sade bir bilgi bloğu koy. Örnek:
   ```
   Instascope, [isim/takma ad] tarafından bireysel olarak yürütülen
   bağımsız bir Instagram analiz platformudur.
   İletişim: demadatr@gmail.com
   Konum: İstanbul, Türkiye
   ```
3. "(Placeholder)" kelimesinin geçtiği TÜM yerleri site genelinde tara ve temizle (en azından şu sayfalarda tespit edildi: ana sayfa footer, `/gizlilik-politikasi`, `/iletisim`, `/nasil-calisir`).
4. Eğer ileride gerçekten şirket kurulursa, o zaman gerçek Mersis/Ticaret Sicil bilgileri eklenir — sahte veriyle asla doldurulmaz.

**Kabul kriteri:** Site genelinde "Placeholder" kelimesi hiçbir sayfada geçmiyor. Footer'da sadece gerçek ve doğrulanabilir bilgiler var (e-posta, şehir).

---

### 0.2 Gizlilik Politikası / KVKK metnini bireysel yapıya göre güncelle

**Sorun:** Gizlilik Politikası "Veri Sorumlusu" bölümü kurumsal bir dil kullanıyor ("Instascope ('Biz')...") ve şirket varlığını ima ediyor.

**Neden önemli:** KVKK kapsamında "veri sorumlusu" gerçek kişi de olabilir ama bunun şirket gibi sunulması tutarsızlık yaratır. AdSense incelemesi de bu sayfaları okur; tutarsız kurumsal kimlik güven sinyalini zayıflatır.

**Yapılacak iş:**
1. Gizlilik Politikası'nın "1. Veri Sorumlusu" bölümünü gerçek kişi statüsüne göre yeniden yaz:
   ```
   Instascope, [isim/takma ad] tarafından bireysel olarak işletilen bir
   web sitesidir. KVKK kapsamında veri sorumlusu sıfatıyla [isim], bu
   Gizlilik Politikası'nı kullanıcılarımızın kişisel verilerinin korunması
   amacıyla hazırlamıştır.
   ```
2. `/kvkk` (KVKK Aydınlatma Metni) sayfasını da aynı mantıkla gözden geçir — eğer orada da şirket varlığı ima ediliyorsa düzelt.
3. Bülten kayıt formu ve iletişim formu onay metinlerinde geçen ifadeler tutarlı olsun (zaten "İletişim formuna yazdığım verilerin KVKK Aydınlatma Metni kapsamında işlenmesine onay veriyorum" cümlesi var, bu kalabilir, sadece arkasındaki veri sorumlusu tanımı düzeltilmeli).

**Kabul kriteri:** Gizlilik Politikası ve KVKK metni, sitenin bireysel bir içerik üreticisi tarafından yürütüldüğünü açıkça ve tutarlı şekilde belirtiyor; hiçbir yerde var olmayan bir şirket ima edilmiyor.

---

### 0.3 Reklam placeholder kutularını gizle

**Sorun:** Ana sayfa ve araç sayfalarında en az 2 yerde "📢 Sponsor Reklamı — Google AdSense / Ezoic dikey reklam alanı (160x600)" yazılı boş kutular görünüyor.

**Neden önemli:** Henüz onay alınmadığı için bu kutular boş/placeholder olarak duruyor. Bu, AdSense incelemecisine sitenin "tamamlanmamış" göründüğü mesajını verir — ki bu yaygın red sebeplerinden biridir.

**Yapılacak iş:**
1. AdSense onayı alınana kadar bu reklam alanı div'lerini `display: none` yap veya koddan kaldır (CSS class olarak işaretlenip tek satırla açılıp kapanabilecek şekilde tutulması ileride kolaylık sağlar).
2. Onay alındıktan sonra gerçek reklam kodu ile değiştirilecek şekilde not düş (kod içinde `<!-- TODO: AdSense onayı sonrası buraya gerçek ad unit kodu gelecek -->` gibi bir yorum satırı yeterli).

**Kabul kriteri:** Sitede "Sponsor Reklamı" veya "(160x600)" gibi placeholder metinleri görünmüyor; sayfa tamamlanmış ve temiz görünüyor.

---

### 0.4 Blog içerik hacmini artır (en az 15-20 yazıya çıkar)

**Sorun:** Şu anda blogda sadece 2 yazı var ("Instagram Algoritması Nasıl Çalışır" ve "Organik Takipçi Artırma Yöntemleri").

**Neden önemli:** Google'ın 2026 itibarıyla AdSense onayında aradığı en önemli sinyal içerik derinliği ve hacmidir. Gerçekçi aralık 15-30 kaliteli yazı; 2 yazıyla yapılan başvuru büyük olasılıkla "düşük değerli içerik / yetersiz içerik" gerekçesiyle reddedilir.

**Yapılacak iş:**
1. Mevcut nişe (Instagram büyüme, analiz, algoritma) sıkı sıkıya bağlı kalarak en az 13-18 yeni blog yazısı planla. Örnek başlıklar:
   - "Instagram Etkileşim Oranı Nedir, Sektöre Göre İyi Sayılır mı?" (benchmark verisiyle)
   - "Instagram Reels Algoritması: Keşfet'e Çıkmanın 7 Kuralı"
   - "Hashtag Kullanımında Yapılan 10 Yaygın Hata"
   - "En İyi Paylaşım Saati Sektöre Göre Nasıl Değişir? (E-ticaret, Moda, Yemek, Fitness)"
   - "Takipçi/Takip Oranı Ne Anlama Gelir, Nasıl Hesaplanır?"
   - "Bot Takipçi vs Organik Takipçi: Hesabınıza Etkileri"
   - "Instagram Biyografi Linki Nasıl Optimize Edilir?"
   - "2026'da Instagram Algoritmasında Değişen 5 Şey"
   - "Mikro Influencer'lar İçin Etkileşim Oranı Standartları"
   - "Instagram Shadowban Nedir, Nasıl Anlaşılır, Nasıl Çıkılır?"
   - "Story vs Reels vs Feed: Hangi Format Daha Çok Etkileşim Alıyor?"
   - "Instagram'da Hashtag Spam Filtresine Takılmamak İçin Neler Yapılmalı?"
   - "Yeni Açılan Bir Instagram Hesabı İlk 30 Günde Ne Yapmalı?"
   - "Instagram Algoritması Kronolojik mi, Hâlâ Geçerli mi?"
   - "İçerik Takvimi Nasıl Hazırlanır: Adım Adım Şablon"
2. Her yazı 1000-1500+ kelime aralığında, özgün (başka sitelerden kopyalanmamış, kendi cümleleriyle yazılmış) olmalı.
3. Yazılar yalnızca teorik anlatım değil, mümkün olduğunca somut örnek, sayı, mini vaka anlatımı içersin (Google bunu "deneyim sinyali" olarak değerlendiriyor).
4. Yazı yayınlama takvimini düzenli tut (örn. haftada 2 yazı) — bir günde 15 yazı birden yayınlamak da "doğal olmayan" bir sinyal olabilir, kademeli yayınlama tercih edilmeli.

**Kabul kriteri:** Blogda en az 15, ideal olarak 20+ özgün, aynı niş etrafında kümelenmiş, 1000+ kelimelik yazı var.

---

### 0.5 Her blog yazısına yazar kimliği ve tarih ekle

**Sorun:** Blog yazılarında yazar adı/profili görünmüyor, sadece tarih ve okuma süresi var.

**Neden önemli:** Google'ın E-E-A-T (Deneyim, Uzmanlık, Otorite, Güvenilirlik) kriterleri, içeriğin kim tarafından yazıldığını bilmeyi önemli bir güven sinyali olarak görüyor. İsimsiz/kaynaksız içerik "kimliksiz AI spam" izlenimi verebilir.

**Yapılacak iş:**
1. Her blog yazısının altına/üstüne bir "Yazar" bloğu ekle: isim veya tutarlı bir takma ad (gerçek isim şart değil ama proje boyunca aynı kimlik kullanılmalı), kısa bir biyografi (1-2 cümle: "X yıldır sosyal medya analiziyle ilgileniyor", "Instagram büyüme stratejileri üzerine içerik üretiyor" gibi).
2. Bu yazar profilini `/hakkimizda` sayfasındaki ana anlatımla eşleştir (bkz. Görev 1.1).

**Kabul kriteri:** Her blog yazısında görünür bir yazar ismi/takma adı ve kısa biyografi var.

---

## ÖNCELİK 1 — Başvurudan Önce Yapılması Şiddetle Önerilen

### 1.1 "Hakkımızda" sayfası oluştur

**Sorun:** Sitede kurumsal/kişisel hikaye anlatan bir "Hakkımızda" sayfası yok. Sadece "Nasıl Çalışır?" sayfası var, o da teknik formül açıklaması, kişisel/kurucu hikayesi değil.

**Neden önemli:** AdSense incelemesi ve genel kullanıcı güveni için "bu siteyi kim, neden yapıyor" sorusunun cevaplanması kritik. Resmi/kurumsal sayfaların eksikliği yaygın bir red sebebidir.

**Yapılacak iş:**
1. `/hakkimizda` adında yeni bir sayfa oluştur. İçeriği şunları kapsasın:
   - Instascope'un neden/nasıl başladığı (kısa, samimi bir anlatım — "Instagram büyütmeye çalışırken elle hesaplama yapmaktan sıkıldım, bu yüzden bu araçları kendim için yaptım, sonra herkese açtım" tarzı gerçekçi bir motivasyon anlatımı önerilir, tabii gerçeğe uygun şekilde).
   - Sitenin bireysel bir proje olduğunun açık beyanı.
   - Hangi araçların neden/nasıl geliştirildiği.
   - Yazar/kurucu kimliği (Görev 0.5'teki yazar profiliyle tutarlı).
2. Bu sayfayı ana menüye ve footer'a ekle.

**Kabul kriteri:** `/hakkimizda` sayfası canlıda, ana menüde linki görünüyor, bireysel proje olduğunu açıkça ve samimi şekilde anlatıyor.

---

### 1.2 Her sayfaya benzersiz meta-description yaz

**Sorun:** Ana sayfa, `/araclar/etkilesim-hesaplayici`, `/blog` ve diğer tüm sayfalar **aynı** meta-description'ı kullanıyor:
> "Instagram etkileşim oranı hesaplayıcı, takipçi/takip oranı analiz aracı, hashtag performans simülatörü ve biyografi link oluşturucusu."

**Neden önemli:** Google her sayfayı farklı bir arama amacına göre değerlendirir. Aynı açıklamanın tekrarı, sayfaların birbirinden ayrışmadığı sinyalini verir, arama sonuçlarında tıklama oranını düşürür ve teknik SEO açısından "kalitesiz" görünür.

**Yapılacak iş:** Her sayfaya, o sayfaya özgü ve somut fayda vurgulayan benzersiz bir meta-description yaz. Örnekler:

| Sayfa | Önerilen meta-description |
|---|---|
| Ana Sayfa | "Instagram etkileşim oranınızı saniyeler içinde hesaplayın, en iyi paylaşım saatinizi öğrenin. Şifre istemeyen, tamamen ücretsiz analiz araçları." |
| `/araclar/etkilesim-hesaplayici` | "Takipçi, beğeni ve yorum sayılarınızı girin; gerçek etkileşim oranınızı anında öğrenin. Verileriniz sunucuya gönderilmez." |
| `/araclar/hashtag-onerici` | "Nişinize özel, spam filtresine takılmayan 8 hashtag kombinasyonunu ücretsiz keşfedin. Her aramada taze öneriler." |
| `/araclar/en-iyi-paylasim-saati` | "Sektörünüze göre en yüksek etkileşim alacağınız paylaşım saatlerini öğrenin. E-ticaret, moda, yemek ve daha fazlası için özel öneriler." |
| `/blog` | "Instagram algoritması, organik büyüme ve etkileşim stratejileri üzerine güncel, detaylı rehberler." |
| `/hakkimizda` | "Instascope'un hikayesi: bireysel bir içerik üreticisi tarafından geliştirilen bağımsız Instagram analiz araçları." |

**Kabul kriteri:** Site içindeki her benzersiz URL'nin kendine özgü, kopya olmayan bir meta-description'ı var.

---

### 1.3 Schema.org yapısal veri ekle

**Sorun:** Araç sayfalarında ve blog yazılarında yapısal veri (structured data) işaretlemesi tespit edilmedi.

**Neden önemli:** Doğru şema (`WebApplication` veya `SoftwareApplication` araçlar için, `Article` blog yazıları için, `Organization`/`Person` kimlik için) Google'da zengin sonuç (rich snippet) gösterimini mümkün kılar, bu da organik tıklama oranını artırır.

**Yapılacak iş:**
1. Her araç sayfasına `WebApplication` şeması ekle (isim, açıklama, ücretsiz olduğu bilgisi `"price": "0"` ile).
2. Her blog yazısına `Article` şeması ekle (başlık, yazar, yayın tarihi, görsel).
3. Site genelinde `Person` veya bireysel kimliğe uygun şema ekle (Organization DEĞİL, çünkü şirket yok).

**Kabul kriteri:** Google'ın Rich Results Test aracında (search.google.com/test/rich-results) bu sayfalar hatasız şema gösteriyor.

---

### 1.4 Mobil uyumluluk ve hız testini çalıştır ve düzelt

**Sorun:** Sitenin gerçek PageSpeed/mobil performans skoru bu analizde doğrulanmadı.

**Neden önemli:** AdSense incelemesi, sayfa hızı ve mobil kullanılabilirliği teknik kalite sinyali olarak değerlendirir. Yavaş açılan veya mobilde bozuk görünen siteler kolayca reddedilebilir.

**Yapılacak iş:**
1. https://pagespeed.web.dev üzerinden hem ana sayfayı hem en az bir araç sayfasını test et.
2. Mobil skor 80+ hedeflensin; Core Web Vitals (LCP, CLS, INP) "iyi" aralığında olsun.
3. Tespit edilen sorunları (büyük görseller, render-blocking script, vs.) gider.
4. Gerçek bir mobil cihazda (veya Chrome DevTools mobil emülasyonunda) tüm sayfaları gözle kontrol et — buton boyutları, metin okunabilirliği, form alanlarının dokunma kolaylığı.

**Kabul kriteri:** PageSpeed mobil skoru en az 80; tüm sayfalar mobilde görsel olarak bozulmadan açılıyor.

---

## ÖNCELİK 2 — Onay Sonrası Büyüme ve Kullanıcı Tutma (Acil değil ama yüksek etki)

### 2.1 Sonuç paylaşma özelliği ekle (organik büyüme kanalı)

**Sorun:** Etkileşim Oranı Hesaplayıcı sonucu üretildikten sonra kullanıcının bunu paylaşabileceği bir buton/mekanizma yok.

**Neden önemli:** Bu, ücretsiz ve organik bir yayılma kanalı kaybı. Kullanıcı "etkileşim oranım %3.2" sonucunu görüp hiçbir aksiyon almadan siteden ayrılıyor.

**Yapılacak iş:**
1. Hesaplama sonucunun altına, otomatik oluşturulan paylaşılabilir bir görsel/kart ekle (örn. "Etkileşim oranım %3.2 — Instascope ile hesapla" yazılı, basit tasarımlı bir kart).
2. Bu kartı doğrudan Instagram Story, X (Twitter) ve WhatsApp'a paylaşma butonlarıyla destekle (Web Share API kullanılabilir, sunucu tarafı gerektirmez, mevcut "client-side" felsefesine uygun).
3. Kart üzerinde küçük şekilde site adı/URL'si bulunsun (marka bilinirliği için).

**Kabul kriteri:** Kullanıcı hesaplama sonrası en az bir platforma tek tıkla paylaşım yapabiliyor.

---

### 2.2 Sektöre göre benchmark verisi ekle

**Sorun:** Kullanıcı "%3.2 etkileşim oranım iyi mi kötü mü?" sorusuna site içinde cevap bulamıyor.

**Neden önemli:** Ham bir sayı vermek yeterli değil; bağlam (context) kullanıcıya gerçek değer katar ve siteyi "sadece hesap makinesi" olmaktan çıkarıp "analiz aracı" yapar. Bu aynı zamanda yeni SEO anahtar kelimeleri kazandırır (örn. "moda sektörü ortalama etkileşim oranı").

**Yapılacak iş:**
1. Etkileşim Oranı Hesaplayıcı sonuç ekranına, hesaplanan oranı şu şekilde yorumlayan bir mesaj ekle: "%3.2 oranınız [moda/yemek/fitness vb.] sektörü ortalamasının üzerinde/altında" gibi.
2. Bunun için bir benchmark tablosu/veri seti oluştur (genel kabul gören sektör ortalamaları araştırılıp derlenebilir — bu, blog içeriği için de ayrı bir yazı konusu olabilir, bkz. Görev 0.4'teki örnek başlık).
3. Kullanıcıdan hesaplama öncesi opsiyonel olarak "sektörünüzü seçin" diye bir alan eklenebilir (basit bir dropdown, client-side kalır).

**Kabul kriteri:** Hesaplama sonucu artık yalnızca bir sayı değil, bağlamsal bir yorum içeriyor.

---

### 2.3 Google ile Giriş özelliğine görünür bir fayda bağla

**Sorun:** Google Auth zaten entegre ve gizlilik politikasında geçmiş kayıtların localStorage'da saklandığı belirtiliyor, ancak bu özelliğin kullanıcıya ne kazandırdığı hiçbir sayfada görünür şekilde anlatılmıyor.

**Neden önemli:** Görünmeyen/anlatılmayan bir özellik kullanılmaz. Giriş yapmanın bir karşılığı olmalı, aksi halde kullanıcı neden giriş yapacağını anlamaz.

**Yapılacak iş:**
1. Giriş yapan kullanıcılar için basit bir "Geçmiş Analizlerim" görünümü oluştur (localStorage'daki kayıtları listeleyen bir tablo/liste — sunucu taraflı veri aktarımı gerekmez, mevcut mimariye uygun).
2. Mümkünse bu geçmiş verilerle basit bir trend grafiği göster ("Son 5 hesaplamanıza göre etkileşim oranınız artıyor/azalıyor").
3. Ana sayfada giriş butonunun yanına kısa bir açıklama ekle: "Giriş yap, analiz geçmişini gör ve trendini takip et."

**Kabul kriteri:** Giriş yapan bir kullanıcı, giriş yapmamış birinden farklı, somut bir ek değer görüyor.

---

### 2.4 Bağlamsal e-posta bülteni teklifleri ekle

**Sorun:** E-posta bülteni formu sadece footer'da pasif şekilde duruyor, hiçbir araç sonucunda bağlamsal bir teklif yok.

**Neden önemli:** Footer formları genellikle çok düşük dönüşüm oranına sahiptir. Kullanıcının ilgisinin en yüksek olduğu an (bir sonucu gördüğü an) teklif sunmak çok daha etkilidir.

**Yapılacak iş:**
1. Her araç sonucunun altına bağlamsal bir e-posta teklif kutusu ekle. Örnek: "Etkileşim oranını her hafta takip etmek ister misin? E-postanı bırak, haftalık özet gönderelim."
2. Bu kutu, footer'daki genel bültenden farklı, sonuca özel bir metinle sunulsun.

**Kabul kriteri:** En az bir araç sayfasında, sonuç gösterildikten sonra bağlamsal bir e-posta toplama alanı görünüyor.

---

### 2.5 Hashtag aracı şeffaflığını artır

**Sorun:** "Nasıl Çalışır" sayfasında hashtag önerilerinin "karıştırılan bir havuzdan" geldiği belirtiliyor ama bu havuzun ne zaman güncellendiği veya hangi mantıkla derlendiği belirsiz; bu durum kullanıcıda "rastgele üretiliyor" şüphesi yaratabilir.

**Yapılacak iş:**
1. Havuzun güncelleme sıklığını somutlaştır (örn. "Aylık güncellenen 500+ hashtag havuzu").
2. Ana sayfada veya araç sayfasında, kullanıcı denemeden önce örnek bir çıktı göster (örn. "Moda nişi için örnek öneri: #moda #stilönerisi ...").

**Kabul kriteri:** Hashtag aracının metodolojisi hem "Nasıl Çalışır" sayfasında hem de araç sayfasında somut ve güven verici şekilde anlatılıyor.

---

## Özet Kontrol Listesi (Antigravity için hızlı referans)

- [ ] 0.1 — Sahte Mersis/Ticaret Sicil/Ünvan bilgilerini kaldır, bireysel kimliğe göre değiştir
- [ ] 0.2 — Gizlilik Politikası ve KVKK metnini bireysel yapıya göre güncelle
- [ ] 0.3 — Boş reklam placeholder kutularını gizle
- [ ] 0.4 — Blogu en az 15-20 özgün yazıya çıkar
- [ ] 0.5 — Her blog yazısına yazar kimliği ve biyografi ekle
- [ ] 1.1 — "Hakkımızda" sayfası oluştur
- [ ] 1.2 — Her sayfaya benzersiz meta-description yaz
- [ ] 1.3 — Schema.org yapısal veri ekle (WebApplication, Article, Person)
- [ ] 1.4 — PageSpeed/mobil uyumluluk testi yap ve düzelt
- [ ] 2.1 — Sonuç paylaşma butonu ekle
- [ ] 2.2 — Sektöre göre benchmark verisi ekle
- [ ] 2.3 — Google ile Girişe görünür fayda bağla ("Geçmiş Analizlerim")
- [ ] 2.4 — Bağlamsal e-posta bülteni teklifleri ekle
- [ ] 2.5 — Hashtag aracı şeffaflığını artır

**Not:** Öncelik 0 ve 1 maddeleri AdSense başvurusu/yeniden başvurusu öncesinde tamamlanmalıdır. Öncelik 2 maddeleri onay sonrası kullanıcı tutma ve organik büyüme için kritik olup başvuru sürecini doğrudan etkilemez, ancak erken uygulanması rekabet avantajı sağlar.

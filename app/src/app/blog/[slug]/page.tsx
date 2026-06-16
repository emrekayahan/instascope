import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  description: string;
  content: React.ReactNode;
}

const POSTS_DB: { [slug: string]: PostContent } = {
  'instagram-algoritmasi-nasil-calisir-2026': {
    title: 'Instagram Algoritması Nasıl Çalışır (2026 Güncel Rehber)',
    date: '15 Haziran 2026',
    readTime: '6 dk okuma',
    description: 'Instagram reels, hikayeler ve ana sayfa algoritmasının arkasındaki detaylı mekanizmayı ve etkileşim artırma yöntemlerini inceleyin.',
    content: (
      <>
        <p>Instagram, 2026 yılında içerik sıralama algoritmasını daha da kişiselleştirilmiş ve kullanıcı sinyallerine duyarlı hale getirdi. Artık sadece beğeni veya yorum sayıları değil, gönderide geçirilen aktif süre (dwell time), doğrudan mesajla paylaşım oranı (share rate) ve geri dönen takipçi etkileşimi en önemli sıralama faktörleri arasında yer alıyor.</p>
        
        <h2>Reels Algoritması Nasıl Çalışır?</h2>
        <p>Reels, Instagram algoritmasının en dinamik kısmıdır. Bu alanda algoritma tamamen "keşfetmeye" dayalı çalışır. Yani sizi takip etmeyen kişilere içeriğinizi ulaştırmayı hedefler. Algoritmaya göre Reels izlenme oranını artırmak için:</p>
        <ul>
          <li>Videonun ilk 3 saniyesindeki kanca (hook) kalitesi</li>
          <li>Kullanılan ses veya müziğin trend listesinde olup olmaması</li>
          <li>Paylaşım zamanlamasının kitleyle uyuşması</li>
        </ul>
        <p>Doğru saatlerde paylaşım yapmak, algoritmanın videoyu ilk test grubuna sunduğu anda yüksek etkileşim yakalamasını sağlar. Profiliniz için en doğru saatleri bulmak için <Link href="/araclar/en-iyi-paylasim-saati" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>En İyi Paylaşım Saati Hesaplayıcı</Link> aracımızı kullanabilirsiniz.</p>

        <h2>Algoritmayı Besleyen Diğer Faktörler</h2>
        <p>Doğru etiketleme ve anahtar kelime kullanımı da Reels ve arama sonuçlarında görünürlüğü katlar. Instagram artık etiketleri sadece bir kategori belirtme aracı olarak değil, doğrudan arama motoru (SEO) girdisi olarak okuyor. Gönderilerinizi doğru niş etiketlerle desteklemek için <Link href="/araclar/hashtag-onerici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Hashtag Önerici</Link> aracımızdan faydalanabilirsiniz.</p>
      </>
    )
  },
  'organik-takipci-artirma-yontemleri': {
    title: 'Organik Takipçi Artırma Yöntemleri ve Stratejiler',
    date: '10 Haziran 2026',
    readTime: '8 dk okuma',
    description: 'Bot hesaplar yerine tamamen organik, sadık ve aktif bir instagram takipçi kitlesi oluşturmanın 10 bilimsel adımı.',
    content: (
      <>
        <p>Sosyal medyada başarılı olmanın sırrı, bot veya sahte takipçiler satın almak değil, organik olarak markanızla etkileşime geçen gerçek insanlar kazanmaktır. Satın alınan sahte hesaplar etkileşim oranınızı (Engagement Rate) dibe çekerek algoritmanın gönderilerinizi gerçek takipçilerinize bile göstermemesine yol açar.</p>
        
        <h2>Etkileşimin Gücünü Ölçün</h2>
        <p>Organik büyümenin ilk adımı, mevcut profilinizin sağlığını test etmektir. Etkileşim oranınız ne kadar yüksekse, Instagram gönderilerinizi o kadar çok kişiye önerir. Takipçi sayınızın kaçta kaçıyla etkileşime girdiğinizi analiz etmek için hemen <Link href="/araclar/etkilesim-hesaplayici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Etkileşim Oranı Hesaplayıcı</Link> aracını kullanarak profilinizi denetleyin.</p>

        <h2>Biyografi Alanınızı Optimize Edin</h2>
        <p>Profilinizi ziyaret eden kullanıcıların sizi takip etme kararı almasındaki en büyük etken biyografinizdir. Net, anlaşılır ve güven veren bir biyografi oluşturmalı ve tüm diğer sosyal mecralarınızı, kampanyalarınızı veya linklerinizi tek bir çatı altında toplamalısınız. Bunun için geliştirdiğimiz <Link href="/araclar/biyografi-link-olusturucu" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Biyografi Link Oluşturucu</Link> aracımızla premium bir Link-in-Bio sayfası oluşturup profilinize ekleyebilirsiniz.</p>
      </>
    )
  },
  'instagram-etkilesim-orani-nedir-nasil-hesaplanir': {
    title: 'Instagram Etkileşim Oranı Nedir, Nasıl Hesaplanır?',
    date: '16 Haziran 2026',
    readTime: '5 dk okuma',
    description: 'Etkileşim oranı (Engagement Rate) hesabınızın gücünü gösterir. En basit hesaplama formülleri ve sektörel etkileşim kıyaslamaları.',
    content: (
      <>
        <p>Instagram etkileşim oranı (Engagement Rate), bir hesabın takipçi kitlesi ile ne kadar sağlıklı ve aktif bir bağ kurduğunu gösteren en önemli metriktir. Markalar ve influencer ajansları iş birlikleri yaparken takipçi sayısından ziyade doğrudan etkileşim oranına odaklanırlar.</p>
        
        <h2>Etkileşim Oranı Formülü</h2>
        <p>Etkileşim oranını hesaplamanın en yaygın metodu gönderi başına düşen ortalama beğeni ve yorum sayılarını toplayıp toplam takipçi sayısına bölmek ve ardından 100 ile çarpmaktır:</p>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', margin: '1.5rem 0', fontFamily: 'monospace' }}>
          ER = ((Beğeni + Yorum) / Takipçi) * 100
        </div>
        <p>Bu hesaplamayı manuel yapmak yerine hatasız ve hızlı sonuç almak için <Link href="/araclar/etkilesim-hesaplayici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Instagram Etkileşim Oranı Hesaplayıcı</Link> aracımızı kullanabilirsiniz.</p>

        <h2>Sektör Ortalamaları Nelerdir?</h2>
        <p>Genel olarak %1 ile %3 arası ortalama, %3 ile %6 arası iyi, %6'nın üzeri ise mükemmel etkileşim olarak kabul edilir. Takipçi sayınız arttıkça etkileşim oranınızın doğal olarak düşme eğiliminde olduğunu unutmamalısınız.</p>
      </>
    )
  },
  '2026-en-iyi-instagram-hashtag-stratejileri': {
    title: "2026'da En İyi Instagram Hashtag Stratejileri",
    date: '16 Haziran 2026',
    readTime: '7 dk okuma',
    description: 'Algoritmanın değişen hashtag politikalarını yakalayın. Gönderi türüne göre kaç adet ve hangi tür hashtag kullanmanız gerektiğini öğrenin.',
    content: (
      <>
        <p>Hashtag kullanımı Instagram'da gönderilerinizi kategorize etmenin ve keşfet algoritmasına doğru sinyaller göndermenin en klasik ve etkili yoludur. Ancak 2026'da popüler etiketleri rastgele kullanmak artık hesabınıza fayda değil, spam algısı yüzünden zarar vermektedir.</p>
        
        <h2>Kaç Hashtag Kullanılmalı?</h2>
        <p>Instagram resmi olarak 3 ila 5 adet niş etiket kullanımını önerse de, yapılan testler 8-12 adet arası dengeli hashtag kullanımının erişimi en yüksek seviyeye çıkardığını göstermektedir. Önemli olan popülaritesi milyonları bulan çok geniş etiketler yerine, içeriğinizi doğrudan tanımlayan daha spesifik ve hacimli etiketler seçmektir.</p>
        
        <h2>Hashtag Türleri ve Kombinasyon Sırrı</h2>
        <p>Kategorinize en uygun kombinasyonları saniyeler içinde belirlemek ve algoritmanın onayladığı güvenli etiketleri keşfetmek için <Link href="/araclar/hashtag-onerici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Hashtag Önerici</Link> aracımızı kullanabilirsiniz.</p>
      </>
    )
  },
  'instagram-reels-algoritmasini-anlamak': {
    title: 'Instagram Reels Algoritmasını Anlamak',
    date: '16 Haziran 2026',
    readTime: '6 dk okuma',
    description: 'Keşfet sayfasına düşmenin, izlenme sürelerini artırmanın ve viral Reels videoları hazırlamanın arkasındaki algoritma kuralları.',
    content: (
      <>
        <p>Reels videoları şu an Instagram'da sıfırdan organik kitle edinmenin en güçlü aracıdır. Reels algoritması, videolarınızı öncelikle küçük bir test grubuna gösterir ve bu gruptan gelen etkileşim sinyallerine göre videonun erişimini katlayarak artırır.</p>
        
        <h2>Viral Olmanın Altın Kuralları</h2>
        <p>Reels'ta başarının en kritik noktası videonun tamamlanma oranıdır (completion rate). Kullanıcıların videoyu sonuna kadar izlemesi ve hatta tekrar izlemesi algoritmanın videoyu "kaliteli" olarak sınıflandırmasını sağlar. Videonun başında dikkat çekici bir başlık kullanmak ve kitleyi videoda tutmak oldukça önemlidir.</p>

        <h2>Zamanlamanın Önemi</h2>
        <p>Videonuzu kitlenizin en aktif olduğu zaman diliminde yüklemek, ilk test grubunun hızla etkileşim vermesini sağlar. Sektörünüz ve hedef kitlenize özel en popüler zaman dilimlerini belirlemek için <Link href="/araclar/en-iyi-paylasim-saati" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Paylaşım Saati Hesaplama</Link> aracımızdan destek alabilirsiniz.</p>
      </>
    )
  },
  'takipci-takip-orani-neden-onemli': {
    title: 'Takipçi/Takip Oranı Neden Önemli?',
    date: '16 Haziran 2026',
    readTime: '4 dk okuma',
    description: 'Hesabınızın spam veya bot gibi görünmemesi için takipçi / takip edilen oranını nasıl dengede tutmalısınız? İşte altın oran.',
    content: (
      <>
        <p>Instagram'da profilinizi ziyaret eden kullanıcılar ve doğrudan Instagram güvenlik sistemi (spam filtreleri) hesabınızın güvenilirliğini ölçerken takipçi ve takip ettiğiniz kişi sayısının birbirine olan oranına bakar. Buna T/T Oranı (Follower/Following Ratio) denir.</p>
        
        <h2>Altın Oran Nedir?</h2>
        <p>Eğer takip ettiğiniz kişi sayısı, takipçi sayınızdan fazlaysa, profiliniz dışarıya "takibe takip" yapan veya spam amaçlı kurulmuş kalitesiz bir hesap izlenimi verir. Prestijli ve güvenilir bir profil için takipçi sayınızın, takip ettiklerinizden en az 5-10 kat daha fazla olması hedeflenmelidir.</p>

        <h2>Hesap Sağlığını İzleyin</h2>
        <p>Takipçi oranlarınızı ve etkileşim kalitenizi periyodik olarak denetlemek, hesabınızın büyüme ivmesini korur. Profilinizin etkileşim yüzdesini ölçmek için <Link href="/araclar/etkilesim-hesaplayici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Etkileşim Hesaplayıcı</Link> aracımızı kullanabilirsiniz.</p>
      </>
    )
  },
  'instagramda-shadowban-nasil-anlasilir-ve-onlenir': {
    title: "Instagram'da Shadowban Nasıl Anlaşılır ve Önlenir?",
    date: '16 Haziran 2026',
    readTime: '8 dk okuma',
    description: 'Hesabınızın erişimleri aniden düştüyse shadowban riski altındasınız. Nedenleri, kontrol etme yöntemi ve ban kaldırma adımları.',
    content: (
      <>
        <p>Shadowban (Gölge Yasaklama), Instagram'ın topluluk kurallarını ihlal eden veya şüpheli hareketler sergileyen hesapların erişimlerini, kullanıcıya resmi bir bildirim yapmadan kısıtlaması durumudur. Shadowban yiyen bir hesabın paylaşımları hashtaglerde ve keşfet alanında takipçi olmayanlara gösterilmez.</p>
        
        <h2>Shadowban Neden Olur?</h2>
        <ul>
          <li>Yasaklı veya kırık hashtaglerin kullanımı</li>
          <li>Kısa sürede aşırı beğeni, yorum veya takip gibi bot benzeri eylemler</li>
          <li>Gönderilerin sürekli olarak kullanıcılar tarafından şikayet edilmesi</li>
        </ul>

        <h2>Ban Durumu Nasıl Düzeltilir?</h2>
        <p>Hesabınızı dinlenmeye bırakmalı, tüm üçüncü taraf yazılımların (takipçi analiz uygulamaları vb.) erişim izinlerini iptal etmeli ve etkileşim oranlarınızı takip etmelisiniz. Durumunuzu kontrol etmek ve profilinizin etkileşim sağlığını ölçmek için <Link href="/araclar/etkilesim-hesaplayici" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>Etkileşim Hesaplayıcımızı</Link> kullanabilirsiniz.</p>
      </>
    )
  },
  'icerik-takvimi-nasil-olusturulur': {
    title: 'İçerik Takvimi Nasıl Oluşturulur?',
    date: '16 Haziran 2026',
    readTime: '5 dk okuma',
    description: 'Düzenli paylaşım yapmak başarının anahtarıdır. Aylık sosyal medya planlaması yapmanızı sağlayacak içerik takvimi hazırlama rehberi.',
    content: (
      <>
        <p>Sosyal medya yönetiminde sürdürülebilirlik başarının en temel anahtarıdır. Algoritma, düzenli içerik üreten hesapları ödüllendirir ve erişimlerini artırır. İçerik takvimi (Content Calendar), paylaşımlarınızı önceden planlayarak kaosun önüne geçmenizi sağlar.</p>
        
        <h2>Başarılı Bir Planlama İçin Adımlar</h2>
        <ol>
          <li>İçerik sütunlarınızı (eğitim, eğlence, tanıtım vb.) belirleyin.</li>
          <li>Görsel ve video şablonlarınızı önceden hazırlayın.</li>
          <li>Doğru paylaşım saatlerini belirleyerek gönderileri zamanlayın.</li>
        </ol>

        <h2>Saat Planlaması</h2>
        <p>İçeriklerinizin maksimum kişiye ulaşması için doğru gün ve saatleri seçmek hayati önem taşır. Sektörünüze özel paylaşım saatlerini öğrenmek için <Link href="/araclar/en-iyi-paylasim-saati" style={{ color: 'hsl(var(--accent-secondary))', fontWeight: 600 }}>En İyi Paylaşım Saati</Link> aracını takviminizi oluştururken rehber alabilirsiniz.</p>
      </>
    )
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_DB[slug];
  
  if (!post) {
    return {
      title: 'Yazı Bulunamadı - Instascope',
      description: 'Aradığınız blog yazısı bulunamadı.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://instascope.com.tr';

  return {
    title: `${post.title} | Instascope Blog`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: '2026-06-16T00:00:00.000Z',
      authors: ['Instascope Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS_DB[slug];

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": "2026-06-16T00:00:00.000Z",
    "dateModified": "2026-06-16T00:00:00.000Z",
    "author": {
      "@type": "Organization",
      "name": "Instascope"
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }} className="nav-link">
          <ArrowLeft size={16} /> Blog Listesine Dön
        </Link>
      </div>

      <article className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'hsl(var(--text-muted))', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '1rem' }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="gradient-text" style={{ fontSize: '2.5rem', lineHeight: 1.25, fontWeight: 800 }}>
          {post.title}
        </h1>

        <div className="blog-content" style={{ color: 'hsl(var(--text-secondary))', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.05rem' }}>
          {post.content}
        </div>
      </article>
    </div>
  );
}

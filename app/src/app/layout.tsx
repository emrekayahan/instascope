import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instascope | Instagram Analiz ve Büyüme Araçları",
  description: "Instagram etkileşim oranı hesaplayıcı, takipçi/takip oranı analiz aracı, hashtag performans simülatörü ve biyografi link oluşturucusu.",
  keywords: ["instagram analiz", "etkileşim oranı hesapla", "instagram hashtag önerici", "instagram takipçi analizi", "sosyal medya araçları"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://instascope.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Instascope | Instagram Analiz ve Büyüme Araçları",
    description: "Instagram etkileşim oranı hesaplayıcı, takipçi/takip oranı analiz aracı, hashtag performans simülatörü ve biyografi link oluşturucusu.",
    url: "https://instascope.com.tr",
    siteName: "Instascope",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instascope | Instagram Analiz ve Büyüme Araçları",
    description: "Instagram etkileşim oranı hesaplayıcı, takipçi/takip oranı analiz aracı, hashtag performans simülatörü ve biyografi link oluşturucusu.",
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true';
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="tr" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Preconnect to external domains for LCP improvement */}
        <link rel="preconnect" href="https://instascope-aba22.firebaseapp.com" />
        <link rel="preconnect" href="https://www.googleapis.com" />

        {showAds && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7418624287375688"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {gaId && (
          <>
            {/* GTM: lazyOnload so it doesn't block main thread */}
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LayoutWrapper>
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}

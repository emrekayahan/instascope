import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";
import Script from "next/script";

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
    <html lang="tr">
      <head>
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
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
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
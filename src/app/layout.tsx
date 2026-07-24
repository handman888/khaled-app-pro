import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Design Digital Pro | التصميم الذكي ديجيتال برو",
  description: "The complete AI platform for text, image, and video design in Arabic and English",
  keywords: ["AI design", "text generation", "image editing", "video production", "Arabic design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Dynamically set lang/dir based on locale – overwritten by locale layout */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var seg = path.split('/').filter(Boolean)[0];
                if (seg === 'ar') {
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                } else {
                  document.documentElement.lang = 'en';
                  document.documentElement.dir = 'ltr';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`min-h-screen font-[family-name:var(--font-inter)] antialiased ${inter.variable} ${notoSansArabic.variable}`}>
        {children}
      </body>
    </html>
  );
}

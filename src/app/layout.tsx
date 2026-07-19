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
    <div className={`${inter.variable} ${notoSansArabic.variable}`}>
      {children}
    </div>
  );
}

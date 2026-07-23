import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { getLocaleDirection } from "@/lib/i18n";
import "../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  return {
    title: "Smart Design Digital Pro | التصميم الذكي ديجيتال برو",
    description: "The complete AI platform for text, image, and video design in Arabic and English",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const direction = getLocaleDirection(validLocale);

  return (
    <div dir={direction} lang={validLocale} className={`${inter.variable} ${notoSansArabic.variable}`}>
      {children}
    </div>
  );
}

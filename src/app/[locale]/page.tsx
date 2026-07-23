import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Services } from '@/components/sections/Services';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { getMessages } from '@/lib/i18n';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const messages = await getMessages(validLocale);

  return (
    <>
      <Header locale={validLocale} messages={messages} />
      <main>
        <Hero locale={validLocale} messages={messages} />
        <Features locale={validLocale} messages={messages} />
        <Services locale={validLocale} messages={messages} />
        <Pricing locale={validLocale} messages={messages} />
        <Testimonials locale={validLocale} messages={messages} />
        <CTA locale={validLocale} messages={messages} />
      </main>
      <Footer locale={validLocale} messages={messages} />
    </>
  );
}

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Pricing } from '@/components/sections/Pricing';
import { getMessages, getLocaleDirection } from '@/lib/i18n';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const messages = await getMessages(validLocale);
  const direction = getLocaleDirection(validLocale);

  return (
    <html lang={validLocale} dir={direction}>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        <Header locale={validLocale} messages={messages} />
        <main>
          <section className="section-padding bg-white pattern-bg">
            <div className="container-custom text-center">
              <h1 className="text-4xl font-extrabold text-n-900 md:text-5xl">
                {(messages.pricing as Record<string, string>).sectionTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-n-600">
                {(messages.pricing as Record<string, string>).sectionSubtitle}
              </p>
            </div>
          </section>
          <Pricing locale={validLocale} messages={messages} />
        </main>
        <Footer locale={validLocale} messages={messages} />
      </body>
    </html>
  );
}

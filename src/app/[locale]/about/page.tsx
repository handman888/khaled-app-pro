import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getMessages, getLocaleDirection } from '@/lib/i18n';
import { Target, Eye, Heart, Shield } from 'lucide-react';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const messages = await getMessages(validLocale);
  const direction = getLocaleDirection(validLocale);
  const t = messages.about as Record<string, unknown>;

  const icons = [Target, Eye, Heart, Shield];

  return (
    <html lang={validLocale} dir={direction}>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        <Header locale={validLocale} messages={messages} />
        <main>
          {/* Hero */}
          <section className="section-padding bg-white pattern-bg">
            <div className="container-custom text-center">
              <h1 className="text-4xl font-extrabold text-n-900 md:text-5xl">
                {t.title as string}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-n-600">
                {t.subtitle as string}
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="section-padding bg-n-50">
            <div className="container-custom">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="rounded-2xl border border-n-200 bg-white p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-n-900">{t.mission as string}</h2>
                  <p className="text-lg leading-relaxed text-n-600">{t.missionText as string}</p>
                </div>
                <div className="rounded-2xl border border-n-200 bg-white p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-secondary/10">
                    <Eye className="h-6 w-6 text-accent-secondary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-n-900">{t.vision as string}</h2>
                  <p className="text-lg leading-relaxed text-n-600">{t.visionText as string}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="mb-12 text-center text-3xl font-bold text-n-900">{t.values as string}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(t.valuesList as Array<{ title: string; desc: string }>).map((value, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={i} className="rounded-2xl border border-n-200 p-6 text-center transition-all hover:border-n-300 hover:shadow-lg">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="mb-2 font-bold text-n-900">{value.title}</h3>
                      <p className="text-sm text-n-600">{value.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer locale={validLocale} messages={messages} />
      </body>
    </html>
  );
}

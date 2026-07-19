'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactPageProps {
  params: { locale: string };
  messages: Record<string, unknown>;
}

export function ContactPage({ params, messages }: ContactPageProps) {
  const { locale } = params;
  const t = messages.contact as Record<string, string>;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        <Header locale={locale} messages={messages} />
        <main>
          {/* Hero */}
          <section className="section-padding bg-white pattern-bg">
            <div className="container-custom text-center">
              <h1 className="text-4xl font-extrabold text-n-900 md:text-5xl">
                {t.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-n-600">
                {t.subtitle}
              </p>
            </div>
          </section>

          {/* Contact Content */}
          <section className="section-padding bg-n-50">
            <div className="container-custom">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Contact Form */}
                <div className="rounded-2xl border border-n-200 bg-white p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-4 h-12 w-12 text-success" />
                      <h3 className="mb-2 text-xl font-bold text-n-900">{t.success}</h3>
                      <p className="text-n-600">{locale === 'ar' ? 'سنتواصل معك قريباً' : 'We\'ll get back to you soon'}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-n-700">{t.name}</label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-xl border border-n-200 px-4 py-3 text-n-900 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-n-700">{t.email}</label>
                        <input
                          type="email"
                          required
                          className="w-full rounded-xl border border-n-200 px-4 py-3 text-n-900 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-n-700">{t.subject}</label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-xl border border-n-200 px-4 py-3 text-n-900 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-n-700">{t.message}</label>
                        <textarea
                          rows={5}
                          required
                          className="w-full resize-none rounded-xl border border-n-200 px-4 py-3 text-n-900 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-white transition-all hover:bg-accent/90"
                      >
                        <Send className="h-4 w-4" />
                        {t.send}
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-n-900">{t.info}</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-n-900">{locale === 'ar' ? 'العنوان' : 'Address'}</h3>
                        <p className="text-n-600">{t.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-n-900">{locale === 'ar' ? 'الهاتف' : 'Phone'}</h3>
                        <p className="text-n-600" dir="ltr">{t.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-n-900">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h3>
                        <p className="text-n-600" dir="ltr">{t.emailAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer locale={locale} messages={messages} />
      </body>
    </html>
  );
}

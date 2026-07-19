import Link from 'next/link';
import { getMessages, getLocaleDirection } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PenTool, Image, Video, FileText, Share2, Code, MessageCircle, Music, Languages, FileSearch, Presentation, ArrowRight } from 'lucide-react';

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const messages = await getMessages(validLocale);
  const direction = getLocaleDirection(validLocale);
  const t = messages.tools as Record<string, unknown>;
  const nav = t.nav as string;

  const tools = [
    {
      id: 'text',
      icon: PenTool,
      href: `/${validLocale}/tools/text`,
      title: (t.text as Record<string, string>).title,
      description: (t.text as Record<string, string>).subtitle,
      color: 'accent',
    },
    {
      id: 'image',
      icon: Image,
      href: `/${validLocale}/tools/image`,
      title: (t.image as Record<string, string>).title,
      description: (t.image as Record<string, string>).subtitle,
      color: 'accent-secondary',
    },
    {
      id: 'video',
      icon: Video,
      href: `/${validLocale}/tools/video`,
      title: (t.video as Record<string, string>).title,
      description: (t.video as Record<string, string>).subtitle,
      color: 'accent-glow',
    },
    {
      id: 'audio',
      icon: Music,
      href: `/${validLocale}/tools/audio`,
      title: (t.audio as Record<string, string>).title,
      description: (t.audio as Record<string, string>).subtitle,
      color: 'accent',
    },
    {
      id: 'code',
      icon: Code,
      href: `/${validLocale}/tools/code`,
      title: (t.code as Record<string, string>).title,
      description: (t.code as Record<string, string>).subtitle,
      color: 'accent-secondary',
    },
    {
      id: 'chat',
      icon: MessageCircle,
      href: `/${validLocale}/tools/chat`,
      title: (t.chat as Record<string, string>).title,
      description: (t.chat as Record<string, string>).subtitle,
      color: 'accent-glow',
    },
    {
      id: 'translate',
      icon: Languages,
      href: `/${validLocale}/tools/translate`,
      title: (t.translate as Record<string, string>).title,
      description: (t.translate as Record<string, string>).subtitle,
      color: 'accent',
    },
    {
      id: 'document',
      icon: FileSearch,
      href: `/${validLocale}/tools/document`,
      title: (t.document as Record<string, string>).title,
      description: (t.document as Record<string, string>).subtitle,
      color: 'accent-secondary',
    },
    {
      id: 'presentation',
      icon: Presentation,
      href: `/${validLocale}/tools/presentation`,
      title: (t.presentation as Record<string, string>).title,
      description: (t.presentation as Record<string, string>).subtitle,
      color: 'accent-glow',
    },
    {
      id: 'resume',
      icon: FileText,
      href: `/${validLocale}/tools/resume`,
      title: (t.resume as Record<string, string>).title,
      description: (t.resume as Record<string, string>).subtitle,
      color: 'accent',
    },
    {
      id: 'social',
      icon: Share2,
      href: `/${validLocale}/tools/social`,
      title: (t.social as Record<string, string>).title,
      description: (t.social as Record<string, string>).subtitle,
      color: 'accent-secondary',
    },
  ];

  return (
    <html lang={validLocale} dir={direction}>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        <Header locale={validLocale} messages={messages} />
        <main className="section-padding bg-n-50">
          <div className="container-custom">
            {/* Header */}
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold text-n-900 md:text-5xl">
                {nav}
              </h1>
              <p className="mt-4 text-lg text-n-600">
                {locale === 'ar' 
                  ? 'اختر أداة الذكاء الاصطناعي المناسبة لاحتياجاتك'
                  : 'Choose the AI tool that fits your needs'}
              </p>
            </div>

            {/* Tools Grid */}
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group rounded-2xl border border-n-200 bg-white p-6 transition-all hover:border-n-300 hover:shadow-lg"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${tool.color}/10`}>
                    <tool.icon className={`h-6 w-6 text-${tool.color}`} />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-n-900">{tool.title}</h2>
                  <p className="mb-3 text-sm text-n-600">{tool.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors group-hover:text-accent/80">
                    {locale === 'ar' ? 'ابدأ' : 'Get Started'}
                    <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer locale={validLocale} messages={messages} />
      </body>
    </html>
  );
}

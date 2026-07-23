'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { PenTool, Image, Video, FileText, Share2, Code, MessageCircle, Music, Languages, FileSearch, Presentation, ArrowLeft, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolsLayoutProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  activeTool: 'text' | 'image' | 'image-to-code' | 'video' | 'resume' | 'social' | 'code' | 'chat' | 'audio' | 'translate' | 'document' | 'presentation';
}

export function ToolsLayout({ children, locale, messages, activeTool }: ToolsLayoutProps) {
  const t = messages.tools as Record<string, unknown>;
  const nav = t.nav as string;
  const isRtl = locale === 'ar';

  const tools = [
    { id: 'text' as const, label: (t.text as Record<string, string>).title, icon: PenTool, href: `/${locale}/tools/text` },
    { id: 'image' as const, label: (t.image as Record<string, string>).title, icon: Image, href: `/${locale}/tools/image` },
    { id: 'image-to-code' as const, label: (t['imageToCode'] as Record<string, string>)?.title || 'Image to Code', icon: ImagePlus, href: `/${locale}/tools/image-to-code` },
    { id: 'video' as const, label: (t.video as Record<string, string>).title, icon: Video, href: `/${locale}/tools/video` },
    { id: 'audio' as const, label: (t.audio as Record<string, string>).title, icon: Music, href: `/${locale}/tools/audio` },
    { id: 'code' as const, label: (t.code as Record<string, string>).title, icon: Code, href: `/${locale}/tools/code` },
    { id: 'chat' as const, label: (t.chat as Record<string, string>).title, icon: MessageCircle, href: `/${locale}/tools/chat` },
    { id: 'translate' as const, label: (t.translate as Record<string, string>).title, icon: Languages, href: `/${locale}/tools/translate` },
    { id: 'document' as const, label: (t.document as Record<string, string>).title, icon: FileSearch, href: `/${locale}/tools/document` },
    { id: 'presentation' as const, label: (t.presentation as Record<string, string>).title, icon: Presentation, href: `/${locale}/tools/presentation` },
    { id: 'resume' as const, label: (t.resume as Record<string, string>).title, icon: FileText, href: `/${locale}/tools/resume` },
    { id: 'social' as const, label: (t.social as Record<string, string>).title, icon: Share2, href: `/${locale}/tools/social` },
  ];

  return (
    <div className="min-h-screen bg-n-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-n-200 bg-white/80 backdrop-blur-lg">
        <div className="container-custom flex h-16 items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-sm font-medium text-n-600 transition-colors hover:text-n-900"
          >
            <ArrowLeft className={cn('h-4 w-4', isRtl && 'rotate-180')} />
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>

          <h1 className="text-lg font-bold text-n-900">{nav}</h1>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-n-500 sm:block">
              {locale === 'ar' ? 'الرصيد:' : 'Credits:'}
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">50</span>
          </div>
        </div>
      </header>

      {/* Tool Navigation */}
      <div className="border-b border-n-200 bg-white">
        <div className="container-custom">
          <nav className="flex gap-1 overflow-x-auto py-2">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  activeTool === tool.id
                    ? 'bg-accent text-white'
                    : 'text-n-600 hover:bg-n-100 hover:text-n-900'
                )}
              >
                <tool.icon className="h-4 w-4" />
                {tool.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        {children}
      </main>
    </div>
  );
}

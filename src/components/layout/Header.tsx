'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = locale === 'ar';
  const t = messages.nav as Record<string, string>;
  const toolsNav = (messages.tools as Record<string, string>).nav || 'AI Tools';

  const navItems = [
    { href: `/${locale}/tools`, label: toolsNav },
    { href: '/#features', label: t.features },
    { href: '/pricing', label: t.pricing },
    { href: '/about', label: t.about },
    { href: '/contact', label: t.contact },
  ];

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments[0] === 'ar' || segments[0] === 'en') {
      segments[0] = newLocale;
    } else if (newLocale !== 'en') {
      segments.unshift(newLocale);
    }
    
    const newPath = '/' + segments.join('/');
    window.location.href = newPath || '/';
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-n-200 bg-white/80 backdrop-blur-lg',
      )}
    >
      <div className="container-custom flex h-[var(--header-height)] items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M22 7L12 12L2 7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="hidden text-lg font-bold text-n-900 sm:block">
            {isRtl ? 'التصميم الذكي' : 'Smart Design'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-n-600 transition-colors hover:text-n-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-2 text-sm font-medium text-n-700 transition-colors hover:bg-n-100"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {locale === 'en' ? 'عربي' : 'EN'}
          </button>
          <Link
            href="/"
            className="text-sm font-medium text-n-600 transition-colors hover:text-n-900"
          >
            {t.login}
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent/90 hover:shadow-md"
          >
            {t.getStarted}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-n-700" />
          ) : (
            <Menu className="h-5 w-5 text-n-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute left-0 right-0 top-[var(--header-height)] border-b border-n-200 bg-white shadow-lg md:hidden',
          mobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="container-custom flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-n-700 transition-colors hover:bg-n-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="my-2 border-t border-n-200" />
          <div className="flex flex-col gap-2 px-4">
            <button
              onClick={switchLocale}
              className="flex items-center justify-center gap-2 rounded-lg border border-n-200 px-4 py-2.5 text-sm font-medium text-n-700"
            >
              <Globe className="h-4 w-4" />
              {locale === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              href="/"
              className="rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              {t.getStarted}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

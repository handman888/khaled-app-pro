export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export async function getMessages(locale: Locale) {
  try {
    return (await import(`../../locales/${locale}.json`)).default;
  } catch {
    return (await import(`../../locales/${defaultLocale}.json`)).default;
  }
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

export function getPathWithoutLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return path.replace(`/${locale}`, '') || '/';
}

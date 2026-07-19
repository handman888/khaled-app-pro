import Link from 'next/link';
import { Heart } from 'lucide-react';

interface FooterProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Footer({ locale, messages }: FooterProps) {
  const isRtl = locale === 'ar';
  const t = messages.footer as Record<string, unknown>;
  const description = t.description as string;
  const product = t.product as string;
  const resources = t.resources as string;
  const company = t.company as string;
  const productLinks = (t.productLinks || []) as string[];
  const resourceLinks = (t.resourceLinks || []) as string[];
  const companyLinks = (t.companyLinks || []) as string[];
  const rights = t.rights as string;
  const madeWith = t.madeWith as string;

  return (
    <footer className="border-t border-n-200 bg-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
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
              <span className="text-lg font-bold text-n-900">
                {isRtl ? 'التصميم الذكي' : 'Smart Design'}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-n-600">
              {description}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-n-900">
              {product}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link: string) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-n-600 transition-colors hover:text-n-900"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-n-900">
              {resources}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link: string) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-n-600 transition-colors hover:text-n-900"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-n-900">
              {company}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link: string) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-n-600 transition-colors hover:text-n-900"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-n-200 pt-8 md:flex-row">
          <p className="text-sm text-n-500">
            &copy; {new Date().getFullYear()} Smart Design Digital Pro. {rights}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-n-500">
            {madeWith}
            <Heart className="h-4 w-4 fill-accent text-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
}

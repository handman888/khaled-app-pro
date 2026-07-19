'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Hero({ locale, messages }: HeroProps) {
  const t = messages.hero as Record<string, string>;
  const isRtl = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-white pattern-bg">
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t.badge}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight tracking-tight text-n-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-n-600 md:text-xl"
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
            >
              {t.cta}
              <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
            <button className="group flex items-center gap-2 rounded-xl border border-n-200 px-8 py-4 text-base font-semibold text-n-700 transition-all hover:border-n-300 hover:bg-n-100">
              <Play className="h-5 w-5 fill-current" />
              {t.secondaryCta}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-n-200 pt-8"
          >
            {[
              { value: '+500', label: locale === 'ar' ? 'مستخدم نشط' : 'Active Users' },
              { value: '+10K', label: locale === 'ar' ? 'تم توليده' : 'Generated' },
              { value: '4.9', label: locale === 'ar' ? 'تقييم' : 'Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-n-900 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-n-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-secondary/5 blur-3xl" />
    </section>
  );
}

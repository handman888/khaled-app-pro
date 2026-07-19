'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function CTA({ locale, messages }: CTAProps) {
  const t = messages.cta as Record<string, string>;
  const isRtl = locale === 'ar';

  return (
    <section className="section-padding bg-n-900 pattern-bg">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-n-400">
            {t.subtitle}
          </p>
          <Link
            href="/"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
          >
            {t.button}
            <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

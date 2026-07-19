'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface SanityTestimonial {
  _id: string;
  quote: string;
  quoteAr?: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorImage?: any;
  rating?: number;
}

interface TestimonialsProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Testimonials({ locale, messages }: TestimonialsProps) {
  const [sanityTestimonials, setSanityTestimonials] = useState<SanityTestimonial[]>([]);
  const t = messages.testimonials as Record<string, unknown>;
  const isRtl = locale === 'ar';

  useEffect(() => {
    import('@/lib/sanity').then(({ getTestimonials }) => {
      getTestimonials()
        .then((items) => {
          if (items && items.length > 0) {
            setSanityTestimonials(items);
          }
        })
        .catch(() => {});
    });
  }, []);

  const useSanity = sanityTestimonials.length > 0;
  const fallbackItems = (t.items || []) as Array<Record<string, string>>;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-n-900 md:text-4xl"
          >
            {t.sectionTitle as string}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-n-600"
          >
            {t.sectionSubtitle as string}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {useSanity
            ? sanityTestimonials.map((testimonial, index) => {
                const quote = isRtl && testimonial.quoteAr ? testimonial.quoteAr : testimonial.quote;
                return (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-n-200 bg-n-50 p-8"
                  >
                    <Quote className="mb-4 h-8 w-8 text-accent/30" />
                    <p className="mb-6 text-lg leading-relaxed text-n-700">&ldquo;{quote}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <span className="text-lg font-bold">{testimonial.authorName.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-n-900">{testimonial.authorName}</div>
                        <div className="text-sm text-n-600">
                          {testimonial.authorRole} {testimonial.authorCompany && `• ${testimonial.authorCompany}`}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            : fallbackItems.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-n-200 bg-n-50 p-8"
                >
                  <Quote className="mb-4 h-8 w-8 text-accent/30" />
                  <p className="mb-6 text-lg leading-relaxed text-n-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-n-900">{testimonial.name}</div>
                      <div className="text-sm text-n-600">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

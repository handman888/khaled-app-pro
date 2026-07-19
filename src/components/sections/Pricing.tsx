'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Pricing({ locale, messages }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const t = messages.pricing as Record<string, unknown>;
  const sectionTitle = t.sectionTitle as string;
  const sectionSubtitle = t.sectionSubtitle as string;
  const monthly = t.monthly as string;
  const yearly = t.yearly as string;
  const yearlyDiscount = t.yearlyDiscount as string;
  const cta = t.cta as string;
  const tiersData = (t.tiers || {}) as Record<string, Record<string, unknown>>;

  const tiers = [
    {
      key: 'basic',
      popular: false,
    },
    {
      key: 'pro',
      popular: true,
    },
    {
      key: 'enterprise',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-n-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-n-900 md:text-4xl"
          >
            {sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-n-600"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* Toggle */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-xl border border-n-200 bg-white p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                !isYearly
                  ? 'bg-accent text-white'
                  : 'text-n-600 hover:text-n-900'
              )}
            >
              {monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                isYearly
                  ? 'bg-accent text-white'
                  : 'text-n-600 hover:text-n-900'
              )}
            >
              {yearly}
              <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                {yearlyDiscount}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const tierData = tiersData[tier.key] || {};
            const features = (tierData.features || []) as string[];
            
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative rounded-2xl border bg-white p-8 transition-all',
                  tier.popular
                    ? 'border-accent shadow-lg shadow-accent/10'
                    : 'border-n-200 hover:border-n-300'
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-n-900">
                    {tierData.name as string}
                  </h3>
                  <p className="mt-1 text-sm text-n-600">
                    {tierData.description as string}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-n-900">
                    {tierData.price as string}
                  </span>
                  {tierData.period ? (
                    <span className="text-n-500">{tierData.period as string}</span>
                  ) : null}
                </div>

                <ul className="mb-8 space-y-3">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-n-700">
                      <Check className="h-4 w-4 flex-shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    'w-full rounded-xl py-3 text-sm font-semibold transition-all',
                    tier.popular
                      ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
                      : 'border border-n-200 text-n-700 hover:bg-n-100'
                  )}
                >
                  {cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

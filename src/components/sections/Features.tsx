'use client';

import { motion } from 'framer-motion';
import { PenTool, Image, Video, Check } from 'lucide-react';

interface FeaturesProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Features({ locale, messages }: FeaturesProps) {
  const t = messages.features as Record<string, unknown>;
  const sectionTitle = t.sectionTitle as string;
  const sectionSubtitle = t.sectionSubtitle as string;
  const textGen = t.textGen as Record<string, unknown>;
  const imageStudio = t.imageStudio as Record<string, unknown>;
  const videoProduction = t.videoProduction as Record<string, unknown>;

  const colorClasses: Record<string, { bg: string; text: string }> = {
    accent: { bg: 'bg-accent/10', text: 'text-accent' },
    'accent-secondary': { bg: 'bg-accent-secondary/10', text: 'text-accent-secondary' },
    'accent-glow': { bg: 'bg-accent-glow/10', text: 'text-accent-glow' },
  };

  const features = [
    {
      icon: PenTool,
      title: textGen.title as string,
      description: textGen.description as string,
      items: (textGen.items || []) as string[],
      color: 'accent',
    },
    {
      icon: Image,
      title: imageStudio.title as string,
      description: imageStudio.description as string,
      items: (imageStudio.items || []) as string[],
      color: 'accent-secondary',
    },
    {
      icon: Video,
      title: videoProduction.title as string,
      description: videoProduction.description as string,
      items: (videoProduction.items || []) as string[],
      color: 'accent-glow',
    },
  ];

  return (
    <section id="features" className="section-padding bg-n-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
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

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-n-200 bg-white p-8 transition-all hover:border-n-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colorClasses[feature.color].bg}`}
              >
                <feature.icon className={`h-7 w-7 ${colorClasses[feature.color].text}`} />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-n-900">
                {feature.title}
              </h3>
              <p className="mb-6 leading-relaxed text-n-600">
                {feature.description}
              </p>

              {/* List */}
              <ul className="space-y-3">
                {feature.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-n-700">
                    <Check className={`h-4 w-4 flex-shrink-0 ${colorClasses[feature.color].text}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

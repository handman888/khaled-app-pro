'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServicesProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function Services({ locale, messages }: ServicesProps) {
  const [activeTab, setActiveTab] = useState('text');
  const t = messages.services as Record<string, unknown>;
  const sectionTitle = t.sectionTitle as string;
  const sectionSubtitle = t.sectionSubtitle as string;
  const tabsData = t.tabs as Record<string, string>;
  const textContent = t.textContent as Record<string, unknown>;
  const imageDesign = t.imageDesign as Record<string, unknown>;
  const videoMotion = t.videoMotion as Record<string, unknown>;

  const tabs = [
    { id: 'text', label: tabsData.text },
    { id: 'image', label: tabsData.image },
    { id: 'video', label: tabsData.video },
  ];

  const tabContent = {
    text: textContent,
    image: imageDesign,
    video: videoMotion,
  };

  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="section-padding bg-white">
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

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-n-200 bg-n-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-lg px-6 py-2.5 text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-white text-n-900 shadow-sm'
                    : 'text-n-600 hover:text-n-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl border border-n-200 bg-white p-8 shadow-sm md:p-12">
              <h3 className="mb-3 text-2xl font-bold text-n-900">
                {currentContent.title as string}
              </h3>
              <p className="mb-8 text-lg text-n-600">
                {currentContent.description as string}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {(currentContent.features as Array<{ title: string; desc: string }>).map(
                  (feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <span className="text-lg font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-n-900">{feature.title}</h4>
                        <p className="mt-1 text-sm text-n-600">{feature.desc}</p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2, Copy, Check, Download, BarChart3, Tag, Smile, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function DocumentTool({ locale, messages }: DocumentToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).document as Record<string, unknown>;
  const tabs = (t.tabs || {}) as Record<string, string>;
  const summary = (t.summary || {}) as Record<string, string>;
  const keywords = (t.keywords || {}) as Record<string, string>;
  const sentiment = (t.sentiment || {}) as Record<string, string>;
  const stats = (t.stats || {}) as Record<string, string>;
  const actions = (t.actions || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'summary' | 'keywords' | 'sentiment' | 'stats'>('summary');
  const [documentText, setDocumentText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock analysis results
  const analysisResults = {
    summary: {
      brief: locale === 'ar'
        ? 'يقدم هذا المستند نظرة شاملة على التحول الرقمي في الشركات الحديثة. يناقش الأدوات والتقنيات المستخدمة لتحسين الكفاءة والإنتاجية.'
        : 'This document provides a comprehensive overview of digital transformation in modern enterprises. It discusses tools and technologies used to improve efficiency and productivity.',
      keyPoints: locale === 'ar'
        ? [
            'التحول الرقمي ضروري للبقاء في السوق',
            'الذكاء الاصطناعي يلعب دوراً محورياً',
            'التكلفة قد تكون عالية لكن العوائد أفضل',
            'التدريب على المهارات الجديدة أمر حاسم'
          ]
        : [
            'Digital transformation is essential for market survival',
            'AI plays a central role in modern enterprises',
            'Costs may be high but returns are better',
            'Training on new skills is critical'
          ]
    },
    keywords: {
      main: ['Digital Transformation', 'AI', 'Automation', 'Efficiency', 'Innovation', 'Strategy', 'Technology', 'Data'],
      topics: ['Business Strategy', 'Technology Adoption', 'Change Management', 'Data Analytics'],
      entities: ['Google', 'Microsoft', 'Amazon', 'IBM', 'McKinsey']
    },
    sentiment: {
      overall: 'positive',
      score: 78,
      emotions: [
        { name: 'Confidence', score: 85 },
        { name: 'Optimism', score: 72 },
        { name: 'Determination', score: 68 }
      ]
    },
    stats: {
      words: 2847,
      sentences: 156,
      paragraphs: 42,
      readingTime: '12 min',
      readability: 'Grade 10',
      complexity: locale === 'ar' ? 'متوسط' : 'Intermediate'
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setAnalyzed(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisResults.summary.brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Input Panel */}
      <div className="lg:col-span-1 space-y-6">
        {/* Upload Area */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">{t.upload as string}</label>
          <div className="relative">
            <input type="file" accept=".pdf,.docx,.txt,.md" className="hidden" id="doc-upload" />
            <label
              htmlFor="doc-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-n-300 bg-n-50 p-8 transition-colors hover:border-accent hover:bg-accent/5"
            >
              <Upload className="mb-3 h-8 w-8 text-n-400" />
              <p className="text-sm text-n-600">{t.dragDrop as string}</p>
              <p className="mt-1 text-xs text-n-400">{t.supportedFormats as string}</p>
            </label>
          </div>
        </div>

        {/* Or Paste */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">{t.paste as string}</label>
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder={t.pastePlaceholder as string}
            rows={10}
            className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!documentText.trim() || isAnalyzing}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            documentText.trim() && !isAnalyzing
              ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
              : 'bg-n-200 text-n-500 cursor-not-allowed'
          )}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.analyzing as string}
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              {t.analyze as string}
            </>
          )}
        </button>

        {/* Quick Actions */}
        {analyzed && (
          <div className="rounded-xl border border-n-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-medium text-n-700">
              {locale === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </h4>
            <div className="space-y-2">
              {Object.entries(actions).map(([key, label]) => (
                <button
                  key={key}
                  className="w-full rounded-lg border border-n-200 px-3 py-2 text-left text-sm text-n-700 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2 rounded-2xl border border-n-200 bg-white">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-n-200 p-1">
          {[
            { id: 'summary' as const, icon: FileText, label: tabs.summary },
            { id: 'keywords' as const, icon: Tag, label: tabs.keywords },
            { id: 'sentiment' as const, icon: Smile, label: tabs.sentiment },
            { id: 'stats' as const, icon: Hash, label: tabs.stats },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'text-n-600 hover:bg-n-100'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {!analyzed ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ارفع مستنداً أو الصق نصاً للتحليل'
                  : 'Upload a document or paste text to analyze'}
              </p>
            </div>
          ) : (
            <>
              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-n-900">{summary.brief as string}</h3>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-sm text-n-500 hover:text-n-700"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? (t.copied as string) : (t.copy as string)}
                      </button>
                    </div>
                    <p className="text-n-700 leading-relaxed">{analysisResults.summary.brief}</p>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{summary.keyPoints as string}</h3>
                    <ul className="space-y-2">
                      {analysisResults.summary.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                            {i + 1}
                          </span>
                          <span className="text-n-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Keywords Tab */}
              {activeTab === 'keywords' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{keywords.title as string}</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.keywords.main.map((keyword, i) => (
                        <span key={i} className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{keywords.topics as string}</h3>
                    <div className="space-y-2">
                      {analysisResults.keywords.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg border border-n-200 p-3">
                          <BarChart3 className="h-4 w-4 text-accent" />
                          <span className="text-n-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{keywords.entities as string}</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.keywords.entities.map((entity, i) => (
                        <span key={i} className="rounded-full bg-n-100 px-3 py-1.5 text-sm text-n-700">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sentiment Tab */}
              {activeTab === 'sentiment' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{sentiment.overall as string}</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16">
                        <svg className="h-16 w-16 -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#E9ECEF" strokeWidth="6" />
                          <circle
                            cx="32" cy="32" r="28" fill="none" stroke="#10B981" strokeWidth="6"
                            strokeDasharray={`${(analysisResults.sentiment.score / 100) * 176} 176`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-n-900">
                          {analysisResults.sentiment.score}%
                        </span>
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                          {sentiment.positive as string}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold text-n-900">{sentiment.emotions as string}</h3>
                    <div className="space-y-3">
                      {analysisResults.sentiment.emotions.map((emotion, i) => (
                        <div key={i}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="text-n-700">{emotion.name}</span>
                            <span className="text-n-500">{emotion.score}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-n-200">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${emotion.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    { label: stats.words as string, value: analysisResults.stats.words },
                    { label: stats.sentences as string, value: analysisResults.stats.sentences },
                    { label: stats.paragraphs as string, value: analysisResults.stats.paragraphs },
                    { label: stats.readingTime as string, value: analysisResults.stats.readingTime },
                    { label: stats.readability as string, value: analysisResults.stats.readability },
                    { label: stats.complexity as string, value: analysisResults.stats.complexity },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-n-200 p-4 text-center">
                      <div className="text-2xl font-bold text-n-900">{stat.value}</div>
                      <div className="mt-1 text-sm text-n-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

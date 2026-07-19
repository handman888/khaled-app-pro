'use client';

import { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Download, Loader2, Upload, Save, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslateToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function TranslateTool({ locale, messages }: TranslateToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).translate as Record<string, unknown>;
  const features = (t.features || {}) as Record<string, string>;
  const formalities = (t.formalities || {}) as Record<string, string>;
  const contextOptions = (t.contextOptions || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('ar');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formality, setFormality] = useState('neutral');
  const [context, setContext] = useState('general');
  const [saved, setSaved] = useState(false);

  const languages = [
    { code: 'auto', name: t.autoDetect as string },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'sv', name: 'Svenska' },
  ];

  const commonPhrases = [
    { en: 'Hello', ar: 'مرحبا' },
    { en: 'Thank you', ar: 'شكرا' },
    { en: 'How are you?', ar: 'كيف حالك؟' },
    { en: 'Good morning', ar: 'صباح الخير' },
    { en: 'Goodbye', ar: 'مع السلامة' },
    { en: 'Please', ar: 'من فضلك' },
    { en: 'Yes', ar: 'نعم' },
    { en: 'No', ar: 'لا' },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock translation
    const translations: Record<string, Record<string, string>> = {
      'en-ar': {
        'Hello': 'مرحبا',
        'Thank you': 'شكرا',
        'Good morning': 'صباح الخير',
        'How are you?': 'كيف حالك؟',
      }
    };

    setTranslatedText(sourceText.split(' ').map(word => {
      const lower = word.toLowerCase();
      return translations['en-ar'][lower] || word;
    }).join(' '));
    setIsTranslating(false);
  };

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Translation Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Language Selection */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-n-700">{t.sourceLang as string}</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwapLanguages}
            disabled={sourceLang === 'auto'}
            className={cn(
              'mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-n-200 transition-all',
              sourceLang === 'auto'
                ? 'cursor-not-allowed text-n-400'
                : 'hover:border-accent hover:bg-accent/5 hover:text-accent'
            )}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-n-700">{t.targetLang as string}</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
            >
              {languages.filter(l => l.code !== 'auto').map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Areas */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Source Text */}
          <div className="rounded-xl border border-n-200 bg-white">
            <div className="flex items-center justify-between border-b border-n-200 px-4 py-3">
              <span className="text-sm font-medium text-n-700">
                {languages.find(l => l.code === sourceLang)?.name}
              </span>
              <span className="text-xs text-n-500">
                {sourceText.length} {t.characterCount as string}
              </span>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={t.inputPlaceholder as string}
              rows={8}
              className="w-full resize-none border-0 bg-transparent px-4 py-3 text-n-900 placeholder-n-400 focus:outline-none"
            />
            <div className="flex items-center justify-between border-t border-n-200 px-4 py-2">
              <button className="text-n-400 hover:text-n-600">
                <Volume2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSourceText('')}
                className="text-xs text-n-500 hover:text-n-700"
              >
                {t.clear as string}
              </button>
            </div>
          </div>

          {/* Target Text */}
          <div className="rounded-xl border border-n-200 bg-n-50">
            <div className="flex items-center justify-between border-b border-n-200 px-4 py-3">
              <span className="text-sm font-medium text-n-700">
                {languages.find(l => l.code === targetLang)?.name}
              </span>
              <div className="flex items-center gap-2">
                {isTranslating && (
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                )}
                <span className="text-xs text-n-500">
                  {translatedText.length} {t.characterCount as string}
                </span>
              </div>
            </div>
            <div className="min-h-[200px] px-4 py-3">
              {translatedText ? (
                <p className="text-n-900 whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <p className="text-n-400">{t.outputPlaceholder as string}</p>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-n-200 px-4 py-2">
              <button className="text-n-400 hover:text-n-600">
                <Volume2 className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!translatedText}
                  className="flex items-center gap-1 text-xs text-n-500 hover:text-n-700 disabled:opacity-50"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? t.copied as string : t.copy as string}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!translatedText}
                  className="flex items-center gap-1 text-xs text-n-500 hover:text-n-700 disabled:opacity-50"
                >
                  <Save className="h-3 w-3" />
                  {saved ? t.saved as string : t.save as string}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isTranslating}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            sourceText.trim() && !isTranslating
              ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
              : 'bg-n-200 text-n-500 cursor-not-allowed'
          )}
        >
          {isTranslating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.translating as string}
            </>
          ) : (
            t.translate as string
          )}
        </button>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-n-700">{t.formality as string}</label>
            <select
              value={formality}
              onChange={(e) => setFormality(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
            >
              {Object.entries(formalities).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-n-700">{t.context as string}</label>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
            >
              {Object.entries(contextOptions).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div className="rounded-xl border-2 border-dashed border-n-300 bg-n-50 p-6 text-center hover:border-accent hover:bg-accent/5">
          <Upload className="mx-auto mb-2 h-8 w-8 text-n-400" />
          <p className="text-sm text-n-600">{t.dragDrop as string}</p>
          <p className="mt-1 text-xs text-n-400">{t.supportedFormats as string}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Features */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-n-700">
            {locale === 'ar' ? 'المميزات' : 'Features'}
          </h4>
          <div className="space-y-3">
            {Object.entries(features).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <Check className="h-3 w-3 text-success" />
                </div>
                <span className="text-sm text-n-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Phrases */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-n-700">{t.commonPhrases as string}</h4>
          <div className="space-y-2">
            {commonPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => setSourceText(phrase.en)}
                className="flex w-full items-center justify-between rounded-lg border border-n-200 p-2 text-left text-sm hover:border-accent hover:bg-accent/5"
              >
                <span className="text-n-700">{phrase.en}</span>
                <span className="text-n-500">{phrase.ar}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Translations */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-n-700">{t.savedTranslations as string}</h4>
          <div className="space-y-2">
            <div className="rounded-lg bg-n-50 p-3">
              <p className="text-xs text-n-500">EN → AR</p>
              <p className="text-sm text-n-700">Hello → مرحبا</p>
            </div>
            <div className="rounded-lg bg-n-50 p-3">
              <p className="text-xs text-n-500">EN → AR</p>
              <p className="text-sm text-n-700">Thank you → شكرا</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

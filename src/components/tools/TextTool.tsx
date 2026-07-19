'use client';

import { useState } from 'react';
import { Copy, Download, Trash2, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function TextTool({ locale, messages }: TextToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).text as Record<string, unknown>;
  const categories = (t.categories || {}) as Record<string, string>;
  const tones = (t.tones || {}) as Record<string, string>;
  const lengths = (t.lengths || {}) as Record<string, string>;
  const placeholders = (t.placeholders || {}) as Record<string, string>;

  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: Record<string, string> = {
      blog: locale === 'ar' 
        ? `# ${prompt}\n\nفي عالم يتطور بسرعة نحو التحول الرقمي، أصبح من الضروري اتباع أحدث التقنيات والأدوات للبقاء في المقدمة. يتناول هذا المقال أهمية التinnovation وكيف يمكن للشركات الاستفادة من التقنيات الحديثة لتحسين إنتاجيتها.\n\n## لماذا التinnovation مهم؟\n\nيعتبر الابتكار من العوامل الرئيسية للنجاح في أي مجال. فبدون تطوير مستمر، تفقد الشركات قدرتها على المنافسة.\n\n## كيف تبدأ؟\n\n1. حدد احتياجات عملك\n2. ابحث عن الحلول المناسبة\n3. قم بالتطبيق التدريجي\n4. قِس النتائج وحسّن`
        : `# ${prompt}\n\nIn today's rapidly evolving digital landscape, staying ahead of the curve is essential for success. This article explores the importance of innovation and how businesses can leverage modern tools to enhance their productivity.\n\n## Why Innovation Matters\n\nInnovation is a key driver of success in any field. Without continuous development, businesses risk falling behind their competitors.\n\n## How to Get Started\n\n1. Identify your business needs\n2. Research available solutions\n3. Implement gradually\n4. Measure results and optimize`,
      
      social: locale === 'ar'
        ? `✨ ${prompt}\n\nاكتشف القوة الحقيقية للأدوات الحديثة التي تغير طريقة عملنا! 🚀\n\n#تصميم_رقمي #ذكاء_اصطناعي #ابتكار`
        : `✨ ${prompt}\n\nDiscover the real power of modern tools that are transforming how we work! 🚀\n\n#DigitalDesign #AI #Innovation`,
      
      email: locale === 'ar'
        ? `الموضوع: ${prompt}\n\nعزيزي/عزيزتي،\n\nنتشرف بمكاتبتكم بخصوص ${prompt}. نسعى دائماً لتقديم أفضل الحلول لعملائنا.\n\nنتطلع للتعاون معكم.\n\nمع خالص التحية،\nفريق العمل`
        : `Subject: ${prompt}\n\nDear [Name],\n\nI hope this email finds you well. I am writing to discuss ${prompt}. We are committed to providing the best solutions for our clients.\n\nWe look forward to working with you.\n\nBest regards,\nThe Team`,
      
      ad: locale === 'ar'
        ? `🔥 ${prompt} 🔥\n\nاحصل على أفضل الحلول الآن!\n✅ جودة احترافية\n✅ أسعار منافسة\n✅ دعم متواصل\n\nلا تفوت الفرصة! سجّل الآن 👇`
        : `🔥 ${prompt} 🔥\n\nGet the best solutions now!\n✅ Professional quality\n✅ Competitive prices\n✅ Continuous support\n\nDon't miss out! Sign up now 👇`,
      
      resume: locale === 'ar'
        ? `ملخص مهني:\n\nمتخصص ذو خبرة واسعة في مجال ${prompt}. يمتلك مهارات قوية في القيادة والتحليل وحل المشكلات. يسعى دائماً للتطور المهني وتقديم أفضل النتائج.\n\nالمهارات الرئيسية:\n• التخطيط والاستراتيجية\n• إدارة الفرق\n• التحليل والتقارير\n• الاتصال والعرض`
        : `Professional Summary:\n\nExperienced specialist with extensive expertise in ${prompt}. Strong skills in leadership, analysis, and problem-solving. Always seeking professional development and delivering optimal results.\n\nKey Skills:\n• Strategic Planning\n• Team Management\n• Analysis & Reporting\n• Communication & Presentation`,
      
      product: locale === 'ar'
        ? `📝 وصف المنتج: ${prompt}\n\nاكتشف مزايا هذا المنتج الرائع الذي يجمع بين الجودة العالية والتصميم الأنيق. مثالي لمن يبحث عن الأفضل.\n\n✨ المزايا:\n• تصميم عصري وأنيق\n• جودة عالية مضمونة\n• سهل الاستخدام\n• قيمة ممتازة للسعر`
        : `📝 Product Description: ${prompt}\n\nDiscover the amazing features of this product that combines premium quality with elegant design. Perfect for those seeking the best.\n\n✨ Features:\n• Modern & elegant design\n• Premium quality guaranteed\n• Easy to use\n• Excellent value for money`
    };
    
    setResult(mockResults[category] || mockResults.blog);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            {t.templates as string}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                  category === key
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-n-700">
            {t.placeholder as string}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[category] || placeholders.blog}
            rows={4}
            className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-n-700">
              {t.tone as string}
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(tones).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="mb-2 block text-sm font-medium text-n-700">
              {t.length as string}
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(lengths).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            prompt.trim() && !isGenerating
              ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
              : 'bg-n-200 text-n-500 cursor-not-allowed'
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.generating as string}
            </>
          ) : (
            t.generate as string
          )}
        </button>
      </div>

      {/* Output Panel */}
      <div className="rounded-2xl border border-n-200 bg-white">
        {/* Output Header */}
        <div className="flex items-center justify-between border-b border-n-200 px-6 py-4">
          <h3 className="font-semibold text-n-900">{t.result as string}</h3>
          <div className="flex items-center gap-2">
            {result && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-success" />
                      {t.copied as string}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {t.copy as string}
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
                  <Download className="h-4 w-4" />
                  {t.download as string}
                </button>
                <button
                  onClick={() => setResult('')}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
                  <Trash2 className="h-4 w-4" />
                  {t.clear as string}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Output Content */}
        <div className="p-6">
          {result ? (
            <div className="whitespace-pre-wrap text-n-700 leading-relaxed">
              {result}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر النصوص المُولدة هنا'
                  : 'Generated text will appear here'}
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        {result && (
          <div className="border-t border-n-200 px-6 py-3">
            <div className="flex items-center gap-4 text-sm text-n-500">
              <span>{result.split(/\s+/).length} {t.wordCount as string}</span>
              <span>{result.length} {t.charCount as string}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

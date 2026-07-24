'use client';

import { useState, useCallback } from 'react';
import { Upload, Code, Copy, Check, Loader2, Download, Eye, Maximize2, FileCode, Palette, Layout, Type, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageToCodeToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

interface AnalysisResult {
  code: string;
  analysis: {
    elements: string[];
    colors: string[];
    fonts: string[];
    layout: string;
  };
}

interface ApiError {
  error: string;
  code?: string;
  docs?: string;
}

type OutputFormat = 'html' | 'react' | 'vue' | 'nextjs' | 'svelte' | 'css';

export function ImageToCodeTool({ locale, messages }: ImageToCodeToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).imageToCode as Record<string, unknown>;

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('html');
  const [quality, setQuality] = useState<'high' | 'fast'>('high');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'analysis'>('code');
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('format', outputFormat);
      formData.append('quality', quality);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data: ApiError | AnalysisResult = await response.json();

      if (!response.ok) {
        const apiError = data as ApiError;
        throw new Error(apiError.error || 'Failed to analyze image');
      }

      setResult(data as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (result?.code) {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result?.code) return;

    const extensions: Record<OutputFormat, string> = {
      html: '.html',
      react: '.tsx',
      vue: '.vue',
      nextjs: '.tsx',
      svelte: '.svelte',
      css: '.css'
    };

    const blob = new Blob([result.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated-design${extensions[outputFormat]}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        {/* Upload Area */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            {t.upload as string}
          </label>
          <div
            className={cn(
              'relative rounded-xl border-2 border-dashed transition-all',
              uploadedImage
                ? 'border-accent bg-accent/5'
                : 'border-n-300 bg-n-50 hover:border-accent hover:bg-accent/5'
            )}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="image-to-code-upload"
            />
            <label
              htmlFor="image-to-code-upload"
              className="flex cursor-pointer flex-col items-center justify-center p-8"
            >
              {uploadedImage ? (
                <div className="relative w-full">
                  <img
                    src={uploadedImage}
                    alt="Uploaded design"
                    className="max-h-64 w-full rounded-lg object-contain"
                  />
                  <div className="absolute right-2 top-2 rounded-lg bg-white/90 px-3 py-1 text-xs font-medium text-n-700 shadow-sm">
                    {t.changeImage as string}
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="mb-3 h-10 w-10 text-n-400" />
                  <p className="text-base font-medium text-n-700">{t.dragDrop as string}</p>
                  <p className="mt-1 text-sm text-n-500">{t.supportedFormats as string}</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Output Format Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            <Code className="mr-2 inline h-4 w-4" />
            {t.outputFormat as string}
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['html', 'react', 'vue', 'nextjs', 'svelte', 'css'] as OutputFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={cn(
                  'rounded-lg border px-4 py-3 text-sm font-medium transition-all',
                  outputFormat === format
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {(t.formats as Record<string, string>)?.[format] || format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            {locale === 'ar' ? 'جودة التحليل' : 'Analysis Quality'}
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setQuality('high')}
              className={cn(
                'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all',
                quality === 'high'
                  ? 'border-accent bg-accent text-white'
                  : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
              )}
            >
              <div className="text-left">
                <div className="font-semibold">{locale === 'ar' ? 'عالية الجودة' : 'High Quality'}</div>
                <div className="mt-0.5 text-xs opacity-80">{locale === 'ar' ? 'تفاصيل أكثر، أكواد أطول' : 'More detail, longer code'}</div>
              </div>
            </button>
            <button
              onClick={() => setQuality('fast')}
              className={cn(
                'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all',
                quality === 'fast'
                  ? 'border-accent bg-accent text-white'
                  : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
              )}
            >
              <div className="text-left">
                <div className="font-semibold">{locale === 'ar' ? 'سريع' : 'Fast'}</div>
                <div className="mt-0.5 text-xs opacity-80">{locale === 'ar' ? 'أسرع، أقل تكلفة' : 'Faster, lower cost'}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!uploadedImage || isAnalyzing}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-all',
            uploadedImage && !isAnalyzing
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
              <Code className="h-5 w-5" />
              {t.analyze as string}
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-red-600">!</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
                {error.includes('API key') && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-red-600">
                      {locale === 'ar' ? 'الخطوات:' : 'Steps:'}
                    </p>
                    <ol className="list-inside list-decimal space-y-1 text-xs text-red-600">
                      <li>{locale === 'ar' ? 'أنشئ ملف .env.local في جذر المشروع' : 'Create a .env.local file in your project root'}</li>
                      <li>{locale === 'ar' ? 'أضف: OPENAI_API_KEY=sk-your-key-here' : 'Add: OPENAI_API_KEY=sk-your-key-here'}</li>
                      <li>{locale === 'ar' ? 'أعد تشغيل الخادم' : 'Restart the server'}</li>
                    </ol>
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 underline hover:text-red-800"
                    >
                      {locale === 'ar' ? 'احصل على مفتاح API' : 'Get API Key'}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Summary */}
        {result && (
          <div className="rounded-xl border border-n-200 bg-white p-5">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-n-900">
              <Eye className="h-4 w-4" />
              {t.analysisTitle as string}
            </h4>

            <div className="space-y-4">
              {/* Layout */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Layout className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-n-500">{t.layout as string}</p>
                  <p className="text-sm font-medium text-n-900">{result.analysis.layout}</p>
                </div>
              </div>

              {/* Colors */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                  <Palette className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-n-500">{t.colors as string}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {result.analysis.colors.slice(0, 8).map((color, i) => (
                      <div key={i} className="flex items-center gap-1.5 rounded-md bg-n-100 px-2 py-1">
                        <div
                          className="h-3 w-3 rounded-full border border-n-200"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-n-700">{color}</span>
                      </div>
                    ))}
                    {result.analysis.colors.length > 8 && (
                      <span className="rounded-md bg-n-100 px-2 py-1 text-xs text-n-500">
                        +{result.analysis.colors.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Fonts */}
              {result.analysis.fonts.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Type className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-n-500">{t.fonts as string}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {result.analysis.fonts.slice(0, 3).map((font, i) => (
                        <span key={i} className="rounded-md bg-n-100 px-2 py-1 text-xs text-n-700">
                          {font}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Elements */}
              {result.analysis.elements.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <Layers className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-n-500">{t.elements as string}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {result.analysis.elements.map((element, i) => (
                        <span key={i} className="rounded-md bg-n-100 px-2 py-1 text-xs text-n-700">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Output Panel */}
      <div className="rounded-2xl border border-n-200 bg-white">
        {/* Output Header */}
        <div className="flex items-center justify-between border-b border-n-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-n-500" />
            <h3 className="font-semibold text-n-900">{t.result as string}</h3>
          </div>
          <div className="flex items-center gap-2">
            {result && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
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
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        {result && (
          <div className="border-b border-n-200 px-6">
            <nav className="flex gap-1">
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === 'code'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-n-500 hover:text-n-700'
                )}
              >
                <Code className="mr-1.5 inline h-4 w-4" />
                {t.codeTab as string}
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={cn(
                  'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === 'analysis'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-n-500 hover:text-n-700'
                )}
              >
                <Eye className="mr-1.5 inline h-4 w-4" />
                {t.analysisTab as string}
              </button>
            </nav>
          </div>
        )}

        {/* Output Content */}
        <div className="p-6">
          {result ? (
            activeTab === 'code' ? (
              <div className="relative">
                <pre className="overflow-x-auto rounded-xl bg-n-900 p-4 text-sm leading-relaxed text-n-100">
                  <code>{result.code}</code>
                </pre>
                <div className="absolute right-3 top-3">
                  <span className="rounded-md bg-n-800 px-2 py-1 text-xs text-n-400">
                    {outputFormat.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-n-900">{t.detailedAnalysis as string}</h4>
                <div className="whitespace-pre-wrap rounded-xl bg-n-50 p-4 text-sm text-n-700">
                  {result.code.split('\n').slice(0, 50).join('\n')}
                  {result.code.split('\n').length > 50 && '\n\n... (truncated for preview)'}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-n-100">
                <Code className="h-10 w-10 text-n-400" />
              </div>
              <p className="text-lg font-medium text-n-700">
                {locale === 'ar'
                  ? 'ارفع صورة لبدء التحليل'
                  : 'Upload an image to start analysis'}
              </p>
              <p className="mt-1 text-sm text-n-500">
                {locale === 'ar'
                  ? 'سنحلل التصميم ونولّد الكود المناسب'
                  : "We'll analyze the design and generate matching code"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

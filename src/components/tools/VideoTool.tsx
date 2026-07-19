'use client';

import { useState } from 'react';
import { Download, Share2, Play, Pause, Loader2, Upload, Clock, Monitor, RectangleHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function VideoTool({ locale, messages }: VideoToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).video as Record<string, unknown>;
  const durations = (t.durations || {}) as Record<string, string>;
  const qualities = (t.qualities || {}) as Record<string, string>;
  const ratios = (t.ratios || {}) as Record<string, string>;
  const templates = (t.templates || {}) as Record<string, string>;

  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('medium');
  const [quality, setQuality] = useState('fullhd');
  const [ratio, setRatio] = useState('landscape');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedVideo) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setResult(true);
    setIsGenerating(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
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
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              onChange={handleUpload}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-n-300 bg-n-50 p-8 transition-colors hover:border-accent hover:bg-accent/5"
            >
              <Upload className="mb-3 h-8 w-8 text-n-400" />
              <p className="text-sm text-n-600">{t.dragDrop as string}</p>
              <p className="mt-1 text-xs text-n-400">{t.formats as string}</p>
            </label>
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-n-700">
            {t.prompt as string}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.placeholder as string}
            rows={3}
            className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Templates */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            {t.templates as string}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(templates).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                  selectedTemplate === key
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Duration */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-n-700">
              <Clock className="h-4 w-4" />
              {t.duration as string}
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(durations).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-n-700">
              <Monitor className="h-4 w-4" />
              {t.quality as string}
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(qualities).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-n-700">
              <RectangleHorizontal className="h-4 w-4" />
              {t.aspectRatio as string}
            </label>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(ratios).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={(!prompt.trim() && !uploadedVideo) || isGenerating}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            (prompt.trim() || uploadedVideo) && !isGenerating
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
                <button className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100">
                  <Download className="h-4 w-4" />
                  {t.download as string}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100">
                  <Share2 className="h-4 w-4" />
                  {t.share as string}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Output Content */}
        <div className="p-6">
          {result || uploadedVideo ? (
            <div className="relative overflow-hidden rounded-xl bg-n-900">
              {/* Video Placeholder */}
              <div className={cn(
                'w-full bg-gradient-to-br from-accent/20 to-accent-secondary/20',
                ratio === 'landscape' ? 'aspect-video' : 
                ratio === 'portrait' ? 'aspect-[9/16]' : 'aspect-square'
              )}>
                <div className="flex h-full flex-col items-center justify-center text-white">
                  {isPlaying ? (
                    <div className="text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-8 w-8 fill-white" />
                      </div>
                      <p className="text-sm text-white/80">
                        {locale === 'ar' ? 'جاري التشغيل...' : 'Playing...'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-8 w-8 fill-white" />
                      </div>
                      <p className="text-lg font-semibold">{prompt || 'AI Generated Video'}</p>
                      <p className="mt-2 text-sm text-white/60">
                        {durations[duration]} • {qualities[quality]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 fill-white text-white" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full w-1/3 bg-accent" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">🎬</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر الفيديو المُولد هنا'
                  : 'Generated video will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

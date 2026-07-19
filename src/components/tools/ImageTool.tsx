'use client';

import { useState } from 'react';
import { Download, Share2, Maximize2, Loader2, Upload, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function ImageTool({ locale, messages }: ImageToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).image as Record<string, unknown>;
  const styles = (t.styles || {}) as Record<string, string>;
  const sizes = (t.sizes || {}) as Record<string, string>;

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('square');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a placeholder with gradient
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    setResult(gradient);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    // Create a canvas to generate the image
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(prompt || 'AI Generated Image', canvas.width / 2, canvas.height / 2);
      
      // Download
      const link = document.createElement('a');
      link.download = `generated-image-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
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
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
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

        {/* Style Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            <Palette className="mr-2 inline h-4 w-4" />
            Style
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(styles).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStyle(key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-medium transition-all',
                  style === key
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-n-700">
            <Maximize2 className="mr-2 inline h-4 w-4" />
            Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sizes).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSize(key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                  size === key
                    ? 'border-accent bg-accent text-white'
                    : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={(!prompt.trim() && !uploadedImage) || isGenerating}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            (prompt.trim() || uploadedImage) && !isGenerating
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
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
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
          {result ? (
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="aspect-square w-full rounded-xl"
                style={{ background: result }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-lg font-semibold text-white drop-shadow-lg">
                  {prompt || 'AI Generated Image'}
                </p>
              </div>
            </div>
          ) : uploadedImage ? (
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="aspect-square w-full object-cover rounded-xl"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">🖼️</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر الصورة المُولدة هنا'
                  : 'Generated image will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

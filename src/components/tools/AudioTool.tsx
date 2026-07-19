'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Square, Download, Loader2, Music, Mic, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function AudioTool({ locale, messages }: AudioToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).audio as Record<string, unknown>;
  const genres = (t.genres || {}) as Record<string, string>;
  const voices = (t.voices || {}) as Record<string, string>;
  const moods = (t.moods || {}) as Record<string, string>;
  const effects = (t.effects || {}) as Record<string, string>;
  const formats = (t.formats || {}) as Record<string, string>;
  const tabs = (t.tabs || {}) as Record<string, string>;
  const placeholders = (t.placeholder || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'music' | 'voiceover' | 'effects'>('music');
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('corporate');
  const [voice, setVoice] = useState('male');
  const [mood, setMood] = useState('happy');
  const [effectType, setEffectType] = useState('nature');
  const [duration, setDuration] = useState('30');
  const [bpm, setBpm] = useState('120');
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLDivElement>(null);

  // Simulate waveform
  const waveformBars = Array.from({ length: 50 }, () => Math.random() * 100);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setIsPlaying(true);
    simulatePlayback();
  };

  const simulatePlayback = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      simulatePlayback();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-n-200 bg-n-100 p-1">
          {[
            { id: 'music' as const, icon: Music, label: tabs.music },
            { id: 'voiceover' as const, icon: Mic, label: tabs.voiceover },
            { id: 'effects' as const, icon: Volume2, label: tabs.effects },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white text-n-900 shadow-sm'
                  : 'text-n-600 hover:text-n-900'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Prompt Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-n-700">
            {t.prompt as string}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[activeTab] || placeholders.music}
            rows={3}
            className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Music Options */}
        {activeTab === 'music' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                {Object.entries(genres).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                {Object.entries(moods).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">{t.bpm as string}</label>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                min="60"
                max="200"
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">{t.duration as string}</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                <option value="15">15s</option>
                <option value="30">30s</option>
                <option value="60">60s</option>
                <option value="120">2min</option>
                <option value="300">5min</option>
              </select>
            </div>
          </div>
        )}

        {/* Voiceover Options */}
        {activeTab === 'voiceover' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Voice</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                {Object.entries(voices).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Language</label>
              <select className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">{t.speed as string}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between text-xs text-n-500">
                <span>0.5x</span>
                <span>{speed}x</span>
                <span>2x</span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Pitch</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                defaultValue="0"
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between text-xs text-n-500">
                <span>Low</span>
                <span>Normal</span>
                <span>High</span>
              </div>
            </div>
          </div>
        )}

        {/* Effects Options */}
        {activeTab === 'effects' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">Effect Type</label>
              <select
                value={effectType}
                onChange={(e) => setEffectType(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                {Object.entries(effects).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">{t.duration as string}</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none"
              >
                <option value="5">5s</option>
                <option value="10">10s</option>
                <option value="30">30s</option>
                <option value="60">60s</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium text-n-700">Layers</label>
              <div className="flex gap-2">
                {['Single', 'Layered', 'Complex'].map((layer) => (
                  <button
                    key={layer}
                    className="flex-1 rounded-lg border border-n-200 px-3 py-2 text-sm text-n-700 hover:border-accent hover:bg-accent/5"
                  >
                    {layer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
            <>
              <Music className="h-5 w-5" />
              {t.generate as string}
            </>
          )}
        </button>
      </div>

      {/* Output Panel */}
      <div className="rounded-2xl border border-n-200 bg-white">
        {/* Output Header */}
        <div className="flex items-center justify-between border-b border-n-200 px-6 py-4">
          <h3 className="font-semibold text-n-900">{t.result as string}</h3>
          <button className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 hover:bg-n-100">
            <Download className="h-4 w-4" />
            {t.download as string}
          </button>
        </div>

        {/* Audio Player */}
        <div className="p-6">
          {prompt ? (
            <div className="space-y-6">
              {/* Waveform Visualization */}
              <div ref={audioRef} className="rounded-xl bg-n-900 p-6">
                <div className="mb-4 flex items-center justify-between text-xs text-n-400">
                  <span>{t.waveform as string}</span>
                  <span>{duration}s</span>
                </div>
                <div className="flex h-24 items-end gap-1">
                  {waveformBars.map((height, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 rounded-t transition-all',
                        i < (progress / 100) * waveformBars.length
                          ? 'bg-accent'
                          : 'bg-n-700'
                      )}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-1 rounded-full bg-n-700">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleStop}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-n-800 text-n-400 hover:bg-n-700 hover:text-white"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white hover:bg-accent/90"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-0.5" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-n-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-20 accent-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Audio Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-n-100 p-3 text-center">
                  <div className="text-xs text-n-500">{t.duration as string}</div>
                  <div className="mt-1 font-semibold text-n-900">{duration}s</div>
                </div>
                <div className="rounded-lg bg-n-100 p-3 text-center">
                  <div className="text-xs text-n-500">{t.format as string}</div>
                  <div className="mt-1 font-semibold text-n-900">MP3</div>
                </div>
                <div className="rounded-lg bg-n-100 p-3 text-center">
                  <div className="text-xs text-n-500">Quality</div>
                  <div className="mt-1 font-semibold text-n-900">320kbps</div>
                </div>
              </div>

              {/* Trim Controls */}
              <div className="rounded-xl border border-n-200 p-4">
                <h4 className="mb-3 text-sm font-medium text-n-700">{t.trim as string}</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs text-n-500">Start</label>
                    <input
                      type="text"
                      defaultValue="0:00"
                      className="w-full rounded-lg border border-n-200 px-3 py-2 text-sm text-center focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="text-n-400">—</div>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs text-n-500">End</label>
                    <input
                      type="text"
                      defaultValue={`0:${duration}`}
                      className="w-full rounded-lg border border-n-200 px-3 py-2 text-sm text-center focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">🎵</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر الصوتيات المُولدة هنا'
                  : 'Generated audio will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

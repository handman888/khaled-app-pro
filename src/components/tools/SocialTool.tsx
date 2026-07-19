'use client';

import { useState } from 'react';
import { 
  Camera, MessageCircle, Briefcase, Users, 
  Plus, Calendar, BarChart3, Loader2, 
  Send, Clock, Image as ImageIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

interface Post {
  id: number;
  content: string;
  platform: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'published';
  hashtags: string[];
}

export function SocialTool({ locale, messages }: SocialToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).social as Record<string, unknown>;
  const platformNames = (t.platformNames || {}) as Record<string, string>;
  const days = (t.days || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'create' | 'calendar' | 'analytics'>('create');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { id: 'instagram', icon: Camera, color: 'text-pink-500' },
    { id: 'twitter', icon: MessageCircle, color: 'text-blue-400' },
    { id: 'linkedin', icon: Briefcase, color: 'text-blue-600' },
    { id: 'facebook', icon: Users, color: 'text-blue-700' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(
      selectedPlatforms.includes(platformId)
        ? selectedPlatforms.filter((p) => p !== platformId)
        : [...selectedPlatforms, platformId]
    );
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedContent = locale === 'ar'
      ? '✨ اكتشف قوة التصميم الذكي! أنشئ محتوى احترافي في ثوانٍ مع أدواتنا المدعومة بالذكاء الاصطناعي. 🚀\n\nابدأ رحلتك الإبداعية اليوم!'
      : '✨ Discover the power of smart design! Create professional content in seconds with our AI-powered tools. 🚀\n\nStart your creative journey today!';
    
    setPostContent(generatedContent);
    setIsGenerating(false);
  };

  const handleSchedulePost = () => {
    if (!postContent.trim()) return;
    
    const newPost: Post = {
      id: Date.now(),
      content: postContent,
      platform: selectedPlatforms[0],
      scheduledDate,
      scheduledTime,
      status: scheduledDate ? 'scheduled' : 'draft',
      hashtags,
    };
    
    setPosts([...posts, newPost]);
    setPostContent('');
    setHashtags([]);
    setScheduledDate('');
    setScheduledTime('');
  };

  const publishNow = () => {
    if (!postContent.trim()) return;
    
    const newPost: Post = {
      id: Date.now(),
      content: postContent,
      platform: selectedPlatforms[0],
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: new Date().toTimeString().slice(0, 5),
      status: 'published',
      hashtags,
    };
    
    setPosts([...posts, newPost]);
    setPostContent('');
    setHashtags([]);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const calendarDays = [];
    
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }
    
    return calendarDays;
  };

  // Analytics mock data
  const analyticsData = {
    followers: { value: '12.5K', change: '+8.2%' },
    engagement: { value: '4.7%', change: '+1.3%' },
    reach: { value: '45.2K', change: '+12.5%' },
    impressions: { value: '89.3K', change: '+6.8%' },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left Panel */}
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 rounded-xl border border-n-200 bg-n-100 p-1">
          {[
            { id: 'create' as const, label: t.createPost as string },
            { id: 'calendar' as const, label: t.calendar as string },
            { id: 'analytics' as const, label: t.analytics as string },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white text-n-900 shadow-sm'
                  : 'text-n-600 hover:text-n-900'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Create Post Tab */}
        {activeTab === 'create' && (
          <div className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-n-700">
                {t.platforms as string}
              </label>
              <div className="flex gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all',
                      selectedPlatforms.includes(platform.id)
                        ? 'border-accent bg-accent text-white'
                        : 'border-n-200 text-n-700 hover:border-n-300 hover:bg-n-100'
                    )}
                  >
                    <platform.icon className={cn('h-4 w-4', !selectedPlatforms.includes(platform.id) && platform.color)} />
                    {platformNames[platform.id] || platform.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-n-700">
                  {t.postContent as string}
                </label>
                <button
                  onClick={handleAiGenerate}
                  disabled={isGenerating}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                    !isGenerating
                      ? 'bg-accent/10 text-accent hover:bg-accent/20'
                      : 'bg-n-100 text-n-400 cursor-not-allowed'
                  )}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>✨</span>
                  )}
                  {t.aiGenerate as string}
                </button>
              </div>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={t.postPlaceholder as string}
                rows={4}
                className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <div className="mt-1 text-right text-xs text-n-500">
                {postContent.length}/280
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <label className="mb-2 block text-sm font-medium text-n-700">
                {t.hashtags as string}
              </label>
              <div className="mb-2 flex gap-2">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHashtag()}
                  placeholder={t.addHashtag as string}
                  className="flex-1 rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
                <button
                  onClick={addHashtag}
                  className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent/90"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                  >
                    #{tag}
                    <button onClick={() => removeHashtag(tag)} className="hover:text-accent/80">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-n-700">
                  <Calendar className="mr-1.5 inline h-4 w-4" />
                  {t.schedule as string}
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-n-700">
                  <Clock className="mr-1.5 inline h-4 w-4" />
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full rounded-lg border border-n-200 px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={publishNow}
                disabled={!postContent.trim()}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all',
                  postContent.trim()
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-n-200 text-n-500 cursor-not-allowed'
                )}
              >
                <Send className="h-4 w-4" />
                {t.publishNow as string}
              </button>
              <button
                onClick={handleSchedulePost}
                disabled={!postContent.trim()}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 rounded-xl border border-n-200 py-3 text-sm font-semibold transition-all',
                  postContent.trim()
                    ? 'text-n-700 hover:bg-n-100'
                    : 'text-n-400 cursor-not-allowed'
                )}
              >
                <Clock className="h-4 w-4" />
                {t.schedule as string}
              </button>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="rounded-xl border border-n-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-n-900">
                {locale === 'ar' ? 'يوليو 2026' : 'July 2026'}
              </h3>
              <div className="flex gap-2">
                <button className="rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 hover:bg-n-100">
                  {t.weekView as string}
                </button>
                <button className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white">
                  {t.monthView as string}
                </button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Object.values(days).slice(0, 7).map((day) => (
                <div key={day} className="p-2 text-center text-xs font-medium text-n-500">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    'min-h-[60px] rounded-lg border border-n-100 p-1.5',
                    day && 'hover:border-accent/30 hover:bg-accent/5'
                  )}
                >
                  {day && (
                    <>
                      <span className="text-xs text-n-600">{day}</span>
                      {day === 15 && (
                        <div className="mt-1 rounded bg-accent/10 px-1.5 py-0.5 text-xs text-accent">
                          Post
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(analyticsData).map(([key, data]) => (
                <div key={key} className="rounded-xl border border-n-200 bg-white p-4">
                  <div className="text-sm text-n-500 capitalize">
                    {t[key as keyof typeof t] as string}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-n-900">{data.value}</span>
                    <span className="text-sm text-success">{data.change}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Simple Chart Placeholder */}
            <div className="rounded-xl border border-n-200 bg-white p-6">
              <h3 className="mb-4 font-semibold text-n-900">{t.growth as string}</h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/20 rounded-t transition-all hover:bg-accent/30"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-n-500">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Posts List */}
      <div className="rounded-2xl border border-n-200 bg-white">
        <div className="border-b border-n-200 px-6 py-4">
          <h3 className="font-semibold text-n-900">{t.scheduled as string} & {t.published as string}</h3>
        </div>
        
        <div className="p-6">
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="rounded-xl border border-n-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-medium',
                      post.status === 'published' ? 'bg-success/10 text-success' :
                      post.status === 'scheduled' ? 'bg-info/10 text-info' :
                      'bg-n-100 text-n-600'
                    )}>
                      {post.status === 'published' ? t.published as string :
                       post.status === 'scheduled' ? t.scheduled as string :
                       t.draft as string}
                    </span>
                    <span className="text-xs text-n-500">
                      {post.scheduledDate} {post.scheduledTime}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-n-700">{post.content}</p>
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-xs text-accent">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">📱</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'لم تنشر أي منشورات بعد'
                  : 'No posts published yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

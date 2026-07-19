'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Plus, Loader2, Copy, Check, Settings, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatTool({ locale, messages }: ChatToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).chat as Record<string, unknown>;
  const models = (t.models || {}) as Record<string, string>;
  const suggestions = (t.suggestions || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState('fast');
  const [temperature, setTemperature] = useState(0.7);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      write: locale === 'ar'
        ? `## قصيدة عن التكنولوجيا

في عصرٍ من الصفر والواحد،
تتجلى القوى في كل لحظة.
الآلات تتعلم، والعالم يتغير،
والبشرية تخطو نحو آفاق جديدة.

من الخوارزميات الدقيقة،
تولد الأفكار كنوزاً ثمينة.
البيانات تجري كالأنهار،
والذكاء الاصطناعي يُشعل maneuvara.

في هذا العالم الرقمي الواسع،
نحول الأحلام إلى واقع ملموس.
التكنولوجيا ليست مجرد أدوات،
بل هي بوابتنا نحو الغد.`
        : `## Poem About Technology

In an era of zeros and ones,
Powers manifest in every moment.
Machines learn, the world transforms,
Humanity steps toward new horizons.

From precise algorithms,
Ideas bloom like precious treasures.
Data flows like rivers,
AI ignites the future.

In this vast digital world,
We turn dreams into reality.
Technology is not just tools,
It's our gateway to tomorrow.`,
      
      explain: locale === 'ar'
        ? `## الحوسبة الكمية - شرح بسيط

**الحوسبة الكمية** هي نوع جديد من الحوسبة يستخدم مبادئ ميكانيكا الكم لمعالجة المعلومات.

### الفروقات الرئيسية:

| الحوسبة العادية | الحوسبة الكمية |
|----------------|----------------|
| بت (0 أو 1) | كيوبت (0 و 1 في نفس الوقت) |
| خطية | متوازية بشكل هائل |
| مناسبة للمهام البسيطة | مناسبة للمشاكل المعقدة |

### تطبيقاتها:
1. **الكيمياء**: محاكاة الجزيئات لتطوير أدوية جديدة
2. **الأمن**: تشفير أكثر قوة
3. **الذكاء الاصطناعي**: تسريع التعلم الآلي
4. **ال_FINANCE**: تحسين المحافظ الاستثمارية

ببساطة، الحوسبة الكوية يمكنها حل مشاكل يستحيل على الحواسيب العادية حلها!`
        : `## Quantum Computing - Simple Explanation

**Quantum computing** is a new type of computing that uses quantum mechanics principles to process information.

### Key Differences:

| Classical Computing | Quantum Computing |
|--------------------|--------------------|
| Bit (0 or 1) | Qubit (0 and 1 simultaneously) | 
| Linear | Massively parallel |
| Good for simple tasks | Good for complex problems |

### Applications:
1. **Chemistry**: Simulating molecules for new drugs
2. **Security**: Stronger encryption
3. **AI**: Accelerating machine learning
4. **Finance**: Optimizing investment portfolios

In simple terms, quantum computing can solve problems impossible for classical computers!`,
      
      code: locale === 'ar'
        ? `## دالة بايثون لمعالجة البيانات

\`\`\`python
def process_data(data, filter_func=None, transform_func=None):
    """
    معالجة مجموعة بيانات مع إمكانية التصفية والتحويل.
    
    Args:
        data: قائمة البيانات
        filter_func: دالة تصفية اختيارية
        transform_func: دالة تحويل اختيارية
    
    Returns:
        list: البيانات المعالجة
    """
    result = data.copy()
    
    # تصفية البيانات
    if filter_func:
        result = [item for item in result if filter_func(item)]
    
    # تحويل البيانات
    if transform_func:
        result = [transform_func(item) for item in result]
    
    return result

# مثال على الاستخدام
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# تصفية الأرقام الفردية ومضاعفتها
result = process_data(
    numbers,
    filter_func=lambda x: x % 2 != 0,
    transform_func=lambda x: x * 2
)
print(result)  # [2, 6, 10, 14, 18]
\`\`\`

### مميزات الدالة:
- **مرنة**: تعمل مع أي نوع من البيانات
- **قابلة للتوسع**: سهلة الإضافة والتعديل
- **معزولة**: فصل منطق المعالجة`
        : `## Python Data Processing Function

\`\`\`python
def process_data(data, filter_func=None, transform_func=None):
    """
    Process a dataset with optional filtering and transformation.
    
    Args:
        data: List of data items
        filter_func: Optional filter function
        transform_func: Optional transform function
    
    Returns:
        list: Processed data
    """
    result = data.copy()
    
    # Filter data
    if filter_func:
        result = [item for item in result if filter_func(item)]
    
    # Transform data
    if transform_func:
        result = [transform_func(item) for item in result]
    
    return result

# Usage example
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter odd numbers and double them
result = process_data(
    numbers,
    filter_func=lambda x: x % 2 != 0,
    transform_func=lambda x: x * 2
)
print(result)  # [2, 6, 10, 14, 18]
\`\`\`

### Function Benefits:
- **Flexible**: Works with any data type
- **Extensible**: Easy to modify and extend
- **Isolated**: Separates processing logic`,
      
      brainstorm: locale === 'ar'
        ? `## أفكار مبتكرة لبدء أعمال

### 1. منصة تعليمية بالذكاء الاصطناعي
- تعليم مخصص لكل طالب
- تحليل نقاط القوة والضعف
- توصيات محتوى ذكية

### 2. تطبيق صحة ذكي
- مراقبة العادات الصحية
- توصيات غذاء مخصصة
- تكامل مع أجهزة اللياقة

### 3. سوق رقمي للمصممين
- portfolios ذكية
- مطابقة بالذكاء الاصطناعي مع العملاء
- نظام دفع آمن

### 4. منصة عمل عن بعد
- مراقبة الإنتاجية
- إدارة المشاريع بالذكاء الاصطناعي
- تكامل مع أدوات التطوير

### 5. تطبيق مستدام
- تتبع البصمة الكربونية
- اقتراحات لتقليل التأثير
- مكافآت للسلوك المستدام`
        : `## Innovative Startup Ideas

### 1. AI-Powered Learning Platform
- Personalized learning for each student
- Strength and weakness analysis
- Smart content recommendations

### 2. Smart Health App
- Health habit tracking
- Personalized nutrition suggestions
- Fitness device integration

### 3. Digital Marketplace for Designers
- Smart portfolios
- AI matching with clients
- Secure payment system

### 4. Remote Work Platform
- Productivity monitoring
- AI project management
- Developer tool integration

### 5. Sustainability App
- Carbon footprint tracking
- Impact reduction suggestions
- Rewards for sustainable behavior`
    };

    const matchedKey = Object.keys(responses).find(key => 
      input.toLowerCase().includes(key) || 
      (key === 'write' && (input.includes('poem') || input.includes('قصيدة'))) ||
      (key === 'explain' && (input.includes('explain') || input.includes('اشرح'))) ||
      (key === 'code' && (input.includes('code') || input.includes('function') || input.includes('كود'))) ||
      (key === 'brainstorm' && (input.includes('idea') || input.includes('فكر')))
    ) || 'brainstorm';

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: responses[matchedKey],
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, assistantMessage]);
    setIsGenerating(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="space-y-4 lg:col-span-1">
        {/* New Chat Button */}
        <button
          onClick={clearChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-n-200 bg-white py-3 text-sm font-medium text-n-700 transition-all hover:bg-n-100"
        >
          <Plus className="h-4 w-4" />
          {t.newChat as string}
        </button>

        {/* Settings */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex w-full items-center justify-between text-sm font-medium text-n-700"
          >
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t.settings as string}
            </span>
          </button>
          
          {showSettings && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-xs text-n-500">{t.model as string}</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded-lg border border-n-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                >
                  {Object.entries(models).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs text-n-500">
                  {t.temperature as string}: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Chat History */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-n-700">{t.chats as string}</h4>
          {chatMessages.length > 0 ? (
            <div className="space-y-2">
              <div className="rounded-lg bg-accent/5 p-2 text-sm text-accent">
                {chatMessages[0]?.content.slice(0, 30)}...
              </div>
            </div>
          ) : (
            <p className="text-xs text-n-500">{t.noChats as string}</p>
          )}
        </div>

        {/* Suggestions */}
        <div className="rounded-xl border border-n-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-n-700">{(t.suggestions as Record<string, string>).title}</h4>
          <div className="space-y-2">
            {Object.entries(suggestions).filter(([key]) => key !== 'title').map(([key, suggestion]) => (
              <button
                key={key}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full rounded-lg border border-n-200 p-2 text-left text-xs text-n-600 transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <div className="flex h-[calc(100vh-200px)] flex-col rounded-2xl border border-n-200 bg-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {chatMessages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <Bot className="h-10 w-10 text-accent" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-n-900">{t.welcome as string}</h2>
                <p className="text-n-500">{t.welcomeDesc as string}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-4',
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    )}
                  >
                    <div className={cn(
                      'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                      message.role === 'user' ? 'bg-accent' : 'bg-n-200'
                    )}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-n-600" />
                      )}
                    </div>
                    <div className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3',
                      message.role === 'user' ? 'bg-accent text-white' : 'bg-n-100 text-n-900'
                    )}>
                      <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                      <div className={cn(
                        'mt-2 flex items-center gap-2',
                        message.role === 'user' ? 'justify-end' : ''
                      )}>
                        <button
                          onClick={() => handleCopy(message.content, message.id)}
                          className="text-xs opacity-60 hover:opacity-100"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-n-200">
                      <Bot className="h-4 w-4 text-n-600" />
                    </div>
                    <div className="rounded-2xl bg-n-100 px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-n-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-n-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={t.placeholder as string}
                className="flex-1 rounded-xl border border-n-200 px-4 py-3 text-sm text-n-900 placeholder-n-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl transition-all',
                  input.trim() && !isGenerating
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-n-200 text-n-500 cursor-not-allowed'
                )}
              >
                {isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

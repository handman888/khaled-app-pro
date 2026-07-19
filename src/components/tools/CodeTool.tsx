'use client';

import { useState } from 'react';
import { Copy, Download, Trash2, Check, Loader2, Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeToolProps {
  locale: string;
  messages: Record<string, unknown>;
}

export function CodeTool({ locale, messages }: CodeToolProps) {
  const t = (messages.tools as Record<string, Record<string, unknown>>).code as Record<string, unknown>;
  const languages = (t.languages || {}) as Record<string, string>;
  const tabs = (t.tabs || {}) as Record<string, string>;
  const isRtl = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'generate' | 'explain' | 'debug' | 'convert'>('generate');
  const [language, setLanguage] = useState('javascript');
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [convertFrom, setConvertFrom] = useState('javascript');
  const [convertTo, setConvertTo] = useState('python');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(true);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockCode: Record<string, string> = {
      javascript: `// ${prompt}
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

// Usage
fetchData('https://api.example.com/data')
  .then(data => {
    // Handle the data
    processResults(data);
  });`,
      python: `# ${prompt}
import requests

def fetch_data(url):
    """
    Fetch data from the given URL.
    
    Args:
        url (str): The URL to fetch data from
        
    Returns:
        dict: The JSON response data
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(f"Data received: {data}")
        return data
    except requests.exceptions.RequestException as error:
        print(f"Error fetching data: {error}")
        raise

# Usage
if __name__ == "__main__":
    data = fetch_data("https://api.example.com/data")
    process_results(data)`,
      typescript: `// ${prompt}
interface ApiResponse {
  data: Record<string, unknown>;
  status: number;
}

async function fetchData(url: string): Promise<ApiResponse> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log('Data received:', data);
    
    return { data, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Usage
const result = await fetchData('https://api.example.com/data');
processResults(result.data);`,
      html: `<!-- ${prompt} -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome</h1>
  </header>
  <main>
    <p>This is a simple HTML page.</p>
  </main>
  <footer>
    <p>&copy; 2024</p>
  </footer>
</body>
</html>`,
      css: `/* ${prompt} */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.button:hover {
  background: #4f46e5;
}`,
      sql: `-- ${prompt}
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
    };

    setCode(mockCode[language] || mockCode.javascript);
    setIsGenerating(false);
  };

  const handleExplain = async () => {
    if (!code.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setExplanation(locale === 'ar'
      ? `## شرح الكود

هذا الكود يقوم بالآتي:

1. **الدالة الرئيسية**: تحدد دالة لجلب البيانات من رابط URL محدد
2. **معالجة الطلب**: تستخدم fetch (أو requests في بايثون) لإرسال طلب HTTP
3. **التحقق من الاستجابة**: تتحقق من نجاح الطلب
4. **معالجة البيانات**: تحلل البيانات المستلمةتنسيق JSON
5. **معالجة الأخطاء**: تلتقط أي أخطاء وتسجلها

### النقاط الرئيسية:
- استخدام async/await أو Promises للمعالجة غير المتزامنة
- معالجة أخطاء شاملة
- تنظيم الكود بشكل واضح وقابل للصيانة`
      : `## Code Explanation

This code does the following:

1. **Main Function**: Defines a function to fetch data from a specified URL
2. **Request Handling**: Uses fetch (or requests in Python) to make an HTTP request
3. **Response Validation**: Checks if the request was successful
4. **Data Processing**: Parses the received JSON data
5. **Error Handling**: Catches and logs any errors

### Key Points:
- Uses async/await or Promises for asynchronous processing
- Comprehensive error handling
- Clean, maintainable code structure`
    );
    setIsGenerating(false);
  };

  const handleDebug = async () => {
    if (!code.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setExplanation(locale === 'ar'
      ? `## تحليل الأخطاء

### تم العثور على مشكلة:
\`\`\`
Line 5: Missing error handling for null response
\`\`\`

### الاقتراح:
أضف تحققًا من وجود الاستجابة قبل معالجتها:

\`\`\`javascript
// قبل
const data = response.json();

// بعد
if (!response) {
  throw new Error('No response received');
}
const data = await response.json();
\`\`\`

### ملاحظات إضافية:
- تأكد من معالجة جميع حالات الخطأ المحتملة
- أضف تسجيلًا أفضل لتشخيص المشاكل`
      : `## Error Analysis

### Issue Found:
\`\`\`
Line 5: Missing error handling for null response
\`\`\`

### Suggestion:
Add validation for the response before processing:

\`\`\`javascript
// Before
const data = response.json();

// After
if (!response) {
  throw new Error('No response received');
}
const data = await response.json();
\`\`\`

### Additional Notes:
- Make sure to handle all possible error cases
- Add better logging for debugging`
    );
    setIsGenerating(false);
  };

  const handleConvert = async () => {
    if (!code.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCode(`# Converted from ${convertFrom} to ${convertTo}
# ${prompt || 'Converted code'}

def process_data(data):
    """Process the input data."""
    result = []
    for item in data:
        if item.get('active'):
            result.append({
                'id': item['id'],
                'name': item['name'].upper(),
                'processed': True
            })
    return result

# Main execution
if __name__ == "__main__":
    input_data = get_input_data()
    output = process_data(input_data)
    save_results(output)`);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      javascript: 'js', typescript: 'ts', python: 'py',
      java: 'java', cpp: 'cpp', html: 'html',
      css: 'css', sql: 'sql', php: 'php',
      ruby: 'rb', go: 'go', rust: 'rs', swift: 'swift'
    };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[language] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAction = () => {
    switch (activeTab) {
      case 'generate': handleGenerate(); break;
      case 'explain': handleExplain(); break;
      case 'debug': handleDebug(); break;
      case 'convert': handleConvert(); break;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Panel */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-n-200 bg-n-100 p-1">
          {Object.entries(tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === key
                  ? 'bg-white text-n-900 shadow-sm'
                  : 'text-n-600 hover:text-n-900'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Language Selection (for generate and convert) */}
        {(activeTab === 'generate' || activeTab === 'convert') && (
          <div>
            <label className="mb-3 block text-sm font-medium text-n-700">
              {activeTab === 'convert' ? (t.convertFrom as string) : (t.language as string)}
            </label>
            <select
              value={activeTab === 'convert' ? convertFrom : language}
              onChange={(e) => activeTab === 'convert' ? setConvertFrom(e.target.value) : setLanguage(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(languages).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Convert To (for convert tab) */}
        {activeTab === 'convert' && (
          <div>
            <label className="mb-3 block text-sm font-medium text-n-700">
              {t.convertTo as string}
            </label>
            <select
              value={convertTo}
              onChange={(e) => setConvertTo(e.target.value)}
              className="w-full rounded-lg border border-n-200 bg-white px-3 py-2.5 text-sm text-n-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {Object.entries(languages).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-n-700">
            {activeTab === 'generate' ? (t.prompt as string) :
             activeTab === 'explain' ? (t.explanation as string) :
             (t.debug as string)}
          </label>
          <textarea
            value={activeTab === 'generate' ? prompt : code}
            onChange={(e) => activeTab === 'generate' ? setPrompt(e.target.value) : setCode(e.target.value)}
            placeholder={activeTab === 'generate' ? (t.placeholder as string) :
                        activeTab === 'explain' ? (t.explanationPlaceholder as string) :
                        (t.errorPlaceholder as string)}
            rows={6}
            className="w-full rounded-xl border border-n-200 bg-white px-4 py-3 font-mono text-sm text-n-900 placeholder-n-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          disabled={isGenerating || (activeTab === 'generate' ? !prompt.trim() : !code.trim())}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all',
            !isGenerating && (activeTab === 'generate' ? prompt.trim() : code.trim())
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
              {activeTab === 'generate' ? <Play className="h-5 w-5" /> : null}
              {activeTab === 'generate' ? (t.generate as string) :
               activeTab === 'explain' ? (t.explain as string) :
               activeTab === 'debug' ? (t.debug as string) :
               (t.convertButton as string)}
            </>
          )}
        </button>
      </div>

      {/* Output Panel */}
      <div className="rounded-2xl border border-n-200 bg-white">
        {/* Output Header */}
        <div className="flex items-center justify-between border-b border-n-200 px-6 py-4">
          <h3 className="font-semibold text-n-900">
            {activeTab === 'explain' || activeTab === 'debug' ? (t.explanation as string) : (t.result as string)}
          </h3>
          <div className="flex items-center gap-2">
            {code && activeTab !== 'explain' && activeTab !== 'debug' && (
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
                  onClick={() => { setCode(''); setPrompt(''); }}
                  className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
            {(activeTab === 'explain' || activeTab === 'debug') && explanation && (
              <button
                onClick={handleAction}
                className="flex items-center gap-1.5 rounded-lg border border-n-200 px-3 py-1.5 text-sm text-n-700 transition-colors hover:bg-n-100"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Output Content */}
        <div className="p-6">
          {(activeTab === 'explain' || activeTab === 'debug') && explanation ? (
            <div className="prose prose-sm max-w-none text-n-700">
              <pre className="whitespace-pre-wrap rounded-lg bg-n-50 p-4 text-sm">{explanation}</pre>
            </div>
          ) : code ? (
            <div className="relative">
              <div className="flex items-center justify-between border-b border-n-200 pb-2 mb-4">
                <span className="text-xs text-n-500">{languages[language]}</span>
                <label className="flex items-center gap-2 text-xs text-n-500">
                  <input
                    type="checkbox"
                    checked={wrapLines}
                    onChange={(e) => setWrapLines(e.target.checked)}
                    className="rounded border-n-300 text-accent focus:ring-accent"
                  />
                  {t.wrap as string}
                </label>
              </div>
              <pre className={cn(
                'overflow-x-auto rounded-lg bg-n-900 p-4 text-sm text-n-100',
                wrapLines && 'whitespace-pre-wrap'
              )}>
                <code>{code}</code>
              </pre>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-n-100">
                <span className="text-2xl">💻</span>
              </div>
              <p className="text-n-500">
                {locale === 'ar' 
                  ? 'ستظهر الأكواد المُولدة هنا'
                  : 'Generated code will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

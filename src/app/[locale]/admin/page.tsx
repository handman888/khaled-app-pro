import Link from 'next/link';
import { getMessages } from '@/lib/i18n';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale === 'ar' ? 'ar' : 'en';
  const messages = await getMessages(validLocale);
  const isRtl = validLocale === 'ar';

  return (
    <>
        {/* Header */}
        <header className="bg-white border-b border-n-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-n-900">
                  {isRtl ? 'لوحة التحكم' : 'Admin Dashboard'}
                </h1>
                <p className="text-xs text-n-500">Smart Design Digital Pro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/${validLocale}`}
                className="rounded-lg border border-n-200 px-4 py-2 text-sm font-medium text-n-700 hover:bg-n-100"
              >
                {isRtl ? 'عرض الموقع' : 'View Site'}
              </Link>
              <Link
                href={`/${validLocale}/tools`}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
              >
                {isRtl ? 'الأدوات' : 'Tools'}
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Welcome */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-accent to-accent-secondary p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              {isRtl ? 'مرحباً، خالد!' : 'Welcome, Khaled!'}
            </h2>
            <p className="opacity-90">
              {isRtl 
                ? 'هنا يمكنك إدارة موقعك وجميع أدواتك من مكان واحد'
                : 'Manage your website and all your tools from one place'}
            </p>
          </div>

          {/* Quick Actions */}
          <h3 className="text-lg font-bold text-n-900 mb-4">
            {isRtl ? 'إجراءات سريعة' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-n-200 bg-white p-6 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h4 className="font-bold text-n-900">
                    {isRtl ? 'إدارة المنتجات' : 'Manage Products'}
                  </h4>
                  <p className="text-sm text-n-500">Sanity Studio</p>
                </div>
              </div>
              <p className="text-sm text-n-600">
                {isRtl 
                  ? 'أضف وعدّل المنتجات والأسعار والاختبارات'
                  : 'Add and edit products, prices, and testimonials'}
              </p>
            </a>

            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-n-200 bg-white p-6 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h4 className="font-bold text-n-900">
                    {isRtl ? 'إدارة النشر' : 'Deployment'}
                  </h4>
                  <p className="text-sm text-n-500">Vercel</p>
                </div>
              </div>
              <p className="text-sm text-n-600">
                {isRtl 
                  ? 'راقب النشر وإعدادات الموقع'
                  : 'Monitor deployments and site settings'}
              </p>
            </a>

            <a
              href="https://github.com/handman888/khaled-app-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-n-200 bg-white p-6 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h4 className="font-bold text-n-900">GitHub</h4>
                  <p className="text-sm text-n-500">Source Code</p>
                </div>
              </div>
              <p className="text-sm text-n-600">
                {isRtl 
                  ? 'شفرة المصدر والتحديثات'
                  : 'Source code and updates'}
              </p>
            </a>
          </div>

          {/* All Links */}
          <h3 className="text-lg font-bold text-n-900 mb-4">
            {isRtl ? 'جميع الروابط المهمة' : 'All Important Links'}
          </h3>
          <div className="rounded-xl border border-n-200 bg-white overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-n-50 border-b border-n-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-n-700">
                    {isRtl ? 'الخدمة' : 'Service'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-n-700">
                    {isRtl ? 'الرابط' : 'Link'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-n-700">
                    {isRtl ? 'لماذا' : 'Purpose'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-n-100">
                {[
                  {
                    name: 'Your Website',
                    url: 'https://khaled-app-pro.vercel.app',
                    purpose: isRtl ? 'موقعك الرسمي' : 'Your live website',
                    emoji: '🌐'
                  },
                  {
                    name: 'Admin Dashboard',
                    url: 'https://khaled-app-pro.vercel.app/en/admin',
                    purpose: isRtl ? 'لوحة التحكم' : 'Admin panel',
                    emoji: '⚙️'
                  },
                  {
                    name: 'Arabic Version',
                    url: 'https://khaled-app-pro.vercel.app/ar',
                    purpose: isRtl ? 'النسخة العربية' : 'Arabic version',
                    emoji: '🌍'
                  },
                  {
                    name: 'Sanity Studio',
                    url: 'https://www.sanity.io/manage',
                    purpose: isRtl ? 'إدارة المنتجات والمحتوى' : 'Manage products & content',
                    emoji: '📦'
                  },
                  {
                    name: 'Vercel Dashboard',
                    url: 'https://vercel.com/dashboard',
                    purpose: isRtl ? 'إدارة النشر والإعدادات' : 'Deployment & settings',
                    emoji: '🚀'
                  },
                  {
                    name: 'GitHub',
                    url: 'https://github.com/handman888/khaled-app-pro',
                    purpose: isRtl ? 'شفرة المصدر' : 'Source code',
                    emoji: '💻'
                  },
                ].map((link, i) => (
                  <tr key={i} className="hover:bg-n-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{link.emoji}</span>
                        <span className="font-medium text-n-900">{link.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline text-sm break-all"
                      >
                        {link.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-n-600">{link.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Your Tools */}
          <h3 className="text-lg font-bold text-n-900 mb-4">
            {isRtl ? 'أدواتك' : 'Your Tools'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {[
              { name: 'Text', nameAr: 'النصوص', path: 'text', emoji: '✍️' },
              { name: 'Image', nameAr: 'الصور', path: 'image', emoji: '🖼️' },
              { name: 'Video', nameAr: 'الفيديو', path: 'video', emoji: '🎬' },
              { name: 'Audio', nameAr: 'الصوتيات', path: 'audio', emoji: '🎵' },
              { name: 'Code', nameAr: 'الأكواد', path: 'code', emoji: '💻' },
              { name: 'Chat', nameAr: 'المحادثة', path: 'chat', emoji: '💬' },
              { name: 'Translate', nameAr: 'الترجمة', path: 'translate', emoji: '🌍' },
              { name: 'Document', nameAr: 'المستندات', path: 'document', emoji: '📄' },
              { name: 'Presentation', nameAr: 'العروض', path: 'presentation', emoji: '📊' },
              { name: 'Resume', nameAr: 'السيرة الذاتية', path: 'resume', emoji: '📋' },
              { name: 'Social', nameAr: 'التواصل', path: 'social', emoji: '📱' },
            ].map((tool) => (
              <Link
                key={tool.path}
                href={`/${validLocale}/tools/${tool.path}`}
                className="rounded-xl border border-n-200 bg-white p-4 hover:border-accent hover:shadow-md transition-all text-center"
              >
                <span className="text-2xl block mb-2">{tool.emoji}</span>
                <span className="text-sm font-medium text-n-700">
                  {isRtl ? tool.nameAr : tool.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Help Section */}
          <div className="rounded-xl bg-accent/5 border border-accent/20 p-6">
            <h3 className="font-bold text-n-900 mb-2">
              {isRtl ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
            </h3>
            <p className="text-sm text-n-600 mb-4">
              {isRtl 
                ? 'إذا واجهت أي مشكلة أو تريد تطوير الموقع، أنا هنا لمساعدتك.'
                : 'If you face any issues or want to improve the website, I\'m here to help.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-lg bg-white border border-n-200 px-4 py-2 text-sm text-n-700">
                📧 KHALDEN90909@GMAIL.COM
              </span>
              <span className="rounded-lg bg-white border border-n-200 px-4 py-2 text-sm text-n-700">
                🐙 handman888
              </span>
            </div>
          </div>
        </main>
    </>
  );
}

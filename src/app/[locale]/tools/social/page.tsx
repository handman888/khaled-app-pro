import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { SocialTool } from '@/components/tools/SocialTool';
import { getMessages } from '@/lib/i18n';

export default async function SocialToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="social">
      <SocialTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

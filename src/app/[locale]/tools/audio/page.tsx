import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { AudioTool } from '@/components/tools/AudioTool';
import { getMessages } from '@/lib/i18n';

export default async function AudioToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="audio">
      <AudioTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

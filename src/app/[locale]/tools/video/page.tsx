import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { VideoTool } from '@/components/tools/VideoTool';
import { getMessages } from '@/lib/i18n';

export default async function VideoToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="video">
      <VideoTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

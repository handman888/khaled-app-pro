import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { ImageTool } from '@/components/tools/ImageTool';
import { getMessages } from '@/lib/i18n';

export default async function ImageToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="image">
      <ImageTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

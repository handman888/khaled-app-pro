import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { TextTool } from '@/components/tools/TextTool';
import { getMessages } from '@/lib/i18n';

export default async function TextToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="text">
      <TextTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { ChatTool } from '@/components/tools/ChatTool';
import { getMessages } from '@/lib/i18n';

export default async function ChatToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="chat">
      <ChatTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

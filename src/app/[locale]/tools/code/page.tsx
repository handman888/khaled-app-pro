import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { CodeTool } from '@/components/tools/CodeTool';
import { getMessages } from '@/lib/i18n';

export default async function CodeToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="code">
      <CodeTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { DocumentTool } from '@/components/tools/DocumentTool';
import { getMessages } from '@/lib/i18n';

export default async function DocumentToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="document">
      <DocumentTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

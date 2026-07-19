import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { PresentationTool } from '@/components/tools/PresentationTool';
import { getMessages } from '@/lib/i18n';

export default async function PresentationToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="presentation">
      <PresentationTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

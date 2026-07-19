import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { TranslateTool } from '@/components/tools/TranslateTool';
import { getMessages } from '@/lib/i18n';

export default async function TranslateToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="translate">
      <TranslateTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

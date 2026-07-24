import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { ImageToCodeTool } from '@/components/tools/ImageToCodeTool';
import { getMessages } from '@/lib/i18n';

export default async function ImageToCodePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="image-to-code">
      <ImageToCodeTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

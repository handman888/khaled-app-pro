import { ToolsLayout } from '@/components/tools/ToolsLayout';
import { ResumeTool } from '@/components/tools/ResumeTool';
import { getMessages } from '@/lib/i18n';

export default async function ResumeToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return (
    <ToolsLayout locale={locale} messages={messages} activeTool="resume">
      <ResumeTool locale={locale} messages={messages} />
    </ToolsLayout>
  );
}

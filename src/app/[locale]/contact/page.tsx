import { ContactPage } from '@/components/pages/ContactPage';
import { getMessages } from '@/lib/i18n';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as 'en' | 'ar');

  return <ContactPage params={{ locale }} messages={messages} />;
}

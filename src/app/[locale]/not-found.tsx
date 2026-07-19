import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-n-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-n-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-n-900 mb-4">Page Not Found</h2>
        <p className="text-n-600 mb-6">The page you are looking for does not exist.</p>
        <Link
          href="/en"
          className="rounded-lg bg-accent px-6 py-3 text-white font-medium hover:bg-accent/90 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

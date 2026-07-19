'use client';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-n-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-n-900 mb-4">Something went wrong</h2>
        <p className="text-n-600 mb-6">An unexpected error occurred.</p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-accent px-6 py-3 text-white font-medium hover:bg-accent/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

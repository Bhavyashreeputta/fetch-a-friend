import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Fetch Dogs 🐶</h1>
      <Link
        href="/login"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700"
      >
        Login to start
      </Link>
    </main>
  );
}

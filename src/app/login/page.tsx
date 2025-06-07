'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PawTrail from '@/components/PawTrail';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Auth failed');
      router.push('/search');
    } catch {
      setError('Login failed – check your email and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden">
      <PawTrail />
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute inset-0 -z-20 bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-md dark:bg-slate-800/80"
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold text-sky-700 dark:text-sky-300">
          Login to Fetch 🐾
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-slate-400">
          <Link href="/" className="underline hover:text-sky-600 dark:hover:text-sky-400">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

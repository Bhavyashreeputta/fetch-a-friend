'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import heroDog from '@/images/happy-dog1.jpg';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 px-4 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900">
      {/*<PawTrail />*/}

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-sky-700 dark:text-sky-300 sm:text-6xl">
            Adopt your&nbsp;new <br className="hidden sm:block" />
            <span className="text-pink-600 dark:text-pink-400">best&nbsp;friend</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-gray-600 dark:text-slate-400 lg:mx-0">
            Swipe through thousands of lovable shelter pups. Favorite, filter,
            and fetch your perfect match — powered by Fetch.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-full bg-pink-600 px-10 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700 animate-woof"
          >
            Start Browsing
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ rotate: -2, scale: 1.05 }}
          className="mx-auto w-80 sm:w-96 lg:w-full"
        >
          <Image
            src= {heroDog}
            alt="Happy dog sticking its tongue out"
            width={400}
            height={400}
            className="rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>
    </main>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';

// import { api } from '@/utils/fetcher';
// import { useFavorites } from '@/hooks/useFavorites';
// import DogCard from '@/components/DogCard';
// import type { Dog } from '@/types/dog';

// export default function MatchPage() {
//   const router = useRouter();
//   const { ids, clear } = useFavorites();

//   const [dog, setDog] = useState<Dog | null>(null);

//   useEffect(() => {
//     async function getMatch() {
//       if (!ids.length) {
//         router.replace('/search');
//         return;
//       }

//       const { data: match } = await api.post<{ match: string }>('/dogs/match', ids);

//       const { data: [matchDog] } = await api.post<Dog[]>('/dogs', [match.match]);

//       setDog(matchDog);        
//       confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
//       clear();
//     }

//     getMatch();
//   }, [clear, ids, router]); 

//   if (!dog) return <p className="p-6">Finding your perfect pal…</p>;

//   return (
//     <main className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-10">
//       <motion.h1
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="text-3xl font-extrabold"
//       >
//         You’ve been matched! 🎉
//       </motion.h1>

//       <DogCard dog={dog} fav={false} onFav={() => null} />

//       <button
//         onClick={() => router.push('/search')}
//         className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//       >
//         Back to search
//       </button>
//     </main>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

import { api } from '@/utils/fetcher';
import { useFavorites } from '@/hooks/useFavorites';
import DogCard from '@/components/DogCard';
import type { Dog } from '@/types/dog';

export default function MatchPage() {
  const router = useRouter();
  const { ids, clear } = useFavorites();

  const [dog, setDog] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMatch() {
      if (!ids.length) {
        router.replace('/search');
        return;
      }

      try {
        setIsLoading(true);
        const { data: match } = await api.post<{ match: string }>('/dogs/match', ids);
        const { data: [matchDog] } = await api.post<Dog[]>('/dogs', [match.match]);

        setDog(matchDog);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
        });
      } catch (error) {
        console.error('Error finding match:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getMatch();
  }, [clear, ids, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-gray-800">Finding your perfect pal…</h2>
            <p className="text-gray-600">Analyzing your preferences to find the best match</p>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!dog) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Match Found!
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-slate-400 text-lg sm:text-xl max-w-md mx-auto"
          >
            Based on your preferences, we found your ideal companion
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="mb-8 sm:mb-12 flex justify-center"
        >
          <div

            className="relative w-72 sm:w-80 scale-90 overflow-hidden
                      [&_img]:object-top"
          >
            <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-blue-200 opacity-60" />
            <div className="absolute -bottom-4 -right-4 h-6 w-6 rounded-full bg-purple-200 opacity-60" />
            <div className="absolute top-1/2 -right-8 h-4 w-4 rounded-full bg-pink-200 opacity-40" />

            <DogCard dog={dog} fav={false} onFav={() => null} />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              clear();
              router.push('/search');
            }}
            className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <motion.span
              className="relative z-10"
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            <span className="relative z-10">Back to Search</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Match confidence: 98%
          </div>
        </motion.div>
      </div>
    </main>
  );
}
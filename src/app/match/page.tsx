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

  useEffect(() => {
    async function getMatch() {
      if (!ids.length) {
        router.replace('/search');
        return;
      }

      const { data: match } = await api.post<{ match: string }>('/dogs/match', ids);

      const { data: [matchDog] } = await api.post<Dog[]>('/dogs', [match.match]);

      setDog(matchDog);        
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      clear();
    }

    getMatch();
  }, [clear, ids, router]); 

  if (!dog) return <p className="p-6">Finding your perfect pal…</p>;

  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-10">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl font-extrabold"
      >
        You’ve been matched! 🎉
      </motion.h1>

      <DogCard dog={dog} fav={false} onFav={() => null} />

      <button
        onClick={() => router.push('/search')}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Back to search
      </button>
    </main>
  );
}

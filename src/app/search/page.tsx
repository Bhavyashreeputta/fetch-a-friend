'use client';

import { useState } from 'react';
import { useDogs } from '@/hooks/useDogs';
import { useFavorites } from '@/hooks/useFavorites';
import BreedFilter from '@/components/BreedFilter';
import SortDropdown from '@/components/SortDropdown';
import DogCard from '@/components/DogCard';
import FavTray from '@/components/FavTray';
import { useRouter } from 'next/navigation';
import PremiumDogLoader, { SkeletonCard } from '@/components/Loader';
import { Heart, LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

export default function SearchPage() {
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState('breed:asc');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useDogs({
    breeds: breeds.length ? breeds : undefined,
    sort,
  });

  const { ids: favIds, toggle } = useFavorites();

  const { logout } = useLogout();

  function handleMatch() {
    router.push('/match');
  }

  const dogs = data?.pages.flatMap((p) => p.dogs) ?? [];

  if (isLoading) {
    return <PremiumDogLoader />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-amber-50 via-lime-50 to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900">
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-sky-200/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-sky-700">
                Paw<span className="text-xl font-bold text-pink-600">Match</span>
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-sky-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-28 pt-6">
        <div className="text-center space-y-6 mb-12 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r text-sky-700 dark:text-sky-300 bg-clip-text leading-tight">
            Find Your Perfect&nbsp;
            <span className="text-pink-600 dark:text-pink-400">Companion</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover amazing dogs waiting for their forever homes
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end animate-in slide-in-from-top duration-500">
          <div className="animate-in slide-in-from-left duration-500 delay-100 w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <BreedFilter selected={breeds} onChange={setBreeds} />
          </div>
          <div className="animate-in slide-in-from-right duration-500 delay-200 w-full md:w-auto">
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dogs.length > 0 ? (
            dogs.map((d, index) => (
              <div
                key={d.id}
                className="animate-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <DogCard
                  dog={d}
                  fav={favIds.includes(d.id)}
                  onFav={() => toggle(d.id)}
                />
              </div>
            ))
          ) : (
            [...Array(8)].map((_, i) => (
              <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
                <SkeletonCard />
              </div>
            ))
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center animate-in fade-in duration-500 delay-300">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="group relative overflow-hidden rounded-full bg-pink-600 px-10 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700"
            >
              <span className="relative flex items-center space-x-2">
                {isFetchingNextPage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading more...</span>
                  </>
                ) : (
                  <>
                    <span>Load more dogs</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        <FavTray onMatch={handleMatch} />
      </div>
    </div>
  );
}
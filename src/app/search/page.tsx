'use client';

import { useState } from 'react';
import { useDogs } from '@/hooks/useDogs';
import { useFavorites } from '@/hooks/useFavorites';
import BreedFilter from '@/components/BreedFilter';
import SortDropdown from '@/components/SortDropdown';
import DogCard from '@/components/DogCard';
import FavTray from '@/components/FavTray';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState('breed:asc');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useDogs({
    breeds: breeds.length ? breeds : undefined,
    sort,
  });

  const { ids: favIds, toggle } = useFavorites();

  function handleMatch() {
    router.push('/match');
  }

  const dogs = data?.pages.flatMap((p) => p.dogs) ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-28 pt-6">

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <BreedFilter selected={breeds} onChange={setBreeds} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>


      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dogs.map((d) => (
          <DogCard
            key={d.id}
            dog={d}
            fav={favIds.includes(d.id)}
            onFav={() => toggle(d.id)}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded border px-4 py-2"
          >
            {isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}

      <FavTray onMatch={handleMatch} />
    </div>
  );
}
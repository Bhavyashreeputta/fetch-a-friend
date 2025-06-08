import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import type { Dog } from '@/types/dog';

export interface DogsPage {
  dogs: Dog[];
  next: string | null;
}

interface Params {
  breeds?: string[];
  sort?: string;
  ageMin?: number;
  ageMax?: number;
}

export const useDogs = (params: Params) =>
  useInfiniteQuery<DogsPage, Error, InfiniteData<DogsPage>, ['dogs', Params]>(
    {
      queryKey: ['dogs', params],
      initialPageParam: '',

      queryFn: async ({ pageParam }): Promise<DogsPage> => {
        let searchRes;

        if (pageParam === '') {
          searchRes = await api.get('/dogs/search', {
            params: { ...params, size: 25 },
          });
        } else {
          searchRes = await api.get(`/dogs/search?${pageParam}`);
        }

        const { data: dogs } = await api.post<Dog[]>(
          '/dogs',
          searchRes.data.resultIds,
        );

        return {
          dogs,
          next: searchRes.data.next ?? null,
        };
      },

      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    },
  );

import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
import type { Dog } from '@/types/dog';
import type { DogsPage } from '@/types/search';

interface Params {
  breeds?: string[];
  sort?: string;
  ageMin?: number;
  ageMax?: number;
}


export const useDogs = (params: Params) =>
  useInfiniteQuery<
    DogsPage,                     
    Error,                       
    InfiniteData<DogsPage>,     
    ['dogs', Params]              
  >({
    queryKey: ['dogs', params],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }): Promise<DogsPage> => {
      const { data: search } = await api.get('/dogs/search', {
        params: { ...params, size: 25, from: pageParam },
      });

      const { data: dogs } = await api.post<Dog[]>('/dogs', search.resultIds);

      return {
        dogs,
        next: search.next ?? null, 
      };
    },

    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });

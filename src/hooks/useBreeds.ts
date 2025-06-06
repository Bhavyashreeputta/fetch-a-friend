import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/fetcher';
export const useBreeds = () =>
  useQuery({
    queryKey: ['breeds'],
    queryFn: () => api.get<string[]>('/dogs/breeds').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
  });

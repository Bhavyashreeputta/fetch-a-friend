'use client';
import { api } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';

export function useLogout() {
  const router = useRouter();
  const { clear } = useFavorites(); 

  async function logout() {
    try {
      await api.post('/auth/logout');
      clear();
      router.replace('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return { logout };
}

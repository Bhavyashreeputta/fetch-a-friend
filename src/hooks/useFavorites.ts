import { create } from 'zustand';
type FavStore = {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
};
export const useFavorites = create<FavStore>((set) => ({
  ids: [],
  toggle: (id) =>
    set((s) => ({
      ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
    })),
  clear: () => set({ ids: [] }),
}));

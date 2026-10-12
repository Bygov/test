import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toSnapshot } from '../utils/product.js';

export const useFavoritesStore = create(
  persist(
    (set) => ({
      items: [],
      toggle: (product) =>
        set((s) =>
          s.items.some((i) => i.id === product.id)
            ? { items: s.items.filter((i) => i.id !== product.id) }
            : { items: [toSnapshot(product), ...s.items] }
        ),
      clear: () => set({ items: [] }),
    }),
    { name: 'favorites' } 
  )
);

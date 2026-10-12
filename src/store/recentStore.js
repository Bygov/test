import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toSnapshot } from '../utils/product.js';

const LIMIT = 8;

export const useRecentStore = create(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((s) => ({
          items: [toSnapshot(product), ...s.items.filter((i) => i.id !== product.id)].slice(0, LIMIT),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'recent' }
  )
);

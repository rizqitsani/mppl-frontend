import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { Cart } from '@/types/api';

type CartStoreType = {
  items: Cart[];
  total: number;
  add: (item: Cart) => void;
  populate: (items: Cart[], total) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
};

const useCartStoreBase = create<CartStoreType>(
  devtools(
    (set) => ({
      items: [],
      total: 0,
      add: (item) => {
        set((state) => ({ ...state, items: [...state.items, item] }));
      },
      populate: (items, total) => {
        set((state) => ({ ...state, items, total }));
      },
      update: (productId, quantity) => {
        set((state) => ({
          ...state,
          items: state.items.map((item: Cart) => ({
            ...item,
            quantity: item.product_id === productId ? quantity : item.quantity,
          })),
        }));
      },
      remove: (productId) => {
        set((state) => ({
          ...state,
          items: state.items.filter(
            (item: Cart) => item.product_id !== productId
          ),
        }));
      },
    }),
    { name: 'CartStore' }
  )
);

const useCartStore = createSelectorHooks(useCartStoreBase);

export default useCartStore;

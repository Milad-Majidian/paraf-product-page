import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart item structure
export interface CartItem {
  productSlug: string;
  title: string;
  priceToman: number;
  quantity: number;
  image?: string;
}

// Cart store state and actions
interface CartStore {
  // State
  items: CartItem[];
  
  // Computed
  totalItems: () => number;
  totalPrice: () => number;
  getItemQuantity: (productSlug: string) => number;
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  incrementItem: (productSlug: string) => void;
  decrementItem: (productSlug: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],

      // Computed values
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.priceToman * item.quantity,
          0
        );
      },

      getItemQuantity: (productSlug: string) => {
        const item = get().items.find((i) => i.productSlug === productSlug);
        return item?.quantity ?? 0;
      },

      // Actions
      addItem: (itemData) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productSlug === itemData.productSlug
          );

          if (existingItem) {
            // Increment existing item
            return {
              items: state.items.map((i) =>
                i.productSlug === itemData.productSlug
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          // Add new item with quantity 1
          return {
            items: [...state.items, { ...itemData, quantity: 1 }],
          };
        });
      },

      removeItem: (productSlug) => {
        set((state) => ({
          items: state.items.filter((i) => i.productSlug !== productSlug),
        }));
      },

      updateQuantity: (productSlug, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productSlug);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productSlug === productSlug ? { ...i, quantity } : i
          ),
        }));
      },

      incrementItem: (productSlug) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productSlug === productSlug
          );

          if (!existingItem) return state;

          return {
            items: state.items.map((i) =>
              i.productSlug === productSlug
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        });
      },

      decrementItem: (productSlug) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productSlug === productSlug
          );

          if (!existingItem) return state;

          // Remove if quantity becomes 0
          if (existingItem.quantity <= 1) {
            return {
              items: state.items.filter((i) => i.productSlug !== productSlug),
            };
          }

          return {
            items: state.items.map((i) =>
              i.productSlug === productSlug
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "paraf-cart-storage", // localStorage key
    }
  )
);

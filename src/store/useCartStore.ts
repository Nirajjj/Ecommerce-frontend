import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addItem: (item: CartItem) => {
        set((state) => ({
          cartItems: [...state.cartItems, item],
        }));
      },
      removeItem: (item: CartItem) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== item.id,
          ),
        }));
      },
      clearCart: () => {
        set(() => ({
          cartItems: [],
        }));
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

export default useCartStore;

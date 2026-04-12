import type { CartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
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
            (cartItem) => cartItem._id !== item._id,
          ),
        }));
      },
      clearCart: () => {
        set(() => ({
          cartItems: [],
        }));
      },
      updateQuantity: (item: CartItem, quantity: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === item._id ? { ...cartItem, quantity } : cartItem,
          ),
        }));
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

export default useCartStore;

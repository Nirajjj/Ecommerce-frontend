import type { CartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartTotals {
  totalPrice: number;
  totalDiscount: number;
  finalAmount: number;
  totalItems: number;
}

interface CartStore {
  cartItems: CartItem[];
  buyItem: CartItem | null;
  addItem: (item: CartItem) => void;
  addBuyItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  getCartTotals: () => CartTotals;
}

// Utility to generate a realistic fallback MRP (e.g., 30% higher)
const calculateFallbackMrp = (price: number) => Math.round(price * 1.3);

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      buyItem: null,

      addItem: (item: CartItem) => {
        set((state) => {
          // Check if item already exists to prevent duplicate entries
          const exists = state.cartItems.find((i) => i._id === item._id);
          if (exists) return state;

          // Inject fallback MRP if missing or 0
          const processedItem = {
            ...item,
            mrp: item.mrp || calculateFallbackMrp(item.price),
          };

          return { cartItems: [...state.cartItems, processedItem] };
        });
      },

      addBuyItem: (item: CartItem) => {
        // Inject fallback MRP if missing or 0
        const processedItem = {
          ...item,
          mrp: item.mrp || calculateFallbackMrp(item.price),
        };

        set(() => ({ buyItem: processedItem }));
      },

      removeItem: (item: CartItem) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem._id !== item._id,
          ),
        }));
      },

      clearCart: () => {
        set(() => ({ cartItems: [] }));
      },

      updateQuantity: (item: CartItem, quantity: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === item._id ? { ...cartItem, quantity } : cartItem,
          ),
        }));
      },

      getCartTotals: () => {
        const { cartItems } = get();

        const totalPrice = cartItems.reduce(
          (acc: number, item: CartItem) => acc + item.mrp * item.quantity,
          0,
        );

        const totalDiscount = cartItems.reduce(
          (acc: number, item: CartItem) =>
            acc + (item.mrp - item.price) * item.quantity,
          0,
        );

        const deliveryFee = 40;
        const platformFee = 199;

        return {
          totalPrice,
          totalDiscount,
          totalItems: cartItems.length,
          finalAmount: totalPrice - totalDiscount + deliveryFee + platformFee,
        };
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

export default useCartStore;

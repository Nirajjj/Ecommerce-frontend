import { create } from "zustand";
import authService from "@/services/auth.service";
import type { UserDocument } from "@/types/userTypes";

interface AuthState {
  user: UserDocument | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  upgradeToSeller: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await authService.checkAuth();
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await authService.register(name, email, password);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await authService.login(email, password);
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  upgradeToSeller: async () => {
    try {
      set({ isLoading: true });
      const response = await authService.upgradeToSeller();
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      const response = await authService.logout();
      set({ user: response.data, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
}));

export default useAuthStore;

import { create } from "zustand";
import axios from "axios";
import { env } from "@/config/evn";

type Role = "customer" | "admin" | "seller";
export interface UserDocument {
  // change the name of the interface to avoid confusion with the model change to IUser or
  _id: string;
  name: string;
  gender: string;
  phoneNumber: string;
  email: string;

  roles: Role[];
}

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
      const response = await axios.get(`${env.VITE_API_URL}/api/auth/me`);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${env.VITE_API_URL}/api/auth/register`,
        { name, email, password },
      );
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  upgradeToSeller: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${env.VITE_API_URL}/api/auth/upgradeToSeller`,
      );
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${env.VITE_API_URL}/api/auth/logout`);
      set({ user: response.data, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
}));

export default useAuthStore;

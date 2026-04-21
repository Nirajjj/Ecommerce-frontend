import { create } from "zustand";
import authService from "@/services/auth.service";
import type { UserDocument } from "@/types/userTypes";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import userService from "@/services/user.service";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserDocument | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    roles: string[],
  ) => Promise<void>;
  upgradeToSeller: () => Promise<void>;
  updateProfileImage: (file: File) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      checkAuth: async () => {
        try {
          set({ isLoading: true });

          const response = await authService.checkAuth();
          set({ user: response.data, isAuthenticated: true, isLoading: false });
          toast.success("Welcome to VEXORA");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log("error", err);
          toast.success("Welcome to VEXORA");
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      register: async (
        name: string,
        email: string,
        password: string,
        roles: string[],
      ) => {
        try {
          set({ isLoading: true });
          const response = await authService.register(
            name,
            email,
            password,
            roles,
          );
          set({ user: response.data, isAuthenticated: true, isLoading: false });
          toast.success("Sign up successful");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;

          toast.error(err.response?.data?.message || "sign up failed");
          set({ isLoading: false });
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
          toast.success("Login successful");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;

          toast.error(err.response?.data?.message || "login failed");
          set({ isLoading: false });
        }
      },
      upgradeToSeller: async () => {
        try {
          set({ isLoading: true });
          const response = await authService.upgradeToSeller();
          set({ user: response.data, isAuthenticated: true, isLoading: false });
          toast.success("Seller upgrade successful");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;

          toast.error(err.response?.data?.message || "Seller upgrade failed");
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await authService.logout();
          set({ user: null, isAuthenticated: false, isLoading: false });
          toast.success("Logout successful");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;

          toast.error(err.response?.data?.message || "logout failed");
          set({ isLoading: false });
        }
      },
      updateProfileImage: async (file: File) => {
        try {
          set({ isLoading: true });
          const response = await userService.updateProfileImage(file);
          set({ user: response.data, isAuthenticated: true, isLoading: false });
          toast.success("Profile image updated successfully");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;

          toast.error(
            err.response?.data?.message || "update profile image failed",
          );
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;

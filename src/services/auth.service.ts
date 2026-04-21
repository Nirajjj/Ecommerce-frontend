import api from "@/api/axios";
import type { UserDocumentPromise } from "@/types/userTypes";

const checkAuth = async (): Promise<UserDocumentPromise> => {
  const response = await api.get("/auth/me");
  return response.data;
};

const login = async (
  email: string,
  password: string,
): Promise<UserDocumentPromise> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const register = async (
  name: string,
  email: string,
  password: string,
  roles: string[],
): Promise<UserDocumentPromise> => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
    roles,
  });
  return response.data;
};

const upgradeToSeller = async (): Promise<UserDocumentPromise> => {
  const response = await api.post("/auth/upgradeToSeller");
  return response.data;
};

const logout = async (): Promise<UserDocumentPromise> => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export default {
  checkAuth,
  login,
  register,
  upgradeToSeller,
  logout,
};

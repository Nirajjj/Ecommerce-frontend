import api from "@/api/axios";
import type { CategoryPromise } from "@/types";

export const getCategories = async (): Promise<CategoryPromise> => {
  const response = await api.get(`/categories`);
  const data = response.data;
  return data;
};

export const getCategory = async (id: string): Promise<CategoryPromise> => {
  const response = await api(`/categories/${id}`);
  const data = response.data;
  return data;
};

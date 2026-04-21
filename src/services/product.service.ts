import api from "@/api/axios";
import type {
  Product,
  PaginatedProductPromise,
  ProductPromise,
} from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get(`/products`);
  const data = response.data;
  return data;
};

export const getProduct = async (id: string): Promise<ProductPromise> => {
  const response = await api(`/products/${id}`);
  const data = response.data;
  return data;
};

export const getProductsByCategory = async (
  category: string,
  page: number,
  limit: number,
): Promise<PaginatedProductPromise> => {
  const response = await api.get(
    `/products/category/${category}?page=${page}&limit=${limit}`,
  );
  const data = response.data;
  return data;
};

export const getSearchProducts = async (
  searchTerm: string,
  page: number,
  limit: number,
): Promise<PaginatedProductPromise> => {
  const response = await api.get(
    `/products/search?q=${searchTerm}&page=${page}&limit=${limit}`,
  );
  const data = response.data;
  return data;
};

export const getSellerProducts = async (
  page: number,
  limit: number,
): Promise<PaginatedProductPromise> => {
  const response = await api.get(
    `/products/seller?page=${page}&limit=${limit}`,
  );
  const data = response.data;
  return data;
};

export const addProduct = async (
  product: FormData,
): Promise<ProductPromise> => {
  const response = await api.post("/products", product);
  const data = response.data;
  return data;
};

export const updateProduct = async (
  product: FormData,
  productId: string,
): Promise<ProductPromise> => {
  const response = await api.put(`/products/${productId}`, product);
  const data = response.data;
  return data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });
      toast.success("Product deleted successfully");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerProducts"] });
      toast.error("Failed to delete product");
    },
  });
};

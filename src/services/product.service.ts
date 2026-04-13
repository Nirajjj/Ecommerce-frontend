import api from "@/api/axios";
import type {
  Product,
  CategoryProductPromise,
  ProductPromise,
} from "@/types/index";

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
): Promise<CategoryProductPromise> => {
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
): Promise<CategoryProductPromise> => {
  const response = await api.get(
    `/products/search?q=${searchTerm}&page=${page}&limit=${limit}`,
  );
  const data = response.data;
  return data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await api.post("/products", product);
  const data = response.data;
  return data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await api.put(`/products/${product._id}`, product);
  const data = response.data;
  return data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await api.delete(`/products/${id}`);
  const data = response.data;
  return data;
};

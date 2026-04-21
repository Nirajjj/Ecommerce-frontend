import { getProduct, getSellerProducts } from "@/services/product.service";
import type { PaginatedProductPromise, ProductPromise } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = (id: string | undefined) => {
  return useQuery<ProductPromise>({
    queryKey: ["product", id],
    queryFn: ({ queryKey }) => getProduct(queryKey[1] as string),
    enabled: !!id,
  });
};

export const useFetchSellerProducts = () => {
  return useQuery<PaginatedProductPromise>({
    queryKey: ["sellerProducts"],
    queryFn: () => getSellerProducts(1, 10),
  });
};

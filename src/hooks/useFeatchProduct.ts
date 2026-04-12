import { getProduct } from "@/services/product.service";
import type { ProductPromise } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = (id: string) => {
  return useQuery<ProductPromise>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

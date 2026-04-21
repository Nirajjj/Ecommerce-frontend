import { getCategories } from "@/services/category.service";
import type { CategoryPromise } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = () => {
  return useQuery<CategoryPromise>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

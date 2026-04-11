import { useQueries } from "@tanstack/react-query";
import { getProductsByCategory } from "@/services/product.service";
import type { ProductPromise } from "@/types";
import { CATEGORIES } from "@/constants/categories";
import { useMemo } from "react";

export const useHomeCategories = () => {
  const categories = useMemo(
    () => [
      CATEGORIES.electronics,
      CATEGORIES.fashion,
      CATEGORIES.mobile,
      CATEGORIES.beauty,
      CATEGORIES.home,
    ],
    [],
  );

  const queries = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["products", category.id], // 🔹 use id
      queryFn: () => getProductsByCategory(category.id, 1, 4), // 🔹 use id
      staleTime: 1000 * 60 * 5,
      retry: 2,
    })),
  });

  const data = useMemo(
    () =>
      categories.reduce<Record<string, ProductPromise | undefined>>(
        (acc, category, index) => {
          acc[category.name] = queries[index]?.data;
          // 🔹 use name
          return acc;
        },
        {},
      ),
    [queries, categories],
  );

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const errors = queries
    .filter((q) => q.isError)
    .map((q, idx) => ({
      category: categories[idx].name,
      error: q.error,
    }));

  return {
    data,
    isLoading,
    isError,
    errors,
  };
};

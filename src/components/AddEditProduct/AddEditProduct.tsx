"use client";

import { useFetchProduct } from "@/hooks/useFeatchProduct";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";
import { useFetchCategories } from "@/hooks/useFeatchCategoires";

const AddEditProduct = ({
  productId,
  close,
}: {
  productId?: string;
  close: () => void;
}) => {
  const { data, isLoading, isError } = useFetchProduct(productId);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useFetchCategories();

  useEffect(() => {
    if (isError) toast.error("Failed to load product");
  }, [isError]);

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (isError || isCategoriesError) return null;

  return (
    <ProductForm
      key={data?.data?._id ?? "new"}
      product={data?.data ?? null}
      productId={productId}
      categories={categories?.data ?? []}
      close={close}
    />
  );
};

export default AddEditProduct;

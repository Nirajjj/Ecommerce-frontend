import ProductTable from "@/components/SellerTable/ProductTable";
import { useFetchSellerProducts } from "@/hooks/useFeatchProduct";
import toast from "react-hot-toast";
import styles from "./SellerProducts.module.css";
import Pagination from "@/components/global/Pagination/Pagination";
import { useState } from "react";

const SellerProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 16;
  const { data, isLoading, isError } = useFetchSellerProducts(page, limit);

  if (isLoading) return <div>Loading...</div>;
  const totalPages = data?.data.totalPages ?? 0;
  if (isError) return toast.error("Failed to load products");
  return (
    <div className={styles.tableContainer}>
      <ProductTable data={data?.data.products ?? []} />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default SellerProducts;

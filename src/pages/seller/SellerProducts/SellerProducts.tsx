import ProductTable from "@/components/SellerTable/ProductTable";
import { useFetchSellerProducts } from "@/hooks/useFeatchProduct";
import toast from "react-hot-toast";
import styles from "./SellerProducts.module.css";

const SellerProducts = () => {
  const { data, isLoading, isError } = useFetchSellerProducts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return toast.error("Failed to load products");
  return (
    <div className={styles.tableContainer}>
      <ProductTable data={data?.data.products ?? []} />
    </div>
  );
};

export default SellerProducts;

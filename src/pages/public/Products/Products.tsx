import ProductCard from "@/components/productCard/ProductCard";
import { CATEGORIES } from "@/constants/categories";
import { useProductsByCategory } from "@/hooks/useProductByCategory";
import styles from "./Products.module.css";
import toast from "react-hot-toast";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCartSkeleton from "@/components/skeleton/ProductCardSkeleton";
import Pagination from "@/components/global/Pagination/Pagination";
const Products = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const [searchParam] = useSearchParams();
  const searchTerm = searchParam.get("q");
  const limit = 15;
  const { categoryId } = useParams();

  const { data, error, isLoading } = useProductsByCategory(
    categoryId || id || CATEGORIES.electronics.id,
    page,
    limit,
    searchTerm,
  );
  const totalPages = data?.data.totalPages ?? 0;
  useEffect(() => {
    if (error) toast.error("Failed to load products");
  }, [error]);
  if (isLoading) {
    return (
      <div className={styles.productsContainer}>
        {Array.from({ length: 16 }).map((_, i) => (
          <ProductCartSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={styles.productsContainer}>
        {data!.data.products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <ProductCard key={product._id} product={product} />
          </Link>
        ))}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default Products;

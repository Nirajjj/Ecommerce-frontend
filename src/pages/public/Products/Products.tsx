import ProductCard from "@/components/productCard/ProductCard";
import { CATEGORIES } from "@/constants/categories";
import { useProductsByCategory } from "@/hooks/useProductByCategory";
import styles from "./Products.module.css";
import toast from "react-hot-toast";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ProductCartSkeleton from "@/components/skeleton/ProductCardSkeleton";
const Products = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const [searchParam] = useSearchParams();
  const searchTerm = searchParam.get("q");
  const limit = 16;
  const { categoryId } = useParams();

  const { data, error, isLoading } = useProductsByCategory(
    categoryId || id || CATEGORIES.electronics.id,
    page,
    limit,
    searchTerm,
  );
  const totalPages = data?.data.totalPages ?? 0;

  if (isLoading) {
    return (
      <div className={styles.productsContainer}>
        {Array.from({ length: 16 }).map((_, i) => (
          <ProductCartSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load products");
  }
  const handlePageChange = (pageNumber: number = 0) => {
    if (pageNumber === 0) {
      setPage((prev) => prev + 1);
    } else {
      setPage(pageNumber);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className={styles.productsContainer}>
        {data!.data.products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <ProductCard key={product._id} product={product} />
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              className={
                page === pageNumber ? styles.activePage : styles.pageNumber
              }
              key={index}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

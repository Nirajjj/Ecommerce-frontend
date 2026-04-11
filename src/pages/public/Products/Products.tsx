import ProductCard from "@/components/productCard/ProductCart";
import { CATEGORIES } from "@/constants/categories";
import { useProductsByCategory } from "@/hooks/useProductByCategory";
import styles from "./Products.module.css";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCartSkeleton from "@/components/skeleton/ProductCardSkeleton";
const Products = () => {
  const [page, setPage] = useState(1);
  const limit = 16;
  const { categoryId } = useParams();
  const { data, error, isLoading } = useProductsByCategory(
    categoryId || CATEGORIES.electronics.id,
    page,
    limit,
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
          <ProductCard key={product._id} product={product} />
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

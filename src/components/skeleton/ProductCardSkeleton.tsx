import styles from "./ProductCardSkeleton.module.css";
const ProductCardSkeleton = () => {
  return (
    <div className={styles.productSkeleton}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.price}></div>
    </div>
  );
};

export default ProductCardSkeleton;

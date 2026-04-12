import styles from "./ProductPageSkeleton.module.css";

const ProductPageSkeleton = () => {
  return (
    <div className={styles.productContainer}>
      {/* Image Skeleton */}
      <div className={styles.imageContainer}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.imageSkeleton}></div>
        ))}
      </div>

      {/* Details Skeleton */}
      <div className={styles.detailsContainer}>
        <div className={styles.title}></div>
        <div className={styles.text}></div>
        <div className={styles.rating}></div>

        <div className={styles.price}></div>

        <div className={styles.stock}></div>

        <div className={styles.delivery}></div>

        <div className={styles.buttons}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;

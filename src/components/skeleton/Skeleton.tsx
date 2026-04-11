import styles from "./skeleton.module.css";
const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.textSkeleton}></div>
      <div className={styles.textSkeleton}></div>
    </div>
  );
};

export default ProductSkeleton;

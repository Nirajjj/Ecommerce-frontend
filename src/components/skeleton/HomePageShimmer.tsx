import styles from "./HomePageShimmer.module.css";

const HomePageShimmer = () => {
  return (
    <div className={styles.wrapper}>
      {/* HERO */}
      <div className={styles.heroWrapper}>
        <div className={`${styles.heroCard} ${styles.shimmer}`}></div>
        <div className={`${styles.heroCard} ${styles.shimmer}`}></div>
      </div>

      {/* PRODUCTS */}
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={`${styles.arrow} ${styles.shimmer}`}></div>
          <div className={`${styles.title} ${styles.shimmer}`}></div>
        </div>

        <div className={styles.productContainer}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.productCard}>
              <div className={`${styles.image} ${styles.shimmer}`}></div>
              <div className={`${styles.productName} ${styles.shimmer}`}></div>
              <div className={`${styles.price} ${styles.shimmer}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageShimmer;

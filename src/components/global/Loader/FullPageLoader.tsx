import styles from "./FullPageLoader.module.css";

export default function FullPageLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Checking authentication...</p>
    </div>
  );
}

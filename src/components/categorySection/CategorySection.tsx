import type { ProductPromise } from "@/types";
import styles from "./categorySection.module.css";
import { FiArrowRightCircle } from "react-icons/fi";
const CategorySection = ({ product }: { product: ProductPromise }) => {
  console.log(product);
  const { categoryName } = product.data;
  return (
    <div className={styles.container}>
      <FiArrowRightCircle className={styles.arrowRight} size={40} />

      <h2>{categoryName}</h2>
      <div className={styles.product}>
        {product.data.products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <img src={product.images[0].url} alt={product.name} />
            </div>
            <h5>{product.name}</h5>

            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

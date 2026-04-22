import type { Product } from "@/types";
import styles from "./productCard.module.css";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, images, mrp } = product;
  const [rating] = useState(() => Number((Math.random() * 5).toFixed(1)));

  const [reviewsCount] = useState(() => Math.floor(Math.random() * 10000) + 1);

  const displayMrp = mrp ?? Math.round(price * 1.3);
  const discount = Math.max(0, ((displayMrp - price) / displayMrp) * 100);

  const finalDiscount = Number(discount.toFixed(2));
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={images[0].url} alt={name} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <span className={styles.discount}>{finalDiscount}% OFF</span>

      <div className={styles.priceSection}>
        <span className={styles.mrp}>₹{displayMrp}</span>
        <span className={styles.price}>₹{price}</span>
      </div>
      <div className={styles.rating}>
        <span className={styles.ratingBox}>
          {rating} <FaStar />
        </span>
        <span className={styles.reviewCount}>({reviewsCount})</span>
      </div>
    </div>
  );
};

export default ProductCard;

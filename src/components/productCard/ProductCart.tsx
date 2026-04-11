import type { Product } from "@/types";
import styles from "./productCart.module.css";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, images } = product;
  const [mrp] = useState(() => Math.floor(Math.random() * 900) + 100 + price);
  const [rating] = useState(() => Number((Math.random() * 5).toFixed(1)));

  const discount = ((mrp - price) / mrp) * 100;
  const finalDiscount = discount.toFixed(2);
  const [reviewsCount] = useState(() => Math.floor(Math.random() * 10000) + 1);
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={images[0].url} alt={name} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.rating}>
        <span className={styles.ratingBox}>
          {rating} <FaStar />
        </span>
        <span className={styles.reviewCount}>({reviewsCount})</span>
      </div>

      <div className={styles.priceSection}>
        <span className={styles.price}>₹{price}</span>
        <span className={styles.mrp}>₹{mrp}</span>
        <span className={styles.discount}>{finalDiscount}% off</span>
      </div>
    </div>
  );
};

export default ProductCard;

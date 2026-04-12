import styles from "@/pages/public/Cart/Cart.module.css";
import useCartStore from "@/store/useCartStore";
import type { CartItem } from "@/types";

// interface CartItemProps {
//   item: {
//     id: number;
//     name: string;
//     price: number;
//     originalPrice: number;
//     discount: number;
//     qty: number;
//     image: string;
//   };
// }

export default function CartItem({ item }: { item: CartItem }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const handleRemoveItem = () => {
    removeItem(item);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value);
    updateQuantity(item, quantity);
  };
  return (
    <div className={styles.cartItem}>
      <img src={item.images[0].url} className={styles.productImage} />

      <div className={styles.productInfo}>
        <h4>{item.name}</h4>

        <div className={styles.priceRow}>
          <span className={styles.discount}>50 %</span>
          <span className={styles.originalPrice}>₹ {item.price + 100}</span>
          <span className={styles.price}>₹{item.price * item.quantity}</span>
        </div>

        <div className={styles.qtyRow}>
          <label>Qty:</label>
          <select defaultValue={item.quantity} onChange={handleQuantityChange}>
            {[1, 2, 3, 4].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button onClick={handleRemoveItem}>Remove</button>
          <button className={styles.buyNow}>Buy this now</button>
        </div>
      </div>
    </div>
  );
}

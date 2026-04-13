import styles from "@/pages/public/Cart/Cart.module.css";
import type { CartItem } from "@/types";

export default function PriceDetails({ items }: { items: CartItem[] }) {
  //   const items = useCartStore((state) => state.cartItems);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0,
  );
  const discount = items.reduce(
    (acc, item) => acc + (item.mrp - item.price) * item.quantity,
    0,
  );

  const totalAmount = totalPrice - discount + 199;

  return (
    <div className={styles.priceDetails}>
      <h3>Price Details</h3>

      <div className={styles.row}>
        <span>Price ({items.length} items)</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className={styles.row}>
        <span>Discount</span>
        <span className={styles.green}>-₹{discount}</span>
      </div>

      <div className={styles.row}>
        <span>Protect Promise Fee</span>
        <span>₹199</span>
      </div>

      <hr />

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>

      <button className={styles.placeOrder}>Place Order</button>
    </div>
  );
}

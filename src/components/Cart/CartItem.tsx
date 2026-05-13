import styles from "@/pages/public/Cart/Cart.module.css";
import useCartStore from "@/store/useCartStore";
import type { CartItem } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Authentication/LoginModal";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

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
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const addBuyItem = useCartStore((state) => state.addBuyItem);
  const user = useAuthStore((state) => state.user);
  const handleRemoveItem = () => {
    removeItem(item);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value);
    updateQuantity(item, quantity);
  };
  const handleBuyNow = () => {
    const { name, description, price, mrp, images } = item;
    addBuyItem({
      _id: item._id,
      name,
      description,
      quantity: 1,
      price,
      mrp,
      images,
    });
    if (!user?._id) {
      setShowLogin(true);
      return;
    }
    navigate("/user/checkout", {
      state: { product: { state: { checkoutType: "cart" } } },
    });
  };
  return (
    <>
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        roles={["customer"]}
        navigateTo={"/user/checkout"}
      />
      <div className={styles.cartItem}>
        <Link to={`/product/${item._id}`}>
          <img src={item.images[0].url} className={styles.productImage} />
        </Link>

        <div className={styles.productInfo}>
          <Link to={`/product/${item._id}`}>
            <h4>{item.name}</h4>
          </Link>

          <div className={styles.priceRow}>
            <span className={styles.discount}>50 %</span>
            <span className={styles.originalPrice}>₹ {item.price + 100}</span>
            <span className={styles.price}>₹{item.price * item.quantity}</span>
          </div>

          <div className={styles.qtyRow}>
            <label>Qty:</label>
            <select
              defaultValue={item.quantity}
              onChange={handleQuantityChange}
            >
              {[1, 2, 3, 4].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button onClick={handleRemoveItem}>Remove</button>
            <button className={styles.buyNow} onClick={handleBuyNow}>
              {" "}
              Buy now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

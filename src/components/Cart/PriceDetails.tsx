import styles from "@/pages/public/Cart/Cart.module.css";
import useCartStore from "@/store/useCartStore";
// import type { CartItem } from "@/types";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Authentication/LoginModal";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function PriceDetails() {
  //   const items = useCartStore((state) => state.cartItems);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  // const totalPrice = items.reduce(
  //   (acc, item) => acc + item.mrp * item.quantity,
  //   0,
  // );
  // const discount = items.reduce(
  //   (acc, item) => acc + (item.mrp - item.price) * item.quantity,
  //   0,
  // );

  // const totalAmount = totalPrice - discount + 199;
  const getCartTotals = useCartStore((state) => state.getCartTotals);
  const { totalPrice, totalDiscount, totalItems, finalAmount } =
    getCartTotals();
  console.log("Total Price:", totalPrice);
  console.log("Total Discount:", totalDiscount);
  console.log("Total Items:", totalItems);
  console.log("Final Amount:", finalAmount);
  const handlePlaceOrder = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      navigate("/user/checkout");
    }
  };
  return (
    <>
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        roles={["customer"]}
        navigateTo={""}
      />
      <div className={styles.priceDetails}>
        <h3>Price Details</h3>

        <div className={styles.row}>
          <span>Price ({totalItems} items)</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className={styles.row}>
          <span>Discount</span>
          <span className={styles.green}>-₹{totalDiscount}</span>
        </div>

        <div className={styles.row}>
          <span>Protect Promise Fee</span>
          <span>₹199</span>
        </div>

        <hr />

        <div className={styles.total}>
          <span>Total Amount</span>
          <span>₹{finalAmount}</span>
        </div>

        <button className={styles.placeOrder} onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </>
  );
}

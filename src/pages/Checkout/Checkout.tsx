import styles from "./Checkout.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RazorpayOptions, RazorpayResponse } from "@/types/razorpay";
import { createOrder, verifyPayment } from "@/services/order.service";
import { env } from "@/config/env"; // Fixed typo from env to evn based on your original code if needed
import useCartStore from "@/store/useCartStore";

const Checkout = () => {
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Determine Checkout Intent (Default to 'cart')
  const checkoutType = location.state?.checkoutType || "cart";

  // 2. Fetch required state and actions from Zustand
  const cartItems = useCartStore((state) => state.cartItems);
  const buyItem = useCartStore((state) => state.buyItem);
  const getCartTotals = useCartStore((state) => state.getCartTotals);

  // 3. Unify the Data Structure
  // If user clicked "Buy Now", we wrap the single item in an array. Otherwise, use cart items.
  const checkoutItems =
    checkoutType === "buy_now" && buyItem ? [buyItem] : cartItems;

  // 4. Calculate Totals Dynamically based on intent
  const delivery = 40;
  let totalMrp = 0;
  let totalDiscount = 0;
  let finalAmount = 0;

  if (checkoutType === "buy_now" && buyItem) {
    totalMrp = buyItem.mrp * buyItem.quantity;
    totalDiscount = (buyItem.mrp - buyItem.price) * buyItem.quantity;
    finalAmount = buyItem.price * buyItem.quantity + delivery;
  } else {
    // Rely on the centralized math from the store
    const totals = getCartTotals();
    totalMrp = totals.totalPrice; // In your store logic, totalPrice represents total MRP
    totalDiscount = totals.totalDiscount;
    finalAmount = totals.finalAmount; // Includes delivery and platform fees based on your store
  }

  useEffect(() => {
    if (checkoutItems.length === 0) {
      console.warn("No products found for checkout");
    }
  }, [checkoutItems]);

  const handlePayment = async () => {
    if (!address.trim()) {
      alert("Enter delivery address");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create order from backend
      // Note: If checking out a full cart, your backend 'createOrder' might need to be
      // updated to accept an array of items instead of a single 'productId'.
      // For now, we pass the first item to prevent breaking your existing backend structure.
      const res = await createOrder({
        shippingAddress: address,
        productId: checkoutItems[0]?._id,
        quantity: checkoutItems.length === 1 ? checkoutItems[0].quantity : 1,
      });

      // 2️⃣ Open Razorpay
      const options: RazorpayOptions = {
        key: env.VITE_RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "Your Store",
        description:
          checkoutItems.length === 1
            ? checkoutItems[0].name
            : `Order of ${checkoutItems.length} items`,
        order_id: res.data.razorpay_order_id,
        handler: async function (response: RazorpayResponse) {
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: res.data.order._id,
          };
          const verifyRes = await verifyPayment(data);
          if (verifyRes.status === "success") {
            alert("Payment Successful");
            // Optional: clear cart here using useCartStore.getState().clearCart()
          } else {
            alert("Payment Failed");
          }
        },
        prefill: {
          name: "Niraj",
          email: "test@email.com",
        },
        theme: {
          color: "#111",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // Graceful fallback if somehow accessed with empty cart/buy item
  if (checkoutItems.length === 0) {
    return (
      <div className={styles.container}>
        <h2>No items to checkout. Please go back and add items.</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* LEFT: Address & Dynamic Products Map */}
      <div className={styles.left}>
        <h2>Delivery Address</h2>
        <textarea
          className={styles.textarea}
          placeholder="Enter full address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>Products ({checkoutItems.length} items)</h2>
        {/* We map over the array instead of hardcoding one product */}
        {checkoutItems.map((item) => (
          <div key={item._id} className={styles.product}>
            <img src={item.images[0].url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Order Summary */}
      <div className={styles.right}>
        <h2>Order Summary</h2>
        <div className={styles.row}>
          <span>MRP</span>
          <span>₹{totalMrp}</span>
        </div>
        <div className={styles.row}>
          <span>Discount</span>
          <span style={{ color: "green" }}>- ₹{totalDiscount}</span>
        </div>
        <div className={styles.row}>
          <span>Price</span>
          <span>₹{totalMrp - totalDiscount}</span>
        </div>

        <div className={styles.row}>
          <span>Delivery</span>
          <span>+ ₹{delivery}</span>
        </div>

        <hr />

        <div className={styles.total}>
          <span>Total</span>
          <span>₹{finalAmount}</span>
        </div>

        <button
          className={styles.payBtn}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${finalAmount}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

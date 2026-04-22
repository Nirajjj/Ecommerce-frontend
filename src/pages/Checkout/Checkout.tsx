import styles from "./Checkout.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RazorpayOptions, RazorpayResponse } from "@/types/razorpay";
import type { SingleProduct } from "@/types";
import { createOrder, verifyPayment } from "@/services/order.service";
import { env } from "@/config/evn";

interface CheckoutProduct extends SingleProduct {
  displayMrp: number;
  finalDiscount: number;
}
const Checkout = () => {
  const location = useLocation();
  const product: CheckoutProduct = location.state?.product;
  console.log(product);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("Checkout mounted");
  }, []);
  if (!product) {
    console.warn("No product found in location state");
  }

  const total = product.price;
  const delivery = 40;
  const finalAmount = total + delivery;

  const handlePayment = async () => {
    if (!address.trim()) {
      alert("Enter delivery address");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create order from backend
      // const res = await fetch("/api/orders/create-order", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     amount: finalAmount * 100, // Razorpay uses paise
      //   }),
      // });
      const res = await createOrder({
        shippingAddress: address,
        productId: product._id,
        quantity: 1,
      });
      console.log("handlePayment", res);
      // 2️⃣ Open Razorpay
      const options: RazorpayOptions = {
        key: env.VITE_RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "Your Store",
        description: product.name,
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
            console.log(response);
            // Optional: verify payment on backend
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

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <h2>Delivery Address</h2>
        <textarea
          className={styles.textarea}
          placeholder="Enter full address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>Product</h2>
        <div className={styles.product}>
          <img src={product.images[0].url} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <p>Qty: 1</p>
            <p>₹{product.price}</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <h2>Order Summary</h2>
        <div className={styles.row}>
          <span>MRP</span>
          <span>₹{product.displayMrp}</span>
        </div>
        <div className={styles.row}>
          <span>Discount</span>
          <span>- ₹{product.displayMrp - product.price}</span>
        </div>
        <div className={styles.row}>
          <span>Price</span>
          <span>₹{total}</span>
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
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

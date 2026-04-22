import styles from "./ShippingPolicy.module.css";

const ShippingPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shipping Policy</h1>
      <p className={styles.date}>Effective Date: April 22, 2026</p>

      {/* INTRO */}
      <section className={styles.section}>
        <h2>1. Overview</h2>
        <p>
          At <strong>Vexora</strong>, we aim to deliver your orders in a timely
          and reliable manner across India. This policy outlines our shipping
          process and timelines.
        </p>
      </section>

      {/* PROCESSING */}
      <section className={styles.section}>
        <h2>2. Order Processing</h2>
        <ul>
          <li>Orders are processed within 1–3 business days.</li>
          <li>Orders are not processed on Sundays or public holidays.</li>
          <li>You will receive a confirmation once your order is shipped.</li>
        </ul>
      </section>

      {/* DELIVERY */}
      <section className={styles.section}>
        <h2>3. Delivery Time</h2>
        <ul>
          <li>Estimated delivery: 5–10 business days.</li>
          <li>Delivery time may vary based on your location.</li>
          <li>Remote areas may take additional time.</li>
        </ul>
      </section>

      {/* SHIPPING COST */}
      <section className={styles.section}>
        <h2>4. Shipping Charges</h2>
        <ul>
          <li>Shipping charges (if applicable) are displayed at checkout.</li>
          <li>
            Free shipping may be available on selected products or offers.
          </li>
        </ul>
      </section>

      {/* COD */}
      <section className={styles.section}>
        <h2>5. Cash on Delivery (COD)</h2>
        <ul>
          <li>COD may be available for selected locations.</li>
          <li>Additional COD charges may apply.</li>
        </ul>
      </section>

      {/* TRACKING */}
      <section className={styles.section}>
        <h2>6. Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive tracking details via
          email or SMS (if applicable).
        </p>
      </section>

      {/* DELAYS */}
      <section className={styles.section}>
        <h2>7. Delays</h2>
        <p>
          While we aim for timely delivery, delays may occur due to unforeseen
          circumstances such as weather, logistics issues, or high demand.
        </p>
      </section>

      {/* CONTACT */}
      <section className={styles.contact}>
        <h2>Need Help?</h2>
        <p>
          For any shipping-related queries, contact us at{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
        <p>Website: https://shop.nirajparab.com</p>
      </section>
    </div>
  );
};

export default ShippingPolicy;

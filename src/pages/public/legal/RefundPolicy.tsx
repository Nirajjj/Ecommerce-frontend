import styles from "./RefundPolicy.module.css";

const RefundPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Refund & Cancellation Policy</h1>
      <p className={styles.date}>Effective Date: April 22, 2026</p>

      <section>
        <h2>1. Overview</h2>
        <p>
          At <strong>Vexora</strong>, we strive to ensure customer satisfaction.
          This policy outlines the conditions for cancellations, returns, and
          refunds for purchases made on{" "}
          <strong>https://shop.nirajparab.com</strong>.
        </p>
      </section>

      <section>
        <h2>2. Order Cancellation</h2>
        <ul>
          <li>Orders can be cancelled before they are shipped or processed.</li>
          <li>Once the order is shipped, cancellation is not possible.</li>
          <li>
            To cancel an order, contact us at{" "}
            <strong>nirajparab007@gmail.com</strong>.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Returns</h2>
        <ul>
          <li>
            We offer a return window of <strong>7 days</strong> from the date of
            delivery.
          </li>
          <li>Items must be unused, undamaged, and in original packaging.</li>
          <li>
            Certain products (e.g., hygiene or personal care items) may not be
            eligible for return.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Refunds</h2>
        <ul>
          <li>
            Once your return is received and inspected, we will notify you of
            the approval status.
          </li>
          <li>
            If approved, refunds will be processed within{" "}
            <strong>5–7 business days</strong>.
          </li>
          <li>Refunds will be credited to the original payment method.</li>
        </ul>
      </section>

      <section>
        <h2>5. Non-Refundable Cases</h2>
        <ul>
          <li>Items returned after the return window has expired</li>
          <li>Products damaged due to misuse</li>
          <li>Items without original packaging</li>
          <li>Shipping charges are non-refundable</li>
        </ul>
      </section>

      <section>
        <h2>6. Damaged or Incorrect Products</h2>
        <p>
          If you receive a damaged or incorrect product, please contact us
          within <strong>48 hours</strong> of delivery with photos as proof. We
          will arrange a replacement or refund.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          Email:{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
        <p>Website: https://shop.nirajparab.com</p>
      </section>
    </div>
  );
};

export default RefundPolicy;

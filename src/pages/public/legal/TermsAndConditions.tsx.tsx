import styles from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.date}>Effective Date: April 22, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Vexora</strong>. By accessing or using our website{" "}
          <strong>https://shop.nirajparab.com</strong>, you agree to be bound by
          these Terms and Conditions.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old to use this website or make a
          purchase. By using our services, you confirm that you meet this
          requirement.
        </p>
      </section>

      <section>
        <h2>3. Products & Pricing</h2>
        <ul>
          <li>All prices are listed in INR (₹).</li>
          <li>We reserve the right to change prices at any time.</li>
          <li>
            Product descriptions are accurate to the best of our knowledge.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Orders & Payments</h2>
        <ul>
          <li>Orders are confirmed only after successful payment.</li>
          <li>We use secure third-party payment gateways like Razorpay.</li>
          <li>We reserve the right to cancel any suspicious order.</li>
        </ul>
      </section>

      <section>
        <h2>5. Shipping & Delivery</h2>
        <p>
          Orders are processed within 1–3 business days. Delivery may take 5–10
          business days depending on location and product availability.
        </p>
      </section>

      <section>
        <h2>6. Cancellation & Refunds</h2>
        <ul>
          <li>Orders can be cancelled before shipment.</li>
          <li>
            Refunds are processed within 5–7 business days after approval.
          </li>
          <li>Shipping charges (if any) are non-refundable.</li>
        </ul>
      </section>

      <section>
        <h2>7. User Responsibilities</h2>
        <ul>
          <li>Provide accurate information during checkout.</li>
          <li>Do not misuse the website for illegal activities.</li>
        </ul>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p>
          Vexora shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our services.
        </p>
      </section>

      <section>
        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms at any time. Continued use
          of the website implies acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          Email:{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
        <p>Website: https://shop.nirajparab.com</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;

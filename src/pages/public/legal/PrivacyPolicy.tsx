import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.date}>Effective Date: April 22, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Vexora</strong> ("we", "our", "us"). This Privacy
          Policy explains how we collect, use, and protect your information when
          you visit our website <strong>https://shop.nirajparab.com</strong>.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>

        <h3>Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Shipping and billing address</li>
        </ul>

        <h3>Non-Personal Information</h3>
        <ul>
          <li>Browser type</li>
          <li>IP address</li>
          <li>Device information</li>
          <li>Pages visited</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To process and deliver your orders</li>
          <li>To provide customer support</li>
          <li>To improve our services</li>
          <li>To send updates and offers (if opted)</li>
          <li>To prevent fraud</li>
        </ul>
      </section>

      <section>
        <h2>4. Payment Information</h2>
        <p>
          Payments are processed securely via third-party providers such as{" "}
          <strong>Razorpay</strong>. We do not store your card or payment
          details.
        </p>
      </section>

      <section>
        <h2>5. Sharing of Information</h2>
        <p>We do not sell your data. We may share information with:</p>
        <ul>
          <li>Payment gateways</li>
          <li>Delivery partners</li>
          <li>Service providers</li>
          <li>Legal authorities (if required)</li>
        </ul>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          We use cookies to improve your experience and analyze traffic. You can
          disable cookies in your browser settings.
        </p>
      </section>

      <section>
        <h2>7. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data, but no
          system is completely secure.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <ul>
          <li>Access your data</li>
          <li>Request correction or deletion</li>
          <li>Opt-out of marketing emails</li>
        </ul>
      </section>

      <section>
        <h2>9. Third-Party Links</h2>
        <p>
          We are not responsible for privacy practices of external websites
          linked from our platform.
        </p>
      </section>

      <section>
        <h2>10. Changes to Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on
          this page.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          Email:{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
        <p>Website: https://shop.nirajparab.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

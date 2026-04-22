import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>About Vexora</h1>
        <p>
          Smart products for everyday life — simple, useful, and affordable.
        </p>
      </section>

      {/* STORY */}
      <section className={styles.section}>
        <h2>Who We Are</h2>
        <p>
          <strong>Vexora</strong> is an online store focused on bringing
          practical and high-quality products to customers across India. We
          carefully select products that solve real problems and improve daily
          life.
        </p>
        <p>
          Our goal is simple — deliver value, maintain trust, and provide a
          smooth shopping experience.
        </p>
      </section>

      {/* WHAT WE SELL */}
      <section className={styles.section}>
        <h2>What We Offer</h2>
        <ul className={styles.list}>
          <li>✔ Everyday utility products</li>
          <li>✔ Home & lifestyle essentials</li>
          <li>✔ Affordable and practical solutions</li>
          <li>✔ Carefully selected trending items</li>
        </ul>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.section}>
        <h2>Why Choose Us</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Quality First</h3>
            <p>We focus on products that deliver real value.</p>
          </div>

          <div className={styles.card}>
            <h3>Secure Payments</h3>
            <p>All payments are processed securely via trusted gateways.</p>
          </div>

          <div className={styles.card}>
            <h3>Customer Support</h3>
            <p>We’re here to help whenever you need assistance.</p>
          </div>

          <div className={styles.card}>
            <h3>Fast Delivery</h3>
            <p>Reliable shipping across India.</p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          To make online shopping simple, reliable, and accessible by offering
          useful products at the right price.
        </p>
      </section>

      {/* CONTACT CTA */}
      <section className={styles.contact}>
        <h2>Need Help?</h2>
        <p>
          Reach out to us anytime at{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;

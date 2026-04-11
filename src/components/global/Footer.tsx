import { Link } from "react-router-dom";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.section}>
          <h2 className={styles.logo}>ShopVerse</h2>
          <p>
            Your trusted destination for electronics, fashion and lifestyle
            products with secure checkout and fast delivery.
          </p>
        </div>

        {/* Shop */}
        <div className={styles.section}>
          <h3>Shop</h3>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/fashion">Fashion</Link>
          <Link to="/category/home">Home</Link>
          <Link to="/category/accessories">Accessories</Link>
        </div>

        {/* Customer Support */}
        <div className={styles.section}>
          <h3>Customer Service</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns</Link>
        </div>

        {/* Company */}
        <div className={styles.section}>
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
        </div>

        {/* Legal */}
        <div className={styles.section}>
          <h3>Legal</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/refund">Refund Policy</Link>
        </div>

        {/* Newsletter */}
        <div className={styles.section}>
          <h3>Subscribe</h3>
          <p>Get updates about new deals.</p>

          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Vexora. All rights reserved.</p>

        <div className={styles.socials}>
          <a href="#">Facebook</a>
          <a href="https://www.instagram.com/nirajprb/">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

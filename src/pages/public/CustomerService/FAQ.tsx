import styles from "./FAQ.module.css";
import { useState } from "react";

type Item = { q: string; a: string };

const faqs: Item[] = [
  {
    q: "How do I place an order?",
    a: "Browse products, add to cart, proceed to checkout, enter your details, and complete payment using available methods.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We support UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery (where available) via secure gateways like Razorpay.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes, COD is available for selected locations and products. Additional charges may apply.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are processed in 1–3 business days and delivered within 5–10 business days depending on your location.",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you’ll receive tracking details via email/SMS (if applicable).",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return window for eligible items in unused condition with original packaging.",
  },
  {
    q: "How long do refunds take?",
    a: "Approved refunds are processed within 5–7 business days to the original payment method.",
  },
  {
    q: "What if I receive a damaged or wrong item?",
    a: "Contact us within 48 hours with photos. We’ll arrange a replacement or refund after verification.",
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be cancelled before shipment. Once shipped, cancellation isn’t possible.",
  },
  {
    q: "How do I contact support?",
    a: "Email us at nirajparab007@gmail.com or use the Contact page on our website.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      <p className={styles.subtitle}>
        Quick answers to common questions about orders, shipping, and returns.
      </p>

      <div className={styles.list}>
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
              >
                <span>{item.q}</span>
                <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
              </button>

              <div
                id={`faq-${i}`}
                className={`${styles.answer} ${
                  isOpen ? styles.open : styles.closed
                }`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.cta}>
        <h3>Still have questions?</h3>
        <p>
          Reach out at{" "}
          <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;

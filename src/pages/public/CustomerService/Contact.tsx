import styles from "./Contact.module.css";
import { useState } from "react";
import api from "@/api/axios";
import toast from "react-hot-toast";
import ButtonSpinner from "@/components/global/Loader/ButtonSpinner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/contact", form);

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "", phone: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>

      <div className={styles.content}>
        {/* LEFT: Info */}
        <div className={styles.info}>
          <h2>Get in touch</h2>
          <p>If you have any questions or issues, feel free to contact us.</p>

          <div className={styles.detail}>
            <strong>Email:</strong>
            <a href="mailto:nirajparab007@gmail.com">nirajparab007@gmail.com</a>
          </div>

          <div className={styles.detail}>
            <strong>Website:</strong>
            <span>https://shop.nirajparab.com</span>
          </div>

          <div className={styles.detail}>
            <strong>Location:</strong>
            <span>Mumbai, India</span>
          </div>
        </div>

        {/* RIGHT: Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLoading ? <ButtonSpinner /> : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

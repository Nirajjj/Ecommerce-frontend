import { useFetchProduct } from "@/hooks/useFeatchProduct";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import Products from "../Products/Products";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import ProductPageSkeleton from "@/components/skeleton/ProductPageSkeleton";
import { TbTruckReturn } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";

import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import LoginModal from "@/components/Authentication/LoginModal";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  // const [roles, setRoles] = useState(["customer"]);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const isInCart = cartItems.some((item) => item._id === id);
  const { data, isLoading, isError } = useFetchProduct(id ?? "");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // let [modMrp] = useState(() => Math.floor(Math.random() * 900) + 100);
  const [rating] = useState(() => Number((Math.random() * 5).toFixed(1)));
  const [reviewsCount] = useState(() => Math.floor(Math.random() * 10000) + 1);
  if (!id) return toast.error("Product not found");
  if (isLoading) return <ProductPageSkeleton />;
  if (isError) return toast.error("Failed to load product");

  const { name, description, price, stock, images, mrp, category } = data!.data;
  const displayMrp = mrp ?? Math.round(price * 1.3);
  const discount = Math.max(0, ((displayMrp - price) / displayMrp) * 100);
  // const mrpToUse = mrp || modMrp;
  // const discount = ((mrpToUse - price) / mrpToUse) * 100;
  const finalDiscount = Number(discount.toFixed(2));
  // modMrp = mrpToUse + price;

  const handleAddToCart = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      addItem({
        _id: id,
        name,
        description,
        quantity: 1,
        price,
        mrp,
        images,
      });
    }
  };
  const handleBuy = () => {
    if (!user?._id) {
      setShowLogin(true);
    }
    navigate("/user/checkout", {
      state: { product: { ...data!.data, displayMrp, finalDiscount } },
    });
  };

  return (
    <>
      {showLogin && (
        <LoginModal
          setShowLogin={setShowLogin}
          roles={["customer"]}
          navigateTo={"/user/checkout"}
        />
      )}
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          {isMobile ? (
            <Swiper
              className={styles.mobileSwiper}
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {images.map((image) => (
                <SwiperSlide key={image.public_id}>
                  <div className={styles.imageWrapper}>
                    <img src={image.url} alt={name} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className={styles.imageContainer}>
              <div className={styles.row2}>
                {images.slice(0, 2).map((image) => (
                  <div key={image.public_id} className={styles.imageWrapper}>
                    <img src={image.url} alt={name} />
                  </div>
                ))}
              </div>

              <div className={styles.row3}>
                {images.slice(2, 5).map((image) => (
                  <div key={image.public_id} className={styles.imageWrapper}>
                    <img src={image.url} alt={name} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.productTitle}>{name}</h1>

          <p className={styles.description}>{description}</p>
          <div className={styles.rating}>
            <span className={styles.ratingBox}>
              {rating} <FaStar />
            </span>
            <span className={styles.reviewCount}>({reviewsCount})</span>
          </div>
          <div className={styles.priceSection}>
            <span className={styles.discount}>{finalDiscount}% off</span>
            <span className={styles.oldPrice}>₹{displayMrp}</span>
            <span className={styles.price}>₹{price}</span>
          </div>

          <div className={styles.stock}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </div>

          <div className={styles.ProductHandling}>
            <div>
              <TbTruckReturn size={25} />
              10-Day Return
            </div>
            <div>
              <FaMoneyBillTransfer size={25} />
              Cash On Delivery
            </div>
            <div>
              <GoShieldCheck size={25} />
              Assured Product
            </div>
          </div>

          {/* Sticky buttons */}
          <div className={styles.buyActions}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>
              {isInCart ? "Go to cart" : "Add to cart"}

              <CiShoppingCart className={styles.icon} size={30} />
            </button>
            <button className={styles.buyBtn} onClick={handleBuy}>
              Buy at ₹{price}
            </button>
          </div>
        </div>
      </div>
      <h2>Similar Products</h2>
      <Products id={category._id} />
    </>
  );
};

export default Product;

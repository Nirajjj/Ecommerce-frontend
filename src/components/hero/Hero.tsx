import { Link } from "react-router-dom";
import styles from "./hero.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// interface HeroDataDcoument {
//   image: string;
//   link: string;
//   title: string;
// }
// interface HeroProps {
//   heroData: HeroDataDcoument[];
// }
const heroImages = [
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
    link: "/product/69cf7c88fb9a0a7862ec4fc3",
  },
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1776790494/ChatGPT_Image_Apr_21_2026_10_22_40_PM_fof2yc.png",
    link: "/product/69e79118f5431eec402a434f",
  },
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1776790494/ChatGPT_Image_Apr_21_2026_10_23_42_PM_pofnpj.png",
    link: "/product/69cfcd9cc9d9d9d75175b888",
  },
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1776790534/ChatGPT_Image_Apr_21_2026_10_25_24_PM_duvllm.png",
    link: "/product/69d8f548236412d97bde01d5",
  },
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1776790643/ChatGPT_Image_Apr_21_2026_10_27_11_PM_sv09jv.png",
    link: "/product/69d8f548236412d97bde01f5",
  },
  {
    image:
      "https://res.cloudinary.com/dbozdghfi/image/upload/v1776790789/ChatGPT_Image_Apr_21_2026_10_29_39_PM_lp4wnl.png",
    link: "/product/69cf8a7f4427f03b60d969c9",
  },
];
const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          280: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.8,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Link to={img.link}>
              <img
                src={img.image}
                alt="hero banner"
                className={styles.heroImage}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

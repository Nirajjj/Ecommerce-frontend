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
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
  "https://res.cloudinary.com/dbozdghfi/image/upload/v1775735692/Discover_the_new_orange_iPhone_xucrg0.png",
];
const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={2.5}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Link to="/">
              <img src={img} alt="hero banner" className={styles.heroImage} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

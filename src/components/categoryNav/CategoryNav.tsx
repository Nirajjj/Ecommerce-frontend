import { BsBagHeartFill } from "react-icons/bs";
import styles from "./categoryNav.module.css";
import {
  IoCarSportOutline,
  IoHomeOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { LiaMobileSolid } from "react-icons/lia";
import { GiLipstick } from "react-icons/gi";
import {
  MdLaptopMac,
  MdOutlineChair,
  MdOutlineSportsCricket,
} from "react-icons/md";
import { CgGames } from "react-icons/cg";
import { PiBooksLight } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES } from "@/constants/categories";
const CategoryNav = () => {
  const { categoryId } = useParams();

  const categories = [
    { icon: <BsBagHeartFill />, categoryDetails: CATEGORIES.forYou },
    { icon: <IoShirtOutline />, categoryDetails: CATEGORIES.fashion },
    { icon: <LiaMobileSolid />, categoryDetails: CATEGORIES.mobile },
    { icon: <GiLipstick />, categoryDetails: CATEGORIES.beauty },
    { icon: <IoHomeOutline />, categoryDetails: CATEGORIES.home },
    { icon: <MdLaptopMac />, categoryDetails: CATEGORIES.electronics },
    { icon: <MdOutlineSportsCricket />, categoryDetails: CATEGORIES.sports },
    { icon: <PiBooksLight />, categoryDetails: CATEGORIES.books },
    { icon: <CgGames />, categoryDetails: CATEGORIES.game },
    { icon: <IoCarSportOutline />, categoryDetails: CATEGORIES.automotive },
    { icon: <MdOutlineChair />, categoryDetails: CATEGORIES.furniture },
  ];

  return (
    <nav className={styles.categoryNav}>
      {categories.map((category) => {
        const { name, id } = category.categoryDetails;

        const linkTo = id !== "/" ? `/products/${id}` : `/`;
        const isActive = (id === "/" && !categoryId) || categoryId === id;
        return (
          <Link to={linkTo}>
            <div
              key={category.categoryDetails.id}
              className={`${styles.navLink} ${isActive ? styles.selected : ""}`}
            >
              {category.icon}
              <span>{name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;

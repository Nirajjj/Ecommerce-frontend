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
const CategoryNav = () => {
  const categories = [
    { icon: <BsBagHeartFill />, name: "For You" },
    { icon: <IoShirtOutline />, name: "Fashion" },
    { icon: <LiaMobileSolid />, name: "Mobiles" },
    { icon: <GiLipstick />, name: "Beauty" },
    { icon: <IoHomeOutline />, name: "Home" },
    { icon: <MdLaptopMac />, name: "Electronics" },
    { icon: <MdOutlineSportsCricket />, name: "Sports" },
    { icon: <PiBooksLight />, name: "Books" },
    { icon: <CgGames />, name: "Games" },
    { icon: <IoCarSportOutline />, name: "Automotive" },
    { icon: <MdOutlineChair />, name: "Furniture" },
  ];
  return (
    <nav className={styles.categoryNav}>
      {categories.map((category, index) => (
        <div key={index}>
          {category.icon}
          <span>{category.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default CategoryNav;

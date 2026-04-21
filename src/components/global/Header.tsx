import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import useAuthStore from "@/store/useAuthStore";
import {
  CiCircleMore,
  CiLogout,
  CiSearch,
  CiShoppingCart,
} from "react-icons/ci";
import { PiUserCircleGearThin, PiUserCircleLight } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { FaStore } from "react-icons/fa";
import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import CategoryNav from "../categoryNav/CategoryNav";
import Modal from "../Modal/Modal";
import Login from "../Authentication/Login";
import authService from "@/services/auth.service";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [roles, setRoles] = useState(["customer"]);
  const [navigateTo, setNavigateTo] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const isSellerPage = location.pathname.startsWith("/seller");
  const user = useAuthStore((state) => state.user);
  console.log(user);
  const cartItems = useCartStore((state) => state.cartItems);
  const sellerText = !user?.roles.includes("seller")
    ? "Become a Seller"
    : isSellerPage
      ? "Switch to Customer"
      : "Switch to Seller";
  const logout = useAuthStore((state) => state.logout);
  // const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/products/search?q=" + searchTerm);
  };
  const handleSeller = async () => {
    if (user && user.roles.includes("seller")) {
      if (isSellerPage) {
        navigate("/");
      } else {
        navigate("/seller/products");
      }
    } else if (user && !user.roles.includes("seller")) {
      const confirm: boolean = window.confirm(
        "Are you sure you want to upgrade to seller?",
      );
      if (confirm) {
        await authService.upgradeToSeller();
        navigate("/seller/products");
      }
    } else {
      setRoles(["customer", "seller"]);
      setNavigateTo("/seller/products");
      setShowLogin(true);
    }
  };
  return (
    <>
      {showLogin && (
        <Modal close={() => setShowLogin(false)}>
          <Login
            close={() => setShowLogin(false)}
            roles={roles}
            navigateTo={navigateTo}
          />
        </Modal>
      )}
      <header className={styles.headerWrapper}>
        <div className={`container ${styles.headerContent}`}>
          <Link to="/" className={styles.logo}>
            <img
              src="https://res.cloudinary.com/dbozdghfi/image/upload/v1775730179/VEXORA_logo_with_swoosh_design_croped_rcezpe.png"
              alt="logoImage"
              className={styles.logoImage}
            />
          </Link>
          <form className={styles.searchContainer} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className={styles.searchBtn}
              aria-label="Search"
            >
              <CiSearch size={20} />
            </button>
          </form>
          <nav className={styles.nav}>
            {user ? (
              <Link to="/user/profile" className={styles.navLink}>
                <PiUserCircleGearThin className={styles.icon} />
              </Link>
            ) : (
              <button
                className={styles.navLink}
                onClick={() => setShowLogin(true)}
              >
                <PiUserCircleLight className={styles.icon} />
                <span className={styles.navLinkText}>Login</span>
              </button>
            )}
            <div className={styles.moreMenu}>
              <button className={styles.navLink}>
                <span className={styles.navLinkText}>More</span>
                <SlArrowDown className={styles.arrowIcon} />
                <CiCircleMore size={25} className={styles.mobileMoreIcon} />
              </button>

              <div className={styles.dropdown}>
                <h4>More</h4>
                <ul>
                  <li className={styles.dropdownList}>
                    <FaStore className={styles.icon} />
                    <a onClick={handleSeller}>{sellerText}</a>
                  </li>
                  {user && (
                    <li className={styles.dropdownList}>
                      <CiLogout className={styles.icon} />
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <Link to="/cart" className={styles.navLink}>
              <div className={styles.cartIconWrapper}>
                <CiShoppingCart className={styles.icon} />

                {cartItems.length > 0 && (
                  <span className={styles.cartBadge}>{cartItems.length}</span>
                )}
              </div>
              <span className={styles.navLinkText}>Cart</span>
            </Link>
          </nav>
        </div>
      </header>
      {!isSellerPage && <CategoryNav />}
    </>
  );
};

export default Header;

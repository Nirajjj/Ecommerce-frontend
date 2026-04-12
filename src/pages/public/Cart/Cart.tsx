import styles from "./Cart.module.css";
import CartItem from "@/components/Cart/CartItem";
import PriceDetails from "@/components/Cart/PriceDetails";
import useCartStore from "@/store/useCartStore";
// const cartItems = [
//   {
//     id: 1,
//     name: "RARE RABBIT Men Solid Casual Purple Shirt",
//     price: 1199,
//     originalPrice: 3999,
//     discount: 70,
//     qty: 1,
//     image:
//       "https://rukminim2.flixcart.com/image/312/312/xif0q/shirt/l/9/r/m-rmspsh006-rare-rabbit-original-imagqz8s7h3v9z2m.jpeg",
//   },
//   {
//     id: 2,
//     name: "vivo V70 FE (Northern Lights Purple, 256 GB)",
//     price: 40999,
//     originalPrice: 44999,
//     discount: 8,
//     qty: 1,
//     image:
//       "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/q/v/b/v70-fe-vivo-original-imagzqkczgzzzzzz.jpeg",
//   },
// ];

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className={styles.container}>
      <div className={styles.cartLeft}>
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <PriceDetails items={cartItems} />
    </div>
  );
}

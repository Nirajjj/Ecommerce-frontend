import type { RouteObject } from "react-router-dom";

const checkoutRoutes: RouteObject[] = [
  { index: true, element: <h1>Checkout</h1> },
  { path: "cart", element: <h1>Cart</h1> },
  { path: "payment", element: <h1>Payment</h1> },
];

export default checkoutRoutes;

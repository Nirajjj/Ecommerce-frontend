import Checkout from "@/pages/Checkout/Checkout";
import type { RouteObject } from "react-router-dom";

const checkoutRoutes: RouteObject[] = [
  { path: "checkout", element: <Checkout /> },
  { path: "payment", element: <h1>Payment</h1> },
];

export default checkoutRoutes;

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "product/:id",
        element: <div>Product</div>,
      },
      {
        path: "cart/",
        element: <div>Cart</div>,
      },
      {
        path: "checkout/",
        element: <div>Checkout</div>,
      },
    ],
  },
  {
    path: "login/",
    element: <div>Login</div>,
  },
  {
    path: "signup/",
    element: <div>Signup</div>,
  },
]);

export default router;

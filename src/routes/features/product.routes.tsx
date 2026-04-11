import Products from "@/pages/public/Products/Products";
import type { RouteObject } from "react-router-dom";

const productRoutes: RouteObject[] = [
  {
    path: "/product/:id",
    element: <div>Product</div>,
  },
  {
    path: "/products/:categoryId",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <div>Cart</div>,
  },
];

export default productRoutes;

import Cart from "@/pages/public/Cart/Cart";
import Product from "@/pages/public/Product/Product";
import Products from "@/pages/public/Products/Products";
import type { RouteObject } from "react-router-dom";

const productRoutes: RouteObject[] = [
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/products/:categoryId",
    element: <Products id={""} />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default productRoutes;

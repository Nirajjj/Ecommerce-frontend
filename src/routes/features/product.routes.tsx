import type { RouteObject } from "react-router-dom";

const productRoutes: RouteObject[] = [
  {
    path: "/product/:id",
    element: <div>Product</div>,
  },
  {
    path: "/products",
    element: <div>Products</div>,
  },
  {
    path: "/cart",
    element: <div>Cart</div>,
  },
];

export default productRoutes;

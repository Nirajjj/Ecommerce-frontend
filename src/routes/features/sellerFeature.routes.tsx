import type { RouteObject } from "react-router-dom";

const sellerFeatureRoutes: RouteObject[] = [
  { index: true, element: <h1>Seller Dashboard</h1> },
  { path: "products", element: <h1>Seller Product Management</h1> },
  { path: "orders", element: <h1>Order Management</h1> },
];

export default sellerFeatureRoutes;

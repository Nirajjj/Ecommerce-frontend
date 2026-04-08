import type { RouteObject } from "react-router-dom";

const customerFeatureRoutes: RouteObject[] = [
  { index: true, element: <h1>Customer Dashboard</h1> },
  { path: "orders", element: <h1>Order Management</h1> },
  { path: "profile", element: <h1>Profile</h1> },
];

export default customerFeatureRoutes;

import Profile from "@/pages/public/Profile/Profile";
import type { RouteObject } from "react-router-dom";

const customerFeatureRoutes: RouteObject[] = [
  { path: "orders", element: <h1>Order Management</h1> },
  { path: "profile", element: <Profile /> },
];

export default customerFeatureRoutes;

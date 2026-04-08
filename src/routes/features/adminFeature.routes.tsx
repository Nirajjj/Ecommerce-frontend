import type { RouteObject } from "react-router-dom";

const adminFeatureRoutes: RouteObject[] = [
  { index: true, element: <h1>Admin Dashboard</h1> },
  { path: "products", element: <h1>Global Product Management</h1> },
  { path: "users", element: <h1>User Management</h1> },
  { path: "categories", element: <h1>Category Management</h1> },
];

export default adminFeatureRoutes;

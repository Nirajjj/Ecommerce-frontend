import RoleGuards from "@/components/guards/roleGuards";
import AdminLayout from "@/layouts/adminLayout";
import type { RouteObject } from "react-router-dom";

const adminAccessRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <RoleGuards requiredRoles={["admin"]} />,
    children: [
      {
        path: "", // Resolves to /admin
        element: <AdminLayout />, // Rendered inside RoleGuards' Outlet
        children: [
          // Rendered inside AdminLayout's Outlet
          { index: true, element: <h1>Admin</h1> },
        ],
      },
    ],
  },
];

export default adminAccessRoutes;

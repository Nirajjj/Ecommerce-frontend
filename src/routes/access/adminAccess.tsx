import RoleGuards from "@/components/guards/roleGuards";
import AdminLayout from "@/layouts/adminLayout";
import type { RouteObject } from "react-router-dom";
import adminFeatureRoutes from "../features/adminFeature.routes";

const adminAccessRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuards requiredRoles={["admin"]}>
        <AdminLayout />
      </RoleGuards>
    ),
    children: [...adminFeatureRoutes],
  },
];

export default adminAccessRoutes;

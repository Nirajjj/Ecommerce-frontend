import RoleGuards from "@/components/guards/roleGuards";
import type { RouteObject } from "react-router-dom";
import checkoutRoutes from "../features/checkout.routes";
import customerFeatureRoutes from "../features/customer.routes";
import ProtectedLayout from "@/layouts/protectedLayout";

const customerRoutes: RouteObject[] = [
  {
    path: "/user",
    element: (
      // Depending on your logic, this could also just be a basic AuthGuard
      // if sellers/admins can also buy things.
      <RoleGuards requiredRoles={["customer", "seller"]}>
        <ProtectedLayout />
      </RoleGuards>
    ),
    children: [...customerFeatureRoutes, ...checkoutRoutes],
  },
];

export default customerRoutes;

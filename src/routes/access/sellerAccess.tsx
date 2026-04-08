import RoleGuards from "@/components/guards/roleGuards";
import SellerLayout from "@/layouts/sellerLayut";
import type { RouteObject } from "react-router-dom";
import sellerFeatureRoutes from "../features/sellerFeature.routes";

const sellerAccessRoutes: RouteObject[] = [
  {
    path: "/seller",
    element: <RoleGuards requiredRoles={["seller"]} />,
    children: [
      {
        path: "", // Resolves to /seller
        element: <SellerLayout />, // Rendered inside RoleGuards' Outlet
        children: [
          // Rendered inside SellerLayout's Outlet
          ...sellerFeatureRoutes,
        ],
      },
    ],
  },
];

export default sellerAccessRoutes;

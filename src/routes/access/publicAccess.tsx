import RootLayout from "@/layouts/rootLayout";
import type { RouteObject } from "react-router-dom";
import productRoutes from "../features/product.routes";
import Home from "@/pages/public/Home/Home";
import legalRoutes from "../features/legal.routes";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      ...productRoutes,
      ...legalRoutes,
    ],
  },
];

export default publicRoutes;

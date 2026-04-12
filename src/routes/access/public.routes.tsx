import RootLayout from "@/layouts/rootLayout";
import type { RouteObject } from "react-router-dom";
import productRoutes from "../features/product.routes";
import Home from "@/pages/public/Home/Home";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      ...productRoutes,
      { index: true, element: <h1>Home</h1> },
      { path: "login", element: <h1>Login</h1> },
      { path: "register", element: <h1>Register</h1> },
      { path: "unauthorized", element: <h1>Unauthorized</h1> },
      { path: "about", element: <h1>About</h1> },
      { path: "contact", element: <h1>Contact</h1> },
    ],
  },
];

export default publicRoutes;

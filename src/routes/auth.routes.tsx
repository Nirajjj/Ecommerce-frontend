import type { RouteObject } from "react-router-dom";

const authRoute: RouteObject[] = [
  {
    path: "/login/",
    element: <div>Login</div>,
  },
  {
    path: "/signup/",
    element: <div>Signup</div>,
  },
];

export default authRoute;

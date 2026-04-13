import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./access/publicAccess";
import sellerAccessRoutes from "./access/sellerAccess";
import adminAccessRoutes from "./access/adminAccess";
import customerRoutes from "./access/customerAccess";
import ErrorPage from "@/components/global/ErrorPage/ErrorPage";

const appRouter = createBrowserRouter([
  ...publicRoutes,
  ...customerRoutes,
  ...sellerAccessRoutes,
  ...adminAccessRoutes,
  { path: "*", element: <ErrorPage /> },
]);

export default appRouter;

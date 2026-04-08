import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./access/public.routes";
import customerFeatureRoutes from "./features/customer.routes";
import sellerAccessRoutes from "./access/sellerAccess";
import adminAccessRoutes from "./access/adminAccess";

const appRouter = createBrowserRouter([
  ...publicRoutes,
  ...customerFeatureRoutes,
  ...sellerAccessRoutes,
  ...adminAccessRoutes,
  { path: "*", element: <h1>error</h1> },
]);

export default appRouter;

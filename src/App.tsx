import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/router";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <RouterProvider router={appRouter} />;
}

export default App;

import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/router";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  // const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // checkAuth();
    useAuthStore.getState().checkAuth();
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

import Header from "@/components/global/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Global Footer</footer>
    </div>
  );
};

export default RootLayout;

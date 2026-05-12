import Header from "@/components/global/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="container">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProtectedLayout;

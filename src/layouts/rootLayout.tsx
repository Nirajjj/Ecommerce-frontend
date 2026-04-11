import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;

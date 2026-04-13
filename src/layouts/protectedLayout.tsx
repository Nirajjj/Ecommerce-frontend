import Header from "@/components/global/Header";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;

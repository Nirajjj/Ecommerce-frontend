import Header from "@/components/global/Header";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

import Header from "@/components/global/Header";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

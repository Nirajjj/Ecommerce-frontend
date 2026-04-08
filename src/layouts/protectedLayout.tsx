import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        Logged-in User Navbar
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;

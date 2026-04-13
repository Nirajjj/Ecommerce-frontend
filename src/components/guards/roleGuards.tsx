import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import FullPageLoader from "../global/Loader/FullPageLoader";
// import { useAuth } from "../../hooks/useAuth";

type Role = "customer" | "admin" | "seller";
interface RoleGuardsProps {
  requiredRoles?: Role[];
  children: React.ReactNode;
}
const RoleGuards = ({ requiredRoles, children }: RoleGuardsProps) => {
  //   const { user, isLoading } = useAuth();

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isLoading || !user) return <FullPageLoader />;
  if (!isAuthenticated) return toast.error("Please login to access this page");
  console.log("user in role guards", user);
  if (
    requiredRoles!.length &&
    !requiredRoles!.some((role) => user.roles.includes(role))
  ) {
    toast.error(
      "You don't have permission to access this page, Navigate to Home",
    );
    return <Navigate to="/" />; // Or error page
  }

  return <>{children}</>;
};

export default RoleGuards;

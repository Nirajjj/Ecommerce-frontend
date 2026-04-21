import useAuthStore from "@/store/useAuthStore";
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
  if (isLoading) return <FullPageLoader />;
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles?.length) {
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleGuards;

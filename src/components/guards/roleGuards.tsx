import useAuthStore from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

type Role = "customer" | "admin" | "seller";
interface RoleGuardsProps {
  requiredRoles?: Role[];
  children: React.ReactNode;
}
const RoleGuards = ({ requiredRoles = [], children }: RoleGuardsProps) => {
  //   const { user, isLoading } = useAuth();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  if (
    requiredRoles!.length &&
    !requiredRoles!.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to="/profile" />; // Or error page
  }

  return <>{children}</>;
};

export default RoleGuards;

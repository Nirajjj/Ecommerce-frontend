import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
interface RoleGuardsProps {
  requiredRoles?: ("customer" | "admin" | "seller")[];
}
const RoleGuards = ({ requiredRoles }: RoleGuardsProps) => {
  //   const { user, isLoading } = useAuth();
  const { user, isLoading } = {
    user: { roles: ["customer"] },
    isLoading: true,
  };

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  if (
    requiredRoles!.length &&
    !requiredRoles!.some((role) => user.roles.includes(role))
  ) {
    return <Navigate to="/profile" />; // Or error page
  }

  return <Outlet />;
};

export default RoleGuards;

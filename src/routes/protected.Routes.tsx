// import { Navigate, Outlet } from "react-router-dom";

// interface ProtectedRouteProps {
//     allowedRoles: ("customer" |"admin" | "seller")[]
// }
// export function ProtectedRoute({allowedRoles}: ProtectedRouteProps) {
//     const {user, isAuthenticated, isLoading} = useAuth();

//     if(isLoading) {
//        return <div>Loading...</div>
//     }
//     if(!isAuthenticated) {
//         return <Navigate to="/login" />
//     }
//     const isAuth = true;
//     return isAuth ? <Outlet /> : <Navigate to="/login" />;
// }

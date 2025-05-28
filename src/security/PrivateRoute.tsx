import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h1>Carregando...</h1>
  }
  

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
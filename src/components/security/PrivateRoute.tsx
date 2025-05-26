import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../connection/Api";

export default function PrivateRoute() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token) {
    api.get('/private');
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
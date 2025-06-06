import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./security/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./security/PrivateRoute";
import NotFound from "./pages/error/NotFound";
import { AuthProvider } from "./provider/AuthProvider";

export default function WebRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
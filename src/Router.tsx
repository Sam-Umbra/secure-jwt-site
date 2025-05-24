import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/security/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/security/PrivateRoute";

export default function WebRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<h1>404</h1>} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

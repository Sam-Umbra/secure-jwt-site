import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from "react";
import api from "../connection/api";
import { useNavigate } from "react-router-dom";
import { registerLogoutCallback } from "./authService";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  roles: string[];
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    registerLogoutCallback(logout);
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    api
      .get("/private")
      .then(() => {
        setToken(storedToken);

        const decodedToken = jwtDecode<any>(storedToken);
        setRoles(decodedToken.roles || []);
        setIsAuthenticated(true);
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  function login(newToken: string) {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    const decodedToken = jwtDecode<any>(newToken);
    setRoles(decodedToken.roles || []);
    setIsAuthenticated(true);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setRoles([]);
    setIsAuthenticated(false);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, roles, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

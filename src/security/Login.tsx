import { useState } from "react";
import api from "../connection/api";
import { useAuth } from "../provider/AuthProvider";
import style from "./Login.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  const { login } = useAuth();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setShowAlert(false);
      const accessToken = response.data.accessToken;
      login(accessToken);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setShowAlert(true);
    }
  }

  return (
    <div className={style.container}>
      <form className={style.form} action={handleLogin}>
        <div className={style.header}>
          <h1>
            <a href="/" className="logo">
              Umbra
            </a>
          </h1>
          <h2>Seja Bem-Vindo!</h2>
        </div>
        <div className={style.content}>
          {showAlert && <div className={style.field_error}>Campos Inválidos</div>}
          <div className={style.field}>
            <label htmlFor="email" className={style.label}>
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email@example.com"
              className={style.input}
            />
          </div>
          <div className={style.field}>
            <label htmlFor="password" className={style.label}>
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className={style.input}
            />
          </div>
          <button className={style.button}>Entrar</button>
        </div>
      </form>
    </div>
  );
}

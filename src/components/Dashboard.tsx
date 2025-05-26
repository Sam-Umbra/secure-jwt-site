import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./Dashboard.module.css";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const decodedToken = jwtDecode(token);

    console.log(decodedToken);

    setRoles(decodedToken.roles);
  }, []);

  return (
    <>
      <Header auth={isAuthenticated} />
      <main className={style.main}>
        {roles.includes("ROLE_ADMIN") && (
          <a href="https://youtu.be/dQw4w9WgXcQ?feature=shared" className={style.text}>Clique aqui administrador!</a>
        )}
        {roles.includes("ROLE_USER") && (
          <a href="https://youtu.be/dQw4w9WgXcQ?feature=shared" className={style.text}>Clique aqui user!</a>
        )}
      </main>
      <Footer />
    </>
  );
}

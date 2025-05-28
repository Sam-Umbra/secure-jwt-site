import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./Dashboard.module.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../provider/AuthProvider";

export default function Dashboard() {
  const { roles } = useAuth();

  return (
    <>
      <Header />
      <main className={style.main}>
        {roles.includes("ROLE_ADMIN") && (
          <a
            href="https://youtu.be/dQw4w9WgXcQ?feature=shared"
            className={style.text}
          >
            Clique aqui administrador!
          </a>
        )}
        {roles.includes("ROLE_USER") && (
          <a
            href="https://youtu.be/dQw4w9WgXcQ?feature=shared"
            className={style.text}
          >
            Clique aqui user!
          </a>
        )}
      </main>
      <Footer />
    </>
  );
}

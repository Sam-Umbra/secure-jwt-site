import Footer from "./layout/Footer";
import Header from "./layout/Header";
import style from "./Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Header auth={isAuthenticated} />
      <main className={style.main}>
        <div className={style.container}>
          <h2 className={style.title}>
            Conheça nosso site, descubra o Luxo e a Exclusividade
          </h2>
          <p className={style.content}>
            Seja bem-vindo ao mundo onde a elegância encontra a sofisticação em
            cada detalhe.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

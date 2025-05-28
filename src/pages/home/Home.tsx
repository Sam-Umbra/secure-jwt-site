import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
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

import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import style from "./Dashboard.module.css";
import { useAuth } from "../../provider/AuthProvider";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

export default function Dashboard() {
  const { roles, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <main className={style.main}>
        {roles.includes("ROLE_ADMIN") && (
          <a
            href="https://youtu.be/dQw4w9WgXcQ?feature=shared"
            className={style.text}
            target="_blank"
            rel="external"
          >
            Clique aqui administrador!
          </a>
        )}
        {roles.includes("ROLE_USER") && (
          <a
            href="https://youtu.be/dQw4w9WgXcQ?feature=shared"
            className={style.text}
            target="_blank"
            rel="external"
          >
            Clique aqui user!
          </a>
        )}
      </main>
      <Footer />
    </>
  );
}

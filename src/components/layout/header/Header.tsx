import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Header.module.css";
import {
  faCircleUser,
  faDoorOpen,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../provider/AuthProvider";
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={style.header}>
      <h1 className="logo">Umbra</h1>
      <nav className={style.nav}>
        <Link to={"/"} className={style.nav_links}>
          Home
        </Link>
        <Link to={"/dashboard"} className={style.nav_links}>
          Dashboard
        </Link>
        {isAuthenticated ? (
          <>
            <FontAwesomeIcon icon={faCircleUser} className={style.user} />
            <FontAwesomeIcon
              icon={faDoorOpen}
              className={style.logout}
              onClick={logout}
            />
          </>
        ) : (
          <Link to={"/login"}>
            <FontAwesomeIcon icon={faRightToBracket} className={style.user} />
          </Link>
        )}
      </nav>
    </header>
  );
}

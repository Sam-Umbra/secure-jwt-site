import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Header.module.css";
import {
  faCircleUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ auth }) {
  return (
    <header className={style.header}>
      <h1 className='logo'>Umbra</h1>
      <nav className={style.nav}>
        <a href="/" className={style.nav_links}>
          Home
        </a>
        <a href="/dashboard" className={style.nav_links}>
          Dashboard
        </a>
        {auth ? (
          <FontAwesomeIcon icon={faCircleUser} className={style.user} />
        ) : (
          <a href="/login">
            <FontAwesomeIcon icon={faRightToBracket} className={style.user} />
          </a>
        )}
      </nav>
    </header>
  );
}

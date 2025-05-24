import { faGithub } from "@fortawesome/free-brands-svg-icons";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className={style.footer}>
      <span className={style.content}>
        &copy; Umbra. Todos os direitos reservados.
      </span>
      <a
        href="https://github.com/Sam-Umbra"
        target="_blank"
        rel="author"
        className={style.link_button}
      >
        <div className={style.button}>
          <div className={style.button_inner}>
            <p>Veja outros Projetos</p>
            <FontAwesomeIcon icon={faGithub} />
          </div>
        </div>
      </a>
    </footer>
  );
}

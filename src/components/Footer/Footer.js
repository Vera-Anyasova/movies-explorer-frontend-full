import React from "react";
import { useLocation } from "react-router-dom";

import "../Footer/Footer.css";

function Footer() {
  const location = useLocation();

  return (
    (location.pathname === "/" ||
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies") && (
      <footer className="footer">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__item">
          <p className="footer__copyright">© 2023</p>
          <div className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/Vera-Anyasova"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;

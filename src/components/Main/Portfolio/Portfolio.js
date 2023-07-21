import React from "react";

import "../Portfolio/Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a
            href="https://github.com/Vera-Anyasova/how-to-learn.git"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <button
              className="portfolio__button"
              type="button"
              aria-label="Ссылка на статичный сайт."
            ></button>
          </a>
        </li>
        <li className="portfolio__element">
          <a
            href="https://vera-anyasova.github.io/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <button
              className="portfolio__button"
              type="button"
              aria-label="Ссылка на адаптивный сайт."
            ></button>
          </a>
        </li>
        <li className="portfolio__element">
          <a
            href="https://vera.anyasova.students.nomoredomains.monster"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            <p className="portfolio__text portfolio__text_last">
              Одностраничное приложение
            </p>
            <button
              className="portfolio__button"
              type="button"
              aria-label="Ссылка на одностраничное приложение."
            ></button>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

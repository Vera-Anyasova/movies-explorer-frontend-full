import React from "react";

import "../AboutProject/AboutProject.css";

function AboutProject() {
  return (
    <section className="aboutProject">
      <h2 className="section__title" id="about">
        О проекте
      </h2>
      <ul className="aboutProject__description">
        <li className="aboutProject__item">
          <h3 className="aboutProject__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutProject__item">
          <h3 className="aboutProject__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="aboutProject__elements">
        <span className="aboutProject__element">1 неделя</span>
        <span className="aboutProject__element aboutProject__element_long">
          4 недели
        </span>
        <span className="aboutProject__text">Back-end</span>
        <span className="aboutProject__text">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;

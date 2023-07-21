import React from "react";

import "../AboutMe/AboutMe.css";

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="section__title">Студент</h2>
      <div className="aboutMe__item">
        <div className="aboutMe__description">
          <h3 className="aboutMe__title">Вера</h3>
          <p className="aboutMe__subtitle">Фронтенд-разработчик, 36 лет</p>
          <p className="aboutMe__text">
            Я родилась и живу в Уфе, закончила факультет менеджмента и
            маркетинга ВЗФЭИ. Я люблю путешествовать, читать и узнавать что-то
            новое для себя. В 2021 году прошла курсы в школе GreenFreelance
            "Специалист по GetCourse" и там же научилась верстать сайты на
            Тильде. Поняла, что хочу научиться делать сайты более
            функциональными и решила изучить JavaScript. Так в 2022г. стала
            студентом Яндекс.Практикума и обучаюсь по программе
            «Веб-разработчик».
          </p>
          <a
            href="https://github.com/Vera-Anyasova"
            target="_blank"
            rel="noopener noreferrer"
            className="aboutMe__link"
          >
            Github
          </a>
        </div>
        <div className="aboutMe__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;

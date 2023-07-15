import React from "react";
import earth from "../../../images/earth.svg";

import "../Promo/Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__description">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href="#about">
          <button type="button" className="promo__button" value="Узнать больше">
            Узнать больше
          </button>
        </a>
      </div>
      <img
        src={earth}
        alt="Образ в виде планеты."
        className="promo__illustration"
      />
    </section>
  );
}

export default Promo;

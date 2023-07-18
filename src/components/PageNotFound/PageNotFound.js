import React from "react";
import { useNavigate } from "react-router-dom";

import "../PageNotFound/PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <h2 className="pageNotFound__title">404</h2>
      <p className="pageNotFound__message">Страница не найдена</p>
      <button
        type="button"
        value="Назад"
        onClick={() => navigate(-1)}
        className="pageNotFound__button"
      >
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;

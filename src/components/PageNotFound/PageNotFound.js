import React from "react";
import { Link } from "react-router-dom";

import "../PageNotFound/PageNotFound.css";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h2 className="pageNotFound__title">404</h2>
      <p className="pageNotFound__message">Страница не найдена</p>
      <Link to="/sign-in" className="pageNotFound__link">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;

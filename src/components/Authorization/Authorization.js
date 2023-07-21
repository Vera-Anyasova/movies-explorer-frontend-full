import React from "react";
import { Link } from "react-router-dom";
import "./Authorization.css";

function Authorization({
  type,
  title,
  children,
  textButton,
  text,
  pathEdit,
  path,
  linkEdit,
  textLink,
  onClick,
  onSubmit,
  isDisabled = false,
  errorAuth,
}) {
  return (
    <div className={`authorization authorization__${type}`}>
      <Link
        to="/"
        className={`header__logo header__logo_authorization header__logo_authorization-${type}`}
      ></Link>
      <h2 className={`authorization__title authorization__title_${type}`}>
        {title}
      </h2>
      <form
        className={`authorization__form authorization__form_${type}`}
        name="authorization-form"
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="submit"
          className={`authorization__button authorization__button_${type} ${
            isDisabled && "authorization__button_disabled"
          }`}
          disabled={isDisabled}
          name="submit_btn"
          onSubmit={onSubmit}
          value={textButton}
        >
          {textButton}
          <span className="authorization__button-error authorization__button-error_active">
            {errorAuth}
          </span>
        </button>
        <div className={`authorization__item authorization__item_${type}`}>
          <span className={`authorization__text authorization__text_${type}`}>
            {text}
          </span>
          <Link
            to={pathEdit}
            className={`authorization__link authorization__link_${type}`}
            onClick={onClick}
          >
            {linkEdit}
          </Link>
          <Link
            to={path}
            className={`authorization__link authorization__link_${type}`}
          >
            {textLink}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Authorization;

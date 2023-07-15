import React from "react";
import { NavLink } from "react-router-dom";
import account from "../../images/account.svg";
import "../Navigation/Navigation.css";

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  function changeMenu() {
    setIsOpen(!isOpen);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <div
      className={`header_navigation ${
        isOpen ? "header__container_movies-opened" : ""
      }`}
    >
      <button
        type="button"
        aria-label="Меню."
        className="header__burger-btn"
        value="Меню"
        onClick={changeMenu}
      ></button>
      <div className="header__container header__container_movies">
        <nav className="header__menu header__menu_movies">
          <button
            type="button"
            className="header__btn-close"
            aria-label="Закрыть форму."
            onClick={onClose}
          ></button>
          <NavLink
            to="/"
            className="header__link header__link_main"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="header__link header__link_movies header__link_movies-whole"
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="header__link header__link_movies header__link_movies-saved"
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className="header__link header__link-profile"
            onClick={onClose}
          >
            <button
              type="button"
              className="header__button header__button_account"
              value="Аккаунт"
            >
              <img
                src={account}
                alt="Иконка аккаунта."
                className="header__icon"
              />
              Аккаунт
            </button>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;

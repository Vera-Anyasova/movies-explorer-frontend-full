import React from "react";
import { Route, Routes, NavLink, Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import "../Header/Header.css";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    (location.pathname === "/" ||
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/profile") && (
      <header className="header">
        <Link to="/" className="header__logo"></Link>
        <Routes>
          {loggedIn ? (
            <Route path="/" element={<Navigation />} />
          ) : (
            <Route
              path="/"
              element={
                <div className="header__container header__container_home">
                  <nav className="header__menu header__menu_home">
                    <NavLink
                      to="/sign-up"
                      className="header__link header__link_home"
                    >
                      Регистрация
                    </NavLink>
                    <NavLink to="/sign-in" className="header__link">
                      <button
                        type="button"
                        className="header__button header__button_login"
                        value="Войти"
                      >
                        Войти
                      </button>
                    </NavLink>
                  </nav>
                </div>
              }
            />
          )}
          <Route path="/movies" element={<Navigation />} />
          <Route path="/saved-movies" element={<Navigation />} />
          <Route path="/profile" element={<Navigation />} />
        </Routes>
      </header>
    )
  );
}

export default Header;

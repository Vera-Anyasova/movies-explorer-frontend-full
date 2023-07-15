import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

import "../Profile/Profile.css";

function Profile({ onUpdateUser, errorAuth, handleSignout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isValid, setIsValid, resetForm } =
    useFormWithValidation();

  const [isDisabled, setIsDisabled] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setIsDisabled(true);
      setIsValid(false);
    } else {
      onUpdateUser({ name: values.name, email: values.email });
    }
  }

  function onEditDataUser(e) {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  }

  return (
    <div className="authorization authorization__profile">
      <Link
        to="/"
        className="header__logo header__logo_authorization header__logo_authorization-profile"
      ></Link>
      <h2 className="authorization__title authorization__title_profile">
        Привет, {currentUser.name}!
      </h2>
      <form
        className="authorization__form authorization__form_profile"
        name="authorization-form"
        onSubmit={handleSubmit}
      >
        <label className="authorization__field authorization__field_profile">
          <span className="authorization__profile-name">Имя</span>
          <input
            className="authorization__input authorization__input_profile authorization__input_profile-name"
            id="name-input"
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name || ""}
            minLength="2"
            maxLength="30"
            pattern="[A-Za-zА-Яа-яЁё\- ]{1,}"
            placeholder="Имя"
            disabled={!isDisabled}
            required
          />
          <span
            className="authorization__error authorization__error_profile-name"
            id="name-input-error"
          >
            {errors.name || ""}
          </span>
        </label>
        <label className="authorization__field authorization__field_profile">
          <span className="authorization__profile-email">E-mail</span>
          <input
            className="authorization__input authorization__input_profile authorization__input_profile-email"
            id="email-input"
            name="email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            disabled={!isDisabled}
            placeholder="E-mail"
            required
          />
          <span
            className="authorization__error authorization__error_profile-email"
            id="email-input-error"
          >
            {errors.email || ""}
          </span>
        </label>
        <div className="authorization__item authorization__item_profile">
          <button
            className={`authorization__button-edit ${
              isDisabled && "authorization__button-edit_disabled"
            }`}
            onClick={onEditDataUser}
          >
            Редактировать
          </button>
          {isDisabled ? (
            <button
              type="submit"
              className={`authorization__button authorization__button-profile ${
                isValid ? "" : "authorization__button_disabled"
              }`}
              disabled={!isValid}
              name="submit_btn"
              value="Сохранить"
              onSubmit={handleSubmit}
            >
              Сохранить
              <span className="authorization__button-error authorization__button-error_active">
                {errorAuth}
              </span>
            </button>
          ) : (
            ""
          )}
          <Link
            to="/sign-in"
            className="authorization__link authorization__link_profile"
            onClick={handleSignout}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Profile;

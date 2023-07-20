import React from "react";
import Authorization from "../Authorization/Authorization";
import { useFormWithValidation } from "../../hooks/useForm";

import "../Register/Register.css";

function Register({ onRegister, errorAuth }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <Authorization
      type="register"
      title="Добро пожаловать!"
      textButton="Зарегистрироваться"
      text="Уже зарегистрированы?"
      pathEdit=""
      path="/sign-in"
      textLink="Войти"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      errorAuth={errorAuth}
    >
      <label className="authorization__field authorization__field_register authorization__field_register-name">
        Имя
      </label>
      <input
        className="authorization__input authorization__input_register authorization__input_register-name"
        id="name-input"
        name="name"
        type="text"
        onChange={handleChange}
        value={values.name || ""}
        minLength="2"
        maxLength="30"
        pattern="[A-Za-zА-Яа-яЁё\- ]{1,}"
        placeholder="Имя"
        required
      />
      <span
        className="authorization__error authorization__error_register-name"
        id="name-input-error"
      >
        {errors.name || ""}
      </span>
      <label className="authorization__field authorization__field_register authorization__field_register-email">
        E-mail
      </label>
      <input
        className="authorization__input authorization__input_register authorization__input_register-email"
        id="email-input"
        name="email"
        type="email"
        pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
        value={values.email || ""}
        onChange={handleChange}
        placeholder="E-mail"
        required
      />
      <span
        className="authorization__error authorization__error_register-email"
        id="email-input-error"
      >
        {errors.email || ""}
      </span>
      <label className="authorization__field authorization__field_register authorization__field_register-password">
        Пароль
      </label>
      <input
        className="authorization__input authorization__input_register authorization__input_register-password"
        id="password-input"
        name="password"
        type="password"
        onChange={handleChange}
        value={values.password || ""}
        placeholder="Пароль"
        required
      />
      <span
        className="authorization__error authorization__error_register-password"
        id="password-input-error"
      >
        {errors.password || ""}
      </span>
    </Authorization>
  );
}

export default Register;

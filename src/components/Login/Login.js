import React from "react";
import Authorization from "../Authorization/Authorization";
import { useFormWithValidation } from "../../hooks/useForm";

import "../Login/Login.css";

function Login({ onLogin, isSubmitError, errorAuth }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  }

  return (
    <Authorization
      type="login"
      title="Рады видеть!"
      textButton="Войти"
      text="Ещё не зарегистрированы?"
      pathEdit="/profile"
      path="/sign-up"
      textLink="Регистрация"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isSubmitError={isSubmitError}
      errorAuth={errorAuth}
    >
      <label className="authorization__field authorization__field_login authorization__field_login-email">
        E-mail
      </label>
      <input
        className="authorization__input authorization__input_login authorization__input_login-email"
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
        className="authorization__error authorization__error_login-email"
        id="email-input-error"
      >
        {errors.email || ""}
      </span>
      <label className="authorization__field authorization__field_login authorization__field_login-password">
        Пароль
      </label>
      <input
        className="authorization__input authorization__input_login authorization__input_login-password"
        id="password-input"
        name="password"
        type="password"
        onChange={handleChange}
        value={values.password || ""}
        placeholder="Пароль"
        required
      />
      <span
        className="authorization__error authorization__error_login-password"
        id="password-input-error"
      >
        {errors.password || ""}
      </span>
    </Authorization>
  );
}

export default Login;

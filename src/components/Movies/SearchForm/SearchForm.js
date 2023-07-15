import React from "react";

import "../SearchForm/SearchForm.css";

function SearchForm({ search, setSearch, children, handleSearchMovies }) {
  const [errors, setErrors] = React.useState({});

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSearchMovies(search);
  };

  const handleInputChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    setSearch(evt.target.value);
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  return (
    <section className="searchForm">
      <form className="searchForm-form" onSubmit={handleFormSubmit} noValidate>
        <fieldset className="searchForm__input-container">
          <input
            className="searchForm__input"
            id="searchForm-input"
            type="text"
            name="search"
            minLength="1"
            value={search || ""}
            onChange={handleInputChange}
            placeholder="Фильм"
            required
          />
          <span className="searchForm__error" id="name-input-error">
            {errors.search || ""}
          </span>
          <button
            className="searchForm__button"
            type="submit"
            name="submit_btn"
            value="Поиск"
            onSubmit={handleFormSubmit}
          ></button>
        </fieldset>
        <fieldset className="searchForm__input-container searchForm__input-container_checkbox">
          {children}
        </fieldset>
      </form>
      <div className="searchForm__element"></div>
    </section>
  );
}

export default SearchForm;

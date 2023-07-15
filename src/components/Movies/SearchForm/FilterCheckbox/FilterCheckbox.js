import React from "react";
import SearchForm from "../SearchForm";

import "../FilterCheckbox/FilterCheckbox.css";

function FilterCheckbox({
  isChecked,
  setIsChecked,
  search,
  setSearch,
  handleSearchMovies,
  handleShortMovies,
}) {
  function handleChangeCheckbox() {
    setIsChecked(!isChecked);
    handleShortMovies();
  }

  return (
    <SearchForm
      handleSearchMovies={handleSearchMovies}
      search={search}
      setSearch={setSearch}
      isChecked={isChecked}
    >
      <label htmlFor="switch" className="searchForm__label-switch">
        Короткометражки
      </label>
      <input
        type="checkbox"
        className="searchForm__item-switch"
        name="switch"
        id="switch"
        checked={isChecked}
        onChange={handleChangeCheckbox}
      />
    </SearchForm>
  );
}

export default FilterCheckbox;

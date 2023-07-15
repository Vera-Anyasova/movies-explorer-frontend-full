import React, { useState } from "react";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import CardList from "../Movies/CardList/CardList";
import { DURATION_SHORT_MOVIE } from "../../utils/constants";
import PopupWithMessage from "../PopupWithMessage/PopupWithMessage";

import "../SavedMovies/SavedMovies.css";

function SavedMovies({
  isChecked,
  isInfoPopupOpen,
  onSavedMovie,
  onMovieLike,
  onDeleteMovie,
  savedMovies,
  handleGetSavedMovies,
  setSavedMovies,
}) {
  const [isCheckedQuery, setIsCheckedQuery] = useState(false);
  const [searchSavedMovie, setSearchSavedMovie] = useState("");
  const [foundMovies, setFoundMovies] = useState(null);
  const [shortMovies, setShortMovies] = useState(null);

  React.useEffect(() => {
    if (!isCheckedQuery) {
      handleGetSavedMovies();
    } else {
      handleSearchShortSavedMovies();
    }
  }, [isCheckedQuery]);

  function handleSearchSavedMovies() {
    const filteredSavedMovies = savedMovies.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchSavedMovie.toLowerCase());
    });
    if (filteredSavedMovies.length) {
      setFoundMovies(filteredSavedMovies);
    } else {
      setFoundMovies(null);
    }
  }

  function handleSearchShortSavedMovies() {
    const filteredShortSavedMovies = savedMovies.filter((movie) => {
      return movie.duration <= DURATION_SHORT_MOVIE;
    });
    if (filteredShortSavedMovies.length) {
      setShortMovies(filteredShortSavedMovies);
      setSavedMovies(filteredShortSavedMovies);
    } else {
      setShortMovies(null);
    }
  }

  const moviesSavedList = !isCheckedQuery ? foundMovies : shortMovies;

  return (
    <main className="content content__savedMovies">
      <FilterCheckbox
        isChecked={isCheckedQuery}
        setIsChecked={setIsCheckedQuery}
        search={searchSavedMovie}
        setSearch={setSearchSavedMovie}
        handleShortMovies={handleSearchShortSavedMovies}
        handleSearchMovies={handleSearchSavedMovies}
      ></FilterCheckbox>
      <CardList
        moviesList={!searchSavedMovie ? savedMovies : moviesSavedList}
        onMovieLike={onMovieLike}
        isChecked={isChecked}
        isInfoPopupOpen={isInfoPopupOpen}
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
        cardProps={{
          isShowLikeBtn: false,
          isShowDeleteBtn: true,
        }}
      />
      {!moviesSavedList && searchSavedMovie && (
        <PopupWithMessage
          isOpen={!isInfoPopupOpen}
          message="Ничего не найдено."
        />
      )}
    </main>
  );
}

export default SavedMovies;

import React, { useState } from "react";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import CardList from "../Movies/CardList/CardList";
import { DURATION_SHORT_MOVIE } from "../../utils/constants";
import PopupErrorNotFound from "../PopupWithMessage/PopupErrorNotFound/PopupErrorNotFound";

import "../SavedMovies/SavedMovies.css";

function SavedMovies({
  isChecked,
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
  const [isInfoPopupErrorOpen, setIsInfoPopupErrorOpen] = useState(false);

  const moviesSavedList = !isCheckedQuery ? foundMovies : shortMovies;

  React.useEffect(() => {
    handleGetSavedMovies();
    setIsInfoPopupErrorOpen(false);
  }, []);

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
      setIsInfoPopupErrorOpen(false);
    } else {
      setFoundMovies(null);
      setIsInfoPopupErrorOpen(true);
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
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
        cardProps={{
          isShowLikeBtn: false,
          isShowDeleteBtn: true,
        }}
      />
      {searchSavedMovie && !foundMovies && (
        <PopupErrorNotFound
          isOpen={isInfoPopupErrorOpen}
          message="Ничего не найдено."
        />
      )}
    </main>
  );
}

export default SavedMovies;

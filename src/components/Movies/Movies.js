import React from "react";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import CardList from "../Movies/CardList/CardList";

import "../Movies/Movies.css";

function Movies({
  foundMovies,
  isChecked,
  setIsChecked,
  search,
  setSearch,
  handleSearchMovies,
  handleShortMovies,
  isLoading,
  isInfoErrorOpen,
  shortMovies,
  onMovieLike,
  onSavedMovie,
  onDeleteMovie,
  savedMovies,
  handleGetSavedMovies,
}) {
  React.useEffect(() => {
    handleGetSavedMovies();
  }, []);

  const moviesList = !isChecked ? foundMovies : shortMovies;
  return (
    <main className="content content__movies">
      <FilterCheckbox
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleSearchMovies={handleSearchMovies}
        search={search}
        setSearch={setSearch}
        handleShortMovies={handleShortMovies}
      ></FilterCheckbox>
      <CardList
        moviesList={moviesList}
        onMovieLike={onMovieLike}
        isLoading={isLoading}
        isChecked={isChecked}
        isInfoErrorOpen={isInfoErrorOpen}
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
        savedMovies={savedMovies}
        search={search}
      />
    </main>
  );
}

export default Movies;

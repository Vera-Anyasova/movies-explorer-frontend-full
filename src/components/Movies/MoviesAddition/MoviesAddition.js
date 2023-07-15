import React from "react";

import "../MoviesAddition/MoviesAddition.css";

function MoviesAddition({ type, handleAddMovies }) {
  return (
    <section className={`moviesAddition moviesAddition-${type}`}>
      <button
        className={`moviesAddition__button moviesAddition__button-${type}`}
        onClick={handleAddMovies}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesAddition;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MOVIE_IMAGE_PATH, HOUR } from "../../../utils/constants";

import "../MoviesCard/MoviesCard.css";

function MoviesCard({
  movie,
  onSavedMovie,
  onDeleteMovie,
  isShowLikeBtn = true,
  isShowDeleteBtn = false,
  savedMovies,
}) {
  const location = useLocation();
  const [isLikedMovie, setIsLikeMovie] = useState(false);
  const movieLikeButton = `element__button ${
    isLikedMovie && "element__button_active"
  }`;
  const savedUserMovie = savedMovies?.find((i) => i.nameRU === movie.nameRU);
  const hours = Math.floor(movie.duration / HOUR);
  const minutes = Math.floor(movie.duration % HOUR);

  useEffect(() => {
    if (savedUserMovie) {
      setIsLikeMovie(true);
    }
  }, [location]);

  function handleLikeMovie() {
    onSavedMovie(movie);
    setIsLikeMovie(!isLikedMovie);
  }

  function handleRemoveLike() {
    onDeleteMovie(savedUserMovie._id);
    setIsLikeMovie(false);
  }

  function handleDeleteMovie() {
    onDeleteMovie(movie.id || movie._id);
    setIsLikeMovie(false);
  }

  return (
    <li className="element">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="element__link"
      >
        <img
          src={
            movie.image.url ? MOVIE_IMAGE_PATH + movie.image.url : movie.image
          }
          alt={movie.nameRU}
          className="element__photo"
        />
      </a>
      <div className="element__place">
        <h2 className="element__title">{movie.nameRU}</h2>
        {isShowLikeBtn && (
          <button
            type="button"
            className={movieLikeButton}
            aria-label="Отметить фильм."
            onClick={!isLikedMovie ? handleLikeMovie : handleRemoveLike}
          ></button>
        )}
        {isShowDeleteBtn && (
          <button
            type="button"
            className="element__button element__button_delete"
            aria-label="Отметить фильм."
            onClick={handleDeleteMovie}
          ></button>
        )}
      </div>
      <p className="element__time">
        {hours}ч{minutes}м
      </p>
    </li>
  );
}

export default MoviesCard;

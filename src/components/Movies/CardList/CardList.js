import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./CardList.css";
import MoviesAddition from "../MoviesAddition/MoviesAddition";
import PopupWithMessage from "../../PopupWithMessage/PopupWithMessage";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  COMPUTER_DISPAY,
  TABLET_DISPAY,
  PHONE_DISPAY,
  COUNT_FOR_COMPUTER,
  COUNT_FOR_TABLET,
  COUNT_FOR_PHONE,
  ADD_COUNT_FOR_COMPUTER,
  ADD_COUNT_FOR_TABLET,
} from "../../../utils/constants";

function CardList({
  moviesList,
  isInfoPopupOpen,
  onMovieLike,
  onSavedMovie,
  onDeleteMovie,
  savedMovies,
  firstSearch,
  cardProps,
}) {
  const width = useWindowSize();
  const [count, setCount] = useState(4);
  const [addNextMovies, setAddNextMovies] = useState(0);

  const moviesToShow = moviesList?.slice(0, count);
  const isShowMoreVisible = moviesList?.length > moviesToShow?.length;

  function showCountMovies() {
    if (width >= COMPUTER_DISPAY) {
      setCount(COUNT_FOR_COMPUTER);
      setAddNextMovies(ADD_COUNT_FOR_COMPUTER);
    } else if (width <= COMPUTER_DISPAY && width > TABLET_DISPAY) {
      setCount(COUNT_FOR_TABLET);
      setAddNextMovies(ADD_COUNT_FOR_COMPUTER);
    } else if (width <= TABLET_DISPAY && width > PHONE_DISPAY) {
      setCount(COUNT_FOR_TABLET);
      setAddNextMovies(ADD_COUNT_FOR_TABLET);
    } else if (width <= PHONE_DISPAY) {
      setCount(COUNT_FOR_PHONE);
      setAddNextMovies(ADD_COUNT_FOR_TABLET);
    }
  }

  useEffect(() => {
    showCountMovies();
  }, [width]);

  function handleAddMovies() {
    showCountMovies();
    setCount(count + addNextMovies);
  }

  return (
    <section className="elements elements__page elements__page_saved">
      <ul className="elements__list">
        {moviesToShow?.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onMovieLike={onMovieLike}
              onSavedMovie={onSavedMovie}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
              {...cardProps}
            />
          );
        })}
      </ul>
      {!moviesToShow && firstSearch && (
        <PopupWithMessage
          isOpen={!isInfoPopupOpen}
          message="Ничего не найдено."
        />
      )}
      {isShowMoreVisible && (
        <MoviesAddition handleAddMovies={handleAddMovies} />
      )}
    </section>
  );
}

export default CardList;

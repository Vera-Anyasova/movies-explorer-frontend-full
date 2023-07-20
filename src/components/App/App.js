import React, { useState, useEffect, useCallback } from "react";
import "../App/App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import api from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithMessage from "../PopupWithMessage/PopupWithMessage";
import PopupWithInfoWin from "../PopupWithInfo/PopupWithInfoWin/PopupWithInfoWin";
import ProtectedRouteElement from "../ProtectedRoute";
import Preloader from "../Movies/Preloader/Preloader";
import { DURATION_SHORT_MOVIE } from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState(null);
  const [shortMovies, setShortMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [firstSearch, setFirstSearch] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [errorAuth, setErrorAuth] = useState("");
  const [isInfoPopupWinOpen, setIsInfoPopupWinOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    handleGetUserMovies();
  }, []);

  useEffect(() => {
    const saveToList = () => {
      localStorage.setItem("movies", JSON.stringify(foundMovies));
      localStorage.setItem("search", JSON.stringify(search));
      localStorage.setItem("isChecked", JSON.stringify(isChecked));
    };

    search === "" ? setFirstSearch(false) : setFirstSearch(true);
    window.addEventListener("beforeunload", saveToList);
  }, [foundMovies, search, isChecked]);

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("isAuth", "true");
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 401") {
          setErrorAuth("Вы ввели неправильный логин или пароль.");
        } else if (err === "Ошибка: 400") {
          setErrorAuth("При авторизации произошла ошибка");
        } else if (err === "Ошибка: 500") {
          setErrorAuth("На сервере произошла ошибка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then(() => {
        navigate("/movies", { replace: true });
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setErrorAuth("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setErrorAuth("При регистрации пользователя произошла ошибка.");
        } else if (err === "Ошибка: 500") {
          setErrorAuth("На сервере произошла ошибка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem("isAuth");
    if (token) {
      setIsLoading(true);
      auth
        .checkToken()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
          handleSignout();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserIfnoApi()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setCurrentUser, loggedIn]);

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    mainApi
      .sendUserIfno(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsInfoPopupWinOpen(true);
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setErrorAuth("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 400") {
          setErrorAuth("При обновлении профиля произошла ошибка.");
        } else if (err === "Ошибка: 500") {
          setErrorAuth("На сервере произошла ошибка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleGetMovies() {
    if (search !== 0) setIsLoading(true);
    api
      .getAllMovies()
      .then((res) => {
        setAllMovies(res);
        const foundUserMovies = res.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(search.toLowerCase());
        });
        if (foundUserMovies.length) {
          setFoundMovies(foundUserMovies);
        } else {
          setFoundMovies(null);
          setAllMovies(allMovies);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleGetUserMovies() {
    const moviesJSON = localStorage.getItem("movies");
    if (moviesJSON) {
      const foundUserMovies = JSON.parse(moviesJSON);
      setFoundMovies(foundUserMovies);
    }
    const searchUserMovies = localStorage.getItem("search");
    if (searchUserMovies) {
      const searchMovies = JSON.parse(searchUserMovies);
      setSearch(searchMovies);
    }
    const checkedMovies = localStorage.getItem("isChecked");
    if (checkedMovies) {
      const checkedUserMovies = JSON.parse(checkedMovies);
      setIsChecked(checkedUserMovies);
    }
  }

  function handleCetShortMovies() {
    if (foundMovies?.length) {
      const foundShortMovies = foundMovies.filter((movie) => {
        return movie.duration <= DURATION_SHORT_MOVIE;
      });
      if (foundShortMovies.length >= 1) {
        setShortMovies(foundShortMovies);
        localStorage.setItem("shortMovies", JSON.stringify(foundShortMovies));
      } else {
        setFoundMovies(null);
      }
    }
  }

  useEffect(() => {
    handleGetUserShortMovies();
  }, []);

  function handleGetUserShortMovies() {
    const moviesShortJSON = localStorage.getItem("shortMovies");
    if (moviesShortJSON) {
      const foundUserShortMovies = JSON.parse(moviesShortJSON);
      setShortMovies(foundUserShortMovies);
    }
  }

  React.useEffect(() => {
    handleGetSavedMovies();
  }, [currentUser]);

  function handleGetSavedMovies() {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          const addSavedMovie = res.data.filter(
            (i) => i.owner === currentUser._id
          );
          setSavedMovies(addSavedMovie);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSaveMovie(movie) {
    mainApi
      .savedMovies(movie)
      .then(() => {
        const getSavedMovies = [...savedMovies];
        setSavedMovies(getSavedMovies);
        handleGetSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(id) {
    mainApi
      .deleteCard(id)
      .then(() => {
        const getSavedMovies = savedMovies.filter((c) => {
          return (c.id || c._id) !== id;
        });
        setSavedMovies(getSavedMovies);
        handleGetSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closePopup() {
    setIsInfoPopupWinOpen(false);
  }

  function handleSignout() {
    localStorage.clear();
    auth
      .logout()
      .then(() => {
        navigate("/", { replace: true });
        setLoggedIn(false);
        setCurrentUser({});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App-page">
        <Header loggedIn={loggedIn} />
        <Preloader isLoading={isLoading} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              !loggedIn ? (
                <Register onRegister={handleRegister} errorAuth={errorAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              !loggedIn ? (
                <Login onLogin={handleLogin} errorAuth={errorAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onUpdateUser={handleUpdateUser}
                loggedIn={loggedIn}
                handleSignout={handleSignout}
                errorAuth={errorAuth}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={loggedIn}
                shortMovies={shortMovies}
                foundMovies={foundMovies}
                search={search}
                setSearch={setSearch}
                isChecked={isChecked}
                savedMovies={savedMovies}
                setIsChecked={setIsChecked}
                isLoading={isLoading}
                handleSearchMovies={handleGetMovies}
                isInfoPopupOpen={isInfoPopupOpen}
                handleShortMovies={handleCetShortMovies}
                onSavedMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                firstSearch={firstSearch}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                isLoading={isLoading}
                setSavedMovies={setSavedMovies}
                isInfoPopupOpen={isInfoPopupOpen}
                onSavedMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                handleGetSavedMovies={handleGetSavedMovies}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <PopupWithMessage
          isOpen={isInfoPopupOpen}
          message="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        />
        <PopupWithInfoWin isOpen={isInfoPopupWinOpen} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

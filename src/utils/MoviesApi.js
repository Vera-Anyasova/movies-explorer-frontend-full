class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkingResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllMovies = () => {
    return fetch(this._url, {
      headers: this._headers,
    }).then((res) => {
      return this._checkingResponse(res);
    });
  };
}

const api = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

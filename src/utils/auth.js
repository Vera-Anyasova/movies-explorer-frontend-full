export const BASE_URL = "https://api.movies-vera.nomoredomains.rocks";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    return getResponse(res);
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    return getResponse(res);
  });
};

import React from "react";
// import PopupErrorNotFound from "../PopupErrorNotFound/PopupErrorNotFound.css";
import PopupWithMessage from "../PopupWithMessage";

function PopupErrorNotFound({ isOpen }) {
  return (
    <PopupWithMessage
      isOpen={isOpen}
      message="Ничего не найдено."
    ></PopupWithMessage>
  );
}

export default PopupErrorNotFound;

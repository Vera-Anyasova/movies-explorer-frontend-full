import React from "react";
import "./PopupWithMessage.css";

function PopupWithMessage({ isOpen, message }) {
  return (
    <div
      className={`popupWithMessage ${isOpen ? "popupWithMessage_opened" : ""}`}
    >
      <div className="popupWithMessage__container">
        <span className="popupWithMessage__text">{message}</span>
      </div>
    </div>
  );
}

export default PopupWithMessage;

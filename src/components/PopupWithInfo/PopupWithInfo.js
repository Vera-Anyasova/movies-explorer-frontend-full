import React from "react";
import "./PopupWithInfo.css";

function PopupWithInfo({ isOpen, onClose, image, message }) {
  return (
    <div className={`popup__info ${isOpen ? "popup__info_opened" : ""}`}>
      <div className="popup__container-info">
        <button
          type="button"
          className="popup__button-info"
          aria-label="Закрыть форму."
          onClick={onClose}
        ></button>
        <form className="form__info">
          <div className={`popup__union popup__union-${image}`}></div>
          <h2 className="popup__message">{message}</h2>
        </form>
      </div>
    </div>
  );
}

export default PopupWithInfo;

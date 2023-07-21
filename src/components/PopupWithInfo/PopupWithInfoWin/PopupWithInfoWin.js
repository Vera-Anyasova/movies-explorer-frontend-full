import React from "react";
import PopupWithInfo from "../PopupWithInfo";

import "../PopupWithInfoWin/PopupWithInfoWin.css";

function PopupWithInfoWin({ isOpen, onClose }) {
  return (
    <PopupWithInfo
      isOpen={isOpen}
      image="win"
      message="Ваши данные обновлены!"
      onClose={onClose}
    ></PopupWithInfo>
  );
}

export default PopupWithInfoWin;

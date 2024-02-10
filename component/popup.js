import React, { Component, useEffect } from "react";
import style from "/styles/popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function PopUp({ reply, changeState }) {
  if (reply) {
    setTimeout(() => {
      changeState(false);
    }, 5000);
  }

  const removeCursor = () => {
    changeState(false);
  };

  return (
    <div className={style.popup}>
      <div className={style.content}>
        <span>{reply}</span>
      </div>
      <div className={style.remove}>
        <FontAwesomeIcon
          onClick={removeCursor}
          icon={faX}
          className={style.icon}
        />
      </div>
    </div>
  );
}

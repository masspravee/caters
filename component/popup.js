import React, { Component } from "react";
import style from "/styles/popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function PopUp({ stateChange }) {
  const handleChange = () => {
    stateChange(false);
  };
  return (
    <div className={style.popup}>
      <div className={style.remove}>
        <FontAwesomeIcon
          icon={faX}
          className={style.icon}
          onClick={handleChange}
        />
      </div>
      <div className={style.header}>
        <h1>Welcome </h1>
      </div>

      <div className={style.content}>
        <span>Login To Experience Every Features</span>
      </div>
    </div>
  );
}

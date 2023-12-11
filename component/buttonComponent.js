import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import style from "/styles/services.module.css";

export default function ButtonComponent({ buttonName, removeFunction }) {
  const removeDistrict = () => {
    removeFunction((prev) => prev.filter((x) => x != buttonName));
  };

  return (
    <div className={style.button_component} onClick={removeDistrict}>
      <button>{buttonName}</button>
      <span>
        <FontAwesomeIcon icon={faX} />
      </span>
    </div>
  );
}

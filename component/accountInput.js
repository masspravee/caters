import React, { Component, useState } from "react";
import style from "/styles/account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
export default function AccountInput({
  name,
  initialValue,
  changeState,
  editable = true,
  placeholder = "",
}) {
  const [edit, setEdit] = useState(true);
  const setState = (e) => {
    changeState(e.target.value);
  };
  const changeEdit = () => {
    if (editable) {
      setEdit(!edit);
    }
  };

  return (
    <div className={style.data}>
      <label>{name}</label>
      <input
        disabled={edit}
        value={initialValue}
        onChange={setState}
        placeholder={placeholder}
      />
      {edit ? (
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={changeEdit}
          className={style.icon}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheck}
          onClick={changeEdit}
          className={style.icon}
        />
      )}
    </div>
  );
}

import React, { Component, useState, useRef, useEffect } from "react";
import style from "/styles/account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
export default function AccountInput({
  label_name,
  initialValue,
  changeState,
  editable = true,
  differentName = false,
  placeholder = "",
}) {
  const [edit, setEdit] = useState(true);
  const currentInput = useRef(null);
  const setState = (event) => {
    let { name, value } = event.target;

    changeState((prev) => ({ ...prev, [name]: value }));
  };
  const changeEdit = () => {
    if (editable) {
      setEdit(!edit);
    }
  };

  useEffect(() => {
    if (!edit) {
      currentInput.current.focus();
    }
  }, [edit]);

  return (
    <div className={style.data}>
      <label>{differentName ? differentName : label_name}</label>
      <input
        disabled={edit}
        value={initialValue ? initialValue : ""}
        onChange={setState}
        placeholder={placeholder}
        name={label_name}
        ref={currentInput}
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

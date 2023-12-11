import React, { Component } from "react";
import style from "/styles/popup.module.css";

export default function RedirectComp({ title = null, msg = [] }) {
  return (
    <div className={style.popup}>
      <div className={style.header}>
        <h1>{title} </h1>
      </div>

      <div className={style.content}>
        {msg.map((x, index) => {
          return <span key={index}>{x}</span>;
        })}
      </div>
    </div>
  );
}

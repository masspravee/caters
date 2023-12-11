import style from "/styles/blog.module.css";
import Post from "@/component/post";
import React, { useState } from "react";

export default function Blog({ jsonRes }) {
  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}></div>
        <div className={style.blog}>
          <h1>Blog</h1>
          {jsonRes.map((value, index) => {
            return <Post data={value} key={index} />;
          })}
        </div>
        <div className={style.sideBar}></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/post");
  const data = await response.json();
  const jsonRes = data.message;

  return {
    props: {
      jsonRes,
    },
  };
}

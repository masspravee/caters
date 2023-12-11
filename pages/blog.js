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
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}/api/post`
      : "http://localhost:3000/api/post";

  const response = await fetch(apiUrl);
  const data = await response.json();
  const jsonRes = data.message;

  return {
    props: {
      jsonRes,
    },
  };
}

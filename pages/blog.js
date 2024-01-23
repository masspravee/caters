import style from "/styles/blog.module.css";
import Post from "@/component/post";
import React, { useState, useEffect } from "react";
import SideBar from "@/component/sideBar";
import { useRouter } from "next/router";

export default function Blog({ data }) {
  const navi = useRouter();
  const response = data.postData;

  const sideBarData = data.allUsernames;

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}>
          <SideBar data={sideBarData} />
        </div>
        <div className={style.blog}>
          <h1>Blog</h1>
          {response
            ? response.map((value, index) => {
                return <Post data={value} key={index} />;
              })
            : null}
        </div>

        <div className={style.suggested}>
          <h3>suggested for you</h3>
          {sideBarData.map((value, index) => {
            return <a href={`/users/${value}`}>{value}</a>;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/post`
      : "http://localhost:3000/api/post";
  const response = await fetch(apiUrl);
  const res = await response.json();

  return {
    props: { data: res },
  };
}

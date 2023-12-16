import style from "/styles/blog.module.css";
import Post from "@/component/post";
import React, { useState, useEffect } from "react";
import GetRequest from "@/component/getRequest";

export default function Blog({ data }) {
  const [response, setResponse] = useState(null);

  const resquest = async () => {
    var data = await GetRequest("/post");
    setResponse(data.message);
  };

  useEffect(() => {
    //resquest();
  }, []);

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}></div>
        <div className={style.blog}>
          <h1>Blog</h1>
          {data
            ? data.map((value, index) => {
                return <Post data={value} key={index} />;
              })
            : null}
        </div>
        <div className={style.sideBar}></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(`https:${process.env.VERCEL_URL}/api/post`);
  const res = await response.json();
  console.log(res.message);
  return {
    props: { data: res.message },
  };
}

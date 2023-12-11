import style from "/styles/blog.module.css";
import Post from "@/component/post";
import React, { useState, useEffect } from "react";
import GetRequest from "@/component/getRequest";

export default function Blog() {
  const [response, setResponse] = useState(null);

  const resquest = async () => {
    var data = await GetRequest("/post");
    setResponse(data.message);
  };

  useEffect(() => {
    resquest();
  }, []);

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}></div>
        <div className={style.blog}>
          <h1>Blog</h1>
          {response
            ? response.map((value, index) => {
                return <Post data={value} key={index} />;
              })
            : null}
        </div>
        <div className={style.sideBar}></div>
      </div>
    </div>
  );
}

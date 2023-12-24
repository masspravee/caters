import style from "/styles/blog.module.css";
import Post from "@/component/post";
import React, { useState, useEffect } from "react";
import GetRequest from "@/component/getRequest";
import SideBar from "@/component/sideBar";

export default function Blog({ data }) {
  console.log(data);
  const [response, setResponse] = useState(data.message);
  const [sideBarData, setSidebarData] = useState(data.allUserData);

  /**

  const resquest = async () => {
    var data = await GetRequest("/post");
    setResponse(data.message);
    setSidebarData(data.allUserData);
  };

  useEffect(() => {
    resquest();
  }, []);

   */

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
      </div>
    </div>
  );
}

export async function getStaticProps() {
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

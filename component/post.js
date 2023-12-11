import style from "/styles/blog.module.css";
import React, { useState, useEffect } from "react";
export default function Post({ data }) {
  const [postImage, setPostImage] = useState([]);

  useEffect(() => {
    setPostImage(data.photoUrl);
  }, []);

  return (
    <div className={style.post}>
      <header>
        <img src="/profile.jpg" />
        <h2>{data.username}</h2>
      </header>
      <div className={style.content}>
        <img src={postImage.length > 0 ? postImage[0][0] : null} alt="post" />
      </div>
      <footer>
        <span className={style.username}>{data.username}</span>
        <span className={style.caption}>{data.caption}</span>
      </footer>
    </div>
  );
}

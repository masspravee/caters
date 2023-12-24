import style from "/styles/blog.module.css";
import React, { useState, useEffect } from "react";
import { defaultImage } from "./smallComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
export default function Post({ data }) {
  const [postImage, setPostImage] = useState(data.photoUrl);
  const [currentImage, setCurrentImage] = useState(postImage[0]);
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState(data.profileUrl);

  const nextImage = () => {
    var len = postImage.length;
    if (len != 0 && count >= 0 && count < len - 1) {
      setCount(() => {
        setCurrentImage(postImage[count + 1]);
        return count + 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[0]);
        return 0;
      });
    }
  };

  const prevImage = () => {
    var len = postImage.length;
    if (len != 0 && count > 0) {
      setCount(() => {
        setCurrentImage(postImage[count - 1]);
        return count - 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[len - 1]);
        return len - 1;
      });
    }
  };

  return (
    <div className={style.post}>
      <header>
        <img src={profile ? profile : defaultImage(data.username)} />
        <h2>{data.username}</h2>
      </header>
      <div className={style.content}>
        <div className={style.slideLeft}>
          {" "}
          <FontAwesomeIcon icon={faCaretLeft} size="3x" onClick={prevImage} />
        </div>

        <img src={postImage.length > 0 ? currentImage : null} alt="post" />
        <div className={style.slideRight}>
          {" "}
          <FontAwesomeIcon
            icon={faCaretRight}
            size="3x"
            className={style.slide}
            onClick={nextImage}
          />
        </div>
      </div>
      <footer>
        <span className={style.username}>{data.username}</span>
        <span className={style.caption}>{data.caption}</span>
      </footer>
    </div>
  );
}

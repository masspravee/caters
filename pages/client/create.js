import style from "/styles/create-post.module.css";
import React, { Component, useState, useEffect, useContext } from "react";
// file not uploaded on production
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faCaretLeft,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";

import MessagePopup from "@/component/messagePopup";
import { useRouter } from "next/router";
import { defaultImage, VerifiedLogo } from "@/component/smallComponents";
import SendData from "@/component/sendData";
export default function CreatePost() {
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);
  const navi = useRouter();
  const [userCred, setUserCred] = useState({
    username: "",
    imageUrl: "",
    isVerified: false,
  });
  console.log(userCred);
  const [image, setImage] = useState();
  const [postImage, setPostImage] = useState([]);
  const [count, setCount] = useState(0);
  const [caption, setCaption] = useState(null);
  const [popupError, setPopupError] = useState(null);

  const handleImage = (event) => {
    var files = Array.from(event.target.files);
    console.log(files);
    var urlFiles = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setPostImage(urlFiles);
    setImage(files);
  };

  const prevImage = () => {
    var len = postImage.length;
    if (len != 0 && count <= 0) {
      setCount((prev) => prev - 1);
    } else {
    }
  };

  const nextImage = () => {
    var len = postImage.length;
    if (len != 0 && count < len - 1) {
      setCount((prev) => prev + 1);
    } else {
      setCount(0);
    }
  };

  const handleCaption = (event) => {
    setCaption(event.target.value);
  };

  const submitPost = async (event) => {
    event.preventDefault();
    if (!loader) {
      setLoader(true);

      const dataToServer = new FormData();

      dataToServer.append("caption", caption);
      image.map((file, index) => {
        dataToServer.append(`file${index}`, file);
        dataToServer.append("username", userCred.username);
      });

      var res = await SendData(
        "/create-post",
        dataToServer,
        "multipart/form-data",
        false
      );
      setLoader(false);
      if (res.authType == 200) {
        setReply(res.message);
        console.log(res);
        navi.push("/blog");
      } else {
        setReply("post Failed");
      }
    }
  };

  const deleteImage = (count) => {
    console.log(count);
    //const deleted = postImage.filter((value, index) => {  index !== count    });
    setPostImage((prev) => {
      return prev.filter((value, index) => index !== count);
    });
  };

  const getPage = () => {
    try {
      let renderData = JSON.parse(localStorage.getItem("login-cred"));
      setUserCred(renderData);
    } catch (err) {
      if (err.message === "renderData is null") {
        setReply("You Need to Login to continue");
        setTimeout(function () {
          navi.push("/welcome");
        }, 5000);
      }
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <div className="container">
      {popupError ? <MessagePopup message={popupError} /> : null}

      <div className={style.inner_container}>
        <div className={style.post}>
          <header className={style.header}>
            <h2>Create Post</h2>
            <h3>{reply ? reply : ""}</h3>
          </header>
          <form className={style.content} onSubmit={submitPost}>
            <div className={style.content_header}>
              <img
                referrerPolicy="no-referrer"
                src={
                  userCred.photoUrl
                    ? userCred.photoUrl
                    : defaultImage(userCred.username)
                }
                className={style.profile}
              ></img>
              <div className={style.namespace}>
                <span className={style.displayName}>{userCred.username}</span>
                {userCred.isVerified ? <VerifiedLogo /> : null}
              </div>
            </div>
            <div className={style.content_box}>
              <textarea
                onChange={handleCaption}
                placeholder="Tell About the Catering"
                required
              ></textarea>
            </div>

            <div className={style.inner_box}>
              <div className={style.img_container}>
                <div className={style.hover_div}>
                  <input
                    type="file"
                    multiple
                    name="file"
                    id="image"
                    onChange={handleImage}
                    accept="image/jpeg,image/png"
                  />

                  <label htmlFor="image">
                    <FontAwesomeIcon
                      icon={faFileImage}
                      size="2x"
                      style={style.slide}
                    />
                    <h3>Add Photos / Videos</h3>
                  </label>
                </div>

                <div className={style.img_div}>
                  {postImage.length != 0 ? (
                    <>
                      <div className={style.delete}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => deleteImage(count)}
                        />
                      </div>
                      <div className={style.slideLeft}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCaretLeft}
                          size="2x"
                          onClick={prevImage}
                        />
                      </div>

                      <img src={postImage[count]} alt={``} />
                      <div className={style.slideRight}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCaretRight}
                          size="2x"
                          className={style.slide}
                          onClick={nextImage}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <button>Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

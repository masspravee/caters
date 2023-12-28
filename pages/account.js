import React, { Component, useState, useEffect } from "react";
import style from "/styles/account.module.css";
import Loading from "@/component/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/component/accountInput";
import SendData from "@/component/sendData";
import GetRequest from "@/component/getRequest";
import { defaultImage } from "@/component/smallComponents";
export default function Account() {
  const [loginCred, setLoginCred] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
    uid: "",
  });

  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState({ file: [] });
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState(null);

  const handleImage = (event) => {
    var file = event.target.files[0];
    var urlImage = URL.createObjectURL(file);
    setShowImage(urlImage);
    setImage(file);
    setImageChange((prev) => !prev);
  };

  const errorImageHandler = () => {
    setShowImage(defaultImage(loginCred.username));
  };

  const handler = async (event) => {
    event.preventDefault();
    setLoader(true);

    const response = await SendData("/update-user", loginCred);
    console.log(response);
    setLoader(false);
  };

  useEffect(() => {
    let renderData = JSON.parse(localStorage.getItem("login-cred"));
    setLoginCred(renderData);
    setShowImage(renderData.photoUrl);
    console.log(renderData);
  }, []);

  useEffect(() => {
    if (imageChange) {
      console.log("image-change");

      var form = new FormData();
      form.append("file", image);
      console.log(form);
      SendData("/profile", form, "multipart/form-data", false);
      setImageChange((prev) => !prev);
    }
  }, [imageChange]);

  return (
    <div className={style.account}>
      {loader ? <Loading /> : null}
      <form onSubmit={handler} className={style.card}>
        <h1>Your profile</h1>
        <div className={style.profile_container}>
          <input
            type="file"
            onChange={handleImage}
            id="image"
            accept="image/jpeg, image/png"
            className={style.hideImage}
          />
          <label htmlFor="image">
            <img
              src={showImage ? showImage : defaultImage(loginCred.username)}
              referrerPolicy="no-referrer"
              onError={errorImageHandler}
            ></img>
          </label>

          <FontAwesomeIcon
            icon={faCamera}
            className={style.select_image}
          ></FontAwesomeIcon>
        </div>

        <div className={style.data_container}>
          <h2>@{loginCred.username}</h2>
          <AccountInput
            label_name={"username"}
            initialValue={loginCred.displayName}
            changeState={setLoginCred}
          />
          <AccountInput
            label_name={"email"}
            initialValue={loginCred.email}
            changeState={setLoginCred}
            editable={false}
          />
          <AccountInput
            label_name={"phone"}
            initialValue={loginCred.phone}
            changeState={setLoginCred}
            placeholder="No phone number"
          />
          <AccountInput
            label_name={"bio"}
            initialValue={loginCred.bio}
            changeState={setLoginCred}
            placeholder="Nothing here"
          />

          <button type="submit">Save Info</button>
        </div>
      </form>
    </div>
  );
}

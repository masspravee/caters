import React, { Component, useState, useEffect } from "react";
import style from "/styles/account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/component/accountInput";
import SendData from "@/component/sendData";
import GetRequest from "@/component/getRequest";
import { defaultImage } from "@/component/smallComponents";
export default function Account() {
  const [loginCred, setLoginCred] = useState(null);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [change, setChange] = useState(false);
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

  const handler = async () => {
    setLoginCred((prev) => {
      return {
        ...prev,
        ["username"]: username,
        ["email"]: email,
        ["phone"]: phone,
      };
    });
    setChange(true);
  };

  useEffect(() => {
    let renderData = JSON.parse(localStorage.getItem("login-cred"));
    setLoginCred(renderData);
    setUserName(renderData.username);
    setEmail(renderData.email);
    setPhone(renderData.phone);
    setShowImage(renderData.photoUrl);
  }, []);

  useEffect(() => {
    if (change) {
      console.log("chnaging");
      SendData("/update-user", loginCred);
      setChange(false);
    }
    if (imageChange) {
      console.log("image-change");

      var form = new FormData();
      form.append("file", image);
      console.log(form);
      SendData("/profile", form, "multipart/form-data", false);
      setImageChange((prev) => !prev);
    }
  }, [change, imageChange]);

  return (
    <div className={style.account}>
      <div className={style.card}>
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
              src={showImage ? showImage : defaultImage(username)}
              referrerPolicy="no-referrer"
            ></img>
          </label>

          <FontAwesomeIcon
            icon={faCamera}
            className={style.select_image}
          ></FontAwesomeIcon>
        </div>

        <div className={style.data_container}>
          <AccountInput
            name={"username"}
            initialValue={username}
            changeState={setUserName}
          />
          <AccountInput
            name={"email"}
            initialValue={email}
            changeState={setEmail}
            editable={false}
          />
          <AccountInput
            name={"phone"}
            initialValue={phone}
            changeState={setPhone}
            placeholder="No phone number"
          />
          <button onClick={handler}>Save Info</button>
        </div>
      </div>
    </div>
  );
}

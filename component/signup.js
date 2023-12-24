import style from "/styles/new.module.css";
import loginMethod from "./method";
import React, { Component, useState, useEffect } from "react";
import SendData from "./sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
export default function SignUpBox({ changeState }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [contact, setContact] = useState(null);
  const [retype, setRetype] = useState(null);
  const [error, setError] = useState(null);
  const [passCheck, setPassCheck] = useState(null);
  const navi = useRouter();
  // phone number disalbled
  useEffect(() => {
    if (password && retype) {
      if (password != retype) {
        setPassCheck("* password should be same");
      } else {
        setPassCheck(null);
      }
    }
  }, [retype, password]);

  const handler = async (event) => {
    event.preventDefault();
    var dataToServer = {
      username: username,
      password: password,
    };
    if (isNaN(contact)) {
      dataToServer.email = contact;
    } else {
      dataToServer.phone = contact;
    }
    var res = await SendData("/signup", dataToServer);
    setError(res.message);
    setTimeout(() => {
      navi.push("/blog");
    }, 3000);
  };

  const handleState = () => {
    changeState((prev) => !prev);
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>SignUp</span>
            <span className={style.secondSpan}>/</span>
            <span className={style.secondSpanWord} onClick={handleState}>
              Login
            </span>
          </div>
          <div>
            <h3 className={style.errorMsg}>{error}</h3>
          </div>
        </header>
        <div className={style.inner_content}>
          <div className={style.social}>
            <FontAwesomeIcon
              className={style.icon}
              icon={faGoogle}
              onClick={() => loginMethod("google", setError)}
            />
            <FontAwesomeIcon className={style.icon} icon={faFacebookF} />
          </div>
          <div>
            <span className={style.idea}>or create account with email</span>
          </div>
          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter username"
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            <input
              placeholder="enter email"
              type="email"
              onChange={(e) => setContact(e.target.value)}
              required={true}
            />

            <input
              placeholder="enter password"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <label className={style.retype}>{passCheck}</label>
            <input
              placeholder="retype password"
              minLength={8}
              onChange={(e) => setRetype(e.target.value)}
              required={true}
            />
            <div className={style.footer}>
              <button type="submit">SignIn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//

import style from "/styles/new.module.css";
import loginMethod from "./method";
import React, { Component, useState, useEffect } from "react";
import SendData from "./sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import Loading from "./loading";
export default function SignUpBox({ changeState, response, responseState }) {
  const [userCred, setUserCred] = useState({
    username: "",
    email: "",
    password: "",
    retype: "",
  });
  const [loader, setLoader] = useState(false);

  const [passCheck, setPassCheck] = useState(null);
  const navi = useRouter();
  // phone number disalbled
  useEffect(() => {
    if (userCred.password && userCred.retype) {
      if (userCred.password != userCred.retype) {
        setPassCheck("* password should be same");
      } else {
        setPassCheck(null);
      }
    }
  }, [userCred]);

  const handler = async (event) => {
    event.preventDefault();
    var dataToServer = userCred;
    delete dataToServer.retype;
    setLoader(true);
    var res = await SendData("/signup", dataToServer);
    setLoader(false);
    responseState(res.message);
    setTimeout(() => {
      navi.push("/blog");
    }, 3000);
  };

  const handleInput = (event) => {
    var { name, value } = event.target;
    setUserCred((prev) => ({ ...prev, [name]: value }));
  };

  const handleState = () => {
    changeState((prev) => !prev);
  };

  return (
    <div className={style.login}>
      {loader ? <Loading /> : null}
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
            <h3 className={style.errorMsg}>{response}</h3>
          </div>
        </header>
        <div className={style.inner_content}>
          <div className={style.social}>
            <FontAwesomeIcon
              className={style.icon}
              icon={faGoogle}
              onClick={() => loginMethod("google", responseState)}
            />
            <FontAwesomeIcon className={style.icon} icon={faFacebookF} />
          </div>
          <div>
            <span className={style.idea}>or create account with email</span>
          </div>
          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter username"
              name="username"
              onChange={handleInput}
              required={true}
            />
            <input
              placeholder="enter email"
              type="email"
              name="email"
              onChange={handleInput}
              required={true}
            />

            <input
              placeholder="enter password"
              name="password"
              minLength={8}
              onChange={handleInput}
              required={true}
            />
            <label className={style.retype}>{passCheck}</label>
            <input
              placeholder="retype password"
              name="retype"
              minLength={8}
              onChange={handleInput}
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

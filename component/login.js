import style from "/styles/new.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "./sendData";
import React, { Component, useState } from "react";
import loginMethod from "./method";
import { useRouter } from "next/router";
export default function LoginBox({ changeState }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navi = useRouter();

  const handler = async (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    var res = await SendData("login", data);
    console.log(res.message);
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
            <span className={style.firstSpan}>Login</span>
            <span className={style.secondSpan}>/</span>
            <span className={style.secondSpanWord} onClick={handleState}>
              SignUp
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

          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <span className={style.idea}>Forget password?</span>
            </div>
            <div className={style.footer}>
              <button>login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

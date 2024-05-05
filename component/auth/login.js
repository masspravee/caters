import style from "/styles/new.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "../sendData";
import React, { useContext, useState } from "react";
import GoogleLogin from "./googlePopupLogin";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";

export default function LoginBox({ responseState }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);

  const handler = async (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    setLoader(true);
    var res = await SendData("login", data);
    setLoader(false);
    if (res.message && res.data) {
      setReply(res.message);
      responseState(res);
    } else {
      setReply(res.error);
      responseState(res.error);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>Login</span>
          </div>
        </header>
        <div className={style.inner_content}>
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
          <FontAwesomeIcon
            className={style.icon}
            icon={faGoogle}
            onClick={() => GoogleLogin(responseState)}
          />
          <span>
            Don't have a Account <a href="/account_type">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
}

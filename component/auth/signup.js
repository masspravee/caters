import style from "/styles/new.module.css";
import loginMethod from "./googlePopupLogin";
import React, { useState, useEffect, useContext } from "react";
import Notice from "../notice";
import SendData from "../sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";
export default function SignUpBox({ responseState, user_type }) {
  const [userCred, setUserCred] = useState({
    displayName: "",
    email: "",
    password: "",
    retype: "",
    client: user_type == "client" ? true : false,
  });

  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);

  const [passCheck, setPassCheck] = useState(null);

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
    if (res.message && res.data) {
      responseState(res);
      setReply(res.message);
    } else {
      responseState(res.error);
      setReply(res.error);
    }
  };

  const handleInput = (event) => {
    var { name, value } = event.target;

    setUserCred((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>SignUp</span>
          </div>
          <div>
            <h3 className={style.errorMsg}></h3>
          </div>
        </header>
        <div className={style.inner_content}>
          <div>
            <span className={style.idea}>Create account with email</span>
          </div>
          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter Name"
              name="displayName"
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
          <div className={style.social}>
            <FontAwesomeIcon
              className={style.icon}
              icon={faGoogle}
              onClick={() => loginMethod("google", responseState, user_type)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//

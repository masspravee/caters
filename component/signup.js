import style from "/styles/new.module.css";
import loginMethod from "./method";
import React, { useState, useEffect, useContext } from "react";
import SendData from "./sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import Loading from "./loading";
import { NavBarProvider } from "@/pages/_app";
export default function SignUpBox({ changeState, response, responseState }) {
  const [userCred, setUserCred] = useState({
    displayName: "",
    email: "",
    password: "",
    retype: "",
    client: false,
  });
  const [dirs, setDirs] = useContext(NavBarProvider);
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
    var promptRes = confirm(
      "Are you sure about your confirmations; actions cant be reverted"
    );
    if (promptRes) {
      var dataToServer = userCred;
      delete dataToServer.retype;
      setLoader(true);
      var res = await SendData("/signup", dataToServer);
      setLoader(false);

      if (res.message && res.data) {
        responseState(res.message);
        var jsonData = JSON.stringify(res.data);
        if (res.data.client) {
          setDirs([
            { route: "blog", textName: "blog" },
            { route: "/client/services", textName: "services" },
            { route: "/client/create", textName: "create" },
            { route: "/about", textName: "about" },
            { route: "/account", textName: "account" },
          ]);
        } else {
          setDirs([
            { route: "blog", textName: "blog" },
            { route: "/about", textName: "about" },
            { route: "/account", textName: "account" },
          ]);
        }
        localStorage.setItem("login-cred", jsonData);
        console.log(res.data);
        setTimeout(() => {
          navi.push("/client/info");
        }, 3000);
      } else {
        responseState(res.error);
      }
    }
  };

  const handleInput = (event) => {
    var { name, value } = event.target;

    if (name == "client") {
      setUserCred((prev) => ({ ...prev, [name]: event.target.checked }));
    } else {
      setUserCred((prev) => ({ ...prev, [name]: value }));
    }
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
              placeholder="enter displayName"
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
            <div className={style.check}>
              <input
                type="checkbox"
                id="check"
                name="client"
                onChange={handleInput}
              />
              <label htmlFor="check">Do you have any companies</label>
            </div>
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

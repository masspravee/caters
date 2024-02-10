import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "@/component/sendData";
import loginMethod from "@/component/method";

export default function LoginBox() {
  const navi = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);
  const [dirs, setDirs] = useContext(NavBarProvider);
  const [response, setResponse] = useState({});

  const handler = async (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    setLoader(true);
    var res = await SendData("login", data);
    setLoader(false);
    if (res.message && res.data) {
      setReply(res.message);
      setResponse(res);
    } else {
      setReply(res.error);
      setResponse(res);
    }
  };

  useEffect(() => {
    if (response.message && response.authType) {
      var jsonData = JSON.stringify(response.data);
      localStorage.setItem("login-cred", jsonData);

      if (response.data.client) {
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

      navi.push("/blog");
    } else if (response.error) {
      console.log(response);
    }
  }, [response]);

  return (
    <div className="container">
      <div className={style.inner_container}>
        <div className={style.box_container}>
          <Notice
            title={"Welcome back"}
            msg={"Log in to continue your delicious journey with us"}
          />
          <div className={style.login}>
            <div className={style.inner_loginbox}>
              <header>
                <div className={style.header}>
                  <span className={style.firstSpan}>Login</span>
                </div>
              </header>
              <div className={style.inner_content}>
                <div className={style.social}>
                  <FontAwesomeIcon
                    className={style.icon}
                    icon={faGoogle}
                    onClick={() => loginMethod("google", setResponse)}
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
        </div>
      </div>
    </div>
  );
}

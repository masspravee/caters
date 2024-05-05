import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

import SignUpBox from "@/component/auth/signup";
import LoginBox from "@/component/auth/login";

export default function Login() {
  const navi = useRouter();
  const [dirs, setDirs] = useContext(NavBarProvider);
  const [response, setResponse] = useState({});

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
          <>
            <Notice
              title={"Welcome back"}
              msg={"Log in to continue your delicious journey with us"}
            />
            <LoginBox responseState={setResponse} />
          </>
        </div>
      </div>
    </div>
  );
}

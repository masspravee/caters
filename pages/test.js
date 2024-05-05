import { getCookie } from "cookies-next";

import React, { useState, useEffect } from "react";
export default function () {
  const [cookieName, setCookieName] = useState(null);

  useEffect(() => {
    var cookie = getCookie("catersProfId");
    setCookieName(cookie);
    alert(cookie);
  }, []);

  return (
    <div className="container">
      <h1>Hello</h1>
      <span>{cookieName}</span>
    </div>
  );
}


import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";

import SignUpBox from "@/component/auth/signup";
export default function Page() {
  const [response, setResponse] = useState({
    message: "",
    authType: "",
  });
  const navi = useRouter();

  useEffect(() => {
    if (response.authType && response.message) {
      navi.push("/client/forms");
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
          <SignUpBox
            response={response}
            responseState={setResponse}
            client={true}
          />
        </div>
      </div>
    </div>
  );
}



import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";

import SignUpBox from "@/component/auth/signup";
export default function Page() {
  const [response, setResponse] = useState({
    message: "",
    authType: "",
  });
  const navi = useRouter();

  useEffect(() => {
    if (response.authType && response.message) {
      navi.push("/user/info");
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
          <SignUpBox
            response={response}
            responseState={setResponse}
            client={false}
          />
        </div>
      </div>
    </div>
  );
}

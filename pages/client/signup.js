import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";

import SignUpBox from "@/component/signup";
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

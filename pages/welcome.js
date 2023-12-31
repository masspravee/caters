import LoginBox from "@/component/login";
import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import SignUpBox from "@/component/signup";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider } from "@/pages/_app";
import Loading from "@/component/loading";
export default function Welcome() {
  const navi = useRouter();
  const [buttonState, setButtonState] = useState(false);
  const [dirs, setDirs] = useContext(NavBarProvider);

  const [response, setResponse] = useState({ message: "", data: "" });

  useEffect(() => {
    if (response.message && response.data) {
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

      setTimeout(() => {
        if (response.authType == "login200") {
          navi.push("/blog");
        } else if (response.authType == "acc200") {
          navi.push("/client/info");
        }
      }, 3000);
    } else {
      setDirs([
        { route: "blog", textName: "blog" },
        { route: "/about", textName: "about" },
        { route: "/welcome", textName: "welcome" },
      ]);
    }
    console.log(response);
  }, [response]);

  return (
    <div className="container">
      <div className={style.inner_container}>
        <div className={style.box_container}>
          {buttonState ? (
            <>
              <Notice
                changeState={setButtonState}
                title={"Welcome back"}
                name={"sign in"}
                msg={"Log in to continue your delicious journey with us"}
              />
              <LoginBox
                changeState={setButtonState}
                response={response}
                responseState={setResponse}
              />
            </>
          ) : (
            <>
              <SignUpBox
                changeState={setButtonState}
                responseState={setResponse}
                response={response}
              ></SignUpBox>
              <Notice
                changeState={setButtonState}
                title={"Welcome to Caters"}
                name={"log in "}
                msg={"Start your flavorful journey with us!"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import LoginBox from "@/component/login";
import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import SignUpBox from "@/component/signup";
import React, { useState, useEffect } from "react";
import RedirectComp from "@/component/redirect";
import { useRouter } from "next/router";

export default function Welcome() {
  const navi = useRouter();
  const [buttonState, setButtonState] = useState(true);
  const [popupRedir, setPopupRedir] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (response != null) {
      navi.push("/blog");
    }
  }, [response]);

  useEffect(() => {
    setResponse(null);
  }, [buttonState]);

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

import LoginBox from "@/component/login";
import style from "/styles/new.module.css";
import Notice from "@/component/notice";
import SignUpBox from "@/component/signup";
import React, { useState, useEffect } from "react";
import RedirectComp from "@/component/redirect";

export default function Welcome() {
  const [buttonState, setButtonState] = useState(true);
  const [popupRedir, setPopupRedir] = useState(false);
  const [status, setStatus] = useState(null);
  const [dataForServer, setDataForServer] = useState(null);

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
              <LoginBox changeState={setButtonState} />
            </>
          ) : (
            <>
              <SignUpBox changeState={setButtonState}></SignUpBox>
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

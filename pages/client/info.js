import style from "/styles/forms.module.css";
import React, { useContext, useState } from "react";
import SendData from "@/component/sendData";
import { useRouter } from "next/router";
import { LoaderProvider, ReplyProvider } from "../_app";
export default function Info({ data }) {
  const navi = useRouter();

  const [userNameData, setUserNameData] = useState(data);
  const [username, setUsername] = useState("");

  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);

  const clickValueHandler = (event) => {
    setUsername(event.target.value);
  };

  const submitValue = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
    };
    if (EvaluateUsername(username)) {
      setLoader(true);
      const response = await SendData("/info", data);
      setLoader(false);
      if (response.message) {
        setReply(response.message);
        navi.push("/client/services");
      } else {
        setReply(response.error);
      }
    } else {
      setReply("Invalid username Type");
    }
  };

  const EvaluateUsername = (name) => {
    var regex = /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/;
    return regex.test(name);
  };

  return (
    <div className="container">
      <div className={style.form_container}>
        <form className={style.form} onSubmit={submitValue}>
          <h1>Enter Your Additional Info</h1>
          <h2>{reply}</h2>
          <div className={style.input_group}>
            <label>Set username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              minLength={6}
              value={username}
              required
            ></input>
            <div>
              <span>Suggested Usernames for you</span>
              <select size={5} onChange={clickValueHandler}>
                {userNameData.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={style.input_group}>
            <input type="submit" value={"Submit"}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { catersProfId } = context.req.cookies;
  console.log(catersProfId);

  const data = JSON.stringify({ uid: catersProfId });

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/account_action/username_suggesion`
      : "http://localhost:3000/api/account_action/username_suggesion";
  const response = await fetch(apiUrl, {
    method: "POST",
    body: data,
  });
  const res = await response.json();

  return {
    props: { data: res.message },
  };
}

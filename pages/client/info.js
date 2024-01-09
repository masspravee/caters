import style from "/styles/forms.module.css";
import React, { useContext, useState } from "react";
import SendData from "@/component/sendData";
import { useRouter } from "next/router";
import { LoaderProvider, ReplyProvider } from "../_app";
export default function Info() {
  const navi = useRouter();
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);

  const submitValue = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      bio: bio,
    };
    if (EvaluateUsername(username)) {
      setLoader(true);
      const response = await SendData("/info", data);
      setLoader(false);
      if (response.message) {
        setReply(response.message);
        navi.push("/blog");
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
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>Set Your Bio</label>
            <input
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <input type="submit" value={"Submit"}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

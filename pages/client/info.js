import style from "/styles/forms.module.css";
import React, { Component, useState, useEffect } from "react";
import SendData from "@/component/sendData";
import { useRouter } from "next/router";
export default function Info() {
  const navi = useRouter();
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [error, setError] = useState(null);
  const submitValue = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      bio: bio,
    };
    if (EvaluateUsername(username)) {
      const response = await SendData("/info", data);
      if (response.message) {
        setError(response.message);
        navi.push("/blog");
      } else {
        setError(response.error);
      }
    } else {
      setError("Invalid username Type");
    }
  };

  const EvaluateUsername = (name) => {
    var regex = /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/;
    return regex.test(name);
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className={style.form_container}>
        <form className={style.form} onSubmit={submitValue}>
          <h1>Enter Your Additional Info</h1>
          <h2>{error}</h2>
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

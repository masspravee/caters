import style from "/styles/forms.module.css";
import React, { Component, useState, useEffect } from "react";
import SendData from "@/component/sendData";
import { useRouter } from "next/router";
export default function Additional() {
  const navi = useRouter();
  const [userCred, setUserCred] = useState({});
  const [error, setError] = useState(null);
  const submitValue = async (event) => {
    event.preventDefault();
    const data = {
      username: userCred.username,
      bio: userCred.bio,
      client: userCred.client,
    };

    if (EvaluateUsername(userCred.username)) {
      const response = await SendData("/additional-info", data);
      if (response.message && data.client) {
        setError(response.message);
        navi.push("/client/forms");
      } else if (response.message) {
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

  const handleInput = (event) => {
    var { name, value } = event.target;
    if (name == "client") {
      setUserCred((prev) => ({ ...prev, [name]: event.target.checked }));
    } else {
      setUserCred((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container">
      <div className={style.form_container}>
        <form className={style.form} onSubmit={submitValue}>
          <h1>Enter Your Additional Info</h1>
          <h2>{error}</h2>
          <div className={style.input_group}>
            <label>Set username</label>
            <input
              onChange={handleInput}
              name="username"
              minLength={6}
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>Set Your Bio</label>
            <input onChange={handleInput} name="bio" required></input>
          </div>
          <div className={style.input_group}>
            <div className={style.check}>
              <input
                type="checkbox"
                id="check"
                name="client"
                onChange={handleInput}
              />
              <label htmlFor="check">Do you have any companies</label>
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

import React, { useState } from "react";
import style from "/styles/Welcome.module.css";
import { useRouter } from "next/router";
export default function RedirectComponent() {
  const [selection, setSelection] = useState(null);
  const navi = useRouter();
  const handle = (event) => {
    event.preventDefault();
    if (selection == "client") {
      navi.push("/client/signup");
    } else {
      navi.push("/user/signup");
    }
  };

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div className="container">
      <div className={style.fill_container}>
        <div className={style.box_container}>
          <h2>SignUp</h2>
          <form onSubmit={handle}>
            <label className={style.question}>Select Your Account Type</label>
            <div className={style.check}>
              <input
                type="radio"
                name="accountType"
                value="personal"
                id="personal"
                onChange={handleChange}
                required
              />
              <span className="material-symbols-outlined">person</span>

              <label htmlFor="personal">Personal</label>
            </div>
            <div className={style.check}>
              <input
                type="radio"
                name="accountType"
                value="client"
                id="organisation"
                onChange={handleChange}
                required
              />
              <span className="material-symbols-outlined">add_business</span>
              <label htmlFor="organisation">Organisation</label>
            </div>
            <button>Submit</button>
            <span>or</span>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

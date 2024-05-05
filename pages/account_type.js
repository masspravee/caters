import style from "/styles/account.module.css";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AccountType() {
  const navigator = useRouter();
  const [isBusiness, setIsBusiness] = useState(null);

  const handleInput = (event) => {
    console.log(event.target.value);
    setIsBusiness(event.target.value);
  };

  const handleForm = (event) => {
    event.preventDefault();

    if (isBusiness == "business") {
      navigator.push("/client/signup");
    } else {
      navigator.push("/user/signup");
    }
  };

  return (
    <div className="container">
      <div className={style.account_container}>
        <section>
          <header>Wecaters</header>
          <div>
            {" "}
            <span>
              Join WeCaters.com Today and Experience the Future of Food Service
              Catering
            </span>{" "}
            <p>
              {" "}
              No more searching through endless menus or making countless phone
              calls. With our platform, you can easily browse through a variety
              of caterers and place orders with just a few clicks.
            </p>
          </div>
        </section>
        <article>
          <header>
            <h1>Choose Your Account Type</h1>
            <p>
              Ready to revolutionize the way you connect with food service
              caterers and enjoy delicious meals tailored just for you !
              <span> Sign up now to get started!</span>
            </p>
          </header>
          <div>
            <form onSubmit={handleForm}>
              <div
                className={
                  isBusiness == "business"
                    ? style.checked_box
                    : style.selection_box
                }
              >
                <span className="material-symbols-outlined">store</span>
                <input
                  type="radio"
                  id="account_type_business"
                  required
                  name="account_type"
                  value="business"
                  onChange={handleInput}
                ></input>
                <label htmlFor="account_type_business">Business</label>
              </div>
              <div
                className={
                  isBusiness == "personal"
                    ? style.checked_box
                    : style.selection_box
                }
              >
                <span className="material-symbols-outlined">person</span>{" "}
                <input
                  type="radio"
                  id="account_type_personal"
                  required
                  name="account_type"
                  value="personal"
                  onChange={handleInput}
                ></input>
                <label htmlFor="account_type_personal">Personal</label>
              </div>
              <Button type="submit" variant="contained">
                Next Step
              </Button>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
}

import SignUpBox from "@/component/auth/signup";
import React, { useState, useEffect, useContext } from "react";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";

import { useRouter } from "next/router";
export default function clientSignup() {
  const navi = useRouter();
  const [dirs, setDirs] = useContext(NavBarProvider);
  const [response, setResponse] = useState({});
  const user_type = "client";

  useEffect(() => {
    if (response.authType == 200) {
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

      navi.push("/client/info");
    } else if (response.error) {
      console.log(response);
    }
  }, [response]);

  return (
    <div className="container">
      <SignUpBox responseState={setResponse} user_type={user_type} />
    </div>
  );
}

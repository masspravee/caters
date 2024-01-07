import "@/styles/globals.css";
import Navbar from "@/component/navbar";
import GetRequest from "@/component/getRequest";
import React, { Component, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export const NavBarProvider = React.createContext();

export default function App({ Component, pageProps }) {
  const [dirs, setDirs] = useState([]);
  const navi = useRouter();

  const getCred = async () => {
    let res = await GetRequest("/login-cred");
    if (!res.error) {
      var message = res.message;
      if (message.client) {
        setDirs([
          { route: "/blog", textName: "blog" },
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
      localStorage.setItem("login-cred", JSON.stringify(message));
    } else {
      setDirs([
        { route: "blog", textName: "blog" },

        { route: "/about", textName: "about" },
        { route: "/welcome", textName: "welcome" },
      ]);
    }
  };

  useEffect(() => {
    getCred();
  }, []);

  return (
    <NavBarProvider.Provider value={[dirs, setDirs]}>
      <Navbar />
      <Component {...pageProps} />
    </NavBarProvider.Provider>
  );
}

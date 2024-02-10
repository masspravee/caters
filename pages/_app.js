import "@/styles/globals.css";
import Navbar from "@/component/navbar";
import GetRequest from "@/component/getRequest";
import React, { Component, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import PopUp from "@/component/popup";
import Loading from "@/component/loading";

export const NavBarProvider = React.createContext();
export const LoaderProvider = React.createContext();
export const ReplyProvider = React.createContext();

export default function App({ Component, pageProps }) {
  const [dirs, setDirs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [reply, setReply] = useState(false);

  const getCred = async () => {
    try {
      let res = await GetRequest("/login-cred");
      if (!res.error) {
        var message = res.message;
        if (message.client) {
          setDirs([
            { route: "/blog", textName: "blog" },
            { route: "/client/search", textName: "search" },
            { route: "/client/create", textName: "create" },
            { route: "/about", textName: "about" },
            { route: "/account", textName: "account" },
          ]);
        } else {
          setDirs([
            { route: "/blog", textName: "blog" },
            { route: "/search", textName: "search" },
            { route: "/about", textName: "about" },

            { route: "/account", textName: "account" },
          ]);
        }
        localStorage.setItem("login-cred", JSON.stringify(message));
      } else {
        setDirs([
          { route: "/blog", textName: "blog" },
          { route: "/about", textName: "about" },
          { route: "/welcome", textName: "welcome" },
          { route: "/login", textName: "login" },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCred();
  }, []);

  return (
    <LoaderProvider.Provider value={[loader, setLoader]}>
      <NavBarProvider.Provider value={[dirs, setDirs]}>
        <ReplyProvider.Provider value={[reply, setReply]}>
          {loader ? <Loading /> : null}
          {reply ? <PopUp reply={reply} changeState={setReply} /> : null}

          <Navbar />
          <Component {...pageProps} />
        </ReplyProvider.Provider>
      </NavBarProvider.Provider>
    </LoaderProvider.Provider>
  );
}

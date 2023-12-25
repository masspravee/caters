import "@/styles/globals.css";
import Navbar from "@/component/navbar";
import GetRequest from "@/component/getRequest";
import React, { Component, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const navi = useRouter();
  const getCred = async () => {
    let res = await GetRequest("/login-cred");

    if (!res.error) {
      var message = res.message;
      localStorage.setItem("login-cred", JSON.stringify(message));
    } else {
      try {
        setTimeout(() => {
          navi.push("/welcome");
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getCred();
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

import "@/styles/globals.css";
import Navbar from "@/component/navbar";
import GetRequest from "@/component/getRequest";
import React, { Component, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const getCred = async () => {
    var res = await GetRequest("/login-cred");
    var message = res.message;
    localStorage.setItem("login-cred", JSON.stringify(message));
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

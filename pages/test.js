import { getCookie } from "cookies-next";

import React, { useState, useEffect } from "react";
export default function () {
  const [cookieName, setCookieName] = useState(null);

  useEffect(() => {
    var cookie = getCookie("catersProfId");
    setCookieName(cookie);
    alert(cookie);
  }, []);

  return (
    <div className="container">
      <h1>Hello</h1>
      <span>{cookieName}</span>
    </div>
  );
}

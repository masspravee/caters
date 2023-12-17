import React, { Component, useEffect, useState } from "react";
export default function Empty() {
  const [dummy, setDummy] = useState(null);
  const getter = async () => {
    const apiUrl =
      process.env.NODE_ENV == "production"
        ? `${process.env.VERCEL_URL}/api/empty`
        : "http://localhost:3000/api/empty";
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const res = await response.json();
    setDummy(res.message);
  };

  useEffect(() => {
    getter();
  }, []);

  return (
    <div className="container">
      <h1>{dummy}</h1>
    </div>
  );
}

import React, { Component, useState, useEffect } from "react";
import detailsData from "/component/data.json";
import PopUp from "@/component/popup";
import Article from "@/component/article";

export default function Home() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  var keyData = Object.keys(detailsData);
  const [popup, setPopup] = useState(false);
  const [images, setImages] = useState([
    "hotel1.jpg",
    "hotel2.jpg",
    "hotel3.jpg",
    "hotel4.jpg",
    "hotel5.jpg",
  ]);

  useEffect(() => {
    setTimeout(() => {
      setPopup(true);
    }, 10000);
  }, []);

  return (
    <div className="container">
      {popup ? <PopUp stateChange={setPopup} /> : ""}

      {keyData.map((oneKeyData, index) => {
        return (
          <Article
            data={detailsData[oneKeyData]}
            img={images[index]}
            key={index}
            indexNum={index}
          ></Article>
        );
      })}
    </div>
  );
}

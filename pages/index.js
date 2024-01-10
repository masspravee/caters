import React, { Component, useState, useEffect } from "react";
import detailsData from "/component/data.json";

import Article from "@/component/article";

export default function Home() {
  var keyData = Object.keys(detailsData);

  const [images, setImages] = useState([
    "hotel1.jpg",
    "hotel2.jpg",
    "hotel3.jpg",
    "hotel4.jpg",
    "hotel5.jpg",
  ]);

  return (
    <div className="container">
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

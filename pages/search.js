import style from "/styles/search.module.css";
import { defaultImage } from "@/component/smallComponents";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Search({ data }) {
  const clientData = data.documents;
  console.log(clientData);
  const [suggested, setSuggested] = useState([]);
  const navigator = useRouter();
  const [selectType, setSelectType] = useState("by name");

  const handleInput = (event) => {
    var { value } = event.target;
    if (value && selectType === "by name") {
      setSuggested(
        clientData.filter(
          (singleDoc) =>
            singleDoc.username.includes(value) ||
            singleDoc.displayName.includes(value)
        )
      );
    } else if (value && selectType == "by location") {
      var newValue = value.charAt(0).toUpperCase() + value.slice(1);
      console.log(newValue);
      var dataset = clientData.filter(
        (singleDoc) =>
          singleDoc.location != undefined && singleDoc.location.length > 0
      );

      var newData = dataset.filter((sets) => {
        var filtered = sets.location.some((single) =>
          single.includes(newValue)
        );
        return filtered;
      });
      setSuggested(newData);
    }
  };

  const handleClick = (name) => {
    navigator.push(`/profile/${name}`);
  };

  const handleType = (event) => {
    setSelectType(event.target.value);
  };

  return (
    <div className="container">
      <div className={style.search}>
        <h1>Search {selectType}</h1>
        <div className={style.search_box}>
          <input onChange={handleInput} />
          <select defaultValue={selectType} onChange={handleType}>
            <option value="by name" name={"by name"}>
              by name{" "}
            </option>
            <option value="by location" name="by location">
              by location{" "}
            </option>
          </select>
        </div>
        <div className={style.search_results}>
          {suggested.map((element, index) => {
            return (
              <div
                className={style.item}
                key={index}
                onClick={() => {
                  handleClick(element.username);
                }}
              >
                <div className={style.left}>
                  <img
                    src={
                      element.photoUrl
                        ? element.photoUrl
                        : defaultImage(element.username)
                    }
                  />
                </div>
                <div className={style.right}>
                  <a href="#">{element.username}</a>
                  <span>{element.displayName}</span>
                  <div>
                    {element.location
                      ? element.location.map((item, index) => {
                          return <span key={index}>{item}</span>;
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/search`
      : "http://localhost:3000/api/search";
  const response = await fetch(apiUrl);
  const res = await response.json();
  return {
    props: {
      data: res,
    },
  };
}

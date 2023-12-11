import React, { useState, useEffect } from "react";
import style from "/styles/services.module.css";
import ButtonComponent from "@/component/buttonComponent";
import district from "/component/district.json";

export default function Services() {
  const [dataDistrict] = useState(district);
  const [cityArray, setCityArray] = useState(dataDistrict);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e, city) => {
    if (e.target.checked) {
      setSelectedCity((prev) => [...prev, city]);
      setSearch("");
    }
  };

  useEffect(() => {
    let filteredCities = dataDistrict;
    if (selectedCity.length > 0) {
      filteredCities = filteredCities.filter((x) => !selectedCity.includes(x));
    }
    if (search.length > 0) {
      filteredCities = filteredCities.filter((x) =>
        x.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredCities.length == 0) {
        setErrorMsg("no City found ");
      } else {
        setErrorMsg("");
      }
      console.log(filteredCities);
    }

    setCityArray(filteredCities);
  }, [selectedCity, search, dataDistrict]);

  return (
    <div className="container">
      <div className={style.service}>
        <div className={style.inner}>
          <header>
            <div className={style.span}>
              <span className={style.span}>
                {" "}
                Add Cities Where you can Provide (Multiple)
              </span>
              <span>{errorMsg}</span>
            </div>
            <div className={style.box}>
              {selectedCity.map((city) => (
                <ButtonComponent
                  buttonName={city}
                  key={city}
                  removeFunction={() =>
                    setSelectedCity((prev) =>
                      prev.filter((selected) => selected !== city)
                    )
                  }
                />
              ))}
            </div>
          </header>
          <div className={style.content}>
            <div>
              <input
                onChange={handleInput}
                value={search}
                className={style.text}
              ></input>
            </div>
            <div className={style.list}>
              {" "}
              <ul>
                {cityArray.map((district) => (
                  <li key={district}>
                    <input
                      type="checkbox"
                      value={district}
                      id={district}
                      onChange={() => {
                        handleClick(event, district);
                      }}
                    ></input>
                    <label htmlFor={district}>{district}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <footer>
            <button>Submit</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

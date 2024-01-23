import React, { useState, useEffect, useContext } from "react";
import style from "/styles/services.module.css";
import ButtonComponent from "@/component/buttonComponent";
import district from "/component/district.json";
import { useRouter } from "next/router";
import SendData from "@/component/sendData";
import { LoaderProvider, ReplyProvider } from "../_app";
export default function Services() {
  const navi = useRouter();
  const [dataDistrict] = useState(district);
  const [cityArray, setCityArray] = useState(dataDistrict);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedCity.length > 0) {
      const data = { cities: selectedCity };
      const response = await SendData("addCities", data);
      if (response.message) {
        setReply(response.message);
        navi.push("/account");
      } else {
        setReply(response.error);
      }
    } else {
      setErrorMsg("Please select a city");
    }
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
            <button onClick={handleSubmit}>Submit</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

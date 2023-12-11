/*
import React, { Component, useState, useEffect, useRef } from "react";
import InputBox from "@/component/inputBox";
import styles from "/styles/Home.module.css";
export default function Home({ data }) {
  const AllStates = Object.keys(data);
  const [currentState, setCurrentState] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState("default");

  const saveLocation = () => {
    if (currentDistrict != "default" && currentState) {
      localStorage.setItem("state", currentState);
      localStorage.setItem("district", currentDistrict);
    }
  };

  const handleStateChange = (selectedState) => {
    setCurrentDistrict("default");
    setCurrentState(selectedState);
  };

  return (
    <div className="container">
      <div className={styles.search}>
        <div className={styles.inner_container}>
          <div className={styles.header}>
            <h1>Select Your Location</h1>
          </div>
          <div className={styles.checkers}>
            <label>Select State</label>
            <select
              onChange={(e) => {
                handleStateChange(e.target.value);
              }}
            >
              <option value={"default"}>Not Selected</option>
              {AllStates.map((singleState) => {
                return (
                  <option
                    onClick={() => setCurrentState(singleState)}
                    value={singleState}
                    key={singleState}
                  >
                    {singleState}
                  </option>
                );
              })}
            </select>
            {currentState == null ? (
              ""
            ) : (
              <InputBox
                cities={data[currentState]}
                setCities={setCurrentDistrict}
                currentDistrict={currentDistrict}
              />
            )}
            <button>Search Providers</button>
            <button className={styles.locButton} onClick={saveLocation}>
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/cities");
  const cityData = await res.json();

  return {
    props: {
      data: JSON.parse(cityData.cities),
    },
  };
}


*/

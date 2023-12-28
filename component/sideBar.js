import style from "/styles/sideBar.module.css";
import React, { useState } from "react";
export default function SideBar({ data }) {
  const [provider, setProvider] = useState(data ? data : []);

  const userNames = provider
    .filter((single) => single != undefined)
    .map((single) => {
      return single != undefined ? single : "";
    });
  console.log(userNames);
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = (event) => {
    var value = event.target.value;
    if (value != "") {
      setSearch(value);

      var suggestions = userNames.filter((singleData) =>
        singleData.toLowerCase().includes(value)
      );

      setResults(suggestions);
    } else {
      setResults(null);
    }
  };

  return (
    <>
      <div className={style.sideBar}>
        <h1>Hwllo Wolrda</h1>
        <div className={style.search}>
          <h2>Search Providers</h2>
          <input onChange={handleSearch}></input>
          <ul className={style.results}>
            {!results
              ? null
              : results.map((resultValue) => {
                  return (
                    <a href={`/users/${resultValue}`} key={resultValue}>
                      <li>@{resultValue}</li>
                    </a>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
}

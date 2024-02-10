import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavBarProvider } from "@/pages/_app";
import React, { useContext, useState, useEffect } from "react";

export default function Navbar() {
  const currentRoute = useRouter().asPath.replace("/", "");
  const [dirs, setDirs] = useContext(NavBarProvider);
  const [inputValue, setInputValue] = useState(false);

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event) => {
    setInputValue(event.target.checked);
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <>
      <Head>
        <title>Product</title>
      </Head>

      <nav className={"nav"}>
        <input
          className={"input"}
          type="checkbox"
          id="check"
          onChange={setInput}
          checked={inputValue}
        ></input>
        <label htmlFor="check" className={"checkbtn"}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <a href="/" className={"brand"}>
          WeCaters
        </a>
        <ul className={"uls"}>
          {dirs.map((x) => {
            if (x != currentRoute) {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} onClick={changeInput}>
                    {x.textName}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} className={"active"}>
                    {x.textName}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </>
  );
}

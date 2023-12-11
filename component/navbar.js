import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Navbar() {
  const dirs = ["blog", "services", "create", "about", "account"];
  const currentRoute = useRouter().asPath.replace("/", "");

  return (
    <>
      <Head>
        <title>Product</title>
      </Head>

      <nav className={"nav"}>
        <input className={"input"} type="checkbox" id="check"></input>
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
                <li key={x}>
                  <a href={"/" + x} id={x}>
                    {x}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={x}>
                  <a href={"/" + x} id={x} className={"active"}>
                    {x}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </>
  );
}

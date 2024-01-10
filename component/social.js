import loginMethod from "./method";
import style from "/styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
export default function SocialLogin() {
  const handleLogin = async (method) => {
    var response = await loginMethod(method, changeState);
    console.log(response);
  };

  return (
    <div className={style.social}>
      <FontAwesomeIcon
        className={style.icon}
        icon={faGoogle}
        onClick={() => handleLogin("google")}
      >
        {" "}
      </FontAwesomeIcon>
      <FontAwesomeIcon
        className={style.icon}
        icon={faFacebook}
        onClick={() => handleLogin("facebook")}
      >
        {" "}
      </FontAwesomeIcon>
    </div>
  );
}

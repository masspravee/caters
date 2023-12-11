import style from "/styles/new.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
export default function NewPage() {
  return (
    <div className="container">
      <div className={style.inner_container}>
        <div className={style.box_container}>
          <div className={style.notice}>
            <div className={style.inner_notice}>
              <div className={style.header}>
                <h2>Welcome to caters</h2>
              </div>
              <div className={style.content}>
                <span> Log in to continue your delicious journey with us</span>
              </div>
              <div className={style.footer}>
                <button>SignIn</button>
              </div>
            </div>
          </div>
          <div className={style.login}>
            <div className={style.inner_loginbox}>
              <header>
                <h2>sign in</h2>
                <h3 className={style.errorMsg}></h3>
              </header>
              <div className={style.inner_content}>
                <div className={style.social}>
                  <FontAwesomeIcon className={style.icon} icon={faGoogle} />
                  <FontAwesomeIcon className={style.icon} icon={faFacebookF} />
                </div>
                <div>
                  <span className={style.idea}>
                    or create account with email
                  </span>
                </div>
                <div className={style.input_container}>
                  <input placeholder="enter username" />
                  <input placeholder="enter email" />
                  <input placeholder="enter password" />
                  <label className={style.retype}></label>
                  <input placeholder="retype password" />
                </div>
                <div>
                  <span className={style.idea}>Forget password?</span>
                </div>
              </div>
              <div className={style.footer}>
                <button>SignIn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { app } from "/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";
import SendData from "./sendData";

export default async function loginMethod(platform, changeState) {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  if (platform == "google") {
    try {
      signInWithPopup(auth, googleProvider).then(async (data) => {
        let dataToSend = {
          username: data.user.displayName,
          email: data.user.email,
          uid: data.user.uid,
          photoUrl: data.user.photoURL,
          phone: "",
        };
        var res = await SendData("popupLogin", dataToSend);
        changeState(res.message);
      });
    } catch (err) {
      changeState(err);
    }
  } else if ("facebook") {
    try {
      signInWithPopup(auth, facebookProvider).then(console.log);
    } catch (err) {
      console.log(err);
    }
  }
}

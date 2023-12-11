import { app } from "@/config";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
export default async function Login(req, res) {
  const auth = getAuth(app);

  const { email, password } = JSON.parse(req.body);

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (cred) => {
      var { uid } = cred.user;
      console.log(uid);
      setCookie("catersProfId", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({ message: "Login Succcessful" });
    })
    .catch((error) => {
      res.json({ message: error.code });
    });
}

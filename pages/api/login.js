import { app } from "@/config";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";
export default async function Login(req, res) {
  const auth = getAuth(app);

  const { email, password } = JSON.parse(req.body);
  let docData = null;

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (cred) => {
      var { uid } = cred.user;
      console.log(uid);
      try {
        var document = await getDoc(doc(firestore, "users", uid));
        docData = document.data();
      } catch (e) {
        console.log(e);
      }
      setCookie("catersProfId", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });

      res.json({ message: "Login Succcessful", data: docData });
    })
    .catch((error) => {
      res.json({ error: error.code });
    });
}

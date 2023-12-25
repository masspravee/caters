import { app } from "@/config";
import { firestore } from "@/config";
import { getAuth } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { setCookie } from "cookies-next";
export default async (req, res) => {
  const auth = getAuth(app);
  const data = JSON.parse(req.body);

  if ("email" in data) {
    const { email, password, username } = data;
    console.log(data);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        var { uid } = cred.user;
        var photo = `https://ui-avatars.com/api/?name=${username}&size=200&background=random&color=fff&bold=true`;
        const reDefinedData = {
          username: username,
          email: email,
          uid: uid,
          photoUrl: "",
          phone: "",
          bio: "",
        };

        await setDoc(doc(firestore, "users", uid), reDefinedData);

        setCookie("catersProfId", uid, {
          req,
          res,
          maxAge: new Date(Date.now() + 900000),
          httpOnly: false,
          sameSite: "none",
          secure: "true",
        });
        res.json({ message: "account created" });
      })
      .catch((error) => {
        res.json({ message: error.code });
      });
  }
};

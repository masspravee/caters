import { app } from "@/config";
import { firestore } from "@/config";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { setCookie } from "cookies-next";
import { generateUsername } from "unique-username-generator";

export default async (req, res) => {
  const auth = getAuth(app);
  const data = JSON.parse(req.body);

  if ("email" in data) {
    console.log(data);
    const { email, password, displayName, client } = data;
    console.log(data);
    var emailName = email.split("@")[0];

    var newUsername = generateUsername("-", 5, 20, emailName);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        var { uid } = cred.user;
        const reDefinedData = {
          displayName: displayName,
          email: email,
          uid: uid,
          client: client,
          photoUrl: "",
          phone: "",
          bio: "",
          username: newUsername,
        };
        if (client) {
          reDefinedData.isVerified = false;
          reDefinedData.location = [];
        }

        await setDoc(doc(firestore, "users", uid), reDefinedData);

        setCookie("catersProfId", uid, {
          req,
          res,
          maxAge: new Date(Date.now() + 900000),
          httpOnly: false,
          sameSite: "none",
          secure: "true",
        });
        setCookie("caterClient", client, {
          req,
          res,
          maxAge: new Date(Date.now() + 900000),
          httpOnly: false,
          sameSite: "none",
          secure: "true",
        });
        res.json({
          authType: 200,
          client: client,
          message: "Account Created",
          data: reDefinedData,
        });
      })
      .catch((error) => {
        res.json({ error: error.code });
      });
  }
};

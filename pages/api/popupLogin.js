import { firestore } from "@/config";
import { ref } from "firebase/storage";
import { setCookie } from "cookies-next";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  var data = JSON.parse(req.body);
  var { uid } = data;
  try {
    //check if doc exists in firestore

    var fileInFirestore = doc(firestore, "users", uid);
    var snap = await getDoc(fileInFirestore);
    if (snap.exists()) {
      setCookie("catersProfId", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({ message: "Logged to Your Account Successfully", status: 200 });
    } else {
      await setDoc(doc(firestore, "users", uid), data);
      setCookie("catersProfId", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({ message: "New Account Created", status: 200 });
    }
  } catch (e) {
    res.json({ message: "Error", status: 400 });
  }
};

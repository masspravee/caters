import { firestore } from "@/config";
import { ref } from "firebase/storage";
import { setCookie } from "cookies-next";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  var data = JSON.parse(req.body);
  var { uid } = data;
  try {
    var fileInFirestore = doc(firestore, "users", uid);
    var snap = await getDoc(fileInFirestore);
    var userData = snap.data();
    if (snap.exists()) {
      setCookie("catersProfId", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({
        authType: "login200",
        message: "Login Successfully",
        data: userData,
      });
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
      res.json({
        authType: "acc200",
        message: "Account Created",
        data: data,
      });
    }
  } catch (e) {
    res.json({ message: "Error", status: 400 });
  }
};

import { firestore } from "@/config";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  if (req.cookies.catersClientId) {
    try {
      var uid = req.cookies.catersClientId;
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data();
      res.json({ message: docData });
    } catch (e) {
      res.json({ error: "error caught" });
    }
  } else if (req.cookies.catersPersonID) {
    try {
      var uid = req.cookies.catersPersonID;
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data();
      res.json({ message: docData });
    } catch (e) {
      res.json({ error: "error caught" });
    }
  } else {
    res.json({ auttType: 400, error: "error caught" });
  }
};

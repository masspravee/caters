import { app } from "@/config";
import { firestore } from "@/config";
import { getAuth } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  const auth = getAuth(app);
  if (req.cookies.catersProfId) {
    try {
      var uid = req.cookies.catersProfId;
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data();
      res.json({ message: docData });
    } catch (e) {
      res.json({ message: "error caught" });
    }
  } else {
    res.status(400).json({ error: "error caught" });
  }
};

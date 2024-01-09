import { firestore } from "@/config";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  if (req.cookies.catersProfId) {
    try {
      var uid = req.cookies.catersProfId;
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data();
      res.json({ message: docData });
    } catch (e) {
      res.json({ error: "error caught" });
    }
  } else {
    res.json({ error: "error caught" });
  }
};

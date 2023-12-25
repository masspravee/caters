import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async (req, res) => {
  var userData = JSON.parse(req.body);
  try {
    const { phone, username, uid, photo } = userData;
    console.log(userData);

    var docRef = await getDoc(doc(firestore, "users", uid));
    var document = docRef.data();

    if (document !== userData) {
      await updateDoc(doc(firestore, "users", uid), userData).then(() => {
        res.json({ message: "changes made" });
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Error Cought" });
  }
};

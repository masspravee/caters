import { firestore } from "@/config";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export default async (req, res) => {
  var userData = JSON.parse(req.body);
  console.log(userData);
  try {
    const { catersProfId } = req.cookies;
    const { username } = userData;

    const users = collection(firestore, "users");
    const allusers = await getDocs(users);
    const allUserData = allusers.docs.map((user) => {
      return user.data();
    });
    allUserData.map((user) => {
      if (user.username === username) {
        res.json({ error: "User already exists" });
      }
    });

    var docRef = await getDoc(doc(firestore, "users", catersProfId));
    var document = docRef.data();

    if (document !== userData) {
      await updateDoc(doc(firestore, "users", catersProfId), userData).then(
        () => {
          res.json({ message: "changes made" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Error Caught" });
  }
};

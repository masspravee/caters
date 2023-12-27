import { firestore } from "@/config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  const { catersProfId } = req.cookies;
  const { username, bio } = JSON.parse(req.body);
  console.log(username, bio);
  const users = collection(firestore, "users");
  const allusers = await getDocs(users);
  const userData = allusers.docs.map((user) => {
    return user.data();
  });
  userData.map((user) => {
    if (user.username === username) {
      res.json({ message: "User already exists" });
    }
  });

  updateDoc(doc(firestore, "users", catersProfId), {
    username: username,
    bio: bio,
  }).then(() => {
    res.json({ message: "changes made" });
  });
}

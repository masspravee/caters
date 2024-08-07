import { firestore } from "@/config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  const cookies = req.cookies;
  const userId = cookies.catersClientId ? catersClientId : catersPersonID;
  const { username, bio } = JSON.parse(req.body);
  console.log(username, bio);
  const users = collection(firestore, "users");
  const allusers = await getDocs(users);
  const userData = allusers.docs.map((user) => {
    return user.data();
  });
  userData.map((user) => {
    if (user.username === username) {
      res.json({ error: "User already exists" });
    }
  });

  updateDoc(doc(firestore, "users", userId), {
    username: username,
    bio: bio,
  }).then(() => {
    res.json({ message: "Username set" });
  });
}

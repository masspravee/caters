import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async (req, res) => {
  var userData = JSON.parse(req.body);
  const { phone, username, uid, photo } = userData;
  console.log(userData);

  var docRef = await getDoc(doc(firestore, "users", uid));
  var document = docRef.data();
  if (userData.phone != document.phone) {
    await updateDoc(doc(firestore, "users", uid), {
      phone: phone,
    });
  } else if (userData.username != document.username) {
    await updateDoc(doc(firestore, "users", uid), {
      username: username,
    });
  }

  /*
  else if (userData.photo != document.photo) {
    await updateDoc(doc(firestore, "users", uid), {
      photo: photo,
    });
  }
  */
  console.log(document);
  res.json({ message: "waiting" });
};

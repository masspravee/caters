import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";
import { generateFromEmail, generateUsername } from "unique-username-generator";

export default async (req, res) => {
  try {
    const { uid } = JSON.parse(req.body);

    const docRef = doc(firestore, "users", uid);
    const docData = (await getDoc(docRef)).data();
    let { email } = docData;
    const newUsernames = [];
    for (let i = 0; i < 5; i++) {
      const newName = generateFromEmail(email, 5);
      newUsernames.push(newName);
    }

    res.json({ message: newUsernames });
  } catch (err) {
    console.log(err);
  }
};

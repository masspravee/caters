import { firestore } from "@/config";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
const Quene = require("bull");
export default async (req, res) => {
  const quene = new Quene("location_update");
  var { catersProfId } = req.cookies;
  var userData = JSON.parse(req.body);
  try {
    const { cities } = userData;

    await updateDoc(doc(firestore, "users", catersProfId), {
      location: cities,
    }).then(() => {
      res.json({ message: "Location Updated" });
    });

    cities.map(async (city) => {
      var fileInFirestore = doc(firestore, "cities", city);
      var snap = await getDoc(fileInFirestore);
      var userData = snap.data();
      console.log(userData);
      if (snap.exists()) {
        await updateDoc(doc(firestore, "cities", city), {
          users: [...userData.users, catersProfId],
        });
      } else {
        await setDoc(doc(firestore, "cities", city), {
          users: [catersProfId],
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error Cought" });
  }
};

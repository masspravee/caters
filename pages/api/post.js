import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";
export default async function (req, res) {
  try {
    const collectionData = collection(firestore, "post");
    const userData = collection(firestore, "users");

    const data = await getDocs(collectionData);
    const userFetchedData = await getDocs(userData);
    const allDocs = data.docs.map((doc) => {
      return doc.data();
    });
    const allUserData = userFetchedData.docs.map((doc) => {
      return doc.data();
    });

    var newRefinedData = [];

    for (let i = 0; i < allDocs.length; i++) {
      for (let j = 0; j < allUserData.length; j++) {
        if (allDocs[i].uid === allUserData[j].uid) {
          var tempData = { ...allDocs[i], profileUrl: allUserData[j].photoUrl };
          newRefinedData.push(tempData);
        }
      }
    }

    res.json({ message: newRefinedData, allUserData: allUserData });
  } catch (err) {
    res.json({ message: "error" });
  }
}
